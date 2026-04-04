'use client'
import { useState } from 'react'

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  const proPrice = annual ? 19 : 29
  const investorPrice = annual ? 69 : 99

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC'}}>

      {/* Nav */}
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 40px', height: '56px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
          <svg width="28" height="28" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
            <circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/>
            <ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/>
          </svg>
          <span style={{fontSize: '22px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
        </a>
        <div style={{display: 'flex', gap: '32px', alignItems: 'center'}}>
          <a href="/how" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>How it works</a>
          <a href="/pricing" style={{fontSize: '13px', color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Pricing</a>
          <a href="/login" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Log in</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <a href="/signup" style={{fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', textDecoration: 'none'}}>Join free</a>
        </div>
      </nav>

      {/* Header */}
      <section style={{padding: '60px 40px 40px', textAlign: 'center'}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: '20px', padding: '4px 14px', marginBottom: '20px'}}>
          <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#3B6D11'}}></div>
          <span style={{fontSize: '12px', color: '#27500A', fontWeight: 500}}>First 200 founding members get Pro free forever</span>
        </div>
        <h1 style={{fontSize: '40px', fontWeight: 500, color: '#042C53', marginBottom: '12px', letterSpacing: '-0.8px'}}>Simple, transparent pricing</h1>
        <p style={{fontSize: '15px', color: '#185FA5', marginBottom: '28px'}}>Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>

        {/* Toggle */}
        <div style={{display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#fff', border: '0.5px solid #E6F1FB', borderRadius: '20px', padding: '6px 16px'}}>
  <span style={{fontSize: '13px', color: annual ? '#888780' : '#042C53', fontWeight: annual ? 400 : 500}}>Monthly</span>
  <div onClick={() => setAnnual(!annual)} style={{width: '40px', height: '22px', borderRadius: '11px', background: annual ? '#185FA5' : '#B5D4F4', cursor: 'pointer', position: 'relative', transition: 'background 0.2s'}}>
    <div style={{position: 'absolute', top: '3px', left: annual ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s'}}></div>
  </div>
  <span style={{fontSize: '13px', color: annual ? '#042C53' : '#888780', fontWeight: annual ? 500 : 400}}>Annual</span>
  <div style={{width: '64px', display: 'flex', justifyContent: 'center'}}>
    <span style={{fontSize: '11px', background: '#EAF3DE', color: '#27500A', padding: '2px 8px', borderRadius: '20px', fontWeight: 500, visibility: annual ? 'visible' : 'hidden', whiteSpace: 'nowrap'}}>Save 35%</span>
  </div>
</div>
      </section>

      {/* Pricing cards */}
      <section style={{padding: '0 40px 60px'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'start'}}>

          {/* Free */}
          <div style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #E6F1FB', padding: '28px'}}>
            <div style={{fontSize: '14px', fontWeight: 500, color: '#042C53', marginBottom: '4px'}}>Free</div>
            <div style={{marginBottom: '8px'}}>
              <span style={{fontSize: '36px', fontWeight: 500, color: '#042C53'}}>$0</span>
              <span style={{fontSize: '13px', color: '#888780'}}> forever</span>
            </div>
            <p style={{fontSize: '13px', color: '#888780', marginBottom: '24px', lineHeight: 1.5}}>Get started and find your first match.</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px'}}>
              {[
                '5 match cards per day',
                'Full compatibility breakdown',
                'See why you matched — signal by signal',
                'Basic profile with bio and skills',
                'Chat unlocks on mutual match',
                'Work style quiz included',
              ].map(f => (
                <div key={f} style={{display: 'flex', gap: '8px', alignItems: 'flex-start'}}>
                  <div style={{width: '16px', height: '16px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px'}}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{fontSize: '13px', color: '#5F5E5A'}}>{f}</span>
                </div>
              ))}
            </div>

            <a href="/signup" style={{display: 'block', textAlign: 'center', padding: '12px', borderRadius: '8px', border: '0.5px solid #B5D4F4', background: '#fff', color: '#185FA5', fontSize: '13px', fontWeight: 500, textDecoration: 'none'}}>
              Get started free
            </a>
          </div>

          {/* Pro */}
          <div style={{background: '#fff', borderRadius: '16px', border: '2px solid #185FA5', padding: '28px', position: 'relative'}}>
            <div style={{position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#185FA5', color: '#E6F1FB', fontSize: '11px', fontWeight: 500, padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap'}}>Most popular</div>
            <div style={{fontSize: '14px', fontWeight: 500, color: '#185FA5', marginBottom: '4px'}}>Pro</div>
            <div style={{marginBottom: '8px'}}>
              <span style={{fontSize: '36px', fontWeight: 500, color: '#042C53'}}>${proPrice}</span>
              <span style={{fontSize: '13px', color: '#888780'}}>/mo</span>
            </div>
            <p style={{fontSize: '13px', color: '#888780', marginBottom: '24px', lineHeight: 1.5}}>For serious founders ready to find their partner.</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px'}}>
              {[
                {text: 'Unlimited match cards daily', new: false},
                {text: 'Priority placement in match feeds', new: false},
                {text: 'Advanced filters — role, domain, location', new: false},
                {text: 'Full match analytics and score breakdown', new: false},
                {text: 'Profile boost — appear higher in results', new: false},
                {text: '60 second video profile', new: true},
                {text: 'Everything in Free', new: false},
              ].map(f => (
                <div key={f.text} style={{display: 'flex', gap: '8px', alignItems: 'flex-start'}}>
                  <div style={{width: '16px', height: '16px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px'}}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{fontSize: '13px', color: '#5F5E5A'}}>{f.text}</span>
                  {f.new && <span style={{fontSize: '10px', background: '#E6F1FB', color: '#185FA5', padding: '1px 6px', borderRadius: '20px', fontWeight: 500, flexShrink: 0}}>New</span>}
                </div>
              ))}
            </div>

            <a href="/signup" style={{display: 'block', textAlign: 'center', padding: '12px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '13px', fontWeight: 500, textDecoration: 'none'}}>
              Start Pro free for 7 days
            </a>
          </div>

          {/* Investor */}
          <div style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #F5C4B3', padding: '28px'}}>
            <div style={{fontSize: '14px', fontWeight: 500, color: '#993C1D', marginBottom: '4px'}}>Investor</div>
            <div style={{marginBottom: '8px'}}>
              <span style={{fontSize: '36px', fontWeight: 500, color: '#042C53'}}>${investorPrice}</span>
              <span style={{fontSize: '13px', color: '#888780'}}>/mo</span>
            </div>
            <p style={{fontSize: '13px', color: '#888780', marginBottom: '24px', lineHeight: 1.5}}>For angels and VCs looking for deal flow.</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px'}}>
              {[
                {text: 'Everything in Pro', new: false},
                {text: 'Verified investor badge on profile', new: false},
                {text: 'See all founders seeking funding', new: false},
                {text: 'Deal flow dashboard', new: true},
                {text: 'Direct outreach to founders', new: true},
                {text: 'Priority support', new: false},
              ].map(f => (
                <div key={f.text} style={{display: 'flex', gap: '8px', alignItems: 'flex-start'}}>
                  <div style={{width: '16px', height: '16px', borderRadius: '50%', background: '#FAECE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px'}}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#993C1D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{fontSize: '13px', color: '#5F5E5A'}}>{f.text}</span>
                  {f.new && <span style={{fontSize: '10px', background: '#FAECE7', color: '#993C1D', padding: '1px 6px', borderRadius: '20px', fontWeight: 500, flexShrink: 0}}>New</span>}
                </div>
              ))}
            </div>

            <a href="/signup" style={{display: 'block', textAlign: 'center', padding: '12px', borderRadius: '8px', border: 'none', background: '#D85A30', color: '#FAECE7', fontSize: '13px', fontWeight: 500, textDecoration: 'none'}}>
              Get Investor access
            </a>
          </div>
        </div>
      </section>

      {/* Founding member banner */}
      <section style={{padding: '0 40px 60px'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto', background: '#042C53', borderRadius: '16px', padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <div style={{fontSize: '16px', fontWeight: 500, color: '#E6F1FB', marginBottom: '6px'}}>Founding member deal</div>
            <div style={{fontSize: '13px', color: '#85B7EB'}}>First 200 people get Pro access free forever. <span style={{color: '#D85A30', fontWeight: 500}}>53 spots remaining.</span></div>
          </div>
          <a href="/signup" style={{padding: '11px 24px', borderRadius: '8px', background: '#D85A30', color: '#FAECE7', fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap'}}>
            Claim my spot →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding: '0 40px 80px'}}>
        <div style={{maxWidth: '680px', margin: '0 auto'}}>
          <h2 style={{fontSize: '24px', fontWeight: 500, color: '#042C53', marginBottom: '28px', textAlign: 'center', letterSpacing: '-0.3px'}}>Common questions</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {[
              {q: 'Can I cancel anytime?', a: 'Yes — cancel any time with no questions asked. You keep access until the end of your billing period.'},
              {q: 'What counts as a successful match?', a: 'A match is when two people both express interest in each other. Chat unlocks automatically when that happens.'},
              {q: 'How does the founding member deal work?', a: 'The first 200 people to sign up get lifetime Pro access completely free. No credit card, no expiry, no catch.'},
              {q: 'Can I upgrade or downgrade later?', a: 'Absolutely. You can upgrade, downgrade or cancel at any time from your account settings.'},
              {q: 'What is the video profile feature?', a: 'Pro members can record a 60 second intro video that appears on their match card. It helps partners get a real sense of who you are before connecting.'},
              {q: 'What is the deal flow dashboard?', a: 'Investor members get a dedicated dashboard showing all founders actively seeking funding, sorted by compatibility score. Think AngelList but smarter.'},
              {q: 'Can investors message founders directly?', a: 'Yes — Investor members can send an intro message to any founder without needing a mutual match first. Founders can accept or decline.'},
            ].map(({q, a}) => (
              <div key={q} style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #E6F1FB', padding: '18px 20px'}}>
                <div style={{fontSize: '14px', fontWeight: 500, color: '#185FA5', marginBottom: '8px'}}>{q}</div>
                <div style={{fontSize: '13px', color: '#5F5E5A', lineHeight: 1.6}}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#042C53', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
            <circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/>
            <ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/>
          </svg>
          <span style={{fontSize: '14px', fontWeight: 500, color: '#E6F1FB', letterSpacing: '-0.3px', whiteSpace: 'nowrap'}}>ionic</span>
        </div>
        <div style={{display: 'flex', gap: '24px'}}>
          <a href="/privacy" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Privacy</a>
<a href="/terms" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Terms</a>
<a href="/contact" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Contact</a>
        </div>
      </footer>

    </main>
  )
}