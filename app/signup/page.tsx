'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const toggle = (key: string, val: string) => {
    setSelected(prev => ({...prev, [key]: val}))
  }

  const totalSteps = 6

  const handleFinish = async () => {
  setLoading(true)
  try {
    const { data, error } = await supabase.auth.signUp({
      email: selected.email,
      password: selected.password,
    })
    if (error) { alert(error.message); setLoading(false); return }
    
    const userId = data.user?.id
    if (!userId) { alert('Account created! Please check your email to verify then log in.'); setLoading(false); return }

    const { error: profileError } = await supabase.from('profiles').upsert({
      id: userId,
      name: selected.name || '',
      role: selected.role || '',
      domain: selected.domain || '',
      stage: selected.stage || '',
      comms: selected.comms || '',
      pace: selected.pace || '',
      risk: selected.risk || '',
      hours: selected.hours || '',
      motivation: selected.motivation || '',
      conflict: selected.conflict || '',
      decisions: selected.decisions || '',
      relationship: selected.relationship || '',
      ambition: selected.ambition || '',
      runway: selected.runway || '',
      pivot: selected.pivot || '',
      previous: selected.previous || '',
      commitment: selected.commitment || '',
      location: selected.location || '',
      equity: selected.equity || '',
      funding: selected.funding || '',
    })

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    window.location.href = '/dashboard'
  } catch (err) {
    console.error(err)
    alert('Something went wrong. Please try again.')
  }
  setLoading(false)
}

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#E6F1FB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px'}}>

      {/* Logo */}
      <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px'}}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle cx="10" cy="14" r="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.8"/>
          <circle cx="18" cy="14" r="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.8"/>
          <ellipse cx="14" cy="14" rx="3" ry="6" fill="#185FA5" fillOpacity="0.22"/>
        </svg>
        <span style={{fontSize: '20px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
      </div>

      {/* Card */}
      <div style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #B5D4F4', padding: '36px', width: '100%', maxWidth: '520px'}}>

        {/* Progress bar */}
        <div style={{height: '4px', background: '#E6F1FB', borderRadius: '2px', marginBottom: '28px'}}>
          <div style={{height: '100%', background: '#185FA5', borderRadius: '2px', width: `${(step / (totalSteps + 1)) * 100}%`, transition: 'width 0.3s'}}></div>
        </div>

        {/* Step 0 — Account */}
        {step === 0 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Create your account</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>Let&apos;s get you set up</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>You&apos;ll use these to log back in.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
              <div>
                <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Full name</label>
                <input type="text" placeholder="Your name" value={selected.name || ''} onChange={e => toggle('name', e.target.value)} style={{width: '100%', padding: '11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}/>
              </div>
              <div>
                <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Email</label>
                <input type="email" placeholder="your@email.com" value={selected.email || ''} onChange={e => toggle('email', e.target.value)} style={{width: '100%', padding: '11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}/>
              </div>
              <div>
                <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Password</label>
                <div style={{position: 'relative'}}>
  <input type={selected.showPassword ? 'text' : 'password'} placeholder="••••••••" value={selected.password || ''} onChange={e => toggle('password', e.target.value)} style={{width: '100%', padding: '11px 40px 11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}/>
  <div onClick={() => toggle('showPassword', selected.showPassword ? '' : 'yes')} style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#85B7EB'}}>
    {selected.showPassword ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="1.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    )}
  </div>
</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1 — Role */}
        {step === 1 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 1 of {totalSteps}</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>Who are you?</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>Pick the role that best describes what you bring to a partnership.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {['Builder / Engineer', 'Seller / Growth', 'Operator / PM', 'Visionary / Founder', 'Investor', 'Creative / Designer'].map(role => (
                <div key={role} onClick={() => toggle('role', role)} style={{padding: '8px 16px', borderRadius: '20px', border: `0.5px solid ${selected.role === role ? '#185FA5' : '#B5D4F4'}`, background: selected.role === role ? '#E6F1FB' : '#fff', color: selected.role === role ? '#185FA5' : '#888780', fontSize: '13px', fontWeight: selected.role === role ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                  {role}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Domain */}
        {step === 2 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 2 of {totalSteps}</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>What are you building?</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>Pick your focus area and stage.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px'}}>
              {['B2B SaaS', 'Consumer App', 'Marketplace', 'AI / ML', 'Fintech', 'Health Tech', 'E-commerce', 'Web3', 'Other'].map(domain => (
                <div key={domain} onClick={() => toggle('domain', domain)} style={{padding: '8px 16px', borderRadius: '20px', border: `0.5px solid ${selected.domain === domain ? '#185FA5' : '#B5D4F4'}`, background: selected.domain === domain ? '#E6F1FB' : '#fff', color: selected.domain === domain ? '#185FA5' : '#888780', fontSize: '13px', fontWeight: selected.domain === domain ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                  {domain}
                </div>
              ))}
            </div>
            <div style={{fontSize: '12px', color: '#042C53', fontWeight: 500, marginBottom: '8px'}}>What stage are you at?</div>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {['Pre-idea', 'Pre-product', 'Pre-revenue', 'Early revenue', 'Scaling'].map(stage => (
                <div key={stage} onClick={() => toggle('stage', stage)} style={{padding: '7px 14px', borderRadius: '20px', border: `0.5px solid ${selected.stage === stage ? '#185FA5' : '#B5D4F4'}`, background: selected.stage === stage ? '#E6F1FB' : '#fff', color: selected.stage === stage ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: selected.stage === stage ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                  {stage}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Work style */}
        {step === 3 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 3 of {totalSteps}</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>How do you work?</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>This feeds directly into your match score.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {[
                {key: 'comms', q: 'Communication style?', opts: ['Async first', 'Sync / calls', 'Mix of both']},
                {key: 'pace', q: 'Decision making pace?', opts: ['Move fast', 'Think slow', 'Depends on stakes']},
                {key: 'risk', q: 'Risk tolerance?', opts: ['High — bet it all', 'Measured — calculated risks', 'Low — steady wins']},
                {key: 'hours', q: 'Working hours?', opts: ['9-5 structure', 'Flexible / whenever', 'All hours grind']},
              ].map(({key, q, opts}) => (
                <div key={key}>
                  <div style={{fontSize: '13px', color: '#042C53', fontWeight: 500, marginBottom: '8px'}}>{q}</div>
                  <div style={{display: 'flex', gap: '7px', flexWrap: 'wrap'}}>
                    {opts.map(opt => (
                      <div key={opt} onClick={() => toggle(key, opt)} style={{flex: 1, minWidth: '100px', padding: '8px 10px', textAlign: 'center', borderRadius: '8px', border: `0.5px solid ${selected[key] === opt ? '#185FA5' : '#B5D4F4'}`, background: selected[key] === opt ? '#E6F1FB' : '#fff', color: selected[key] === opt ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: selected[key] === opt ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Partnership style */}
        {step === 4 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 4 of {totalSteps}</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>Your partnership style</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>This helps us find someone you&apos;ll actually enjoy working with.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {[
                {key: 'motivation', q: 'What motivates you most?', opts: ['Building great products', 'Making money', 'Creating impact', 'Proving people wrong']},
                {key: 'conflict', q: 'How do you handle conflict?', opts: ['Direct — say it straight', 'Diplomatic — tread carefully', 'Avoid it — work it out']},
                {key: 'decisions', q: 'How do you make big decisions?', opts: ['Data driven', 'Gut instinct', 'Both equally']},
                {key: 'relationship', q: 'Partner relationship style?', opts: ['Purely professional', 'Friendly colleagues', 'Friends who work together']},
              ].map(({key, q, opts}) => (
                <div key={key}>
                  <div style={{fontSize: '13px', color: '#042C53', fontWeight: 500, marginBottom: '8px'}}>{q}</div>
                  <div style={{display: 'flex', gap: '7px', flexWrap: 'wrap'}}>
                    {opts.map(opt => (
                      <div key={opt} onClick={() => toggle(key, opt)} style={{padding: '7px 12px', borderRadius: '8px', border: `0.5px solid ${selected[key] === opt ? '#185FA5' : '#B5D4F4'}`, background: selected[key] === opt ? '#E6F1FB' : '#fff', color: selected[key] === opt ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: selected[key] === opt ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 — Ambition */}
        {step === 5 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 5 of {totalSteps}</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>Ambition & vision</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>Misaligned ambition kills more partnerships than anything else.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {[
                {key: 'ambition', q: 'What are you building towards?', opts: ['Billion dollar company', 'Profitable lifestyle business', 'Sell in 3-5 years', 'Not sure yet']},
                {key: 'runway', q: 'How long until you need revenue?', opts: ['Already have it', '3-6 months', '6-12 months', 'Have funding / runway']},
                {key: 'pivot', q: 'How do you feel about pivoting?', opts: ['Open to it — ideas evolve', 'Only if data demands it', 'I have strong conviction']},
                {key: 'previous', q: 'Have you built something before?', opts: ['Yes — exited / sold', 'Yes — still running', 'Yes — it failed', 'No — first time']},
              ].map(({key, q, opts}) => (
                <div key={key}>
                  <div style={{fontSize: '13px', color: '#042C53', fontWeight: 500, marginBottom: '8px'}}>{q}</div>
                  <div style={{display: 'flex', gap: '7px', flexWrap: 'wrap'}}>
                    {opts.map(opt => (
                      <div key={opt} onClick={() => toggle(key, opt)} style={{padding: '7px 12px', borderRadius: '8px', border: `0.5px solid ${selected[key] === opt ? '#185FA5' : '#B5D4F4'}`, background: selected[key] === opt ? '#E6F1FB' : '#fff', color: selected[key] === opt ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: selected[key] === opt ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6 — Deal breakers */}
        {step === 6 && (
          <div>
            <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 6 of {totalSteps}</div>
            <h2 style={{fontSize: '22px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>Deal-breakers</h2>
            <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '20px', lineHeight: 1.6}}>These filter out bad matches before they happen.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {[
                {key: 'commitment', q: 'Commitment level?', opts: ['Exploring ideas', 'Side project', 'Full-time only']},
                {key: 'location', q: 'Location preference?', opts: ['Remote only', 'Same city preferred', 'Same city required']},
                {key: 'equity', q: 'Equity expectations?', opts: ['Equal split', 'Negotiable', 'I lead — majority equity']},
                {key: 'funding', q: 'Funding approach?', opts: ['Bootstrapped only', 'Open to raising', 'Already have investors']},
              ].map(({key, q, opts}) => (
                <div key={key}>
                  <div style={{fontSize: '13px', color: '#042C53', fontWeight: 500, marginBottom: '8px'}}>{q}</div>
                  <div style={{display: 'flex', gap: '7px', flexWrap: 'wrap'}}>
                    {opts.map(opt => (
                      <div key={opt} onClick={() => toggle(key, opt)} style={{flex: 1, padding: '8px 10px', textAlign: 'center', borderRadius: '8px', border: `0.5px solid ${selected[key] === opt ? '#185FA5' : '#B5D4F4'}`, background: selected[key] === opt ? '#E6F1FB' : '#fff', color: selected[key] === opt ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: selected[key] === opt ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s'}}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{display: 'flex', gap: '10px', marginTop: '28px', justifyContent: 'space-between'}}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} style={{padding: '10px 24px', borderRadius: '8px', border: '0.5px solid #B5D4F4', background: '#fff', color: '#185FA5', fontSize: '13px', cursor: 'pointer'}}>
              Back
            </button>
          ) : <div></div>}
          <button
            onClick={() => step < totalSteps ? setStep(s => s + 1) : handleFinish()}
            disabled={loading}
            style={{padding: '10px 28px', borderRadius: '8px', border: 'none', background: step === totalSteps ? '#D85A30' : '#185FA5', color: '#E6F1FB', fontSize: '13px', fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.7 : 1}}
          >
            {loading ? 'Creating account...' : step === totalSteps ? 'Find my matches →' : 'Next →'}
          </button>
        </div>

      </div>

      {/* Step indicators */}
      <div style={{display: 'flex', gap: '6px', marginTop: '20px'}}>
        {Array.from({length: totalSteps + 1}).map((_, i) => (
          <div key={i} style={{width: i === step ? '20px' : '8px', height: '8px', borderRadius: '4px', background: i <= step ? '#185FA5' : 'rgba(24,95,165,0.25)', transition: 'all 0.3s'}}></div>
        ))}
      </div>

      <p style={{fontSize: '12px', color: '#185FA5', marginTop: '16px'}}>Already have an account? <a href="/login" style={{color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Log in</a></p>

    </main>
  )
}