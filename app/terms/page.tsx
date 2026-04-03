export default function Terms() {
  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#fff'}}>
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 40px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content'}}>
          <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/><circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/></svg>
          <span style={{fontSize: '18px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
        </a>
      </nav>
      <div style={{maxWidth: '720px', margin: '0 auto', padding: '60px 40px'}}>
        <h1 style={{fontSize: '32px', fontWeight: 500, color: '#042C53', marginBottom: '8px', letterSpacing: '-0.5px'}}>Terms of service</h1>
        <p style={{fontSize: '13px', color: '#85B7EB', marginBottom: '40px'}}>Last updated April 2, 2026</p>
        {[
          {title: 'Acceptance of terms', body: 'By creating an account on ionic you agree to these terms of service. If you do not agree please do not use the platform.'},
          {title: 'Eligibility', body: 'You must be at least 18 years old to use ionic. By using the platform you confirm that you meet this requirement.'},
          {title: 'Your account', body: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information and keep your profile up to date. You may not create multiple accounts or impersonate others.'},
          {title: 'Acceptable use', body: 'You agree not to use ionic for spam, harassment, or any unlawful purpose. You may not scrape or extract data from the platform. All connections made through ionic must be for genuine professional partnership purposes.'},
          {title: 'Intellectual property', body: 'Ionic and its matching engine are the intellectual property of ionic. You retain ownership of content you submit to your profile. By submitting content you grant ionic a license to use it to provide the matching service.'},
          {title: 'Limitation of liability', body: 'Ionic is not responsible for the outcomes of any partnerships formed through the platform. We provide a matching service only and cannot guarantee the quality or suitability of any match.'},
          {title: 'Termination', body: 'We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time.'},
          {title: 'Contact', body: 'For questions about these terms please contact us at legal@ionicapp.co'},
        ].map(({title, body}) => (
          <div key={title} style={{marginBottom: '32px'}}>
            <h2 style={{fontSize: '16px', fontWeight: 500, color: '#042C53', marginBottom: '10px'}}>{title}</h2>
            <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.8}}>{body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}