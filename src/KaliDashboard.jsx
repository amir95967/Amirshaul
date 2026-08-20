import React, { useState, useEffect } from 'react';
import { Lock, LogOut, ArrowRightLeft, UserPlus, CheckCircle2, Circle, Trash2, KeyRound } from 'lucide-react';

const KALI_ACCESS_PASS = "123456"; // שנה לסיסמה שתרצה

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

export default function KaliDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    if (localStorage.getItem('kali_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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
      {/* סרגל צד */}
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

        {/* טופס הוספת עובד */}
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

        {/* רשימת עובדים */}
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

      {/* אזור הצ'ק-ליסט */}
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
