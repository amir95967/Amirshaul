import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [status, setStatus] = useState("");
  const canvasRef = useRef(null);

  // לוגיקת המטריקס (קוד רץ)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/%=<>!&|?#@';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("שולח פרטים...");
    const formData = new FormData(e.target);
    formData.append("access_key", "dd1f530c-bc5a-4c6b-b854-4ef0aae30d00");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("ההודעה התקבלה! נציג יחזור אליך בקרוב.");
        e.target.reset();
      } else {
        setStatus("משהו השתבש, נסה שוב.");
      }
    } catch (error) {
      setStatus("שגיאת רשת.");
    }
  };

  return (
    <div style={styles.container}>
      {/* הקנבס של המטריקס */}
      <canvas ref={canvasRef} style={styles.matrixCanvas} />

      <nav style={styles.nav}>
        <div style={styles.logo}>AMIR<span style={styles.accentText}>SHAUL</span></div>
        <div style={styles.navStatus}>Available for Projects</div>
      </nav>

      <main style={styles.main}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>הופכים חזון לדיגיטל <br /> <span style={styles.gradientText}>עוצר נשימה.</span></h1>
          <p style={styles.subtitle}>
            אנחנו מעצבים ובונים אתרים שזוכים בפרסים, מניעים לפעולה ונראים מושלם בכל מסך. 
            הפרויקט הגדול הבא שלך מתחיל כאן.
          </p>
        </div>

        <div style={styles.glassCard}>
          <h2 style={styles.cardTitle}>בואו נצא לדרך</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <input type="text" name="name" required placeholder="איך קוראים לך?" style={styles.input} />
              <input type="email" name="email" required placeholder="אימייל לחזרה" style={styles.input} />
            </div>
            <textarea name="message" required placeholder="ספר לנו קצת על הפרויקט..." style={styles.textarea}></textarea>
            <button type="submit" style={styles.button}>שלח הודעה</button>
          </form>
          {status && <p style={styles.statusMsg}>{status}</p>}
        </div>
      </main>

      <footer style={styles.footer}>
        © 2026 Crafted with Passion by Amir Shaul
      </footer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000', // שיניתי לשחור מוחלט בשביל המטריקס
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif',
    direction: 'rtl',
    position: 'relative',
    overflow: 'hidden',
  },
  matrixCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.15, // שקיפות עדינה כדי שלא יפריע לקריאה
  },
  nav: {
    padding: '30px 10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  logo: { fontSize: '20px', fontWeight: '900', letterSpacing: '1px' },
  accentText: { color: '#6366f1' },
  navStatus: { fontSize: '12px', color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '5px 12px', borderRadius: '20px' },
  
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5% 50px 5%',
    zIndex: 1,
  },
  heroSection: { textAlign: 'center', marginBottom: '50px' },
  title: { fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' },
  gradientText: {
    background: 'linear-gradient(90deg, #6366f1, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: { fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' },
  
  glassCard: {
    background: 'rgba(15, 23, 42, 0.8)', // כהה יותר כדי לבלוט על המטריקס
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  cardTitle: { fontSize: '1.5rem', fontWeight: '700', marginBottom: '30px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  row: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  input: {
    flex: 1,
    minWidth: '200px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '15px 20px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  textarea: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '15px 20px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    height: '120px',
    resize: 'none',
  },
  button: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '18px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)',
  },
  statusMsg: { textAlign: 'center', marginTop: '20px', color: '#4ade80', fontSize: '14px' },
  footer: { padding: '30px', textAlign: 'center', fontSize: '12px', color: '#475569', zIndex: 10 }
};