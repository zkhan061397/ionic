'use client'
import { useState } from 'react'

type AvatarProps = {
  src?: string | null
  initials: string
  size?: number
  bg?: string
  color?: string
}

export default function Avatar({ src, initials, size = 44, bg = '#E6F1FB', color = '#185FA5' }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={initials}
        onError={() => setImgError(true)}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          display: 'block',
        }}
      />
    )
  }

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.33,
      fontWeight: 500,
      flexShrink: 0,
      fontFamily: 'system-ui, sans-serif',
    }}>
      {initials}
    </div>
  )
}