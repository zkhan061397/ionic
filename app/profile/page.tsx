'use client'
import { useState, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [photoModal, setPhotoModal] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [croppedPixels, setCroppedPixels] = useState<{x: number; y: number; width: number; height: number} | null>(null)

  const [profile, setProfile] = useState({
    name: 'Zarak',
    photo: null as string | null,
    video: null as string | null,
    videoFile: null as File | null,
    role: 'Visionary / Founder',
    domain: 'B2B SaaS',
    location: 'NYC',
    commitment: 'Full-time',
    bio: 'Building the platform I wish existed when I was looking for a business partner.',
    brings: [] as string[],
    wants: [] as string[],
    comms: 'Async',
    pace: 'Move fast',
    risk: 'High',
    equity: 'Flexible',
  })

  const [draft, setDraft] = useState(profile)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(prev => ({...prev, ...data}))
        setDraft(prev => ({...prev, ...data}))
      }
      setProfileLoaded(true)
    }
    loadProfile()
  }, [])

  const save = async () => {
    setProfile({...draft})
    setEditing(false)

    if (draft.videoFile) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const filePath = `${user.id}/intro.mp4`
        const { error } = await supabase.storage
          .from('avatars')
          .upload(filePath, draft.videoFile, { upsert: true, contentType: 'video/mp4' })
        if (error) { console.error('Video upload error:', error); return }
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
        await supabase.from('profiles').update({ video: publicUrl }).eq('id', user.id)
        setProfile(prev => ({...prev, video: publicUrl, videoFile: null}))
      } catch (err) {
        console.error('Video upload failed:', err)
      }
    }
  }

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F8FAFC'}}>

      {/* Photo crop modal */}
      {photoModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '480px', padding: '0 16px'}}>
            <span style={{fontSize: '16px', fontWeight: 500, color: '#fff'}}>Edit photo</span>
            <button onClick={() => { setPhotoModal(null); setZoom(1); setPosition({x:0,y:0}) }} style={{background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer'}}>✕</button>
          </div>
          <div style={{position: 'relative', width: '480px', height: '480px'}}>
            <Cropper
              image={photoModal}
              crop={position}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setPosition}
              onZoomChange={setZoom}
              onCropComplete={(_: unknown, croppedPixels: unknown) => setCroppedPixels(croppedPixels as {x: number; y: number; width: number; height: number})}
            />
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '8px 20px'}}>
            <button onClick={() => setZoom(z => Math.max(1, Math.round((z - 0.1) * 10) / 10))} style={{background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer'}}>−</button>
            <input type="range" min="10" max="30" value={zoom * 10} step="1" onChange={e => setZoom(Number(e.target.value) / 10)} style={{width: '160px', accentColor: '#185FA5'}}/>
            <button onClick={() => setZoom(z => Math.min(3, Math.round((z + 0.1) * 10) / 10))} style={{background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer'}}>+</button>
          </div>
          <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)'}}>Drag to reposition · Slider to zoom</div>
          <div style={{display: 'flex', gap: '10px'}}>
            <button onClick={() => { setPhotoModal(null); setZoom(1); setPosition({x:0,y:0}) }} style={{padding: '10px 24px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontSize: '13px', cursor: 'pointer'}}>
              Cancel
            </button>
            <button onClick={async () => {
              if (!croppedPixels || !photoModal) return
              const img = new Image()
              img.src = photoModal
              await new Promise(resolve => { img.onload = resolve })
              const scaleX = img.naturalWidth / img.width
              const scaleY = img.naturalHeight / img.height
              const outputSize = Math.max(img.naturalWidth, img.naturalHeight, 1200)
              const canvas = document.createElement('canvas')
              canvas.width = outputSize
              canvas.height = outputSize
              const ctx = canvas.getContext('2d')
              if (!ctx) return
              ctx.imageSmoothingEnabled = true
              ctx.imageSmoothingQuality = 'high'
              ctx.drawImage(img, croppedPixels.x * scaleX, croppedPixels.y * scaleY, croppedPixels.width * scaleX, croppedPixels.height * scaleY, 0, 0, outputSize, outputSize)
              const cropped = canvas.toDataURL('image/png')
              setDraft(prev => ({...prev, photo: cropped}))
              setPhotoModal(null)
              setZoom(1)
              setPosition({x: 0, y: 0})
              try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return
                const blob = await (await fetch(cropped)).blob()
                const filePath = `${user.id}/avatar.png`
                await supabase.storage.from('avatars').upload(filePath, blob, { upsert: true, contentType: 'image/png' })
                const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
                await supabase.from('profiles').update({ photo: publicUrl }).eq('id', user.id)
              } catch (err) {
                console.error('Photo upload failed:', err)
              }
            }} style={{padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>
              Apply photo
            </button>
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
<a href="/dealflow" style={{fontSize: '13px', color: '#D85A30', fontWeight: 500, textDecoration: 'none'}}>Deal Flow</a>
<a href="/profile" style={{fontSize: '13px', color: '#042C53', fontWeight: 500, textDecoration: 'none'}}>Profile</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          {!profileLoaded ? (
            <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#E6F1FB'}}></div>
          ) : profile.photo ? (
            <img src={profile.photo} alt={profile.name} style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover'}}/>
          ) : (
            <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500}}>{profile.name.charAt(0)}</div>
          )}
        </div>
      </nav>

      <div style={{maxWidth: '720px', margin: '0 auto', padding: '40px 20px'}}>

        {/* Header */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px'}}>
          <h1 style={{fontSize: '24px', fontWeight: 500, color: '#042C53', letterSpacing: '-0.3px'}}>Your profile</h1>
          {editing ? (
            <div style={{display: 'flex', gap: '8px'}}>
              <button onClick={() => { setEditing(false); setDraft(profile) }} style={{padding: '8px 18px', borderRadius: '8px', border: '0.5px solid #B5D4F4', background: '#fff', color: '#185FA5', fontSize: '13px', cursor: 'pointer'}}>Cancel</button>
              <button onClick={save} style={{padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#E6F1FB', fontSize: '13px', fontWeight: 500, cursor: 'pointer'}}>Save changes</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} style={{padding: '8px 18px', borderRadius: '8px', border: '0.5px solid #B5D4F4', background: '#fff', color: '#185FA5', fontSize: '13px', cursor: 'pointer'}}>Edit profile</button>
          )}
        </div>

        {/* Profile card */}
        <div style={{background: '#fff', borderRadius: '16px', border: '0.5px solid #E6F1FB', overflow: 'hidden', marginBottom: '16px'}}>

          {/* Top banner */}
          <div style={{background: '#E6F1FB', padding: '28px', display: 'flex', alignItems: 'center', gap: '20px'}}>
            <div style={{position: 'relative', flexShrink: 0}}>
              {!profileLoaded ? (
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#E6F1FB'}}></div>
              ) : (editing ? draft.photo : profile.photo) ? (
                <img src={(editing ? draft.photo : profile.photo)!} alt={profile.name} style={{width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover'}}/>
              ) : (
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: '#185FA5', color: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 500}}>
                  {profile.name.charAt(0)}
                </div>
              )}
              {editing && (
                <label style={{position: 'absolute', bottom: 0, right: 0, width: '22px', height: '22px', borderRadius: '50%', background: '#185FA5', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                  <input type="file" accept="image/*" style={{display: 'none'}} onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setPhotoModal(reader.result as string)
                    reader.readAsDataURL(file)
                  }}/>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2V8M2 5H8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </label>
              )}
            </div>
            <div style={{flex: 1}}>
              {editing ? (
                <input value={draft.name} onChange={e => setDraft({...draft, name: e.target.value})} style={{fontSize: '20px', fontWeight: 500, color: '#042C53', border: '0.5px solid #B5D4F4', borderRadius: '8px', padding: '4px 10px', marginBottom: '6px', display: 'block', width: '100%', outline: 'none'}}/>
              ) : (
                <div style={{fontSize: '20px', fontWeight: 500, color: '#042C53', marginBottom: '4px'}}>{profile.name}</div>
              )}
              <div style={{fontSize: '13px', color: '#185FA5'}}>{profile.role} · {profile.domain} · {profile.location}</div>
            </div>
            <div style={{background: '#EAF3DE', color: '#3B6D11', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', border: '0.5px solid #C0DD97', flexShrink: 0}}>
              Founding member
            </div>
          </div>

          {/* Body */}
          <div style={{padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

            {/* Bio */}
            <div>
              <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Bio</div>
              {editing ? (
                <textarea value={draft.bio || ''} onChange={e => setDraft({...draft, bio: e.target.value})} rows={3} style={{width: '100%', padding: '10px 14px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box'}}/>
              ) : (
                <p style={{fontSize: '14px', color: '#5F5E5A', lineHeight: 1.7, margin: 0, fontStyle: 'italic'}}>"{profile.bio}"</p>
              )}
            </div>

            {/* Role + Domain */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div>
                <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Role</div>
                {editing ? (
                  <select value={draft.role} onChange={e => setDraft({...draft, role: e.target.value})} style={{width: '100%', padding: '9px 12px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none'}}>
                    {['Builder / Engineer', 'Seller / Growth', 'Operator / PM', 'Visionary / Founder', 'Investor', 'Creative / Designer'].map(r => <option key={r}>{r}</option>)}
                  </select>
                ) : (
                  <div style={{fontSize: '13px', color: '#042C53', fontWeight: 500}}>{profile.role}</div>
                )}
              </div>
              <div>
                <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Domain</div>
                {editing ? (
                  <select value={draft.domain} onChange={e => setDraft({...draft, domain: e.target.value})} style={{width: '100%', padding: '9px 12px', borderRadius: '8px', border: '0.5px solid #B5D4F4', fontSize: '13px', color: '#042C53', outline: 'none'}}>
                    {['B2B SaaS', 'Consumer App', 'Marketplace', 'AI / ML', 'Fintech', 'Health Tech', 'E-commerce', 'Web3', 'Other'].map(d => <option key={d}>{d}</option>)}
                  </select>
                ) : (
                  <div style={{fontSize: '13px', color: '#042C53', fontWeight: 500}}>{profile.domain}</div>
                )}
              </div>
            </div>

            {/* Brings */}
            <div>
              <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Brings to the table</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                {(profile.brings || []).map(tag => (
                  <span key={tag} style={{fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '0.5px solid #E6F1FB', color: '#5F5E5A', background: '#F8FAFC'}}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Wants */}
            <div>
              <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Looking for</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                {(profile.wants || []).map(tag => (
                  <span key={tag} style={{fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '0.5px solid #B5D4F4', color: '#185FA5', background: '#E6F1FB'}}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Video profile */}
            <div>
              <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px'}}>Video intro</div>
              {(editing ? draft.video : profile.video) ? (
                <div style={{position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#000', aspectRatio: '16/9'}}>
                  <video src={(editing ? draft.video : profile.video)!} controls style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                  {editing && (
                    <button onClick={() => setDraft({...draft, video: null, videoFile: null})} style={{position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer'}}>Remove</button>
                  )}
                </div>
              ) : (
                <div style={{borderRadius: '12px', border: '0.5px dashed #B5D4F4', background: '#F8FAFC', padding: '28px', textAlign: 'center'}}>
                  {editing ? (
                    <label style={{cursor: 'pointer'}}>
                      <input type="file" accept="video/*" style={{display: 'none'}} onChange={e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        if (file.size > 100 * 1024 * 1024) { alert('Video must be under 100MB'); return }
                        const url = URL.createObjectURL(file)
                        setDraft({...draft, video: url, videoFile: file})
                      }}/>
                      <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                      </div>
                      <div style={{fontSize: '13px', fontWeight: 500, color: '#185FA5', marginBottom: '4px'}}>Upload your 60 second intro</div>
                      <div style={{fontSize: '12px', color: '#85B7EB'}}>MP4, MOV up to 100MB</div>
                    </label>
                  ) : (
                    <div>
                      <div style={{fontSize: '13px', color: '#85B7EB', marginBottom: '4px'}}>No video yet</div>
                      <div style={{fontSize: '12px', color: '#B5D4F4'}}>Edit your profile to add a 60 second intro video</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Work style */}
            <div>
              <div style={{fontSize: '11px', color: '#85B7EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px'}}>Work style</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px'}}>
                {[
                  {label: 'Communication', value: profile.comms},
                  {label: 'Pace', value: profile.pace},
                  {label: 'Risk tolerance', value: profile.risk},
                  {label: 'Equity', value: profile.equity},
                ].map(({label, value}) => (
                  <div key={label} style={{background: '#F8FAFC', borderRadius: '8px', padding: '10px 14px', border: '0.5px solid #E6F1FB'}}>
                    <div style={{fontSize: '11px', color: '#85B7EB', marginBottom: '3px'}}>{label}</div>
                    <div style={{fontSize: '13px', fontWeight: 500, color: '#042C53'}}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Profile completion */}
        <div style={{background: '#fff', borderRadius: '12px', border: '0.5px solid #E6F1FB', padding: '16px 20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <span style={{fontSize: '13px', fontWeight: 500, color: '#042C53'}}>Profile completion</span>
            <span style={{fontSize: '13px', fontWeight: 500, color: '#185FA5'}}>{profile.photo && profile.video ? '100%' : profile.photo ? '90%' : profile.video ? '85%' : '80%'}</span>
          </div>
          <div style={{height: '6px', background: '#E6F1FB', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px'}}>
            <div style={{height: '100%', width: profile.photo && profile.video ? '100%' : profile.photo ? '90%' : profile.video ? '85%' : '80%', background: '#185FA5', borderRadius: '3px', transition: 'width 0.5s'}}></div>
          </div>
          <div style={{fontSize: '12px', color: '#85B7EB'}}>
            {profile.photo && profile.video ? 'Profile complete! You have priority placement in matches.' : !profile.photo ? 'Add a profile photo to boost your visibility.' : 'Add a video intro to reach 100% and stand out in matches.'}
          </div>
        </div>

      </div>
    </main>
  )
}