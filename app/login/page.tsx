'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    window.location.href = '/dashboard'
  }

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#E6F1FB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px'}}>

      {/* Logo */}
      <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px'}}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle cx="10" cy="14" r="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1.8"/>
          <circle cx="18" cy="14" r="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1.8"/>
          <ellipse cx="14" cy="14" rx="3" ry="6" fill="#185FA5" fillOpacity="0.22"/>
        </svg>
        <span style={{fontSize: '20px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.5px'}}>ionic</span>
      </div>

      {/* Card */}
      <div style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #B5D4F4', padding: '40px', width: '100%', maxWidth: '420px'}}>

        <h2 style={{fontSize: '24px', fontWeight: 500, color: '#042C53', marginBottom: '6px', letterSpacing: '-0.3px'}}>Welcome back</h2>
        <p style={{fontSize: '13px', color: '#185FA5', marginBottom: '28px'}}>Log in to find your next business partner.</p>

        {error && (
          <div style={{background: '#FCEBEB', border: '0.5px solid #F09595', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#A32D2D', marginBottom: '16px'}}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{marginBottom: '16px'}}>
          <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500, display: 'block', marginBottom: '6px'}}>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{width: '100%', padding: '11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '14px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}
          />
        </div>

        {/* Password */}
        <div style={{marginBottom: '24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
            <label style={{fontSize: '12px', color: '#042C53', fontWeight: 500}}>Password</label>
            <a href="#" style={{fontSize: '12px', color: '#185FA5', textDecoration: 'none'}}>Forgot password?</a>
          </div>
          <div style={{position: 'relative'}}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{width: '100%', padding: '11px 40px 11px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '14px', color: '#042C53', outline: 'none', boxSizing: 'border-box'}}
            />
            <div onClick={() => setShowPassword(!showPassword)} style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#85B7EB'}}>
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="1.5" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </div>
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{width: '100%', padding: '13px', borderRadius: '8px', background: '#185FA5', color: '#E6F1FB', fontSize: '14px', fontWeight: 500, border: 'none', cursor: 'pointer', marginBottom: '16px', opacity: loading ? 0.7 : 1}}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {/* Divider */}
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <div style={{flex: 1, height: '0.5px', background: '#B5D4F4'}}></div>
          <span style={{fontSize: '12px', color: '#85B7EB'}}>or</span>
          <div style={{flex: 1, height: '0.5px', background: '#B5D4F4'}}></div>
        </div>

        {/* LinkedIn */}
        <button style={{width: '100%', padding: '13px', borderRadius: '8px', background: '#fff', color: '#042C53', fontSize: '14px', fontWeight: 500, border: '0.5px solid #B5D4F4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Continue with LinkedIn
        </button>

      </div>

      <p style={{fontSize: '12px', color: '#185FA5', marginTop: '20px'}}>
        Don&apos;t have an account? <a href="/signup" style={{color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Sign up free</a>
      </p>

    </main>
  )
}