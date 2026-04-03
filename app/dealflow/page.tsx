'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { scoreMatch, UserProfile } from '../lib/matching'

type Founder = {
  id: string
  name: string
  role: string
  domain: string
  stage: string
  location: string
  bio: string | null
  photo: string | null
  funding: string
  runway: string
  ambition: string
  brings: string[] | null
  score: number
  initials: string
  bg: string
  color: string
}

const bgColors = ['#E6F1FB', '#FAECE7', '#E1F5EE', '#EEEDFE', '#FAEEDA']
const textColors = ['#185FA5', '#993C1D', '#085041', '#3C3489', '#633806']

export default function DealFlow() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [outreachId, setOutreachId] = useState<string | null>(null)
  const [outreachMsg, setOutreachMsg] = useState('')
  const [sent, setSent] = useState<string[]>([])

  useEffect(() => { loadFounders() }, [])

  const loadFounders = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!myProfile) { window.location.href = '/signup'; return }
    setCurrentUser(myProfile as UserProfile)

    const { data: allProfiles } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', user.id)
      .or('funding.eq.Open to raising,funding.eq.Already have investors')

    if (!allProfiles) { setLoading(false); return }

    const scored = allProfiles.map((p, i) => ({
      id: p.id,
      name: p.name || 'Unknown',
      role: p.role || '',
      domain: p.domain || '',
      stage: p.stage || '',
      location: p.location || '',
      bio: p.bio,
      photo: p.photo,
      funding: p.funding || '',
      runway: p.runway || '',
      ambition: p.ambition || '',
      brings: p.brings,
      score: scoreMatch(myProfile as UserProfile, p as UserProfile),
      initials: (p.name || 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
      bg: bgColors[i % bgColors.length],
      color: textColors[i % textColors.length],
    })).sort((a, b) => b.score - a.score)

    setFounders(scored)
    setLoading(false)
  }

  const sendOutreach = async () => {
    if (!outreachMsg.trim() || !outreachId || !currentUser) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: existing } = await supabase
      .from('matches')
      .select('id')
      .or(`and(user_a.eq.${user.id},user_b.eq.${outreachId}),and(user_a.eq.${outreachId},user_b.eq.${user.id})`)
      .single()

    let matchId = existing?.id
    if (!matchId) {
      const { data: newMatch } = await supabase
        .from('matches')
        .insert({ user_a: user.id, user_b: outreachId, score: 0, status: 'connected' })
        .select()
        .single()
      matchId = newMatch?.id
    }

    if (matchId) {
      await supabase.from('messages').insert({
        match_id: matchId,
        sender_id: user.id,
        content: outreachMsg,
      })
      setSent(prev => [...prev, outreachId!])
      setOutreachId(null)
      setOutreachMsg('')
    }
  }

  const filtered = filter === 'all' ? founders : founders.filter(f => {
    if (filter === 'raising') return f.funding === 'Open to raising'
    if (filter === 'funded') return f.funding === 'Already have investors'
    if (filter === 'early') return ['Pre-idea', 'Pre-product', 'Pre-revenue'].includes(f.stage)
    return true
  })

  if (loading) return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{width: '40px', height: '40px', border: '3px solid #E6F1FB', borderTop: '3px solid #185FA5', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px'}}></div>
        <div style={{fontSize: '14px', color: '#185FA5'}}>Loading deal flow...</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </main>
  )

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC'}}>

      {/* Outreach modal */}
      {outreachId && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: '#fff', borderRadius: '16px', padding: '28px', maxWidth: '440px', width: '90%', border: '0.5px solid #E6F1FB'}}>
            <div style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '6px'}}>Send intro message</div>
            <div style={{fontSize: '13px', color: '#85B7EB', marginBottom: '16px'}}>As an investor you can reach out directly. Introduce yourself and why you&apos;re interested.</div>
            <textarea
              value={outreachMsg}
              onChange={e => setOutreachMsg(e.target.value)}
              placeholder="Hi, I'm an angel investor focused on B2B SaaS. I've read your profile and I'm interested in learning more about what you're building..."
              rows={5}
              style={{width: '100%', padding: '12px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', marginBottom: '16px'}}
            />
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={() => { setOutreachId(null); setOutreachMsg('') }} style={{flex: 1, padding: '11px', borderRadius: '8px', border: '0.5px solid #B5D4F4', background: '#fff', color: '#185FA5', fontSize: '13px', cursor: 'pointer'}}>Cancel</button>
              <button onClick={sendOutreach} style={{flex: 2, padding: '11px', borderRadius: '8px', border: 'none', background: '#D85A30', color: '#FAECE7', fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>Send message →</button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 32px', height: '56px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center'}}>
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
          <a href="/chat" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Messages</a>
          <a href="/dealflow" style={{fontSize: '13px', color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Deal Flow</a>
          <a href="/profile" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Profile</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px'}}>
          <div style={{background: '#FAECE7', color: '#993C1D', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid #F5C4B3'}}>
            Investor
          </div>
          <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#D85A30', color: '#FAECE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, cursor: 'pointer'}} onClick={() => window.location.href = '/profile'}>
            {currentUser?.name?.charAt(0) || 'I'}
          </div>
        </div>
      </nav>

      <div style={{maxWidth: '1000px', margin: '0 auto', padding: '32px 20px'}}>

        {/* Header */}
        <div style={{marginBottom: '28px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
            <h1 style={{fontSize: '24px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.3px'}}>Deal flow</h1>
            <div style={{background: '#EAF3DE', color: '#27500A', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid #C0DD97'}}>{filtered.length} founders</div>
          </div>
          <p style={{fontSize: '13px', color: '#85B7EB'}}>Founders actively seeking investment — sorted by compatibility score.</p>
        </div>

        {/* Stats */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px'}}>
          {[
            {label: 'Total founders', value: founders.length},
            {label: 'Seeking funding', value: founders.filter(f => f.funding === 'Open to raising').length},
            {label: 'Already funded', value: founders.filter(f => f.funding === 'Already have investors').length},
            {label: 'Messages sent', value: sent.length},
          ].map(({label, value}) => (
            <div key={label} style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #E6F1FB', padding: '14px 16px'}}>
              <div style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '3px'}}>{value}</div>
              <div style={{fontSize: '11px', color: '#85B7EB'}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap'}}>
          {[
            {key: 'all', label: 'All founders'},
            {key: 'raising', label: 'Seeking funding'},
            {key: 'funded', label: 'Already funded'},
            {key: 'early', label: 'Early stage'},
          ].map(({key, label}) => (
            <button key={key} onClick={() => setFilter(key)} style={{padding: '7px 16px', borderRadius: '20px', border: `0.5px solid ${filter === key ? '#185FA5' : '#E6F1FB'}`, background: filter === key ? '#E6F1FB' : '#fff', color: filter === key ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: filter === key ? 500 : 400, cursor: 'pointer'}}>
              {label}
            </button>
          ))}
        </div>

        {/* Founders grid */}
        {filtered.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#85B7EB', fontSize: '14px'}}>
            No founders match this filter yet.
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
            {filtered.map(founder => (
              <div key={founder.id} style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #E6F1FB', overflow: 'hidden'}}>

                {/* Card top */}
                <div style={{background: founder.bg, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative'}}>
                  <div style={{position: 'absolute', top: '14px', right: '14px', background: '#EAF3DE', color: '#27500A', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid #C0DD97'}}>{founder.score}% match</div>
                  {founder.photo ? (
                    <img src={founder.photo} alt={founder.name} style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}/>
                  ) : (
                    <div style={{width: '48px', height: '48px', borderRadius: '50%', background: founder.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 500, flexShrink: 0}}>{founder.initials}</div>
                  )}
                  <div>
                    <div style={{fontSize: '15px', fontWeight: 500, color: '#042C53', marginBottom: '2px'}}>{founder.name}</div>
                    <div style={{fontSize: '12px', color: founder.color}}>{founder.role} · {founder.domain}</div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{padding: '14px 20px'}}>
                  {founder.bio && (
                    <p style={{fontSize: '12px', color: '#5F5E5A', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px'}}>"{founder.bio}"</p>
                  )}

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px'}}>
                    {[
                      {label: 'Stage', value: founder.stage},
                      {label: 'Location', value: founder.location},
                      {label: 'Runway', value: founder.runway},
                      {label: 'Ambition', value: founder.ambition},
                    ].map(({label, value}) => value ? (
                      <div key={label} style={{background: '#F8FAFC', borderRadius: '8px', padding: '8px 10px', border: '0.5px solid #E6F1FB'}}>
                        <div style={{fontSize: '10px', color: '#85B7EB', marginBottom: '2px'}}>{label}</div>
                        <div style={{fontSize: '12px', fontWeight: 500, color: '#042C53'}}>{value}</div>
                      </div>
                    ) : null)}
                  </div>

                  {founder.brings && founder.brings.length > 0 && (
                    <div style={{marginBottom: '14px'}}>
                      <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px'}}>Brings</div>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        {founder.brings.map(t => (
                          <span key={t} style={{fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: '#E6F1FB', color: '#0C447C', border: '0.5px solid #B5D4F4'}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                    <div style={{padding: '4px 10px', borderRadius: '20px', background: founder.funding === 'Open to raising' ? '#EAF3DE' : '#E6F1FB', color: founder.funding === 'Open to raising' ? '#27500A' : '#185FA5', fontSize: '11px', fontWeight: 500, border: `0.5px solid ${founder.funding === 'Open to raising' ? '#C0DD97' : '#B5D4F4'}`}}>
                      {founder.funding === 'Open to raising' ? 'Seeking investment' : 'Already funded'}
                    </div>
                  </div>

                  {sent.includes(founder.id) ? (
                    <div style={{width: '100%', padding: '10px', borderRadius: '8px', background: '#EAF3DE', color: '#27500A', fontSize: '13px', textAlign: 'center', border: '0.5px solid #C0DD97'}}>
                      Message sent ✓
                    </div>
                  ) : (
                    <button onClick={() => setOutreachId(founder.id)} style={{width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#D85A30', color: '#FAECE7', fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>
                      Send intro message →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}