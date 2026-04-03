'use client'

export default function How() {
  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fff'}}>

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
          <a href="/how" style={{fontSize: '13px', color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>How it works</a>
          <a href="/pricing" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Pricing</a>
          <a href="/login" style={{fontSize: '13px', color: '#185FA5', textDecoration: 'none'}}>Log in</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <a href="/signup" style={{fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', textDecoration: 'none'}}>
            Join free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background: '#E6F1FB', padding: '80px 40px', textAlign: 'center'}}>
        <div style={{maxWidth: '640px', margin: '0 auto'}}>
          <div style={{fontSize: '12px', color: '#185FA5', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px'}}>How it works</div>
          <h1 style={{fontSize: '44px', fontWeight: 500, color: '#042C53', marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.1}}>Finding the right partner shouldn&apos;t be left to luck</h1>
          <p style={{fontSize: '16px', color: '#185FA5', lineHeight: 1.7, marginBottom: '28px'}}>Ionic uses a smart matching engine to connect you with people who complement — not copy — your skills. Here&apos;s exactly how it works.</p>
          <a href="/signup" style={{display: 'inline-block', padding: '13px 28px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', fontSize: '14px', fontWeight: 500, textDecoration: 'none'}}>Get matched free →</a>
        </div>
      </section>

      {/* Steps */}
      <section style={{padding: '80px 40px', background: '#fff'}}>
        <div style={{maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px'}}>

          {/* Step 1 */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '11px', color: '#D85A30', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px'}}>Step 01</div>
              <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', marginBottom: '12px', letterSpacing: '-0.5px'}}>Build your profile</h2>
              <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7, marginBottom: '20px'}}>Tell us who you are, what you&apos;re building, and what you&apos;re looking for. Takes about 4 minutes. Every answer feeds directly into your match score.</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {[
                  {label: 'Your role', desc: 'Builder, Seller, Operator, Visionary, Investor or Designer'},
                  {label: 'What you\'re building', desc: 'Domain, stage and ambition level'},
                  {label: 'How you work', desc: 'Async vs sync, pace, risk tolerance, hours'},
                  {label: 'Partnership style', desc: 'Motivation, conflict handling, decision making'},
                  {label: 'Deal-breakers', desc: 'Commitment, location, equity, funding approach'},
                ].map(({label, desc}) => (
                  <div key={label} style={{display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                    <div style={{width: '18px', height: '18px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <span style={{fontSize: '13px', fontWeight: 500, color: '#042C53'}}>{label}</span>
                      <span style={{fontSize: '13px', color: '#888780'}}> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background: '#E6F1FB', borderRadius: '16px', padding: '24px'}}>
              <div style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #B5D4F4', padding: '20px'}}>
                <div style={{fontSize: '11px', color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px'}}>Step 1 of 6</div>
                <div style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '14px'}}>Who are you?</div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}>
                  {['Builder / Engineer', 'Seller / Growth', 'Operator / PM', 'Visionary / Founder', 'Investor', 'Creative / Designer'].map((role, i) => (
                    <div key={role} style={{padding: '6px 12px', borderRadius: '20px', border: `0.5px solid ${i === 3 ? '#185FA5' : '#B5D4F4'}`, background: i === 3 ? '#E6F1FB' : '#fff', color: i === 3 ? '#185FA5' : '#888780', fontSize: '12px', fontWeight: i === 3 ? 500 : 400}}>
                      {role}
                    </div>
                  ))}
                </div>
                <div style={{marginTop: '14px', height: '4px', background: '#E6F1FB', borderRadius: '2px'}}>
                  <div style={{height: '100%', width: '16%', background: '#185FA5', borderRadius: '2px'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div style={{background: '#FAECE7', borderRadius: '16px', padding: '24px'}}>
              <div style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #F5C4B3', padding: '20px'}}>
  <div style={{fontSize: '13px', fontWeight: 500, color: '#042C53', marginBottom: '4px'}}>Built on what actually matters</div>
  <div style={{fontSize: '12px', color: '#888780', marginBottom: '16px'}}>Most platforms match on job title. We go deeper.</div>
  {[
    {label: 'Skills that fill each other\'s gaps', icon: '⚡', color: '#E6F1FB', text: '#0C447C'},
    {label: 'Shared ambition and vision', icon: '🎯', color: '#EAF3DE', text: '#27500A'},
    {label: 'Compatible partnership values', icon: '🤝', color: '#EAF3DE', text: '#27500A'},
    {label: 'Matching work style and pace', icon: '⚙️', color: '#FAEEDA', text: '#633806'},
    {label: 'Relevant experience level', icon: '📈', color: '#EEEDFE', text: '#3C3489'},
    {label: 'Same level of commitment', icon: '🔒', color: '#FAECE7', text: '#712B13'},
  ].map(({label, icon, color, text}) => (
    <div key={label} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', background: color, marginBottom: '6px'}}>
      <span style={{fontSize: '14px'}}>{icon}</span>
      <span style={{fontSize: '12px', fontWeight: 500, color: text}}>{label}</span>
    </div>
  ))}
</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: '#D85A30', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px'}}>Step 02</div>
              <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', marginBottom: '12px', letterSpacing: '-0.5px'}}>The engine scores every match</h2>
              <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7, marginBottom: '20px'}}>Our matching engine runs your profile against every other user across 6 weighted signals. The result is a compatibility score from 0 to 100 — the higher the score, the stronger the pairing.</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {[
                  {label: 'Skill complementarity', desc: 'Do your skills fill each other\'s gaps?', color: '#E6F1FB', text: '#0C447C'},
                  {label: 'Ambition alignment', desc: 'Are you building towards the same goal?', color: '#EAF3DE', text: '#27500A'},
                  {label: 'Partnership style', desc: 'Motivation, conflict and decision making', color: '#EAF3DE', text: '#27500A'},
                  {label: 'Work style fit', desc: 'Async vs sync, pace, hours', color: '#FAEEDA', text: '#633806'},
                  {label: 'Experience match', desc: 'Background and risk tolerance', color: '#EEEDFE', text: '#3C3489'},
                  {label: 'Commitment match', desc: 'Full-time, part-time, funding approach', color: '#FAECE7', text: '#712B13'},
                ].map(({label, desc, color, text}) => (
                  <div key={label} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <div style={{padding: '3px 8px', borderRadius: '6px', background: color, color: text, fontSize: '11px', fontWeight: 500, flexShrink: 0}}>{label}</div>
                    <div style={{fontSize: '12px', color: '#888780'}}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '11px', color: '#D85A30', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px'}}>Step 03</div>
              <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', marginBottom: '12px', letterSpacing: '-0.5px'}}>Browse your match feed</h2>
              <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7, marginBottom: '20px'}}>Your feed shows the highest-scoring matches first. Every card tells you exactly why you matched — shared values, complementary skills, compatible work styles. Pass or connect in one tap.</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {[
                  'Sorted by compatibility score — best matches first',
                  'See shared attributes highlighted in green',
                  'Understand exactly why you matched signal by signal',
                  'See what they bring to the table',
                  'Drag to swipe or use Pass and Connect buttons',
                ].map(item => (
                  <div key={item} style={{display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                    <div style={{width: '18px', height: '18px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontSize: '13px', color: '#5F5E5A'}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background: '#E6F1FB', borderRadius: '16px', padding: '20px'}}>
              <div style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #B5D4F4', overflow: 'hidden'}}>
                <div style={{background: '#E6F1FB', padding: '16px', position: 'relative'}}>
                  <div style={{position: 'absolute', top: '12px', right: '12px', background: '#EAF3DE', color: '#27500A', fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', border: '0.5px solid #C0DD97'}}>92% match</div>
                  <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 500, marginBottom: '8px'}}>JK</div>
                  <div style={{fontSize: '15px', fontWeight: 500, color: '#042C53'}}>Jamie K.</div>
                  <div style={{fontSize: '11px', color: '#185FA5'}}>Operator · B2B SaaS · Full-time</div>
                </div>
                <div style={{padding: '14px 16px'}}>
                  <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px'}}>You both</div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px'}}>
                    {['Billion dollar vision', 'Async first', 'Move fast', 'Full-time'].map(tag => (
                      <span key={tag} style={{fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97'}}>{tag}</span>
                    ))}
                  </div>
                  <div style={{fontSize: '10px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px'}}>Why you matched</div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px'}}>
                    {['Skills complement perfectly', 'Ambition fully aligned', 'Work style compatible'].map(s => (
                      <div key={s} style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <div style={{width: '16px', height: '16px', borderRadius: '5px', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4L3 6L7 2" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span style={{fontSize: '11px', color: '#042C53'}}>{s}</span>
                        <span style={{fontSize: '10px', padding: '1px 6px', borderRadius: '20px', background: '#EAF3DE', color: '#27500A', marginLeft: 'auto'}}>Aligned</span>
                      </div>
                    ))}
                  </div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button style={{flex: 1, padding: '8px', borderRadius: '8px', border: '0.5px solid #E6F1FB', background: '#fff', color: '#888780', fontSize: '12px', cursor: 'pointer'}}>Pass</button>
                    <button style={{flex: 2, padding: '8px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '12px', fontWeight: 500, cursor: 'pointer'}}>Connect →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div style={{background: '#FAECE7', borderRadius: '16px', padding: '24px'}}>
              <div style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #F5C4B3', padding: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
                  <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 500, border: '3px solid #fff', zIndex: 1}}>Z</div>
                  <div style={{width: '24px', height: '4px', background: '#D85A30', margin: '0 -4px'}}></div>
                  <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#E6F1FB', color: '#185FA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 500, border: '3px solid #fff'}}>JK</div>
                </div>
                <div style={{textAlign: 'center', marginBottom: '16px'}}>
                  <div style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '4px'}}>It&apos;s a match!</div>
                  <div style={{fontSize: '12px', color: '#185FA5'}}>You and Jamie both connected.</div>
                </div>
                <div style={{background: '#F8FAFC', borderRadius: '10px', padding: '12px', marginBottom: '12px', border: '0.5px solid #E6F1FB'}}>
                  <div style={{fontSize: '11px', fontWeight: 500, color: '#042C53', marginBottom: '4px'}}>Starter prompt</div>
                  <div style={{fontSize: '12px', color: '#185FA5'}}>What problem are you most obsessed with solving right now?</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <div style={{alignSelf: 'flex-end', background: '#185FA5', color: '#E6F1FB', fontSize: '12px', padding: '8px 12px', borderRadius: '12px 12px 2px 12px', maxWidth: '80%'}}>
                    Building a B2B SaaS matching platform. You?
                  </div>
                  <div style={{alignSelf: 'flex-start', background: '#fff', color: '#042C53', fontSize: '12px', padding: '8px 12px', borderRadius: '12px 12px 12px 2px', border: '0.5px solid #E6F1FB', maxWidth: '80%'}}>
                    Same space! I&apos;ve been thinking about this for years.
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: '#D85A30', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px'}}>Step 04</div>
              <h2 style={{fontSize: '28px', fontWeight: 500, color: '#042C53', marginBottom: '12px', letterSpacing: '-0.5px'}}>Mutual match unlocks chat</h2>
              <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7, marginBottom: '20px'}}>When two people both connect with each other, chat unlocks automatically. No cold messages, no awkward intros — just two people who already know they&apos;re interested.</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {[
                  'Chat only opens on mutual interest — no spam',
                  'A starter prompt kicks off every conversation',
                  'Real time messaging built for founders',
                  'No cold outreach — both sides opted in',
                ].map(item => (
                  <div key={item} style={{display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                    <div style={{width: '18px', height: '18px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontSize: '13px', color: '#5F5E5A'}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6 Signals */}
      <section style={{background: '#F8FAFC', padding: '80px 40px'}}>
        <div style={{maxWidth: '900px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <div style={{fontSize: '11px', color: '#D85A30', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px'}}>The matching engine</div>
            <h2 style={{fontSize: '32px', fontWeight: 500, color: '#042C53', marginBottom: '12px', letterSpacing: '-0.5px'}}>What we actually measure</h2>
            <p style={{fontSize: '15px', color: '#185FA5', maxWidth: '560px', margin: '0 auto'}}>Every signal is weighted based on what actually kills partnerships in the real world.</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            {[
              {label: 'Skill complementarity', desc: 'We match you with people who fill your gaps — not clone your strengths. A Builder needs a Seller. A Founder needs an Operator.', color: '#E6F1FB', text: '#0C447C', border: '#B5D4F4'},
              {label: 'Ambition alignment', desc: 'Misaligned ambition kills more partnerships than anything else. Are you both swinging for a billion or building a lifestyle business?', color: '#EAF3DE', text: '#27500A', border: '#C0DD97'},
              {label: 'Partnership style', desc: 'How you handle conflict, what motivates you, and how you make big decisions. These determine if you can actually work together long term.', color: '#EAF3DE', text: '#27500A', border: '#C0DD97'},
              {label: 'Work style fit', desc: 'Async vs sync, fast vs measured, all hours vs 9-5. Compatible working styles reduce friction before it starts.', color: '#FAEEDA', text: '#633806', border: '#FAC775'},
              {label: 'Experience & background', desc: 'Have you built before? What\'s your risk tolerance? Shared experience level reduces knowledge gaps and builds mutual respect.', color: '#EEEDFE', text: '#3C3489', border: '#CECBF6'},
              {label: 'Commitment match', desc: 'Full-time vs side project is one of the biggest sources of resentment in partnerships. We filter this before you even see a match.', color: '#FAECE7', text: '#712B13', border: '#F5C4B3'},
            ].map(({label, desc, color, text, border}) => (
              <div key={label} style={{background: color, borderRadius: '14px', padding: '20px', border: `0.5px solid ${border}`}}>
                <div style={{fontSize: '13px', fontWeight: 500, color: text, marginBottom: '8px'}}>{label}</div>
                <p style={{fontSize: '13px', color: text, lineHeight: 1.6, opacity: 0.8, margin: 0}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background: '#185FA5', padding: '80px 40px', textAlign: 'center'}}>
        <div style={{maxWidth: '560px', margin: '0 auto'}}>
          <h2 style={{fontSize: '36px', fontWeight: 500, color: '#E6F1FB', marginBottom: '12px', letterSpacing: '-0.5px'}}>Ready to find your match?</h2>
          <p style={{fontSize: '15px', color: '#85B7EB', marginBottom: '28px', lineHeight: 1.6}}>Join free. First 200 members get Pro for life.</p>
          <a href="/signup" style={{display: 'inline-block', padding: '14px 32px', borderRadius: '10px', background: '#D85A30', color: '#FAECE7', fontSize: '15px', fontWeight: 500, textDecoration: 'none'}}>
            Get matched free →
          </a>
          <div style={{fontSize: '13px', color: '#85B7EB', marginTop: '14px'}}>No credit card needed · Takes 4 minutes</div>
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
          <a href="#" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Privacy</a>
          <a href="#" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Terms</a>
          <a href="#" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Contact</a>
        </div>
      </footer>

    </main>
  )
}