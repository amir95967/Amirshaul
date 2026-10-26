import { useEffect, useRef, useState } from 'react';
import './scrollcraft/scrollcraft.css';
import './scrollcraft/scrollcraft.js';
import './form.css';

const ACCESS_KEY = 'dd1f530c-bc5a-4c6b-b854-4ef0aae30d00';
const SITE_URL = 'https://www.amirshaul.online';
const LINKEDIN_URL = 'https://www.linkedin.com/in/amir-shaul/';

const TOPICS = [
  { value: 'הצעת משרה (IT / SysAdmin)', label: 'הצעת משרה', hint: 'IT / SysAdmin' },
  { value: 'פניית מגייס/ת (Recruitment)', label: 'פניית מגייס/ת', hint: 'Recruitment' },
  { value: 'ייעוץ תשתיות וענן (AWS / M365)', label: 'ייעוץ תשתיות וענן', hint: 'AWS / M365' },
  { value: 'אחר', label: 'נושא אחר', hint: 'Other' },
];

// The trace: one segment per required field, from the sender to Amir.
const HOPS = [
  { key: 'name', label: 'שם' },
  { key: 'email', label: 'אימייל' },
  { key: 'topic', label: 'נושא' },
  { key: 'message', label: 'הודעה' },
];

function readDone(form) {
  const el = form.elements;
  return {
    name: el.name.value.trim().length > 1,
    email: el.email.value.trim() !== '' && el.email.validity.valid,
    topic: [...el.topic].some((r) => r.checked),
    message: el.message.value.trim().length > 4,
  };
}

export default function App() {
  const [status, setStatus] = useState({ text: '', tone: '' });
  const [done, setDone] = useState({ name: false, email: false, topic: false, message: false });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('pf');

    // hCaptcha widget, served through Web3Forms
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const sc = window.ScrollCraft.mount(rootRef.current);
    return () => {
      sc.destroy();
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handleInput = (e) => {
    setDone(readDone(e.currentTarget));
    if (sent) setSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const captchaResponse = form.querySelector('[name="h-captcha-response"]')?.value;
    if (!captchaResponse) {
      setStatus({ text: 'אנא אמת/י שאינך רובוט.', tone: 'warn' });
      return;
    }

    setSending(true);
    setStatus({ text: 'שולח פרטים...', tone: '' });
    const formData = new FormData(form);
    formData.append('access_key', ACCESS_KEY);
    formData.append('subject', 'פנייה חדשה מאתר הפורטפוליו: ' + formData.get('name') + ' (' + formData.get('topic') + ')');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setStatus({ text: 'הפנייה התקבלה בהצלחה! אחזור אליך בהקדם.', tone: 'ok' });
        setSent(true);
        form.reset();
        setDone({ name: false, email: false, topic: false, message: false });
        if (window.hcaptcha) window.hcaptcha.reset();
      } else {
        setStatus({ text: 'משהו השתבש, נסה שוב.', tone: 'warn' });
      }
    } catch {
      setStatus({ text: 'שגיאת רשת, אנא נסה שוב.', tone: 'warn' });
    } finally {
      setSending(false);
    }
  };

  const count = HOPS.filter((h) => done[h.key]).length;
  const ready = count === HOPS.length;

  return (
    <div className={`f-root${sent ? ' is-sent' : ''}${ready ? ' is-ready' : ''}`} ref={rootRef} dir="rtl" lang="he">
      <div className="sc-grain" aria-hidden="true" />
      <div className="pf-frame" aria-hidden="true" />

      <nav className="pf-tb" aria-label="ניווט ראשי">
        <a className="pf-tb__mark" href={SITE_URL} aria-label="אמיר שאול, לאתר הראשי">AS</a>
        <div className="pf-tb__who">
          <strong>אמיר שאול</strong>
          <span dir="ltr">IT System Engineer</span>
        </div>
        <div className="pf-tb__sheet">
          <span>גיליון</span>
          <strong>פתיחת קריאה</strong>
        </div>
        <a className="pf-tb__link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="pf-tb__back" href={SITE_URL}>לאתר הראשי</a>
      </nav>

      <main className="f-main">
        <header className="f-head" data-sc-in data-sc-stagger="70">
          <p className="pf-eyebrow" dir="ltr">Service request · Direct line</p>
          <h1>פתיחת קריאה.</h1>
          <p className="f-lede">
            מעוניינים להציע משרה, לתאם שיחת היכרות או לבחון התאמה מקצועית? מלאו את הפרטים, וההודעה מגיעה ישירות אליי.
          </p>
        </header>

        <div className="f-body">
          <form className="f-sheet" onSubmit={handleSubmit} onInput={handleInput} onChange={handleInput} data-sc-in>
            <div className="f-row">
              <label className="f-field">
                <span>שם מלא או שם הארגון</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label className="f-field">
                <span>אימייל</span>
                <input type="email" name="email" required dir="ltr" autoComplete="email" placeholder="name@company.com" />
              </label>
            </div>

            <label className="f-field f-field--half">
              <span>טלפון <em>(לא חובה)</em></span>
              <input type="tel" name="phone" dir="ltr" autoComplete="tel" />
            </label>

            <fieldset className="f-topics">
              <legend>נושא הפנייה</legend>
              <div className="f-topics__grid">
                {TOPICS.map((t) => (
                  <label key={t.value} className="f-topic">
                    <input type="radio" name="topic" value={t.value} required />
                    <span className="f-topic__box">
                      <strong>{t.label}</strong>
                      <span dir="ltr">{t.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="f-field">
              <span>תוכן הפנייה</span>
              <textarea name="message" required rows="5" placeholder="פירוט לגבי המשרה, התפקיד או תוכן הפנייה" />
            </label>

            <div className="h-captcha f-captcha" data-captcha="true" data-theme="dark" />

            <div className="f-submit">
              <button type="submit" className="pf-btn pf-btn--big" disabled={sending}>
                {sending ? 'שולח...' : 'שליחת פנייה'}
              </button>
              <p className={`f-status f-status--${status.tone || 'idle'}`} role="status" aria-live="polite">{status.text}</p>
            </div>
          </form>

          {/* Signature move: the request is routed hop by hop as the fields are filled. */}
          <aside className="f-trace" aria-label={`התקדמות הפנייה: ${count} מתוך ${HOPS.length}`} data-sc-in>
            <p className="f-trace__title" dir="ltr">traceroute amirshaul.online</p>
            <ol>
              <li className="f-hop f-hop--end is-on">
                <span className="f-hop__node" aria-hidden="true" />
                <span className="f-hop__label">את/ה</span>
              </li>
              {HOPS.map((h, i) => (
                <li key={h.key} className={`f-hop${done[h.key] || sent ? ' is-on' : ''}`} style={{ '--i': i }}>
                  <span className="f-hop__wire" aria-hidden="true" />
                  <span className="f-hop__node" aria-hidden="true" />
                  <span className="f-hop__label">
                    {h.label}
                    <span className="f-hop__ok">{done[h.key] || sent ? 'OK' : '…'}</span>
                  </span>
                </li>
              ))}
              <li className={`f-hop f-hop--amir${sent ? ' is-on' : ''}`}>
                <span className="f-hop__wire" aria-hidden="true" />
                <span className="f-hop__face" aria-hidden="true"><img src="/amir-cut.webp" width="720" height="760" alt="" /></span>
                <span className="f-hop__label">
                  אמיר שאול
                  <span className="f-hop__ok">{sent ? 'התקבל' : ready ? 'מוכן לשליחה' : 'ממתין'}</span>
                </span>
              </li>
            </ol>
          </aside>
        </div>
      </main>

      <footer className="pf-foot f-foot">
        <span>© 2026 אמיר שאול</span>
        <a href={SITE_URL}>amirshaul.online</a>
        <span className="pf-foot__ok"><span className="pf-dot" aria-hidden="true" /> כל המערכות פועלות</span>
      </footer>
    </div>
  );
}
