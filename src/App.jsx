import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Code2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  Mail, 
  Github,
  Lock,
  LogOut,
  ArrowRightLeft,
  UserPlus,
  CheckCircle2,
  Circle,
  Trash2,
  KeyRound
} from 'lucide-react';

// ==========================================
// חלק 1: הגדרות ומערכת KALI DASHBOARD
// ==========================================

const KALI_ACCESS_PASS = "123456";

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

function KaliDashboardView() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kali_auth') === 'true';
    }
    return false;
  });
  const [inputPass, setInputPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'ישראל ישראלי',
      email: 'israel@kali.co.il',
      department: 'פיתוח',
      type: 'onboarding',
      completedTasks: [0, 1]
    }
  ]);
  const [selectedUserId, setSelectedUserId] = useState('1');

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newType, setNewType] = useState('onboarding');

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPass === KALI_ACCESS_PASS) {
      localStorage.setItem('kali_auth', 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('סיסמה שגויה, נסה שוב');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kali_auth');
    setIsAuthenticated(false);
    setInputPass('');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser = {
      id: Date.now().toString(),
      name: newName,
      email: newEmail,
      department: newDept || 'כללי',
      type: newType,
      completedTasks: []
    };

    setUsers([newUser, ...users]);
    setSelectedUserId(newUser.id);
    setNewName('');
    setNewEmail('');
    setNewDept('');
  };

  const toggleTask = (taskIndex) => {
    const selectedUser = users.find(u => u.id === selectedUserId);
    if (!selectedUser) return;

    const isCompleted = selectedUser.completedTasks.includes(taskIndex);
    const updatedTasks = isCompleted
      ? selectedUser.completedTasks.filter(i => i !== taskIndex)
      : [...selectedUser.completedTasks, taskIndex];

    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, completedTasks: updatedTasks } : u));
  };

  const handleDeleteUser = (id, e) => {
    e.stopPropagation();
    const filtered = users.filter(u => u.id !== id);
    setUsers(filtered);
    if (selectedUserId === id) setSelectedUserId(filtered[0]?.id || null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100" dir="rtl">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/10 rounded-full border border-blue-500/20 text-blue-400">
              <Lock size={28} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center mb-1">כניסה למערכת IT</h1>
          <p className="text-xs text-slate-400 text-center mb-6">הזן סיסמת גישה לצפייה במערכת</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="הזן סיסמה"
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-left placeholder:text-right"
                  autoFocus
                />
                <KeyRound size={16} className="absolute left-3 top-3 text-slate-500" />
              </div>
              {errorMsg && <p className="text-rose-400 text-xs mt-2">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 text-sm font-medium transition"
            >
              התחבר
            </button>
          </form>
        </div>
      </div>
    );
  }

  const selectedUser = users.find(u => u.id === selectedUserId);
  const currentTasks = selectedUser?.type === 'offboarding' ? OFFBOARDING_TASKS : ONBOARDING_TASKS;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans" dir="rtl">
      <div className="w-96 border-l border-slate-800 bg-slate-900/50 flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ArrowRightLeft className="text-blue-400" size={18} />
            IT Boarding System
          </h2>
          <button
            onClick={handleLogout}
            title="התנתק"
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition"
          >
            <LogOut size={16} />
          </button>
        </div>

        <form onSubmit={handleAddUser} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 mb-4 space-y-2">
          <input
            type="text"
            placeholder="שם מלא"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="כתובת מייל"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="מחלקה"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="onboarding">קליטה (On)</option>
              <option value="offboarding">עזיבה (Off)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-1.5 text-sm font-medium transition flex items-center justify-center gap-1 mt-1"
          >
            <UserPlus size={16} /> הוסף עובד
          </button>
        </form>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {users.map((user) => {
            const isSelected = user.id === selectedUserId;
            const isOff = user.type === 'offboarding';
            const total = isOff ? OFFBOARDING_TASKS.length : ONBOARDING_TASKS.length;
            const progress = Math.round((user.completedTasks.length / total) * 100);

            return (
              <div
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`p-3 rounded-xl cursor-pointer border transition flex flex-col gap-1.5 ${
                  isSelected ? 'bg-blue-600/15 border-blue-500/50' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{user.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isOff ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {isOff ? 'עזיבה' : 'קליטה'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteUser(user.id, e)}
                    className="text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="text-xs text-slate-400">{user.department} • {user.email}</div>
                
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${isOff ? 'bg-amber-500' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {selectedUser ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{selectedUser.name}</h1>
                  <p className="text-slate-400 text-sm mt-0.5">{selectedUser.email} | מחלקת {selectedUser.department}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  selectedUser.type === 'offboarding' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {selectedUser.type === 'offboarding' ? 'תהליך עזיבה' : 'תהליך קליטה'}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>התקדמות המשימות</span>
                  <span>{selectedUser.completedTasks.length} מתוך {currentTasks.length} הושלמו</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${selectedUser.type === 'offboarding' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${(selectedUser.completedTasks.length / currentTasks.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400 px-1">צ'ק-ליסט פעולות:</h3>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800/60 overflow-hidden">
                {currentTasks.map((task, index) => {
                  const isDone = selectedUser.completedTasks.includes(index);
                  return (
                    <div
                      key={index}
                      onClick={() => toggleTask(index)}
                      className={`p-4 flex items-center justify-between cursor-pointer transition select-none ${
                        isDone ? 'bg-slate-800/20' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <span className={`text-sm ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                      ) : (
                        <Circle className="text-slate-600 shrink-0" size={20} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            בחר עובד מהרשימה או הוסף עובד חדש
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// חלק 2: דף הבית
// ==========================================

const iconsMap = {
  Layout,
  Github,
  ShieldCheck,
  ArrowUpRight,
  Code2,
  Mail,
  HelpCircle
};

const SafeIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = iconsMap[name] || Code2;
  return <IconComponent size={size} className={className} />;
};

const MY_PROJECTS = [
  {
    iconName: "Layout",
    title: "Lab Instance",
    desc: "ניסויים ב-Frontend ורכיבי React מתקדמים.",
    link: "lab.amirshaul.online",
    gradient: "from-cyan-950/30 via-[#020617] to-[#020617]"
  },
  {
    iconName: "ShieldCheck",
    title: "Secure Form",
    desc: "מערכת יצירת קשר מאובטחת עם הגנת ספאם.",
    link: "form.amirshaul.online",
    gradient: "from-blue-950/30 via-[#020617] to-[#020617]"
  },
  {
    iconName: "Code2",
    title: "Core System",
    desc: "ארכיטקטורת מערכת מבוססת Vercel ו-Vite.",
    link: "amirshaul.online",
    gradient: "from-purple-950/30 via-[#020617] to-[#020617]"
  },
];

const ProjectCard = ({ iconName, title, desc, link, gradient }) => (
  <div className="relative group h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-[#020617] transition-transform duration-300 hover:-translate-y-2">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />

    <div className="relative h-full p-8 flex flex-col items-center text-center justify-end z-10">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
        <SafeIcon name={iconName} size={32} />
      </div>
      
      <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tighter">{title}</h3>
      <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-[240px] font-medium drop-shadow-md">
        {desc}
      </p>
      
      <a 
        href={`https://${link}`} 
        target="_blank" 
        rel="noreferrer"
        aria-label={`Access ${title}`}
        className="w-full py-4 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 rounded-2xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Access System</span>
        <SafeIcon name="ArrowUpRight" size={14} />
      </a>
    </div>
  </div>
);

function HomePageView() {
  return (
    <div className="min-h-screen bg-[#020617] w-full flex flex-col items-center relative overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.15),transparent_60%)]" />

      <a
        href="https://form.amirshaul.online"
        target="_blank"
        rel="noreferrer"
        className="fixed top-6 left-6 z-[100] px-5 py-3 rounded-full flex items-center space-x-3 transition-all duration-300 group
                   bg-[#020617]/90 border border-cyan-500/30 text-cyan-400
                   font-mono text-[11px] font-bold tracking-[0.25em] uppercase
                   hover:bg-cyan-500 hover:text-black hover:border-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
      >
        <Mail size={16} className="transition-transform duration-300 group-hover:scale-110" />
        <span className="relative">
          CONTACT US
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"></span>
        </span>
      </a>

      <main className="relative z-10 flex flex-col items-center w-full max-w-7xl px-6 py-24">
        <section className="text-center mb-32 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>IT SYSTEM ENGINEER</span>
            </div>

            <h1 className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter text-white mb-6 italic uppercase">
              Amir.<br />
              <span className="text-slate-400 not-italic">Shaul</span>
            </h1>

            <p className="text-sm md:text-xl text-cyan-400 font-mono tracking-widest max-w-2xl mx-auto mb-4 uppercase font-semibold">
              SYSTEM ADMINISTRATOR | WEB DESIGNER | SEO
            </p>

            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-16 leading-relaxed font-bold uppercase tracking-wide">
              "System & Web Architect."
            </p>

            <div className="flex justify-center space-x-8 items-center">
              <a href="https://github.com/amirshaul" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center space-x-2 no-underline">
                <SafeIcon name="Github" size={20} />
                <span className="text-xs font-black tracking-widest uppercase">Code</span>
              </a>
              
              <div className="w-px h-4 bg-white/10 self-center" />

              <motion.a 
                href="https://form.amirshaul.online" 
                className="text-cyan-400 flex items-center space-x-2 no-underline"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <SafeIcon name="Mail" size={20} />
                <span className="text-xs font-black tracking-widest uppercase">Contact</span>
              </motion.a>

              <div className="w-px h-4 bg-white/10 self-center" />

              <div className="text-cyan-400 flex items-center space-x-2">
                <SafeIcon name="ShieldCheck" size={20} />
                <span className="text-xs font-black tracking-widest uppercase text-slate-400">Verified</span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-400 mb-4">Network Instances</h2>
            <div className="w-16 h-[2px] bg-cyan-500/50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {MY_PROJECTS.map((project, index) => (
              <ProjectCard 
                key={index}
                iconName={project.iconName}
                title={project.title}
                desc={project.desc}
                link={project.link}
                gradient={project.gradient}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full text-center py-16 mt-20 border-t border-white/5 bg-white/[0.01] relative z-10">
        <p className="text-[10px] font-bold tracking-[0.7em] text-slate-400 uppercase">
          © 2026 AMIRSHAUL.ONLINE | All Systems Nominal
        </p>
      </footer>
    </div>
  );
}

// ==========================================
// חלק 3: זיהוי נתיב ורינדור
// ==========================================

export default function App() {
  const getIsKali = () => {
    if (typeof window === 'undefined') return false;
    const url = window.location.href.toLowerCase();
    return url.includes('kali');
  };

  const [isKali, setIsKali] = useState(getIsKali);

  useEffect(() => {
    const checkURL = () => {
      setIsKali(getIsKali());
    };

    checkURL();
    window.addEventListener('popstate', checkURL);
    window.addEventListener('hashchange', checkURL);

    return () => {
      window.removeEventListener('popstate', checkURL);
      window.removeEventListener('hashchange', checkURL);
    };
  }, []);

  if (isKali) {
    return <KaliDashboardView />;
  }

  return <HomePageView />;
}
