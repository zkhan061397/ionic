'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { scoreMatch, scoreBreakdown, UserProfile } from '../lib/matching'

type Profile = {
  id: string
  name: string
  role: string
  domain: string
  location: string
  commitment: string
  bio: string | null
  photo: string | null
  brings: string[] | null
  wants: string[] | null
  score: number
  initials: string
  bg: string
  color: string
  profile: UserProfile
}

const bgColors = ['#E6F1FB', '#FAECE7', '#E1F5EE', '#EEEDFE', '#FAEEDA']
const textColors = ['#185FA5', '#993C1D', '#085041', '#3C3489', '#633806']

const roleCompat: Record<string, string[]> = {
  'Builder / Engineer': ['Seller / Growth', 'Operator / PM', 'Visionary / Founder', 'Investor'],
  'Seller / Growth': ['Builder / Engineer', 'Operator / PM', 'Creative / Designer', 'Investor'],
  'Operator / PM': ['Builder / Engineer', 'Seller / Growth', 'Visionary / Founder'],
  'Visionary / Founder': ['Builder / Engineer', 'Operator / PM', 'Seller / Growth', 'Investor'],
  'Investor': ['Builder / Engineer', 'Visionary / Founder', 'Seller / Growth'],
  'Creative / Designer': ['Builder / Engineer', 'Seller / Growth', 'Visionary / Founder'],
}

const getSharedAttributes = (a: UserProfile, b: UserProfile): string[] => {
  const shared: string[] = []
  if (a.ambition === b.ambition) shared.push(a.ambition)
  if (a.comms === b.comms) shared.push(a.comms)
  if (a.pace === b.pace) shared.push(a.pace)
  if (a.commitment === b.commitment) shared.push(a.commitment)
  if (a.funding === b.funding) shared.push(a.funding)
  if (a.risk === b.risk) shared.push(a.risk)
  if (a.motivation === b.motivation) shared.push(a.motivation)
  if (a.hours === b.hours) shared.push(a.hours)
  return shared.filter(Boolean).slice(0, 5)
}

const getWhyMatched = (a: UserProfile, b: UserProfile) => {
  const signals: {icon: string; text: string; sub: string; badge: string; type: string}[] = []

  if ((roleCompat[a.role] || []).includes(b.role)) {
    signals.push({ icon: 'check', text: 'Skills complement perfectly', sub: `${a.role.split(' /')[0]} + ${b.role.split(' /')[0]} — ideal pairing`, badge: 'Aligned', type: 'match' })
  } else if (a.role !== b.role) {
    signals.push({ icon: 'check', text: 'Different roles, good balance', sub: `${a.role.split(' /')[0]} meets ${b.role.split(' /')[0]}`, badge: 'Aligned', type: 'match' })
  }

  if (a.ambition === b.ambition) {
    signals.push({ icon: 'check', text: 'Ambition fully aligned', sub: `Both aiming for — ${(a.ambition || '').toLowerCase()}`, badge: 'Aligned', type: 'match' })
  } else {
    signals.push({ icon: 'warn', text: 'Ambition differs slightly', sub: `You — ${(a.ambition || '').toLowerCase()} · They — ${(b.ambition || '').toLowerCase()}`, badge: 'Differs slightly', type: 'close' })
  }

  const workAligned = [a.comms === b.comms, a.pace === b.pace, a.hours === b.hours].filter(Boolean).length
  if (workAligned >= 2) {
    signals.push({ icon: 'check', text: 'Work style compatible', sub: [a.comms === b.comms ? a.comms : null, a.pace === b.pace ? a.pace : null].filter(Boolean).join(' · '), badge: 'Aligned', type: 'match' })
  } else {
    signals.push({ icon: 'warn', text: 'Work styles differ somewhat', sub: `Your pace — ${(a.pace || '').toLowerCase()} · Theirs — ${(b.pace || '').toLowerCase()}`, badge: 'Differs slightly', type: 'close' })
  }

  if (a.conflict !== b.conflict) {
    signals.push({ icon: 'warn', text: 'Conflict style differs slightly', sub: `You're ${(a.conflict || '').split(' —')[0].toLowerCase()} · They're ${(b.conflict || '').split(' —')[0].toLowerCase()}`, badge: 'Differs slightly', type: 'close' })
  }

  if (a.motivation === b.motivation) {
    signals.push({ icon: 'check', text: 'Shared motivation', sub: `Both driven by — ${(a.motivation || '').toLowerCase()}`, badge: 'Aligned', type: 'match' })
  }

  return signals.slice(0, 4)
}

export default function Dashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [current, setCurrent] = useState(0)
  const [connected, setConnected] = useState<string[]>([])
  const [passed, setPassed] = useState<string[]>([])
  const [match, setMatch] = useState<Profile | null>(null)
  const [swipeDir, setSwipeDir] = useState<string | null>(null)
  const [dragX, setDragX] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [currentUserName, setCurrentUserName] = useState('Z')
  const [currentUserPhoto, setCurrentUserPhoto] = useState<string | null>(null)
  const [userPlan, setUserPlan] = useState<string>('free')
  const dragStart = useRef(0)
  const dragCurrent = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => { loadProfiles() }, [])

  const loadProfiles = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!myProfile) { window.location.href = '/signup'; return }
    setCurrentUser(myProfile as UserProfile)
    setCurrentUserName(myProfile.name?.charAt(0) || 'Z')
    setCurrentUserPhoto(myProfile.photo || null)
    setUserPlan(myProfile.plan || 'free')

    const { data: allProfiles } = await supabase.from('profiles').select('*').neq('id', user.id)
    if (!allProfiles) { setLoading(false); return }

    const scored = allProfiles
      .map((p, i) => {
        const score = scoreMatch(myProfile as UserProfile, p as UserProfile)
        return {
          id: p.id,
          name: p.name || 'Unknown',
          role: p.role || '',
          domain: p.domain || '',
          location: p.location || '',
          commitment: p.commitment || '',
          bio: p.bio,
          photo: p.photo,
          brings: p.brings,
          wants: p.wants,
          score,
          initials: (p.name || 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
          bg: bgColors[i % bgColors.length],
          color: textColors[i % textColors.length],
          profile: p as UserProfile,
        }
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)

    // Free plan limit — 5 cards per day
    const limited = myProfile.plan === 'free' ? scored.slice(0, 5) : scored
    setProfiles(limited)
    setLoading(false)
  }

  const profile = profiles[current]
  const remaining = profiles.length - current

  const swipe = async (dir: string) => {
    if (swipeDir) return
    setDragX(0)
    setSwipeDir(dir)

    if (dir === 'connect') {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('matches').insert({
          user_a: user.id,
          user_b: profile.id,
          score: profile.score,
          status: 'connected',
        })
      }
    }

    setTimeout(() => {
      setSwipeDir(null)
      if (dir === 'connect') {
        setConnected(prev => [...prev, profile.id])
        if (Math.random() > 0.4) setMatch(profile)
        else setCurrent(c => c + 1)
      } else {
        setPassed(prev => [...prev, profile.id])
        setCurrent(c => c + 1)
      }
    }, 200)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = e.clientX
    dragCurrent.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    dragCurrent.current = e.clientX
    setDragX(e.clientX - dragStart.current)
  }

  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = dragCurrent.current - dragStart.current
    setDragX(0)
    if (diff > 80) swipe('connect')
    else if (diff < -80) swipe('pass')
  }

  const dismissMatch = () => {
    setMatch(null)
    setCurrent(c => c + 1)
  }

  if (loading) return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{width: '40px', height: '40px', border: '3px solid #E6F1FB', borderTop: '3px solid #185FA5', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px'}}></div>
        <div style={{fontSize: '14px', color: '#185FA5'}}>Finding your matches...</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </main>
  )

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC'}}>

      {/* Nav */}
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 32px', height: '56px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content'}}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
            <circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/>
            <ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/>
          </svg>
          <span style={{fontSize: '17px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.4px'}}>ionic</span>
        </a>
        <div style={{display: 'flex', gap: '28px'}}>
          <a href="/dashboard" style={{fontSize: '13px', color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Discover</a>
          <a href="/chat" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Messages</a>
          {(userPlan === 'investor') && (
            <a href="/dealflow" style={{fontSize: '13px', color: '#D85A30', fontWeight: 500, textDecoration: 'none'}}>Deal Flow</a>
          )}
          <a href="/profile" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Profile</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px'}}>
          {connected.length > 0 && (
            <div style={{background: '#E6F1FB', color: '#185FA5', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', border: '0.5px solid #B5D4F4'}}>
              {connected.length} match{connected.length > 1 ? 'es' : ''}
            </div>
          )}
          {userPlan !== 'free' && (
            <div style={{background: userPlan === 'investor' ? '#FAECE7' : '#E6F1FB', color: userPlan === 'investor' ? '#993C1D' : '#185FA5', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: `0.5px solid ${userPlan === 'investor' ? '#F5C4B3' : '#B5D4F4'}`}}>
              {userPlan === 'investor' ? 'Investor' : 'Pro'}
            </div>
          )}
          {currentUserPhoto ? (
            <img onClick={() => window.location.href = '/profile'} src={currentUserPhoto} alt="me" style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}}/>
          ) : (
            <div onClick={() => window.location.href = '/profile'} style={{width: '32px', height: '32px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, cursor: 'pointer'}}>
              {currentUserName}
            </div>
          )}
        </div>
      </nav>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px', minHeight: 'calc(100vh - 56px)'}}>

        {/* Match popup */}
        {match && (
          <div style={{background: 'rgba(0,0,0,0.4)', position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
            <div style={{background: '#fff', borderRadius: '20px', padding: '36px 32px', textAlign: 'center', maxWidth: '360px', width: '90%', border: '2px solid #185FA5'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
                <div style={{width: '52px', height: '52px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 500, border: '3px solid #fff', zIndex: 1}}>
                  {currentUserName}
                </div>
                <div style={{width: '28px', height: '4px', background: '#D85A30', margin: '0 -4px'}}></div>
                <div style={{width: '52px', height: '52px', borderRadius: '50%', background: match.bg, color: match.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 500, border: '3px solid #fff'}}>
                  {match.initials}
                </div>
              </div>
              <div style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>It&apos;s a match!</div>
              <div style={{fontSize: '13px', color: '#185FA5', marginBottom: '24px'}}>You and {match.name.split(' ')[0]} both connected.</div>
              <a href="/chat" style={{display: 'block', padding: '12px', borderRadius: '10px', background: '#185FA5', color: '#E6F1FB', fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginBottom: '10px'}}>
                Send a message →
              </a>
              <button onClick={dismissMatch} style={{width: '100%', padding: '12px', borderRadius: '10px', border: '0.5px solid #E6F1FB', background: '#fff', color: '#888780', fontSize: '13px', cursor: 'pointer'}}>
                Keep browsing
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{width: '100%', maxWidth: '480px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <div>
            <div style={{fontSize: '18px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.3px'}}>Discover</div>
            <div style={{fontSize: '12px', color: '#85B7EB'}}>
              {userPlan === 'free' ? `Free plan · ${remaining} of 5 daily matches` : `${remaining > 0 ? `${remaining} matches waiting` : 'Check back soon'}`}
            </div>
          </div>
          <div style={{display: 'flex', gap: '16px'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '18px', fontWeight: 500, color: '#185FA5'}}>{connected.length}</div>
              <div style={{fontSize: '10px', color: '#85B7EB'}}>Connected</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '18px', fontWeight: 500, color: '#888780'}}>{passed.length}</div>
              <div style={{fontSize: '10px', color: '#85B7EB'}}>Passed</div>
            </div>
          </div>
        </div>

        {/* Free plan upgrade banner */}
        {userPlan === 'free' && current >= 5 && (
          <div style={{width: '100%', maxWidth: '480px', background: '#E6F1FB', borderRadius: '16px', border: '0.5px solid #B5D4F4', padding: '20px', textAlign: 'center', marginBottom: '20px'}}>
            <div style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '6px'}}>You&apos;ve used your 5 free matches today</div>
            <div style={{fontSize: '13px', color: '#185FA5', marginBottom: '16px'}}>Upgrade to Pro for unlimited matches, advanced filters and priority placement.</div>
            <a href="/pricing" style={{display: 'inline-block', padding: '10px 24px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', fontSize: '13px', fontWeight: 500, textDecoration: 'none'}}>
              Upgrade to Pro →
            </a>
          </div>
        )}

        {/* Card stack */}
        {current >= profiles.length ? (
          <div style={{textAlign: 'center', marginTop: '80px'}}>
            <div style={{fontSize: '40px', marginBottom: '16px'}}>🎉</div>
            <div style={{fontSize: '20px', fontWeight: 500, color: '#042C53', marginBottom: '8px'}}>You&apos;ve seen everyone!</div>
            {userPlan === 'free' ? (
              <div>
                <div style={{fontSize: '14px', color: '#185FA5', marginBottom: '16px'}}>Upgrade to Pro to see unlimited matches.</div>
                <a href="/pricing" style={{display: 'inline-block', padding: '10px 24px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', fontSize: '13px', fontWeight: 500, textDecoration: 'none'}}>Upgrade to Pro →</a>
              </div>
            ) : (
              <div style={{fontSize: '14px', color: '#185FA5'}}>New matches drop every day. Check back soon.</div>
            )}
          </div>
        ) : profile ? (
          <div style={{position: 'relative', width: '100%', maxWidth: '480px', height: '600px'}}>

            {current + 1 < profiles.length && (
              <div style={{position: 'absolute', top: '8px', left: '8px', right: '8px', background: '#fff', borderRadius: '20px', border: '0.5px solid #E6F1FB', height: '590px', transform: 'scale(0.97)', zIndex: 0}}></div>
            )}

            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: '#fff', borderRadius: '20px', border: '0.5px solid #E6F1FB',
                overflow: 'hidden', cursor: 'grab',
                transform: swipeDir === 'connect' ? 'translateX(120%) rotate(15deg)' : swipeDir === 'pass' ? 'translateX(-120%) rotate(-15deg)' : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
                transition: swipeDir ? 'transform 0.2s ease-in' : dragX === 0 ? 'transform 0.15s ease-out' : 'none',
                opacity: swipeDir ? 0 : 1,
                userSelect: 'none',
                overflowY: 'auto',
              }}
            >
              {/* Card top */}
              <div style={{background: profile.bg, padding: '20px 24px 16px', position: 'relative', flexShrink: 0}}>
                <div style={{position: 'absolute', top: '16px', right: '16px', background: '#EAF3DE', color: '#3B6D11', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', border: '0.5px solid #C0DD97'}}>
                  {profile.score}% match
                </div>
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} style={{width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px'}}/>
                ) : (
                  <div style={{width: '56px', height: '56px', borderRadius: '50%', background: profile.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 500, marginBottom: '10px'}}>{profile.initials}</div>
                )}
                <div style={{fontSize: '20px', fontWeight: 500, color: '#042C53', marginBottom: '3px'}}>{profile.name}</div>
                <div style={{fontSize: '12px', color: profile.color}}>{profile.role} · {profile.domain} · {profile.commitment}</div>
              </div>

              {/* Card body */}
              <div style={{padding: '16px 20px'}}>
                {profile.bio && (
                  <p style={{fontSize: '12px', color: '#5F5E5A', lineHeight: 1.7, marginBottom: '14px', fontStyle: 'italic'}}>"{profile.bio}"</p>
                )}

                {/* You both */}
                {(() => {
                  const shared = getSharedAttributes(currentUser!, profile.profile)
                  return shared.length > 0 ? (
                    <div style={{marginBottom: '14px'}}>
                      <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>You both</div>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        {shared.map(attr => (
                          <span key={attr} style={{fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97'}}>{attr}</span>
                        ))}
                      </div>
                    </div>
                  ) : null
                })()}

                <div style={{height: '0.5px', background: '#E6F1FB', marginBottom: '12px'}}></div>

                {/* Why you matched */}
                {(() => {
                  const signals = getWhyMatched(currentUser!, profile.profile)
                  return (
                    <div style={{marginBottom: '14px'}}>
                      <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Why you matched</div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '7px'}}>
                        {signals.map((s, i) => (
                          <div key={i} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <div style={{width: '26px', height: '26px', borderRadius: '7px', background: s.type === 'match' ? '#EAF3DE' : '#FAEEDA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                              {s.type === 'match' ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3V6M6 8.5V9" stroke="#854F0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
                              )}
                            </div>
                            <div style={{flex: 1}}>
                              <div style={{fontSize: '12px', color: '#042C53'}}>{s.text}</div>
                              <div style={{fontSize: '10px', color: '#85B7EB', marginTop: '1px'}}>{s.sub}</div>
                            </div>
                            <span style={{fontSize: '10px', padding: '2px 8px', borderRadius: '20px', fontWeight: 500, flexShrink: 0, background: s.type === 'match' ? '#EAF3DE' : '#FAEEDA', color: s.type === 'match' ? '#27500A' : '#633806'}}>{s.badge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}

                <div style={{height: '0.5px', background: '#E6F1FB', marginBottom: '12px'}}></div>

                {/* Brings */}
                {profile.brings && profile.brings.length > 0 && (
                  <div style={{marginBottom: '16px'}}>
                    <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>{profile.name.split(' ')[0]} brings</div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                      {profile.brings.map(t => (
                        <span key={t} style={{fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: '#E6F1FB', color: '#0C447C', border: '0.5px solid #B5D4F4'}}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{display: 'flex', gap: '12px'}}>
                  <button onClick={() => swipe('pass')} style={{flex: 1, padding: '13px', borderRadius: '12px', border: '0.5px solid #E6F1FB', background: '#fff', color: '#888780', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="#888780" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Pass
                  </button>
                  <button onClick={() => swipe('connect')} style={{flex: 2, padding: '13px', borderRadius: '12px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
                    Connect
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L12 7M12 7L8 3M12 7L8 11" stroke="#E6F1FB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Swipe hint */}
        {current < profiles.length && (
          <div style={{display: 'flex', gap: '24px', marginTop: '20px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#85B7EB'}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 7L2 7M2 7L5 4M2 7L5 10" stroke="#85B7EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Drag left to pass
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#85B7EB'}}>
              Drag right to connect
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 7L12 7M12 7L9 4M12 7L9 10" stroke="#85B7EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}