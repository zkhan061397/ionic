export default function Privacy() {
  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fff'}}>
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 40px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content'}}>
          <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/><circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/></svg>
          <span style={{fontSize: '22px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
        </a>
        <a href="/signup" style={{fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', textDecoration: 'none'}}>Join free</a>
      </nav>
      <div style={{maxWidth: '720px', margin: '0 auto', padding: '60px 40px'}}>
        <h1 style={{fontSize: '32px', fontWeight: 500, color: '#042C53', marginBottom: '8px', letterSpacing: '-0.5px'}}>Privacy policy</h1>
        <p style={{fontSize: '13px', color: '#85B7EB', marginBottom: '40px'}}>Last updated April 2, 2026</p>
        {[
          {title: 'Information we collect', body: 'We collect information you provide when creating an account including your name, email address, and profile details such as your role, domain, work style and preferences. We also collect usage data to improve the matching experience.'},
          {title: 'How we use your information', body: 'Your profile information is used exclusively to calculate compatibility scores and surface relevant matches. We do not sell your data to third parties. We may use your email to send product updates and match notifications which you can opt out of at any time.'},
          {title: 'Data storage', body: 'Your data is stored securely using Supabase infrastructure hosted in the United States. We use industry standard encryption for data in transit and at rest.'},
          {title: 'Profile visibility', body: 'Your profile is visible to other registered users of ionic. Your email address is never shown to other users. You can delete your account and all associated data at any time from your profile settings.'},
          {title: 'Cookies', body: 'We use essential cookies to keep you logged in and maintain your session. We do not use advertising cookies or third party tracking.'},
          {title: 'Contact', body: 'If you have questions about your data or this privacy policy please contact us at ionicmatch@gmail.com'},
        ].map(({title, body}) => (
          <div key={title} style={{marginBottom: '32px'}}>
            <h2 style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '10px'}}>{title}</h2>
            <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.8, margin: 0}}>{body}</p>
          </div>
        ))}
      </div>
      <footer style={{background: '#042C53', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content'}}>
          <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/><circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/></svg>
          <span style={{fontSize: '14px', fontWeight: 500, color: '#E6F1FB', letterSpacing: '-0.3px', whiteSpace: 'nowrap'}}>ionic</span>
        </a>
        <div style={{display: 'flex', gap: '24px'}}>
          <a href="/privacy" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Privacy</a>
          <a href="/terms" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Terms</a>
          <a href="/contact" style={{fontSize: '13px', color: '#85B7EB', textDecoration: 'none'}}>Contact</a>
        </div>
      </footer>
    </main>
  )
}