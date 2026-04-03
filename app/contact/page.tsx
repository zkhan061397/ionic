'use client'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC'}}>
      <nav style={{background: '#fff', borderBottom: '0.5px solid #E6F1FB', padding: '0 40px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: 'fit-content'}}>
          <svg width="28" height="28" viewBox="0 0 24 24"><circle cx="9" cy="12" r="7" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.5"/><circle cx="15" cy="12" r="7" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="5" fill="#185FA5" fillOpacity="0.22"/></svg>
          <span style={{fontSize: '22px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
        </a>
        <a href="/signup" style={{fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', textDecoration: 'none'}}>Join free</a>
      </nav>
      <div style={{maxWidth: '560px', margin: '0 auto', padding: '60px 40px'}}>
        <h1 style={{fontSize: '32px', fontWeight: 500, color: '#042C53', marginBottom: '8px', letterSpacing: '-0.5px'}}>Get in touch</h1>
        <p style={{fontSize: '14px', color: '#185FA5', marginBottom: '40px', lineHeight: 1.6}}>Have a question, feedback or partnership inquiry? We read every message.</p>

        {sent ? (
          <div style={{background: '#EAF3DE', border: '0.5px solid #C0DD97', borderRadius: '12px', padding: '24px', textAlign: 'center'}}>
            <div style={{fontSize: '20px', fontWeight: 500, color: '#27500A', marginBottom: '6px'}}>Message sent!</div>
            <div style={{fontSize: '14px', color: '#3B6D11'}}>We&apos;ll get back to you within 24 hours.</div>
          </div>
        ) : (
          <div style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #E6F1FB', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div>
              <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" style={{width: '100%', padding: '11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}/>
            </div>
            <div>
              <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Email</label>
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" type="email" style={{width: '100%', padding: '11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}/>
            </div>
            <div>
              <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="What's on your mind?" rows={5} style={{width: '100%', padding: '11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box'}}/>
            </div>
            <button onClick={() => { if (form.name && form.email && form.message) setSent(true) }} style={{padding: '13px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '14px', fontWeight: 500, cursor: 'pointer'}}>
              Send message →
            </button>
          </div>
        )}

        <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {[
            {label: 'General enquiries', value: 'ionicmatch@gmail.com'},
            {label: 'Privacy & data', value: 'ionicmatch@gmail.com'},
            {label: 'Legal', value: 'ionicmatch@gmail.com'},
          ].map(({label, value}) => (
            <div key={label} style={{display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', borderRadius: '8px', border: '0.5px solid #E6F1FB'}}>
              <span style={{fontSize: '13px', color: '#85B7EB'}}>{label}</span>
              <span style={{fontSize: '13px', color: '#185FA5', fontWeight: 500}}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <footer style={{background: '#042C53', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '60px'}}>
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