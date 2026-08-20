import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Code2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  Mail, 
  Github,
  Server,
  Cloud,
  Lock,
  Cpu,
  Database,
  Terminal
} from 'lucide-react';

const iconsMap = {
  Layout,
  Github,
  ShieldCheck,
  ArrowUpRight,
  Code2,
  Mail,
  HelpCircle,
  Server,
  Cloud,
  Lock,
  Cpu,
  Database,
  Terminal
};

const SafeIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = iconsMap[name] || Code2;
  return <IconComponent size={size} className={className} />;
};

const SKILLS = [
  { icon: "Cloud", title: "AWS & Entra ID", desc: "ניהול סביבות ענן היברידיות, SSO, MFA והגדרת מדיניות אבטחת מידע וזהויות." },
  { icon: "Server", title: "Microsoft 365 & Exchange", desc: "ניהול תיבות דואר ארגוניות, ניתוב דואר, מניעת ספאם, Teams ו-SharePoint." },
  { icon: "Terminal", title: "שרתי Terminal ו-RDS", desc: "הקמה ותחזוקת שרתי Terminal, גישה מרחוק מאובטחת וחלוקת משאבים." },
  { icon: "Cpu", title: "אוטומציה וסקריפטים", desc: "אוטומציית משימות סיסטם שגרתיות ושילוב כלי AI לייעול תהליכי עבודה." },
  { icon: "Lock", title: "Active Directory & רשתות", desc: "ניהול Forest/Domain, הגדרות GPO קפדניות, הרשאות NTFS ותשתיות DNS/DHCP." },
  { icon: "Database", title: "ניהול מערכות SAP", desc: "ניהול הרשאות ותחזוקת סביבות SAP מורכבות, טיפול במשתמשים ותמיכה תפעולית." }
];

const EXPERIENCE = [
  {
    role: "System Administrator",
    company: "קבוצת קלי (Kali Group)",
    period: "יולי 2025 - נוכחי",
    desc: "ניהול תשתיות המחשוב והתקשורת הארגוניות של הקבוצה. הובלת תהליכי תצורה ב-Microsoft 365 ו-Entra ID, ניהול שרתי Exchange ו-RDS, הגדרת הרשאות משתמשים ומדיניות אבטחה."
  },
  {
    role: "IT Specialist & System Support",
    company: "Matrix",
    period: "מרץ 2024 - יולי 2025",
    desc: "מתן פתרונות מחשוב וסיסטם מתקדמים, ליווי ותחזוקת סביבות עבודה מרחוק (Remote Workspaces), פתרון תקלות תשתית מורכבות ברמת השרתים ותחנות הקצה."
  },
  {
    role: "System Administrator & SAP Manager",
    company: "צה\"ל (IDF)",
    period: "מרץ 2020 - נובמבר 2022",
    desc: "שירות צבאי מלא כמנהל מערכות מידע ו-SAP. ניהול משתמשים והרשאות ב-Active Directory, טיפול שוטף בתשתיות סיסטם ורשתות ותמיכה במערכות קריטיות."
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black" dir="rtl">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.12),transparent_60%)]" />

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto p-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-sm shadow-[0_4px_12px_rgba(6,182,212,0.2)]">
            AS
          </div>
          <span className="font-mono text-xs text-slate-400 tracking-wider">AMIR.SHAUL // SYS_ADMIN</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <a 
            href="https://www.linkedin.com/in/amir-shaul/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://form.amirshaul.online" 
            target="_blank" 
            rel="noreferrer" 
            className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            יצירת קשר / Contact
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col space-y-24 relative z-10">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>IT SYSTEM ADMINISTRATOR & NETWORK SPECIALIST</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              אמיר שאול <br />
              <span className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-mono">
                Amir Shaul // SysAdmin
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
              <strong className="text-white font-bold">מהנדס סיסטם (IT System Engineer) ומנהל רשתות</strong> בעל ניסיון רב בהקמה, ניהול ותחזוקת תשתיות IT ארגוניות מורכבות. התמחות מעמיקה בתשתיות ענן <strong className="text-white">AWS</strong>, סביבות <strong className="text-white">Microsoft 365</strong>, ניהול זהויות והרשאות ב-<strong className="text-white">Entra ID & Active Directory</strong>, שרתי Exchange ו-Terminal Servers (RDS).
            </p>

            <div className="flex gap-2 font-mono text-xs flex-wrap">
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">📍 אזור מרכז ותל אביב</span>
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">☁️ AWS & M365</span>
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">🔑 Entra ID & AD</span>
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">🖥️ RDS & Networks</span>
            </div>
          </div>

          {/* Profile Card */}
          <aside className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5 backdrop-blur-sm">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <span>sysadmin_profile.env</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-md opacity-40"></div>
                <img 
                  src="/amir.jpg" 
                  alt="אמיר שאול" 
                  className="relative w-full h-full object-cover rounded-2xl border-2 border-cyan-500/50"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">אמיר שאול</h2>
                <p className="font-mono text-xs text-cyan-400 font-semibold">IT System Engineer</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-[10px] font-mono text-blue-400">
                  10,000+ Connections
                </span>
              </div>
            </div>

            <div className="font-mono text-xs space-y-1.5 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
              <p><span className="text-cyan-400">amir@shaul:~$</span> status --verbose</p>
              <p><span className="text-slate-500">Company:</span> Kali Group</p>
              <p><span className="text-slate-500">Location:</span> Holon / Tel Aviv</p>
            </div>

            <a 
              href="https://form.amirshaul.online" 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-center font-mono text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              SEND MESSAGE // צור קשר
            </a>
          </aside>
        </section>

        {/* Competencies Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
            <h2 className="text-cyan-400 font-bold">// CORE IT & SYSTEM COMPETENCIES</h2>
            <span className="text-slate-500">תחומי התמחות בסיסטם</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SKILLS.map((skill, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-cyan-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <SafeIcon name={skill.icon} size={18} />
                </div>
                <h3 className="text-sm font-bold text-white font-mono">{skill.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
            <h2 className="text-cyan-400 font-bold">// PROFESSIONAL EXPERIENCE</h2>
            <span className="text-slate-500">ניסיון תעסוקתי</span>
          </div>

          <div className="space-y-4">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <h3 className="text-base font-bold text-white">
                    {exp.role} <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-mono text-xs">
            <h2 className="text-cyan-400 font-bold">// EDUCATION & QUALIFICATIONS</h2>
            <span className="text-slate-500">השכלה והסמכות</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
              <span className="text-cyan-400 font-mono text-xs">2022 - 2024</span>
              <h3 className="text-sm font-bold text-white">הנדסאי תוכנה ופיתוח Full Stack</h3>
              <p className="text-xs text-slate-400">מכללות אורט (ORT Colleges)</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
              <span className="text-cyan-400 font-mono text-xs">2013 - 2019</span>
              <h3 className="text-sm font-bold text-white">תעודת בגרות מלאה</h3>
              <p className="text-xs text-slate-400">תיכון הרצוג חולון</p>
            </div>
          </div>
        </section>

        {/* CTA Contact Box */}
        <section className="p-8 md:p-12 bg-gradient-to-r from-slate-900 to-[#020617] border border-cyan-500/30 rounded-3xl flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl font-black text-white">מעוניינים בחיזוק מערך ה-IT והסיסטם בארגון?</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
            זמין להובלת תשתיות IT, ענן וניהול רשתות באזור המרכז ותל אביב (היברידי או On-site).
          </p>
          <div className="flex items-center gap-3 font-mono text-xs">
            <a 
              href="https://form.amirshaul.online" 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              יצירת קשר / Contact Form
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-xs font-mono text-slate-500 border-t border-slate-900">
        © 2026 AMIR SHAUL | ALL SYSTEMS OPERATIONAL
      </footer>
    </div>
  );
}
