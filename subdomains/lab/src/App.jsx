import React, { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState("");

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
      {/* אלמנטים עיצוביים ברקע */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

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
    backgroundColor: '#050505',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif',
    direction: 'rtl',
    position: 'relative',
    overflow: 'hidden',
  },
  // עיגולי צבע מטושטשים ברקע
  blob1: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '40%',
    height: '40%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
    zIndex: 0,
  },
  blob2: {
    position: 'absolute',
    bottom: '10%',
    right: '-5%',
    width: '30%',
    height: '30%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
    zIndex: 0,
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
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
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