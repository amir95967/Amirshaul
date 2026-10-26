import { useEffect, useRef } from 'react';
import './scrollcraft/scrollcraft.css';
import './scrollcraft/scrollcraft.js';
import './portfolio.css';

const CONTACT_URL = 'https://form.amirshaul.online';
const LINKEDIN_URL = 'https://www.linkedin.com/in/amir-shaul/';
const CTA_LABEL = 'צור קשר';

const REDUCE = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fonts load with this chunk only, so the /kali dashboard never pays for them.
if (typeof document !== 'undefined' && !document.getElementById('pf-fonts')) {
  const link = document.createElement('link');
  link.id = 'pf-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Hebrew:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

// ---------------------------------------------------------------- topology --
// d = desktop drawing (1200 x 680), m = phone drawing (400 x 600).
const BOX = { d: [200, 64], m: [104, 40] };
const VIEW = { d: [1200, 680], m: [400, 600] };

const NODES = [
  { id: 'cloud', tag: 'AWS', short: 'AWS', title: 'ענן', desc: 'סביבות ענן היברידיות, IAM ורשתות וירטואליות.', d: [1040, 100], m: [200, 50], label: 'side', at: 0.02 },
  { id: 'edge', tag: 'FIREWALL · VPN', short: 'FW · VPN', title: 'שכבת הקצה', desc: 'גישה מרחוק מאובטחת, VPN ו‑MFA לכל משתמש.', d: [1040, 330], m: [200, 150], label: 'below', at: 0.2 },
  { id: 'core', tag: 'ENTRA ID · AD', short: 'ENTRA · AD', title: 'זהויות והרשאות', desc: 'ניהול Domain ו‑GPO, הזדהות SSO, שירותי DNS ו‑DHCP. הלב של הרשת.', d: [720, 330], m: [200, 270], label: 'above', at: 0.34 },
  { id: 'auto', tag: 'POWERSHELL', short: 'PS', title: 'אוטומציה', desc: 'סקריפטים וכלי AI שמורידים עבודה ידנית מהשגרה.', d: [720, 560], m: [340, 270], label: 'below', at: 0.52 },
  { id: 'm365', tag: 'M365 · EXCHANGE', short: 'M365', title: 'דואר ושיתוף', desc: 'תיבות ארגוניות, ניתוב וסינון דואר, Teams ו‑SharePoint.', d: [380, 100], m: [64, 410], label: 'below', at: 0.52 },
  { id: 'rds', tag: 'RDS', short: 'RDS', title: 'שרתי Terminal', desc: 'הקמה ותחזוקה של שרתי Terminal וחלוקת משאבים.', d: [380, 330], m: [200, 410], label: 'below', at: 0.52 },
  { id: 'sap', tag: 'SAP', short: 'SAP', title: 'מערכות ERP', desc: 'ניהול הרשאות ותחזוקת סביבות SAP מורכבות.', d: [380, 560], m: [336, 410], label: 'below', at: 0.52 },
  { id: 'users', tag: 'ENDPOINTS', short: 'USERS', title: 'המשתמשים', desc: 'מי שבשבילו כל זה קיים: עמדות, ציוד ותמיכה.', d: [110, 330], m: [200, 550], label: 'below', at: 0.68 },
];
const NODE = Object.fromEntries(NODES.map((n) => [n.id, n]));

// Each edge draws inside its own window of the act's progress.
const EDGES = [
  { from: 'cloud', to: 'edge', w: [0.06, 0.2] },
  { from: 'edge', to: 'core', w: [0.2, 0.34] },
  { from: 'core', to: 'm365', w: [0.34, 0.52] },
  { from: 'core', to: 'rds', w: [0.34, 0.52] },
  { from: 'core', to: 'sap', w: [0.34, 0.52] },
  { from: 'core', to: 'auto', w: [0.34, 0.52], dashed: true },
  { from: 'm365', to: 'users', w: [0.52, 0.68] },
  { from: 'rds', to: 'users', w: [0.52, 0.68] },
  { from: 'sap', to: 'users', w: [0.52, 0.68] },
];
const PACKET_ROUTE = ['cloud', 'edge', 'core', 'rds', 'users'];
const PACKET_WINDOW = [0.74, 0.9];
const LIVE_AT = 0.9;

function wire(a, b, mode) {
  const [w, h] = BOX[mode];
  const [ax, ay] = a[mode];
  const [bx, by] = b[mode];
  if (mode === 'd') {
    if (Math.abs(ax - bx) < 1) {
      const s = by > ay ? 1 : -1;
      return `M${ax} ${ay + (s * h) / 2} V${by - (s * h) / 2}`;
    }
    const s = bx > ax ? 1 : -1;
    const x1 = ax + (s * w) / 2;
    const x2 = bx - (s * w) / 2;
    const mx = (x1 + x2) / 2;
    return Math.abs(ay - by) < 1 ? `M${x1} ${ay} H${x2}` : `M${x1} ${ay} H${mx} V${by} H${x2}`;
  }
  if (Math.abs(ay - by) < 1) {
    const s = bx > ax ? 1 : -1;
    return `M${ax + (s * w) / 2} ${ay} H${bx - (s * w) / 2}`;
  }
  const s = by > ay ? 1 : -1;
  const y1 = ay + (s * h) / 2;
  const y2 = by - (s * h) / 2;
  const my = (y1 + y2) / 2;
  return Math.abs(ax - bx) < 1 ? `M${ax} ${y1} V${y2}` : `M${ax} ${y1} V${my} H${bx} V${y2}`;
}

function outline(n, mode) {
  const [w, h] = BOX[mode];
  const [x, y] = n[mode];
  return `M${x - w / 2} ${y - h / 2} h${w} v${h} h${-w} Z`;
}

const packetPath = (mode) =>
  PACKET_ROUTE.slice(1).map((id, i) => wire(NODE[PACKET_ROUTE[i]], NODE[id], mode)).join(' ');

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const pct = (v, total) => `${(v / total) * 100}%`;

function TopoDrawing({ mode }) {
  const [vw, vh] = VIEW[mode];
  return (
    <div className={`pf-topo__sheet pf-topo__sheet--${mode}`} style={{ aspectRatio: `${vw} / ${vh}` }} data-topo={mode}>
      <svg viewBox={`0 0 ${vw} ${vh}`} aria-hidden="true" focusable="false">
        {EDGES.map((e) => {
          const key = `${e.from}-${e.to}`;
          const d = wire(NODE[e.from], NODE[e.to], mode);
          const drawn = <path className={`pf-wire${e.dashed ? ' pf-wire--mask' : ''}`} d={d} pathLength="1" data-edge={`${e.w[0]} ${e.w[1]}`} />;
          if (!e.dashed) return <g key={key}>{drawn}</g>;
          // A dashed wire cannot also use its dash array to draw itself, so the
          // drawing happens in a mask and the visible line keeps its pattern.
          const id = `pf-mask-${mode}-${key}`;
          return (
            <g key={key}>
              <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={vw} height={vh}>{drawn}</mask>
              <path className="pf-wire--dashed" d={d} mask={`url(#${id})`} />
            </g>
          );
        })}
        {NODES.map((n) => (
          <path key={n.id} className="pf-box" d={outline(n, mode)} pathLength="1" data-node={n.id} data-at={n.at} />
        ))}
        <path className="pf-route" d={packetPath(mode)} />
        {EDGES.map((e) => (
          <circle key={`nib-${e.from}-${e.to}`} className="pf-nib" r={mode === 'd' ? 4 : 3.5} data-nib />
        ))}
        <circle className="pf-packet" r={mode === 'd' ? 7 : 6} data-packet />
      </svg>
      {NODES.map((n) => (
        <div
          key={n.id}
          className={`pf-node pf-node--${n.label}`}
          style={{ left: pct(n[mode][0], vw), top: pct(n[mode][1], vh) }}
          data-node-label={n.id}
          data-at={n.at}
        >
          <span className="pf-node__tag" dir="ltr">{mode === 'd' ? n.tag : n.short}</span>
          {mode === 'd' && (
            <span className="pf-node__text">
              <strong>{n.title}</strong>
              <span>{n.desc}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// Writes the drawing state for one act progress value. Pure DOM, no React state,
// so the page never re-renders under the scroll.
function paintTopology(root, p) {
  root.querySelectorAll('[data-topo]').forEach((sheet) => {
    const visible = sheet.getBoundingClientRect().width > 0;
    const nibs = sheet.querySelectorAll('[data-nib]');
    sheet.querySelectorAll('[data-edge]').forEach((path, i) => {
      const [a, b] = path.dataset.edge.split(' ').map(Number);
      const t = clamp01((p - a) / (b - a));
      path.style.strokeDashoffset = String(1 - t);
      const nib = nibs[i];
      if (!nib) return;
      const drawing = t > 0 && t < 1;
      nib.style.opacity = drawing ? '1' : '0';
      if (drawing && visible) {
        const pt = path.getPointAtLength(path.getTotalLength() * t);
        nib.setAttribute('cx', pt.x);
        nib.setAttribute('cy', pt.y);
      }
    });
    sheet.querySelectorAll('[data-node]').forEach((box) => {
      const t = clamp01((p - Number(box.dataset.at)) / 0.05);
      box.style.strokeDashoffset = String(1 - t);
    });
    sheet.querySelectorAll('[data-node-label]').forEach((label) => {
      const t = clamp01((p - Number(label.dataset.at) - 0.02) / 0.05);
      label.style.opacity = String(t);
      label.style.setProperty('--rise', `${(1 - t) * 8}px`);
    });
    const packet = sheet.querySelector('[data-packet]');
    const route = sheet.querySelector('.pf-route');
    const [pa, pb] = PACKET_WINDOW;
    const pt = clamp01((p - pa) / (pb - pa));
    const running = pt > 0 && pt < 1;
    packet.style.opacity = running ? '1' : '0';
    if (running && visible) {
      const at = route.getPointAtLength(route.getTotalLength() * pt);
      packet.setAttribute('cx', at.x);
      packet.setAttribute('cy', at.y);
    }
  });

  const live = p >= LIVE_AT;
  root.classList.toggle('is-live', live);

  // Phone caption: the newest node, then the status line once everything is up.
  const caption = root.querySelector('[data-topo-caption]');
  if (caption) {
    let current = null;
    for (const n of NODES) if (p >= n.at + 0.02) current = n;
    const key = live ? 'live' : current ? current.id : '';
    if (caption.dataset.key !== key) {
      caption.dataset.key = key;
      const title = caption.querySelector('strong');
      const body = caption.querySelector('span');
      if (live) {
        title.textContent = 'כל המערכות פועלות';
        body.textContent = 'ענן, זהויות, דואר, שרתים ומשתמשים. מחוברים, מתוחזקים ושקטים.';
      } else if (current) {
        title.textContent = current.title;
        body.textContent = current.desc;
      } else {
        title.textContent = '';
        body.textContent = '';
      }
    }
  }
}

// ------------------------------------------------------------------- content --
const REVISIONS = [
  {
    rev: 'C',
    period: '07.2025 – היום',
    role: 'System Administrator',
    company: 'קבוצת קלי (Kali Group)',
    desc: 'ניהול תשתיות המחשוב והתקשורת של הקבוצה. תצורה ב‑Microsoft 365 וב‑Entra ID, שרתי Exchange ו‑RDS, הרשאות משתמשים ומדיניות אבטחה.',
  },
  {
    rev: 'B',
    period: '03.2024 – 07.2025',
    role: 'IT Specialist & System Support',
    company: 'Matrix',
    desc: 'פתרונות מחשוב וסיסטם, ליווי ותחזוקת סביבות עבודה מרחוק, ופתרון תקלות תשתית ברמת השרתים ותחנות הקצה.',
  },
  {
    rev: 'A',
    period: '03.2020 – 11.2022',
    role: 'System Administrator & SAP Manager',
    company: 'צה״ל (IDF)',
    desc: 'שירות מלא כמנהל מערכות מידע ו‑SAP. משתמשים והרשאות ב‑Active Directory, תשתיות סיסטם ורשתות ותמיכה במערכות קריטיות.',
  },
];

const PARTS = [
  { item: 'הנדסאי תוכנה, פיתוח Full Stack', source: 'מכללות אורט', years: '2022–2024' },
  { item: 'תעודת בגרות מלאה', source: 'תיכון הרצוג, חולון', years: '2013–2019' },
];

const STANDARDS = [
  'AWS', 'Microsoft Entra ID', 'Active Directory', 'Group Policy', 'Microsoft 365',
  'Exchange Server', 'Teams', 'SharePoint', 'RDS', 'DNS / DHCP', 'NTFS', 'SAP', 'PowerShell',
];

// ------------------------------------------------------------------ the page --
export default function Portfolio() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const prevTitle = document.title;
    document.title = 'אמיר שאול | מהנדס סיסטם ותשתיות IT';
    document.documentElement.classList.add('pf');

    const sc = window.ScrollCraft.mount(root);

    const topo = root.querySelector('[data-topo-act]');
    const close = root.querySelector('[data-close-act]');
    const ring = root.querySelector('[data-redline]');
    let raf = 0;
    let lastTopo = -1;
    let lastClose = -1;

    const readP = (el) => parseFloat(el.style.getPropertyValue('--sc-p')) || 0;

    if (REDUCE) {
      paintTopology(topo, 1);
      ring.style.strokeDashoffset = '0';
    } else {
      const tick = () => {
        const p = readP(topo);
        if (p !== lastTopo) { lastTopo = p; paintTopology(topo, p); }
        const c = readP(close);
        if (c !== lastClose) {
          lastClose = c;
          ring.style.strokeDashoffset = String(1 - clamp01((c - 0.16) / 0.24));
        }
        raf = requestAnimationFrame(tick);
      };
      paintTopology(topo, 0);
      raf = requestAnimationFrame(tick);
    }

    // The title block names the sheet you are on, and steps aside at the close,
    // where the whole screen becomes the title block.
    const sheetName = root.querySelector('[data-sheet-name]');
    const block = root.querySelector('.pf-tb');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sheetName.textContent = entry.target.dataset.sheet;
        block.classList.toggle('is-away', entry.target.hasAttribute('data-close-act'));
      });
    }, { rootMargin: '-48% 0px -48% 0px' });
    root.querySelectorAll('[data-sheet]').forEach((s) => io.observe(s));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      sc.destroy();
      document.documentElement.classList.remove('pf');
      document.title = prevTitle;
    };
  }, []);

  const pinned = !REDUCE;

  return (
    <div className="pf-root" ref={rootRef} dir="rtl" lang="he">
      <a className="pf-skip" href="#main">דילוג לתוכן</a>
      <div className="sc-grain" aria-hidden="true" />
      <div className="pf-frame" aria-hidden="true" />

      {/* Title block: the drawing set's own chrome, used as the navigation. */}
      <nav className="pf-tb" aria-label="ניווט ראשי">
        <a className="pf-tb__mark" href="#main" aria-label="אמיר שאול, לראש העמוד">AS</a>
        <div className="pf-tb__who">
          <strong>אמיר שאול</strong>
          <span dir="ltr">IT System Engineer</span>
        </div>
        <div className="pf-tb__sheet">
          <span>גיליון</span>
          <strong data-sheet-name aria-live="off">חזית</strong>
        </div>
        <a className="pf-tb__link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="pf-tb__cta" href={CONTACT_URL} target="_blank" rel="noreferrer">{CTA_LABEL}</a>
      </nav>

      <main id="main">
        {/* 1 · HERO: independent planes on a pinned stage. */}
        <section
          className="pf-hero"
          data-sheet="חזית"
          {...(pinned ? { 'data-sc-act': 'pin', 'data-sc-span': '1.7', 'data-sc-drift': '#0c2340' } : {})}
        >
          <div className="pf-hero__stage" data-sc-stage>
            <div className="pf-plane pf-plane--grid" aria-hidden="true" />

            <svg className="pf-plane pf-plane--rack" viewBox="0 0 260 520" aria-hidden="true" focusable="false">
              <rect x="20" y="20" width="220" height="480" />
              <rect x="34" y="34" width="192" height="452" />
              {Array.from({ length: 12 }, (_, i) => (
                <g key={i} transform={`translate(0 ${48 + i * 36})`}>
                  <rect x="44" y="0" width="172" height="26" />
                  <line x1="56" y1="13" x2="140" y2="13" />
                  <circle cx="190" cy="13" r="3" />
                  <circle cx="202" cy="13" r="3" />
                </g>
              ))}
              <path d="M6 20 V500 M0 20 H12 M0 500 H12" />
            </svg>

            <div className="pf-plane pf-plane--subject">
              <img src="/amir-cut.webp" width="720" height="760" alt="אמיר שאול" fetchPriority="high" />
            </div>

            <div className="pf-plane pf-plane--front" aria-hidden="true">
              <svg viewBox="0 0 720 760" focusable="false">
                <circle cx="345" cy="292" r="214" className="pf-callout" />
                <path d="M496 140 L590 48 H720" className="pf-leader" />
                <path d="M520 640 L620 590 H720" className="pf-leader" />
                <path d="M22 70 V700 M10 70 H34 M10 700 H34" className="pf-dim" />
              </svg>
              <span className="pf-tag pf-tag--a">חולון · תל אביב</span>
              <span className="pf-tag pf-tag--b">קבוצת קלי · 2025</span>
            </div>

            <div className="pf-hero__copy">
              <p className="pf-eyebrow" dir="ltr">IT System Engineer · Infrastructure</p>
              <h1 className="pf-hero__name">אמיר שאול</h1>
              <div className="pf-hero__beat" {...(pinned ? { 'data-sc-cue': '0 0.46 0' } : {})}>
                <p className="pf-hero__lede">
                  מהנדס סיסטם ומנהל רשתות. מתכנן, בונה ומתחזק תשתיות IT ארגוניות, מהענן ועד עמדת הקצה.
                </p>
                <a className="pf-btn" href={CONTACT_URL} target="_blank" rel="noreferrer">{CTA_LABEL}</a>
              </div>
              {pinned && (
                <p className="pf-hero__beat pf-hero__beat--two" data-sc-cue="0.42 1 0.14 0.02">
                  כשהתשתית עובדת, אף אחד לא שם לב. זאת בדיוק המטרה.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 2 · QUIET: one sentence on bare grid, the silence before the drawing. */}
        <section className="pf-quiet" data-sheet="מבוא" data-sc-act="flow" data-sc-drift="#0a1f3a">
          <h2
            className="pf-quiet__line"
            {...(pinned ? { 'data-sc-cue': '0.2 1 0.22 0.04', 'data-sc-kinetic': 'lines' } : {})}
          >
            מאחורי כל עובד שמתחבר בבוקר עומדת מערכת שלמה. מישהו צריך לתכנן אותה, לבנות אותה ולדאוג שלא תיפול.
          </h2>
        </section>

        {/* 3 · PEAK: the network draws itself under the scroll. */}
        <section
          className="pf-topo"
          data-sheet="טופולוגיה"
          data-topo-act
          {...(pinned ? { 'data-sc-act': 'pin', 'data-sc-span': '4.2', 'data-sc-drift': '#0c2340' } : {})}
        >
          <div className="pf-topo__stage" data-sc-stage>
            <header className="pf-topo__head">
              <h2>זה השרטוט.</h2>
              <p>כל קופסה כאן היא מערכת שאני מנהל ביום-יום.</p>
            </header>
            <TopoDrawing mode="d" />
            <TopoDrawing mode="m" />
            <p className="pf-topo__caption" data-topo-caption aria-hidden="true"><strong /><span /></p>
            <p className="pf-topo__status" role="status">
              <span className="pf-dot" aria-hidden="true" />
              כל המערכות פועלות
              <span dir="ltr">All systems operational</span>
            </p>
          </div>
        </section>

        {/* 4 · TRUST: revision history, plain facts. */}
        <section className="pf-rev sc-section" data-sheet="היסטוריית גרסאות" data-sc-act="flow" data-sc-drift="#0b213d">
          <div className="sc-wrap">
            <div className="pf-section-head" data-sc-in data-sc-stagger="60">
              <h2>היסטוריית גרסאות</h2>
              <p>כל גרסה נבנתה על הקודמת.</p>
            </div>
            <ol className="pf-rev__table" data-sc-in data-sc-stagger="70">
              {REVISIONS.map((r) => (
                <li key={r.rev} className="pf-rev__row">
                  <span className="pf-rev__id" dir="ltr" aria-label={`גרסה ${r.rev}`}>{r.rev}</span>
                  <span className="pf-rev__period" dir="ltr">{r.period}</span>
                  <div className="pf-rev__body">
                    <h3><span dir="ltr">{r.role}</span> <span className="pf-rev__at">· {r.company}</span></h3>
                    <p>{r.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 · COMPLETENESS: the parts list, wiped in as one sheet. */}
        <section className="pf-bom sc-section" data-sheet="רשימת חלקים" data-sc-act="flow" data-sc-drift="#0c2340">
          <div className="sc-wrap pf-bom__grid">
            <div className="pf-section-head">
              <h2>רשימת חלקים</h2>
              <p>ההשכלה והכלים שמהם העבודה בנויה.</p>
            </div>
            <div className="pf-bom__sheet" data-sc-reveal="down" data-sc-reveal-at="0.12 0.42">
              <table className="pf-bom__table">
                <caption className="pf-visually-hidden">השכלה</caption>
                <thead>
                  <tr><th scope="col">פריט</th><th scope="col">מקור</th><th scope="col">שנים</th></tr>
                </thead>
                <tbody>
                  {PARTS.map((r) => (
                    <tr key={r.item}>
                      <th scope="row">{r.item}</th>
                      <td>{r.source}</td>
                      <td dir="ltr">{r.years}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pf-bom__std">
                <h3>תקנים וכלים</h3>
                <ul dir="ltr">
                  {STANDARDS.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · RESOLVE: the red pen circles the one action. */}
        <section className="pf-close" id="contact" data-sheet="חתימה" data-close-act data-sc-act="flow" data-sc-drift="#0a1f3a">
          <div className="pf-close__plate">
            <h2>צריכים מישהו שיחזיק לכם את התשתית?</h2>
            <p>זמין לתפקידי סיסטם, ענן ותשתיות באזור המרכז ותל אביב. היברידי או מהמשרד.</p>
            <div className="pf-close__action">
              <svg className="pf-redline" viewBox="0 0 320 120" aria-hidden="true" focusable="false" preserveAspectRatio="none">
                <path
                  data-redline
                  pathLength="1"
                  d="M196 14 C 120 4, 34 18, 16 52 C 2 82, 70 108, 170 106 C 262 104, 312 82, 304 50 C 297 22, 236 10, 150 12"
                />
              </svg>
              <a className="pf-btn pf-btn--big" href={CONTACT_URL} target="_blank" rel="noreferrer">{CTA_LABEL}</a>
            </div>
          </div>
          <footer className="pf-foot">
            <span>© 2026 אמיר שאול</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
            <span className="pf-foot__ok"><span className="pf-dot" aria-hidden="true" /> כל המערכות פועלות</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
