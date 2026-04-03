'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

type Match = {
  id: string
  other_user_id: string
  name: string
  initials: string
  role: string
  photo: string | null
  bg: string
  color: string
  last_message: string
  last_time: string
}

type Message = {
  id: string
  sender_id: string
  content: string
  created_at: string
}

const bgColors = ['#E6F1FB', '#FAECE7', '#E1F5EE', '#EEEDFE', '#FAEEDA']
const textColors = ['#185FA5', '#993C1D', '#085041', '#3C3489', '#633806']

export default function Chat() {
  const [matches, setMatches] = useState<Match[]>([])
  const [active, setActive] = useState<Match | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const messagesEnd = useRef<HTMLDivElement>(null)
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  useEffect(() => { loadMatches() }, [])

  useEffect(() => {
    if (active) loadMessages(active.id)
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [active?.id])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMatches = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    setCurrentUserId(user.id)

    const { data: matchData } = await supabase
      .from('matches')
      .select('*')
      .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
      .eq('status', 'connected')

    if (!matchData || matchData.length === 0) { setLoading(false); return }

    const enriched = await Promise.all(matchData.map(async (m, i) => {
      const otherId = m.user_a === user.id ? m.user_b : m.user_a
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, role, photo')
        .eq('id', otherId)
        .single()

      const { data: lastMsg } = await supabase
        .from('messages')
        .select('content, created_at')
        .eq('match_id', m.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      const name = profile?.name || 'Unknown'
      return {
        id: m.id,
        other_user_id: otherId,
        name,
        initials: name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
        role: profile?.role || '',
        photo: profile?.photo || null,
        bg: bgColors[i % bgColors.length],
        color: textColors[i % textColors.length],
        last_message: lastMsg?.content || 'Start the conversation!',
        last_time: lastMsg?.created_at ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      }
    }))

    setMatches(enriched)
    if (enriched.length > 0) setActive(enriched[0])
    setLoading(false)
  }

  const loadMessages = async (matchId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: true })

    setMessages(data || [])

    if (channelRef.current) {
      await supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }

    const channel = supabase
      .channel(`room-${matchId}-${Date.now()}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `match_id=eq.${matchId}`
      }, payload => {
        setMessages(prev => {
          const exists = prev.find(m => m.id === (payload.new as Message).id)
          if (exists) return prev
          return [...prev, payload.new as Message]
        })
      })
      .subscribe()

    channelRef.current = channel
  }

  const send = async () => {
    if (!input.trim() || !active || !currentUserId) return
    const content = input
    setInput('')
    await supabase.from('messages').insert({
      match_id: active.id,
      sender_id: currentUserId,
      content,
    })
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') send()
  }

  if (loading) return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontSize: '14px', color: '#185FA5'}}>Loading messages...</div>
    </main>
  )

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column'}}>

      {/* Nav */}
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 32px', height: '56px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', flexShrink: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
            <circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/>
            <ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/>
          </svg>
          <span style={{fontSize: '17px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.4px'}}>ionic</span>
        </div>
        <div style={{display: 'flex', gap: '28px'}}>
          <a href="/dashboard" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Discover</a>
<a href="/chat" style={{fontSize: '13px', color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Messages</a>
<a href="/dealflow" style={{fontSize: '13px', color: '#D85A30', fontWeight: 500, textDecoration: 'none'}}>Deal Flow</a>
<a href="/profile" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Profile</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: '#185FA5', flexShrink: 0, cursor: 'pointer'}} onClick={() => window.location.href = '/profile'}>
            <img
              src={`https://wnznnuqoehrxomzkchlr.supabase.co/storage/v1/object/public/avatars/${currentUserId}/avatar.png`}
              alt="me"
              style={{width: '32px', height: '32px', objectFit: 'cover', display: 'block'}}
              onError={e => {
                e.currentTarget.style.display = 'none'
                if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = '<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:#E6F1FB;">Z</div>'
              }}
            />
          </div>
        </div>
      </nav>

      <div style={{display: 'grid', gridTemplateColumns: '300px 1fr', flex: 1, overflow: 'hidden'}}>

        {/* Sidebar */}
        <div style={{background: '#fff', borderRight: '0.5px solid #E6F1FB', overflowY: 'auto'}}>
          <div style={{padding: '16px', borderBottom: '0.5px solid #E6F1FB'}}>
            <div style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '12px'}}>Messages</div>
            <input placeholder="Search conversations..." style={{width: '100%', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', boxSizing: 'border-box', background: '#F8FAFC'}}/>
          </div>

          {matches.length === 0 ? (
            <div style={{padding: '40px 20px', textAlign: 'center', color: '#85B7EB', fontSize: '13px'}}>
              No matches yet. Go to Discover and connect with someone!
            </div>
          ) : (
            matches.map(conv => (
              <div key={conv.id} onClick={() => setActive(conv)} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: '0.5px solid #F8FAFC', background: active?.id === conv.id ? '#E6F1FB' : '#fff', cursor: 'pointer', transition: 'background 0.15s'}}>
                {conv.photo ? (
                  <img src={conv.photo} alt={conv.name} style={{width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}/>
                ) : (
                  <div style={{width: '42px', height: '42px', borderRadius: '50%', background: conv.bg, color: conv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 500, flexShrink: 0}}>{conv.initials}</div>
                )}
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3px'}}>
                    <span style={{fontSize: '13px', fontWeight: 500, color: '#042C53'}}>{conv.name}</span>
                    <span style={{fontSize: '11px', color: '#85B7EB'}}>{conv.last_time}</span>
                  </div>
                  <div style={{fontSize: '12px', color: '#888780', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{conv.last_message}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat area */}
        {active ? (
          <div style={{display: 'flex', flexDirection: 'column', background: '#F8FAFC', overflow: 'hidden'}}>

            {/* Chat header */}
            <div style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0}}>
              {active.photo ? (
                <img src={active.photo} alt={active.name} style={{width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover'}}/>
              ) : (
                <div style={{width: '38px', height: '38px', borderRadius: '50%', background: active.bg, color: active.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500}}>{active.initials}</div>
              )}
              <div>
                <div style={{fontSize: '14px', fontWeight: 500, color: '#042C53'}}>{active.name}</div>
                <div style={{fontSize: '11px', color: '#3B6D11'}}>{active.role} · Connected</div>
              </div>
            </div>

            {/* Starter prompt */}
            <div style={{padding: '16px 24px', flexShrink: 0}}>
              <div style={{background: '#fff', border: '0.5px solid #E6F1FB', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#D85A30', flexShrink: 0}}></div>
                <div>
                  <div style={{fontSize: '11px', fontWeight: 500, color: '#042C53', marginBottom: '2px'}}>Starter prompt</div>
                  <div style={{fontSize: '12px', color: '#185FA5'}}>What problem are you most obsessed with solving right now?</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{flex: 1, overflowY: 'auto', padding: '0 24px 16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {messages.length === 0 && (
                <div style={{textAlign: 'center', color: '#85B7EB', fontSize: '13px', marginTop: '20px'}}>
                  No messages yet — say hello!
                </div>
              )}
              {messages.map(msg => (
                <div key={msg.id} style={{display: 'flex', justifyContent: msg.sender_id === currentUserId ? 'flex-end' : 'flex-start'}}>
                  <div style={{maxWidth: '65%'}}>
                    <div style={{padding: '10px 14px', borderRadius: msg.sender_id === currentUserId ? '14px 14px 2px 14px' : '14px 14px 14px 2px', background: msg.sender_id === currentUserId ? '#185FA5' : '#fff', color: msg.sender_id === currentUserId ? '#E6F1FB' : '#042C53', fontSize: '13px', lineHeight: 1.6, border: msg.sender_id === currentUserId ? 'none' : '0.5px solid #E6F1FB'}}>
                      {msg.content}
                    </div>
                    <div style={{fontSize: '10px', color: '#85B7EB', marginTop: '4px', textAlign: msg.sender_id === currentUserId ? 'right' : 'left'}}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEnd}/>
            </div>

            {/* Input */}
            <div style={{background: '#fff', borderTop: '0.5px solid #E6F1FB', padding: '16px 24px', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0}}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                style={{flex: 1, padding: '11px 16px', borderRadius: '24px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', background: '#F8FAFC'}}
              />
              <button onClick={send} style={{width: '40px', height: '40px', borderRadius: '50%', background: '#185FA5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L13 8M13 8L9 4M13 8L9 12" stroke="#E6F1FB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', color: '#85B7EB', fontSize: '14px'}}>
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </main>
  )
}