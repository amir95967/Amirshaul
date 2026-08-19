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
      ctx.fillStyle = '#06b6d4'; // Cyan System Accent
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
      setStatus("אנא אמת/י שאינך רובוט.");
      return;
    }

    setStatus("שולח פרטים...");
    const formData = new FormData(e.target);
    
    formData.append("access_key", "dd1f530c-bc5a-4c6b-b854-4ef0aae30d00");
    formData.append("subject", "פנייה חדשה מאתר הפורטפוליו: " + formData.get("name") + " (" + formData.get("topic") + ")");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("הפנייה התקבלה בהצלחה! אחזור אליך בהקדם.");
        e.target.reset();
        // איפוס הקפצ'ה לאחר שליחה מוצלחת
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        setStatus("משהו השתבש, נסה שוב.");
      }
    } catch (error) {
      setStatus("שגיאת רשת, אנא נסה שוב.");
    }
  };

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.matrixCanvas} />

      <nav style={styles.nav}>
        <a href="https://www.amirshaul.online" style={styles.logoLink}>
          <div style={styles.logo}>AMIR<span style={styles.accentText}>SHAUL</span></div>
          <span style={styles.subLogoText}>// IT SYSTEM ADMINISTRATOR</span>
        </a>
      </nav>

      <main style={styles.main}>
        <div style={styles.heroSection}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            <span>PORT: 443 // SECURE CONTACT PORTAL</span>
          </div>
          <h1 style={styles.title}>
            יצירת קשר ישיר <br /> 
            <span style={styles.gradientText}>Amir Shaul // IT Infrastructure</span>
          </h1>
          <p style={styles.subtitle}>
            מעוניינים להציע משרה, לתאם שיחת היכרות טכנולוגית או לבחון התאמה מקצועית? <br />
            השאירו פרטים למטה וההודעה תועבר ישירות אליי.
          </p>
        </div>

        <div style={styles.glassCard}>
          <h2 style={styles.cardTitle}>שליחת הודעה ישירה</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <input type="text" name="name" required placeholder="שם מלא / שם הארגון" style={styles.input} />
              <input type="email" name="email" required placeholder="כתובת אימייל (name@company.com)" dir="ltr" style={styles.input} />
            </div>

            <div style={styles.row}>
              <input type="tel" name="phone" placeholder="מספר טלפון (אופציונלי)" dir="ltr" style={styles.input} />
              <select name="topic" style={styles.select}>
                <option value="הצעת משרה (IT / SysAdmin)" style={styles.option}>💼 הצעת משרה (IT / SysAdmin)</option>
                <option value="פניית מגייס/ת (Recruitment)" style={styles.option}>👥 פניית מגייס/ת (Recruitment)</option>
                <option value="ייעוץ תשתיות וענן (AWS / M365)" style={styles.option}>☁️ ייעוץ תשתיות וענן (AWS / M365)</option>
                <option value="אחר" style={styles.option}>💬 נושא אחר</option>
              </select>
            </div>

            <textarea name="message" required placeholder="פירוט לגבי המשרה, התפקיד או תוכן הפנייה..." style={styles.textarea}></textarea>
            
            {/* רכיב ה-hCaptcha */}
            <div 
              className="h-captcha" 
              data-captcha="true" 
              data-theme="dark"
              style={styles.captchaContainer}
            ></div>

            <button type="submit" style={styles.button}>שליחת פנייה // SEND INQUIRY</button>
          </form>
          {status && <p style={styles.statusMsg}>{status}</p>}
        </div>
      </main>

      <footer style={styles.footer}>
        © 2026 Amir Shaul // IT System Engineer & Administrator
      </footer>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#020617',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Assistant", "Inter", sans-serif',
    direction: 'rtl',
    position: 'relative',
    overflowX: 'hidden',
  },
  matrixCanvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.18,
  },
  nav: {
    padding: '30px 0 10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    width: '100%',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  logo: { 
    fontSize: '24px', 
    fontWeight: '900', 
    letterSpacing: '2px',
    textAlign: 'center',
    fontFamily: '"JetBrains Mono", monospace',
  },
  subLogoText: {
    fontSize: '11px',
    color: '#64748b',
    fontFamily: '"JetBrains Mono", monospace',
    letterSpacing: '1px',
  },
  accentText: { color: '#06b6d4' },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5% 50px 5%',
    zIndex: 1,
  },
  heroSection: { textAlign: 'center', marginBottom: '30px' },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '9999px',
    background: 'rgba(6, 182, 212, 0.1)',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    color: '#06b6d4',
    fontSize: '11px',
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 'bold',
    marginBottom: '18px',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#06b6d4',
    boxShadow: '0 0 8px #06b6d4',
  },
  title: { fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: '900', lineHeight: '1.2', marginBottom: '15px' },
  gradientText: {
    background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: '"JetBrains Mono", sans-serif',
    fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
  },
  subtitle: { fontSize: '1rem', color: '#94a3b8', maxWidth: '580px', margin: '0 auto', lineHeight: '1.6' },
  glassCard: {
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '35px 40px',
    width: '100%',
    maxWidth: '560px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  },
  cardTitle: { fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', textAlign: 'center', color: '#f8fafc' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  row: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  input: {
    flex: 1,
    minWidth: '200px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    flex: 1,
    minWidth: '200px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
  },
  option: {
    background: '#0f172a',
    color: '#fff',
  },
  textarea: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    height: '110px',
    resize: 'none',
  },
  captchaContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '6px 0'
  },
  button: {
    background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
    color: '#000',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    fontWeight: '800',
    cursor: 'pointer',
    fontFamily: '"JetBrains Mono", monospace',
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s, transform 0.1s',
    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
  },
  statusMsg: { textAlign: 'center', marginTop: '16px', color: '#34d399', fontSize: '13px', fontFamily: '"JetBrains Mono", monospace' },
  footer: { padding: '24px', textAlign: 'center', fontSize: '12px', color: '#475569', zIndex: 10, fontFamily: '"JetBrains Mono", monospace' }
};
