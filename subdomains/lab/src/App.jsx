import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [status, setStatus] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    // טעינת הסקריפט של hCaptcha
    const script = document.createElement("script");
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // לוגיקת המטריקס
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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // בדיקה בסיסית שהקפצ'ה מולאה
    const captchaResponse = e.target.querySelector('[name="h-captcha-response"]')?.value;
    if (!captchaResponse) {
      setStatus("אנא אמת שאינך רובוט.");
      return;
    }

    setStatus("שולח פרטים...");
    const formData = new FormData(e.target);
    
    formData.append("access_key", "dd1f530c-bc5a-4c6b-b854-4ef0aae30d00");
    formData.append("subject", "ליד חדש מ-Amirshaul.online: " + formData.get("name"));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("הפרטים התקבלו! נחזור אליך בהקדם.");
        e.target.reset();
        // איפוס הקפצ'ה לאחר שליחה מוצלחת
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        setStatus("משהו השתבש, נסה שוב.");
      }
    } catch (error) {
      setStatus("שגיאת רשת.");
    }
  };

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.matrixCanvas} />

      <nav style={styles.nav}>
        <div style={styles.logo}>AMIR<span style={styles.accentText}>SHAUL</span></div>
      </nav>

      <main style={styles.main}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>
            בניית אתרים <br /> 
            <span style={styles.gradientText}>ברמה הגבוהה ביותר.</span>
          </h1>
          <p style={styles.subtitle}>
            פתרונות דיגיטליים מתקדמים, קוד נקי וביצועים ללא פשרות. <br />
            השאירו פרטים למטה ונחזור אליכם בהקדם.
          </p>
        </div>

        <div style={styles.glassCard}>
          <h2 style={styles.cardTitle}>השארת פרטים</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <input type="text" name="name" required placeholder="שם מלא" style={styles.input} />
              <input type="email" name="email" required placeholder="אימייל" style={styles.input} />
            </div>
            <textarea name="message" required placeholder="איך נוכל לעזור?" style={styles.textarea}></textarea>
            
            {/* רכיב ה-hCaptcha */}
            <div 
              className="h-captcha" 
              data-captcha="true" 
              data-theme="dark"
              style={styles.captchaContainer}
            ></div>

            <button type="submit" style={styles.button}>שלח הודעה</button>
          </form>
          {status && <p style={styles.statusMsg}>{status}</p>}
        </div>
      </main>

      <footer style={styles.footer}>
        © 2026 Amir Shaul //
      </footer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif',
    direction: 'rtl',
    position: 'relative',
    overflowX: 'hidden',
  },
  matrixCanvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.15,
  },
  nav: {
    padding: '40px 0 20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    width: '100%',
  },
  logo: { 
    fontSize: '24px', 
    fontWeight: '900', 
    letterSpacing: '2px',
    textAlign: 'center'
  },
  accentText: { color: '#6366f1' },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5% 50px 5%',
    zIndex: 1,
  },
  heroSection: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '15px' },
  gradientText: {
    background: 'linear-gradient(90deg, #6366f1, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: { fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' },
  glassCard: {
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  cardTitle: { fontSize: '1.3rem', fontWeight: '700', marginBottom: '25px', textAlign: 'center' },
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
    height: '100px',
    resize: 'none',
  },
  captchaContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0'
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
    transition: 'opacity 0.2s',
  },
  statusMsg: { textAlign: 'center', marginTop: '20px', color: '#4ade80', fontSize: '14px' },
  footer: { padding: '30px', textAlign: 'center', fontSize: '12px', color: '#475569', zIndex: 10 }
};