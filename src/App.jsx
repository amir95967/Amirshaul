import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Code2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  Mail, 
  Server,
  Cloud,
  Lock,
  Cpu,
  Database,
  Terminal,
  Trash2,
  CheckCircle2,
  Circle
} from 'lucide-react';

const SUPABASE_URL = "https://zlfywwidgafrkttixzez.supabase.co";
const SUPABASE_KEY = "sb_publishable_M2omv18OIuF5ulkLbDhh7g_P1m1OLgU";
const KALI_PASSWORD = "123456";

// Supabase REST Helper
const db = {
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  async getEmployees() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/employees?select=*&order=created_at.desc`, {
      headers: this.headers
    });
    return res.ok ? await res.json() : [];
  },
  async addEmployee(emp) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/employees`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(emp)
    });
    return res.ok;
  },
  async updateTasks(id, completed) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/employees?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ completed })
    });
    return res.ok;
  },
  async deleteEmployee(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/employees?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return res.ok;
  }
};

const ONBOARDING_TASKS = [
  'פתיחת משתמש ב-Active Directory / 365',
  'שיוך רישיונות (M365, Teams וכו׳)',
  'הוספה לקבוצות תפוצה ומחלקות',
  'הכנת מחשב נייד והתקנת תוכנות',
  'הגדרת גישת VPN / MFA',
  'מסירת ציוד ושליחת פרטי התחברות'
];

const OFFBOARDING_TASKS = [
  'חסימת משתמש (Disable Account)',
  'איפוס סיסמה וניתוק מכל ה-Sessions',
  'המרת תיבה ל-Shared ושלילת רישיונות',
  'הסרה מכל קבוצות התפוצה וה-Security',
  'איסוף מחשב, ציוד היקפי וביטול שיוך ב-MDM',
  'גיבוי קבצי OneDrive/מחשב מקומי'
];

const iconsMap = {
  Layout,
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
  const [isKaliRoute, setIsKaliRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newType, setNewType] = useState('onboarding');

  useEffect(() => {
    const checkUrl = () => {
      const url = window.location.href.toLowerCase();
      setIsKaliRoute(url.includes('kali'));
    };

    checkUrl();
    window.addEventListener('popstate', checkUrl);
    window.addEventListener('hashchange', checkUrl);

    if (localStorage.getItem('kali_auth_session') === 'true') {
      setIsAuthenticated(true);
    }

    return () => {
      window.removeEventListener('popstate', checkUrl);
      window.removeEventListener('hashchange', checkUrl);
    };
  }, []);

  useEffect(() => {
    if (isKaliRoute && isAuthenticated) {
      loadEmployees();
    }
  }, [isKaliRoute, isAuthenticated]);

  const loadEmployees = async () => {
    try {
      const data = await db.getEmployees();
      const formatted = (data || []).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        department: u.department,
        type: u.type,
        completed: Array.isArray(u.completed) ? u.completed : []
      }));
      setEmployees(formatted);
      if (!selectedId && formatted.length > 0) {
        setSelectedId(formatted[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === KALI_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
      localStorage.setItem('kali_auth_session', 'true');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kali_auth_session');
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newEmp = {
      id: Date.now().toString(),
      name: newName,
      email: newEmail,
      department: newDept || 'כללי',
      type: newType,
      completed: []
    };

    setEmployees([newEmp, ...employees]);
    setSelectedId(newEmp.id);
    setNewName('');
    setNewEmail('');
    setNewDept('');

    await db.addEmployee(newEmp);
  };

  const handleToggleTask = async (taskIndex) => {
    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const isCompleted = currentEmp.completed.includes(taskIndex);
    const updatedCompleted = isCompleted
      ? currentEmp.completed.filter(i => i !== taskIndex)
      : [...currentEmp.completed, taskIndex];

    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, completed: updatedCompleted } : emp
    );

    setEmployees(updatedEmployees);
    await db.updateTasks(selectedId, updatedCompleted);
  };

  const handleDeleteEmployee = async (id, e) => {
    e.stopPropagation();
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    if (selectedId === id) {
      setSelectedId(updated[0]?.id || null);
    }
    await db.deleteEmployee(id);
  };

  // ================= KALI VIEW =================
  if (isKaliRoute) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 font-sans" dir="rtl">
          <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto text-2xl">
              <Lock size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">כניסה למערכת IT</h2>
              <p className="font-mono text-xs text-slate-400 mt-1">Kali Group Boarding</p>
            </div>
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              placeholder="הזן סיסמה" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
            />
            {authError && <p className="text-xs text-rose-500">סיסמה שגויה, נסה שוב</p>}
            <button type="submit" className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              התחבר למערכת
            </button>
          </form>
        </div>
      );
    }

    const selectedEmployee = employees.find(e => e.id === selectedId);
    const activeTasks = selectedEmployee?.type === 'offboarding' ? OFFBOARDING_TASKS : ONBOARDING_TASKS;

    return (
      <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row font-sans" dir="rtl">
        {/* Sidebar */}
        <div className="w-full md:w-96 border-l border-slate-800 bg-slate-900/60 p-6 flex flex-col shrink-0">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <h1 className="font-mono text-base font-bold text-cyan-400 flex items-center gap-2">
              <Terminal size={18} />
              IT BOARDING
            </h1>
            <button onClick={handleLogout} className="font-mono text-xs text-rose-400 hover:text-rose-300">
              יציאה
            </button>
          </div>

          <form onSubmit={handleAddEmployee} className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3 mb-6">
            <input 
              type="text" 
              placeholder="שם מלא" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
            />
            <input 
              type="email" 
              placeholder="כתובת מייל" 
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)} 
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
            />
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="מחלקה" 
                value={newDept} 
                onChange={e => setNewDept(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
              <select 
                value={newType} 
                onChange={e => setNewType(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              >
                <option value="onboarding">קליטה (On)</option>
                <option value="offboarding">עזיבה (Off)</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs rounded-lg transition-all">
              + הוסף עובד ל-Cloud
            </button>
          </form>

          <div className="flex-1 overflow-y-auto space-y-2">
            {employees.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-6 font-mono">אין עובדים במערכת</p>
            ) : (
              employees.map(emp => {
                const isOff = emp.type === 'offboarding';
                const total = isOff ? OFFBOARDING_TASKS.length : ONBOARDING_TASKS.length;
                const prog = Math.round((emp.completed.length / total) * 100);
                const isSelected = emp.id === selectedId;

                return (
                  <div 
                    key={emp.id} 
                    onClick={() => setSelectedId(emp.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm' 
                        : 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{emp.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isOff ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {isOff ? 'עזיבה' : 'קליטה'}
                        </span>
                        <button onClick={(e) => handleDeleteEmployee(emp.id, e)} className="text-slate-500 hover:text-rose-400 p-1">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{emp.department} • {emp.email}</div>
                    <div className="w-full h-1 bg-slate-900 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full ${isOff ? 'bg-amber-400' : 'bg-cyan-400'}`} style={{ width: `${prog}%` }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Details Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {selectedEmployee ? (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedEmployee.name}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">{selectedEmployee.email} | מחלקת {selectedEmployee.department}</p>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-mono ${
                  selectedEmployee.type === 'offboarding' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {selectedEmployee.type === 'offboarding' ? 'תהליך עזיבה (Offboarding)' : 'תהליך קליטה (Onboarding)'}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-mono text-xs text-cyan-400 font-bold">// צ'ק-ליסט משימות סיסטם:</h3>
                {activeTasks.map((task, idx) => {
                  const isDone = selectedEmployee.completed.includes(idx);
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleToggleTask(idx)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                        isDone 
                          ? 'bg-slate-950/30 border-slate-800 text-slate-500 line-through' 
                          : 'bg-slate-900/50 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{task}</span>
                      {isDone ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> : <Circle size={18} className="text-slate-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs font-mono">
              בחר עובד מהרשימה או הוסף עובד חדש
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= MAIN PORTFOLIO SITE =================
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black" dir="rtl">
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

      <footer className="w-full text-center py-8 text-xs font-mono text-slate-500 border-t border-slate-900">
        © 2026 AMIR SHAUL | ALL SYSTEMS OPERATIONAL
      </footer>
    </div>
  );
}
