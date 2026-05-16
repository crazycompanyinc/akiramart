import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
      color: '#f0e8d8',
      fontFamily: "'Rajdhani', sans-serif",
      textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌀</div>
      <h1 style={{
        fontFamily: "'Bangers', cursive",
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        background: 'linear-gradient(135deg, #ff2d78, #00e5ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '16px',
        letterSpacing: '0.03em',
      }}>
        Portal no encontrado
      </h1>
      <p style={{ color: '#908898', fontSize: '16px', maxWidth: '400px', marginBottom: '32px' }}>
        Parece que este portal lleva a una dimensión que no existe... todavía.
      </p>
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        background: 'linear-gradient(135deg, #ff2d78, #00e5ff)',
        color: '#fff',
        textDecoration: 'none',
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderRadius: '3px',
      }}>
        Volver al mercado
      </Link>
    </main>
  )
}
