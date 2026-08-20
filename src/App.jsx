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
  Circle, 
  User, 
  Clock, 
  Laptop, 
  Download, 
  Plus, 
  Calendar, 
  Send,
  Search,
  Filter
} from 'lucide-react';

const SUPABASE_URL = "https://zlfywwidgafrkttixzez.supabase.co";
const SUPABASE_KEY = "sb_publishable_M2omv18OIuF5ulkLbDhh7g_P1m1OLgU";

const db = {
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  async login(username, password) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/it_users?username=eq.${username.trim()}&password=eq.${password.trim()}&select=username,full_name`, {
        headers: this.headers
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error(err);
      return null;
    }
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
  async updateEmployee(id, payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/employees?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(payload)
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
  'פתיחת משתמש ב-Active Directory / Entra ID',
  'שיוך רישיונות (Microsoft 365, Teams)',
  'הוספה לקבוצות תפוצה, אבטחה ומחלקות',
  'הכנת מחשב נייד, התקנת סביבה ותוכנות',
  'הגדרת אימות רב-שלבי (MFA) וחיבור VPN',
  'מסירת ציוד והדרכת משתמש ראשונית'
];

const OFFBOARDING_TASKS = [
  'חסימת משתמש (Disable Account) ב-AD/Entra',
  'איפוס סיסמה וניתוק מכל ה-Active Sessions',
  'המרת תיבה ל-Shared ושלילת רישיונות M365',
  'הסרה מכל קבוצות התפוצה וה-Security Groups',
  'איסוף מחשב וציוד היקפי וביטול שיוך ב-MDM',
  'גיבוי קבצי OneDrive ומחשב מקומי לארכיון'
];

const iconsMap = { Layout, ShieldCheck, ArrowUpRight, Code2, Mail, HelpCircle, Server, Cloud, Lock, Cpu, Database, Terminal };
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
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'in_progress', 'completed'
  
  // New Employee Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newManager, setNewManager] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newType, setNewType] = useState('onboarding');

  // Tabs
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'assets', 'notes'
  const [newAssetItem, setNewAssetItem] = useState('');
  const [newAssetSerial, setNewAssetSerial] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    const checkUrl = () => {
      const url = window.location.href.toLowerCase();
      setIsKaliRoute(url.includes('kali'));
    };

    checkUrl();
    window.addEventListener('popstate', checkUrl);
    window.addEventListener('hashchange', checkUrl);

    const savedUser = localStorage.getItem('kali_current_user');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }

    return () => {
      window.removeEventListener('popstate', checkUrl);
      window.removeEventListener('hashchange', checkUrl);
    };
  }, []);

  useEffect(() => {
    if (isKaliRoute && currentUser) {
      loadEmployees();
    }
  }, [isKaliRoute, currentUser]);

  const loadEmployees = async () => {
    try {
      const data = await db.getEmployees();
      const formatted = (data || []).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        department: u.department || 'כללי',
        role: u.role || 'עובד/ת',
        manager: u.manager || '',
        target_date: u.target_date || '',
        type: u.type || 'onboarding',
        completed: (u.completed && typeof u.completed === 'object' && !Array.isArray(u.completed)) ? u.completed : {},
        assets: Array.isArray(u.assets) ? u.assets : [],
        notes: Array.isArray(u.notes) ? u.notes : []
      }));
      setEmployees(formatted);
      if (!selectedId && formatted.length > 0) {
        setSelectedId(formatted[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) return;
    
    setIsCheckingAuth(true);
    setAuthError(false);

    const user = await db.login(usernameInput, passwordInput);
    setIsCheckingAuth(false);

    if (user) {
      setCurrentUser(user);
      setAuthError(false);
      localStorage.setItem('kali_current_user', JSON.stringify(user));
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kali_current_user');
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newEmp = {
      id: Date.now().toString(),
      name: newName,
      email: newEmail,
      department: newDept || 'כללי',
      role: newRole || 'עובד/ת',
      manager: newManager || '',
      target_date: newTargetDate || '',
      type: newType,
      completed: {},
      assets: [],
      notes: []
    };

    setEmployees([newEmp, ...employees]);
    setSelectedId(newEmp.id);
    setNewName('');
    setNewEmail('');
    setNewDept('');
    setNewRole('');
    setNewManager('');
    setNewTargetDate('');
    setShowAddForm(false);

    await db.addEmployee(newEmp);
  };

  const handleToggleTask = async (taskIndex) => {
    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const completedObj = { ...currentEmp.completed };
    const taskKey = String(taskIndex);

    if (completedObj[taskKey]) {
      delete completedObj[taskKey];
    } else {
      const now = new Date();
      const timeStr = `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      completedObj[taskKey] = {
        by: currentUser?.full_name || currentUser?.username || 'סיסטם',
        at: timeStr
      };
    }

    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, completed: completedObj } : emp
    );

    setEmployees(updatedEmployees);
    await db.updateEmployee(selectedId, { completed: completedObj });
  };

  const handleAddAsset = async (e) => {
    e.preventDefault();
    if (!newAssetItem) return;

    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const newAsset = {
      id: Date.now().toString(),
      item: newAssetItem,
      serial: newAssetSerial || 'N/A',
      assigned_by: currentUser?.full_name || 'IT',
      date: new Date().toLocaleDateString('he-IL')
    };

    const updatedAssets = [...currentEmp.assets, newAsset];
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, assets: updatedAssets } : emp
    );

    setEmployees(updatedEmployees);
    setNewAssetItem('');
    setNewAssetSerial('');
    await db.updateEmployee(selectedId, { assets: updatedAssets });
  };

  const handleDeleteAsset = async (assetId) => {
    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const updatedAssets = currentEmp.assets.filter(a => a.id !== assetId);
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, assets: updatedAssets } : emp
    );

    setEmployees(updatedEmployees);
    await db.updateEmployee(selectedId, { assets: updatedAssets });
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const now = new Date();
    const timeStr = `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newNote = {
      id: Date.now().toString(),
      text: newNoteText,
      author: currentUser?.full_name || currentUser?.username || 'IT',
      time: timeStr
    };

    const updatedNotes = [newNote, ...currentEmp.notes];
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, notes: updatedNotes } : emp
    );

    setEmployees(updatedEmployees);
    setNewNoteText('');
    await db.updateEmployee(selectedId, { notes: updatedNotes });
  };

  const handleDeleteEmployee = async (id, e) => {
    e.stopPropagation();
    if (!confirm('האם למחוק עובד זה מהמערכת?')) return;
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    if (selectedId === id) {
      setSelectedId(updated[0]?.id || null);
    }
    await db.deleteEmployee(id);
  };

  const handleExportCSV = () => {
    if (employees.length === 0) return;
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "שם מלא,אימייל,מחלקה,תפקיד,מנהל,סוג תהליך,סטטוס ביצוע,התקדמות %,תאריך יעד\n";

    employees.forEach(e => {
      const isOff = e.type === 'offboarding';
      const total = isOff ? OFFBOARDING_TASKS.length : ONBOARDING_TASKS.length;
      const count = Object.keys(e.completed || {}).length;
      const prog = Math.round((count / total) * 100);
      const statusText = prog === 100 ? 'הושלם' : 'בתהליך';
      csvContent += `"${e.name}","${e.email}","${e.department}","${e.role}","${e.manager}","${isOff ? 'עזיבה' : 'קליטה'}","${statusText}","${prog}%","${e.target_date}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kali_it_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered employees list
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());

    const isOff = emp.type === 'offboarding';
    const total = isOff ? OFFBOARDING_TASKS.length : ONBOARDING_TASKS.length;
    const count = Object.keys(emp.completed || {}).length;
    const isCompleted = count === total && total > 0;

    if (statusFilter === 'in_progress') return matchesSearch && !isCompleted;
    if (statusFilter === 'completed') return matchesSearch && isCompleted;
    return matchesSearch;
  });

  // ================= KALI VIEW =================
  if (isKaliRoute) {
    if (!currentUser) {
      return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Rubik, Arial, sans-serif' }} dir="rtl">
          <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto text-2xl mb-2">
              <Lock size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">כניסת צוות IT</h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Kali Group Enterprise Boarding</p>
            </div>
            <input 
              type="text" 
              value={usernameInput} 
              onChange={(e) => setUsernameInput(e.target.value)} 
              placeholder="שם משתמש" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              placeholder="סיסמה" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {authError && <p className="text-xs text-rose-500 font-medium">שם משתמש או סיסמה שגויים</p>}
            <button 
              type="submit" 
              disabled={isCheckingAuth}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 mt-2"
            >
              {isCheckingAuth ? 'מאמת משתמש...' : 'התחבר למערכת'}
            </button>
          </form>
        </div>
      );
    }

    const selectedEmployee = employees.find(e => e.id === selectedId);
    const activeTasks = selectedEmployee?.type === 'offboarding' ? OFFBOARDING_TASKS : ONBOARDING_TASKS;
    const selectedCompletedCount = Object.keys(selectedEmployee?.completed || {}).length;
    const isSelectedFullyDone = selectedCompletedCount === activeTasks.length && activeTasks.length > 0;

    return (
      <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Rubik, Arial, sans-serif' }} dir="rtl">
        
        {/* Sidebar */}
        <div className="w-full md:w-96 border-l border-slate-800 bg-slate-900/70 p-5 flex flex-col shrink-0">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h1 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                <Terminal size={18} />
                מערכת קליטה ועזיבה
              </h1>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
                <User size={13} className="text-cyan-400" />
                מחובר: <strong className="text-white">{currentUser.full_name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleExportCSV} title="ייצוא לאקסל (CSV)" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <Download size={15} />
              </button>
              <button onClick={handleLogout} className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 font-bold transition-colors">
                יציאה
              </button>
            </div>
          </div>

          {/* Quick Action Button & Filters */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute right-3 top-3 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="חיפוש עובד/ת לפי שם או מחלקה..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <button 
                onClick={() => setShowAddForm(!showAddForm)} 
                className="p-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1"
              >
                <Plus size={16} />
                <span>{showAddForm ? 'סגור' : 'חדש'}</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              <button 
                onClick={() => setStatusFilter('all')} 
                className={`flex-1 py-1 rounded-lg transition-all ${statusFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                הכל ({employees.length})
              </button>
              <button 
                onClick={() => setStatusFilter('in_progress')} 
                className={`flex-1 py-1 rounded-lg transition-all ${statusFilter === 'in_progress' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                בתהליך
              </button>
              <button 
                onClick={() => setStatusFilter('completed')} 
                className={`flex-1 py-1 rounded-lg transition-all ${statusFilter === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                הושלמו
              </button>
            </div>
          </div>

          {/* Form Create Modal/Expandable */}
          {showAddForm && (
            <form onSubmit={handleAddEmployee} className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 space-y-2.5 mb-4 shadow-lg">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300 pb-1 border-b border-slate-800">
                <span>טופס הוספת עובד/ת חדש/ה</span>
                <span className="text-cyan-400 text-[11px]">סנכרון ענן</span>
              </div>
              <input 
                type="text" 
                placeholder="שם מלא" 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
              <input 
                type="email" 
                placeholder="כתובת מייל ארגונית" 
                value={newEmail} 
                onChange={e => setNewEmail(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="מחלקה" 
                  value={newDept} 
                  onChange={e => setNewDept(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                />
                <input 
                  type="text" 
                  placeholder="תפקיד" 
                  value={newRole} 
                  onChange={e => setNewRole(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="מנהל ישיר" 
                  value={newManager} 
                  onChange={e => setNewManager(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                />
                <input 
                  type="date" 
                  value={newTargetDate} 
                  onChange={e => setNewTargetDate(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500"
                />
              </div>
              <select 
                value={newType} 
                onChange={e => setNewType(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-medium"
              >
                <option value="onboarding">🚀 תהליך קליטה (Onboarding)</option>
                <option value="offboarding">🛑 תהליך עזיבה (Offboarding)</option>
              </select>
              <button type="submit" className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg transition-all shadow-md">
                + שמור עובד למערכת
              </button>
            </form>
          )}

          {/* Employees List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredEmployees.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-8 font-medium">לא נמצאו עובדים התואמים לחיפוש</p>
            ) : (
              filteredEmployees.map(emp => {
                const isOff = emp.type === 'offboarding';
                const total = isOff ? OFFBOARDING_TASKS.length : ONBOARDING_TASKS.length;
                const completedCount = Object.keys(emp.completed || {}).length;
                const prog = Math.round((completedCount / total) * 100);
                const isDone = completedCount === total && total > 0;
                const isSelected = emp.id === selectedId;

                return (
                  <div 
                    key={emp.id} 
                    onClick={() => setSelectedId(emp.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm' 
                        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{emp.name}</span>
                      <div className="flex items-center gap-1.5">
                        {isDone ? (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            ✅ הושלם
                          </span>
                        ) : (
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isOff ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          }`}>
                            {isOff ? 'עזיבה פתוחה' : 'קליטה פתוחה'}
                          </span>
                        )}
                        <button onClick={(e) => handleDeleteEmployee(emp.id, e)} className="text-slate-500 hover:text-rose-400 p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 font-medium">{emp.department} • {emp.role}</div>
                    {emp.target_date && (
                      <div className="text-[11px] text-cyan-400/90 mt-1 flex items-center gap-1 font-medium">
                        <Calendar size={11} />
                        תאריך יעד: {emp.target_date}
                      </div>
                    )}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2.5 overflow-hidden">
                      <div className={`h-full ${isDone ? 'bg-emerald-400' : isOff ? 'bg-amber-400' : 'bg-cyan-400'}`} style={{ width: `${prog}%` }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Main Details Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {selectedEmployee ? (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Header Box */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{selectedEmployee.name}</h2>
                    {isSelectedFullyDone ? (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        ✅ תהליך הושלם במלואו (100%)
                      </span>
                    ) : (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        selectedEmployee.type === 'offboarding' 
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      }`}>
                        {selectedEmployee.type === 'offboarding' ? '🛑 תהליך עזיבה בתהליך' : '🚀 תהליך קליטה בתהליך'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed">
                    {selectedEmployee.email} | מחלקה: {selectedEmployee.department} | תפקיד: {selectedEmployee.role}
                    {selectedEmployee.manager && ` | מנהל: ${selectedEmployee.manager}`}
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 border-b border-slate-800 pb-3 text-sm font-semibold">
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'tasks' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'}`}
                >
                  📋 צ'ק-ליסט סיסטם ({selectedCompletedCount}/{activeTasks.length})
                </button>
                <button 
                  onClick={() => setActiveTab('assets')}
                  className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'assets' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'}`}
                >
                  💻 ציוד ומחשוב ({selectedEmployee.assets?.length || 0})
                </button>
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'notes' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'}`}
                >
                  📝 הערות צוות ({selectedEmployee.notes?.length || 0})
                </button>
              </div>

              {/* Tab 1: Tasks */}
              {activeTab === 'tasks' && (
                <div className="space-y-3">
                  {activeTasks.map((task, idx) => {
                    const taskLog = selectedEmployee.completed?.[String(idx)];
                    const isDone = !!taskLog;

                    return (
                      <div 
                        key={idx} 
                        onClick={() => handleToggleTask(idx)}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none gap-2 ${
                          isDone 
                            ? 'bg-slate-950/40 border-slate-800/80 text-slate-400' 
                            : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isDone ? <CheckCircle2 size={20} className="text-emerald-400 shrink-0" /> : <Circle size={20} className="text-slate-600 shrink-0" />}
                          <span className={`text-sm font-medium ${isDone ? 'line-through text-slate-400' : ''}`}>{task}</span>
                        </div>

                        {isDone && (
                          <div className="flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg self-start sm:self-auto font-medium">
                            <span className="text-cyan-400 font-bold">👤 {taskLog.by}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400 flex items-center gap-1">
                              <Clock size={12} />
                              {taskLog.at}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Assets */}
              {activeTab === 'assets' && (
                <div className="space-y-4">
                  <form onSubmit={handleAddAsset} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-2">
                    <input 
                      type="text" 
                      placeholder="שם הפריט (למשל: Dell Latitude 5440 / מסך 27 אינץ')" 
                      value={newAssetItem} 
                      onChange={e => setNewAssetItem(e.target.value)} 
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                    />
                    <input 
                      type="text" 
                      placeholder="מספר סידורי / Service Tag" 
                      value={newAssetSerial} 
                      onChange={e => setNewAssetSerial(e.target.value)} 
                      className="w-full sm:w-48 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-mono"
                    />
                    <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1">
                      <Plus size={15} />
                      שיוך ציוד
                    </button>
                  </form>

                  <div className="space-y-2">
                    {(!selectedEmployee.assets || selectedEmployee.assets.length === 0) ? (
                      <p className="text-center text-xs text-slate-500 py-6 font-medium">לא שויך ציוד לעובד זה</p>
                    ) : (
                      selectedEmployee.assets.map(asset => (
                        <div key={asset.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Laptop size={20} className="text-cyan-400" />
                            <div>
                              <p className="text-sm font-bold text-white">{asset.item}</p>
                              <p className="text-xs text-slate-400 mt-0.5 font-medium">S/N: {asset.serial} | נמסר ע"י: {asset.assigned_by} ({asset.date})</p>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteAsset(asset.id)} className="text-slate-500 hover:text-rose-400 p-1.5">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Internal Notes */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="הוסף הערה פנימית לצוות ה-IT..." 
                      value={newNoteText} 
                      onChange={e => setNewNoteText(e.target.value)} 
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
                    />
                    <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all flex items-center gap-1">
                      <Send size={14} />
                      שמור
                    </button>
                  </form>

                  <div className="space-y-2">
                    {(!selectedEmployee.notes || selectedEmployee.notes.length === 0) ? (
                      <p className="text-center text-xs text-slate-500 py-6 font-medium">אין הערות פנימיות עבור עובד זה</p>
                    ) : (
                      selectedEmployee.notes.map(n => (
                        <div key={n.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 space-y-1">
                          <p className="text-xs text-slate-200 font-medium leading-relaxed">{n.text}</p>
                          <p className="text-[11px] text-slate-500 font-medium">נכתב ע"י {n.author} • {n.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs font-medium">
              בחר עובד מהרשימה או הוסף עובד חדש
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= MAIN PORTFOLIO SITE =================
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Rubik, Arial, sans-serif' }} dir="rtl">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.12),transparent_60%)]" />

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto p-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-sm shadow-[0_4px_12px_rgba(6,182,212,0.2)]">
            AS
          </div>
          <span className="text-xs text-slate-400 tracking-wider font-bold">AMIR.SHAUL // SYS_ADMIN</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <a href="https://www.linkedin.com/in/amir-shaul/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <span>LinkedIn</span>
          </a>
          <a href="https://form.amirshaul.online" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            יצירת קשר / Contact
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col space-y-24 relative z-10">
        <section className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>IT SYSTEM ADMINISTRATOR & NETWORK SPECIALIST</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              אמיר שאול <br />
              <span className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Amir Shaul // SysAdmin
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
              <strong className="text-white font-bold">מהנדס סיסטם (IT System Engineer) ומנהל רשתות</strong> בעל ניסיון רב בהקמה, ניהול ותחזוקת תשתיות IT ארגוניות מורכבות. התמחות מעמיקה בתשתיות ענן <strong className="text-white font-bold">AWS</strong>, סביבות <strong className="text-white font-bold">Microsoft 365</strong>, ניהול זהויות והרשאות ב-<strong className="text-white font-bold">Entra ID & Active Directory</strong>, שרתי Exchange ו-Terminal Servers (RDS).
            </p>

            <div className="flex gap-2 text-xs font-bold flex-wrap">
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">📍 אזור מרכז ותל אביב</span>
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">☁️ AWS & M365</span>
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">🔑 Entra ID & AD</span>
              <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-slate-300">🖥️ RDS & Networks</span>
            </div>
          </div>

          <aside className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800 font-bold">
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
                <p className="text-xs text-cyan-400 font-bold">IT System Engineer</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-[11px] font-bold text-blue-400">
                  10,000+ Connections
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1.5 text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-medium">
              <p><span className="text-cyan-400 font-bold">amir@shaul:~$</span> status --verbose</p>
              <p><span className="text-slate-400">Company:</span> Kali Group</p>
              <p><span className="text-slate-400">Location:</span> Holon / Tel Aviv</p>
            </div>

            <a href="https://form.amirshaul.online" target="_blank" rel="noreferrer" className="block w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              SEND MESSAGE // צור קשר
            </a>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs font-bold">
            <h2 className="text-cyan-400">// CORE IT & SYSTEM COMPETENCIES</h2>
            <span className="text-slate-500">תחומי התמחות בסיסטם</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SKILLS.map((skill, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-cyan-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <SafeIcon name={skill.icon} size={18} />
                </div>
                <h3 className="text-sm font-bold text-white">{skill.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs font-bold">
            <h2 className="text-cyan-400">// PROFESSIONAL EXPERIENCE</h2>
            <span className="text-slate-500">ניסיון תעסוקתי</span>
          </div>

          <div className="space-y-4">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <h3 className="text-base font-bold text-white">
                    {exp.role} <span className="text-cyan-400 font-normal">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs font-bold">
            <h2 className="text-cyan-400">// EDUCATION & QUALIFICATIONS</h2>
            <span className="text-slate-500">השכלה והסמכות</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
              <span className="text-cyan-400 text-xs font-bold">2022 - 2024</span>
              <h3 className="text-sm font-bold text-white">הנדסאי תוכנה ופיתוח Full Stack</h3>
              <p className="text-xs text-slate-400 font-normal">מכללות אורט (ORT Colleges)</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
              <span className="text-cyan-400 text-xs font-bold">2013 - 2019</span>
              <h3 className="text-sm font-bold text-white">תעודת בגרות מלאה</h3>
              <p className="text-xs text-slate-400 font-normal">תיכון הרצוג חולון</p>
            </div>
          </div>
        </section>

        <section className="p-8 md:p-12 bg-gradient-to-r from-slate-900 to-[#020617] border border-cyan-500/30 rounded-3xl flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl font-black text-white">מעוניינים בחיזוק מערך ה-IT והסיסטם בארגון?</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed font-normal">
            זמין להובלת תשתיות IT, ענן וניהול רשתות באזור המרכז ותל אביב (היברידי או On-site).
          </p>
          <div className="flex items-center gap-3 text-xs font-bold">
            <a href="https://form.amirshaul.online" target="_blank" rel="noreferrer" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              יצירת קשר / Contact Form
            </a>
          </div>
        </section>
      </main>

      <footer className="w-full text-center py-8 text-xs font-bold text-slate-500 border-t border-slate-900">
        © 2026 AMIR SHAUL | ALL SYSTEMS OPERATIONAL
      </footer>
    </div>
  );
}
