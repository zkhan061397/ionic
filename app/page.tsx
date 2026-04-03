export default function Home() {
  return (
    <main style={{fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0}}>

      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 40px', height: '56px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center'}}>
  <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content'}}>
    <svg width="28" height="28" viewBox="0 0 24 24">
      <circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/>
      <circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/>
    </svg>
    <span style={{fontSize: '22px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
  </a>
  <div style={{display: 'flex', gap: '32px', alignItems: 'center'}}>
    <a href="/how" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>How it works</a>
    <a href="/pricing" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Pricing</a>
    <a href="/login" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Log in</a>
  </div>
  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <a href="/signup" style={{fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', textDecoration: 'none'}}>
  Join free
</a>
  </div>
</nav>

<section style={{background: '#E6F1FB', padding: '56px 40px 52px', textAlign: 'center'}}>
      
        <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', border: '0.5px solid #B5D4F4', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#185FA5', marginBottom: '24px'}}>
          <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#D85A30', display: 'inline-block'}}></span>
          147 of 200 founding spots left
        </div>
        <h1 style={{fontSize: '48px', fontWeight: 500, color: '#042C53', lineHeight: 1.15, letterSpacing: '-1px', margin: '0 auto 16px', maxWidth: '640px'}}>
  Find the business partner you&apos;ve been looking for
</h1>
        <p style={{fontSize: '16px', color: '#185FA5', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: '480px'}}>
          Match with co-founders, operators and investors based on complementary skills, shared vision and work style.
        </p>
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '48px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '20px', padding: '6px 16px', width: 'fit-content', margin: '16px auto 0'}}>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
  <span style={{fontSize: '12px', color: '#185FA5', fontWeight: 500}}>iOS & Android app coming soon</span>
</div>
        </div>
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <div style={{background: 'rgba(255,255,255,0.45)', borderRadius: '10px', border: 'none', padding: '12px 24px', textAlign: 'center'}}>
  <div style={{fontSize: '22px', fontWeight: 500, color: '#042C53'}}>200</div>
  <div style={{fontSize: '12px', color: '#185FA5'}}>founding spots</div>
</div>
<div style={{background: 'rgba(255,255,255,0.45)', borderRadius: '10px', border: 'none', padding: '12px 24px', textAlign: 'center'}}>
  <div style={{fontSize: '22px', fontWeight: 500, color: '#042C53'}}>4 min</div>
  <div style={{fontSize: '12px', color: '#185FA5'}}>to first match</div>
</div>
<div style={{background: 'rgba(255,255,255,0.45)', borderRadius: '10px', border: 'none', padding: '12px 24px', textAlign: 'center'}}>
  <div style={{fontSize: '22px', fontWeight: 500, color: '#042C53'}}>Free</div>
  <div style={{fontSize: '12px', color: '#185FA5'}}>forever for founders</div>
</div>
        </div>
      </section>

{/* App preview */}
<section style={{background: '#fff', padding: '60px 40px'}}>
  <div style={{maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start'}}>
    <div>
      <div style={{fontSize: '11px', color: '#D85A30', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginBottom: '10px'}}>See it in action</div>
      <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px', marginBottom: '12px', lineHeight: 1.3}}>Your match feed, built around you</h2>
      <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7, marginBottom: '24px'}}>Every card shows exactly why you matched — complementary skills, shared vision, and work style compatibility all in one view.</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {[
          {label: 'Compatibility score', desc: 'See your match percentage at a glance'},
          {label: 'Skills breakdown', desc: 'What they bring vs what you need'},
          {label: 'One-tap connect', desc: 'Express interest in seconds'},
        ].map(({label, desc}) => (
          <div key={label} style={{display: 'flex', alignItems: 'flex-start', gap: '10px'}}>
            <div style={{width: '20px', height: '20px', borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px'}}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#185FA5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{fontSize: '13px', fontWeight: 500, color: '#042C53'}}>{label}</div>
              <div style={{fontSize: '12px', color: '#85B7EB'}}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <a href="/signup" style={{display: 'inline-block', marginTop: '28px', fontSize: '13px', fontWeight: 500, padding: '11px 24px', borderRadius: '10px', background: '#185FA5', color: '#E6F1FB', textDecoration: 'none'}}>
        See your matches →
      </a>
    </div>

    {/* Mock app card */}
    <div style={{background: '#E6F1FB', borderRadius: '20px', padding: '16px', border: '0.5px solid #B5D4F4'}}>
  <div style={{background: '#fff', borderRadius: '14px', border: '0.5px solid #E6F1FB', overflow: 'hidden'}}>
    <div style={{background: '#E6F1FB', padding: '20px 18px 14px', position: 'relative'}}>
      <div style={{position: 'absolute', top: '14px', right: '14px', background: '#EAF3DE', color: '#3B6D11', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid #C0DD97'}}>92% match</div>
      <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 500, marginBottom: '10px'}}>JK</div>
          <div style={{fontSize: '15px', fontWeight: 500, color: '#042C53'}}>Jamie K.</div>
          <div style={{fontSize: '12px', color: '#185FA5', marginTop: '2px'}}>Operator · B2B SaaS · NYC · Full-time</div>
        </div>
        <div style={{padding: '16px 18px'}}>
          <p style={{fontSize: '12px', color: '#5F5E5A', lineHeight: 1.6, marginBottom: '14px', fontStyle: 'italic'}}>"Built two 0→1 sales orgs. Looking for a technical co-founder to bring a B2B SaaS idea to life."</p>
          <div style={{marginBottom: '10px'}}>
            <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px'}}>Brings</div>
            <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
              {['Sales', 'Operations', 'Fundraising'].map(t => <span key={t} style={{fontSize: '11px', padding: '3px 9px', borderRadius: '20px', border: '0.5px solid #E6F1FB', color: '#5F5E5A'}}>{t}</span>)}
            </div>
          </div>
          <div style={{marginBottom: '16px'}}>
            <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px'}}>Looking for</div>
            <div style={{display: 'flex', gap: '5px'}}>
              <span style={{fontSize: '11px', padding: '3px 9px', borderRadius: '20px', border: '0.5px solid #B5D4F4', color: '#185FA5', background: '#E6F1FB'}}>Technical co-founder</span>
            </div>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <button style={{flex: 1, padding: '9px', borderRadius: '8px', border: '0.5px solid #E6F1FB', background: '#fff', color: '#888780', fontSize: '12px', cursor: 'pointer'}}>Pass</button>
            <button style={{flex: 2, padding: '9px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '12px', fontWeight: 500, cursor: 'pointer'}}>Connect →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Social proof bar */}
<section style={{background: '#fff', borderTop: '0.5px solid #E6F1FB', borderBottom: '0.5px solid #E6F1FB', padding: '16px 40px'}}>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap'}}>
    {['Free to get started', 'NYC · LA · London · Remote', 'Find your match in minutes', 'iOS & Android app coming soon'].map(item => (
      <div key={item} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#D85A30', flexShrink: 0}}></div>
        <span style={{fontSize: '13px', color: '#185FA5', fontWeight: 500}}>{item}</span>
      </div>
    ))}
  </div>
</section>

{/* Features section */}
<section style={{background: '#F8FAFC', padding: '48px 40px 32px'}}>
  <div style={{maxWidth: '900px', margin: '0 auto'}}>
    <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.5px'}}>Everything you need to find the right partner</h2>
    <p style={{fontSize: '14px', color: '#185FA5', textAlign: 'center', marginBottom: '40px'}}>Built specifically for founders, operators and investors.</p>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '16px'}}>
      {[
  {
    title: 'Smart matching',
    desc: 'Matched on complementary skills — not similar ones. A builder needs a seller, not another builder.',
    bg: '#E6F1FB', color: '#185FA5',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="10" r="5" stroke="#185FA5" strokeWidth="1.5"/><circle cx="13" cy="10" r="5" stroke="#D85A30" strokeWidth="1.5"/><ellipse cx="10" cy="10" rx="2" ry="4" fill="#185FA5" fillOpacity="0.2"/></svg>
  },
  {
    title: 'Mutual match only',
    desc: 'Chat only unlocks when both people connect. No cold messages, no awkward intros.',
    bg: '#FAECE7', color: '#993C1D',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="6" height="10" rx="2" stroke="#D85A30" strokeWidth="1.5"/><rect x="11" y="5" width="6" height="10" rx="2" stroke="#D85A30" strokeWidth="1.5"/><line x1="9" y1="10" x2="11" y2="10" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    title: 'Work style quiz',
    desc: 'We match on how you work, not just what you do. Async vs sync, risk tolerance, decision pace.',
    bg: '#E6F1FB', color: '#185FA5',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#185FA5" strokeWidth="1.5"/><path d="M10 6V10L13 12" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    title: 'Verified profiles',
    desc: 'LinkedIn sync and portfolio links so you know exactly who you\'re talking to.',
    bg: '#FAECE7', color: '#993C1D',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.5 7H18L13.5 10.5L15.5 16L10 12.5L4.5 16L6.5 10.5L2 7H7.5L10 2Z" stroke="#D85A30" strokeWidth="1.5" strokeLinejoin="round"/></svg>
  },
  {
    title: 'Starter prompts',
    desc: 'Every chat opens with a question designed to spark a real conversation, not a cold hey.',
    bg: '#E6F1FB', color: '#185FA5',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5C3 3.9 3.9 3 5 3H15C16.1 3 17 3.9 17 5V12C17 13.1 16.1 14 15 14H7L3 17V5Z" stroke="#185FA5" strokeWidth="1.5" strokeLinejoin="round"/></svg>
  },
  {
    title: 'Match analytics',
    desc: 'See your compatibility breakdown — exactly why you scored high with each match.',
    bg: '#FAECE7', color: '#993C1D',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="12" width="3" height="5" rx="1" fill="#D85A30"/><rect x="8" y="8" width="3" height="9" rx="1" fill="#D85A30"/><rect x="13" y="4" width="3" height="13" rx="1" fill="#D85A30"/></svg>
  },
].map(({icon, title, desc, bg}) => (
  <div key={title} style={{background: '#fff', borderRadius: '14px', border: '0.5px solid #E6F1FB', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
    <div style={{width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {icon}
    </div>
    <div style={{fontSize: '14px', fontWeight: 500, color: '#042C53'}}>{title}</div>
    <div style={{fontSize: '13px', color: '#5F5E5A', lineHeight: 1.6}}>{desc}</div>
  </div>
))}
    </div>
  </div>
</section>

      <section id="how" style={{background: '#fff', padding: '40px 40px 20px'}}>
        <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', textAlign: 'center', marginBottom: '40px', letterSpacing: '-0.5px'}}>How ionic works</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '800px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', padding: '20px 20px', borderRadius: '12px', border: '0.5px solid #E6F1FB'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#E6F1FB', color: '#185FA5', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}>1</div>
            <div style={{fontSize: '14px', fontWeight: 500, color: '#042C53', marginBottom: '8px'}}>Build your profile</div>
            <div style={{fontSize: '13px', color: '#185FA5', lineHeight: 1.6}}>Tell us your skills, what you&apos;re building, and what you&apos;re looking for.</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px 20px', borderRadius: '12px', border: '0.5px solid #E6F1FB'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#E6F1FB', color: '#185FA5', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}>2</div>
            <div style={{fontSize: '14px', fontWeight: 500, color: '#042C53', marginBottom: '8px'}}>Get matched</div>
            <div style={{fontSize: '13px', color: '#185FA5', lineHeight: 1.6}}>We score partners on complementary skills, vision and work style.</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px 20px', borderRadius: '12px', border: '0.5px solid #E6F1FB'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#E6F1FB', color: '#185FA5', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}>3</div>
            <div style={{fontSize: '14px', fontWeight: 500, color: '#042C53', marginBottom: '8px'}}>Start building</div>
            <div style={{fontSize: '13px', color: '#185FA5', lineHeight: 1.6}}>Mutual match unlocks chat. A starter prompt gets the conversation going.</div>
          </div>
        </div>
      </section>

{/* Testimonials */}
<section style={{background: '#fff', padding: '40px 40px 60px'}}>
  <div style={{maxWidth: '900px', margin: '0 auto'}}>
    <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.5px'}}>What founders are saying</h2>
    <p style={{fontSize: '14px', color: '#185FA5', textAlign: 'center', marginBottom: '40px'}}>Real stories from real partnerships.</p>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '16px'}}>
      {[
        {initials: 'JK', name: 'Jamie K.', role: 'Founder · NYC', quote: 'Found my technical co-founder in 3 days. We launched our MVP 6 weeks later. Nothing else comes close to this.', bg: '#E6F1FB', color: '#185FA5'},
        {initials: 'SR', name: 'Sofia R.', role: 'Designer · LA', quote: 'Better matches in one week than 2 years of networking events. The work style matching is what makes it different.', bg: '#FAECE7', color: '#993C1D'},
        {initials: 'MC', name: 'Marcus C.', role: 'Investor · London', quote: 'As an angel I use it to find obsessive founders before anyone else does. The quality of profiles is genuinely impressive.', bg: '#E1F5EE', color: '#085041'},
        {initials: 'AL', name: 'Anika L.', role: 'Engineer · Remote', quote: 'I was skeptical but the complementarity score is real. My match and I are completely different — and that\'s exactly why it works.', bg: '#EEEDFE', color: '#3C3489'},
        {initials: 'DM', name: 'David M.', role: 'Operator · Chicago', quote: 'The starter prompt in chat is genius. Instead of a cold hey we were already talking about the problem on day one.', bg: '#FAEEDA', color: '#633806'},
        {initials: 'TN', name: 'Tara N.', role: 'Founder · NYC', quote: 'Claimed my founding member spot and never looked back. Best decision I made before our seed round.', bg: '#E6F1FB', color: '#185FA5'},
      ].map(({initials, name, role, quote, bg, color}) => (
        <div key={name} style={{background: '#F8FAFC', borderRadius: '14px', border: '0.5px solid #E6F1FB', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{fontSize: '13px', color: '#5F5E5A', lineHeight: 1.7, fontStyle: 'italic', flex: 1}}>
            &ldquo;{quote}&rdquo;
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div style={{width: '36px', height: '36px', borderRadius: '50%', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, flexShrink: 0}}>{initials}</div>
            <div>
              <div style={{fontSize: '13px', fontWeight: 500, color: '#042C53'}}>{name}</div>
              <div style={{fontSize: '11px', color: '#85B7EB'}}>{role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section style={{background: '#185FA5', padding: '60px 40px', textAlign: 'center'}}>
        <h2 style={{fontSize: '28px', fontWeight: 500, color: '#E6F1FB', marginBottom: '8px', letterSpacing: '-0.5px'}}>Claim your founding member spot</h2>
        <p style={{fontSize: '14px', color: '#85B7EB', marginBottom: '24px'}}>First 200 get lifetime Pro — free forever.</p>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <input type="email" placeholder="your@email.com" style={{fontSize: '14px', padding: '11px 16px', borderRadius: '8px', border: '0.5px solid #378ADD', background: '#0C447C', color: '#E6F1FB', width: '240px', outline: 'none'}}/>
          <button style={{fontSize: '14px', fontWeight: 500, padding: '11px 24px', borderRadius: '8px', background: '#D85A30', color: '#FAECE7', border: 'none', cursor: 'pointer'}}>
            Claim my spot
          </button>
        </div>
        <p style={{fontSize: '12px', color: '#85B7EB', marginTop: '12px'}}>Only <span style={{color: '#F0997B', fontWeight: 500}}>53 spots remaining</span> · No credit card needed</p>
      </section>

      <footer style={{background: '#042C53', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
    <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/><circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/></svg>
    <span style={{fontSize: '14px', fontWeight: 500, color: '#E6F1FB', letterSpacing: '-0.3px', whiteSpace: 'nowrap'}}>ionic</span>
  </div>
  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '5px 12px'}}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
      <span style={{fontSize: '12px', color: '#85B7EB'}}>iOS & Android</span>
      <span style={{fontSize: '10px', background: '#D85A30', color: '#FAECE7', padding: '1px 6px', borderRadius: '4px', fontWeight: 500}}>Soon</span>
    </div>
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