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
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Edit2,
  Boxes,
  ShieldAlert,
  KeyRound,
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
      const res = await fetch(`${SUPABASE_URL}/rest/v1/it_users?username=eq.${username.trim()}&password=eq.${password.trim()}&select=id,username,full_name`, {
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
  async getITUsers() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/it_users?select=*&order=created_at.desc`, {
      headers: this.headers
    });
    return res.ok ? await res.json() : [];
  },
  async addITUser(user) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/it_users`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(user)
    });
    return res.ok;
  },
  async updateITUser(id, payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/it_users?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(payload)
    });
    return res.ok;
  },
  async deleteITUser(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/it_users?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return res.ok;
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
  },
  async getInventory() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inventory_items?select=*&order=date_added.desc`, {
      headers: this.headers
    });
    return res.ok ? await res.json() : [];
  },
  async addInventoryBatch(items) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inventory_items`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(items)
    });
    return res.ok;
  },
  async updateInventoryItem(id, payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inventory_items?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(payload)
    });
    return res.ok;
  },
  async deleteInventoryItem(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/inventory_items?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return res.ok;
  }
};

const DEFAULT_ONBOARDING_TASKS = [
  'פתיחת משתמש ב-Active Directory / Entra ID',
  'שיוך רישיונות (Microsoft 365, Teams)',
  'הוספה לקבוצות תפוצה, אבטחה ומחלקות',
  'הכנת מחשב נייד, התקנת סביבה ותוכנות',
  'הגדרת אימות רב-שלבי (MFA) וחיבור VPN',
  'מסירת ציוד והדרכת משתמש ראשונית'
];

const DEFAULT_OFFBOARDING_TASKS = [
  'חסימת משתמש (Disable Account) ב-AD/Entra',
  'איפוס סיסמה וניתוק מכל ה-Active Sessions',
  'המרת תיבה ל-Shared ושלילת רישיונות M365',
  'הסרה מכל קבוצות התפוצה וה-Security Groups',
  'איסוף מחשב וציוד היקפי וביטול שיוך ב-MDM',
  'גיבוי קבצי OneDrive ומחשב מקומי לארכיון'
];

const DEPARTMENT_TEMPLATES = {
  'כספים': [
    'פתיחת משתמש ב-Active Directory / Entra ID',
    'שיוך רישיונות Microsoft 365 Business Premium',
    'הרשאות כניסה למערכת SAP / Priority',
    'הרשאת גישה לתיקיית רשת כספים והנהלת חשבונות',
    'התקנת מחשב נייד עם מסך כפול וחיבור VPN מאובטח',
    'הגדרת אימות רב-שלבי (MFA)'
  ],
  'מערכות מידע': [
    'פתיחת משתמש AD בעל הרשאות Admin ייעודיות',
    'שיוך רישיון M365 E5 / Business Premium',
    'הגדרת גישת AWS Console / IAM / VPN ייעודי',
    'הקצאת מחשב נייד ייעודי לפיתוח וסיסטם',
    'הרשאות גישה לשרתי RDS, Exchange ו-Domain Controllers'
  ],
  'קלי פרימיום': [
    'פתיחת משתמש ב-Active Directory / Entra ID',
    'שיוך רישיונות Microsoft 365',
    'הרשאה לתיקיות לקוחות פרימיום ומערכות ניהול תיקים',
    'הכנת מחשב נייד מנהלי תיקים, עכבר ומטען',
    'הגדרת חיבור דואר Exchange בסמארטפון'
  ],
  'שירות לקוחות': [
    'פתיחת משתמש ב-Active Directory / Entra ID',
    'שיוך רישיונות M365 ותוכנת טלפוניה / מרכזייה',
    'הוספה לקבוצת תפוצה Moked@kali.co.il',
    'הכנת עמדת עבודה, מחשב ואוזניות מוקד',
    'הגדרת גישה למערכת CRM'
  ],
  'משאבי אנוש': [
    'פתיחת משתמש ב-Active Directory / Entra ID',
    'שיוך רישיונות Microsoft 365',
    'הרשאה לתיקיית משאבי אנוש ושכר',
    'הכנת מחשב נייד והגדרת VPN',
    'הוספה לקבוצת תפוצה Hr@kali.co.il'
  ]
};

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
  const [deptFilter, setDeptFilter] = useState('all');

  // Modals
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);

  // IT Users Management
  const [itUsersList, setItUsersList] = useState([]);
  const [newITUser, setNewITUser] = useState({ username: '', full_name: '', password: '' });

  // Inventory Pool
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryFilter, setInventoryFilter] = useState('all'); // 'all', 'in_stock', 'assigned', 'returned'
  const [newBatchItem, setNewBatchItem] = useState('מחשב נייד Dell Latitude');
  const [newBatchCategory, setNewBatchCategory] = useState('מחשב נייד');
  const [newBatchQty, setNewBatchQty] = useState(1);
  const [newBatchPrefix, setNewBatchPrefix] = useState('KALI-');

  // Edit Employee Form
  const [editForm, setEditForm] = useState({ name: '', email: '', department: '', role: '', manager: '', target_date: '' });

  // New Employee Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('כללי');
  const [newRole, setNewRole] = useState('');
  const [newManager, setNewManager] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newType, setNewType] = useState('onboarding');

  // Tabs & Features
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'assets', 'notes'
  const [newAssetItem, setNewAssetItem] = useState('');
  const [newAssetSerial, setNewAssetSerial] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [customTaskText, setCustomTaskText] = useState('');

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
      loadInventory();
      loadITUsers();
    }
  }, [isKaliRoute, currentUser]);

  const loadEmployees = async () => {
    try {
      const data = await db.getEmployees();
      const formatted = (data || []).map(u => {
        const isOff = u.type === 'offboarding';
        const defaultTasks = isOff ? DEFAULT_OFFBOARDING_TASKS : (DEPARTMENT_TEMPLATES[u.department] || DEFAULT_ONBOARDING_TASKS);
        const initialTasks = (Array.isArray(u.custom_tasks) && u.custom_tasks.length > 0) ? u.custom_tasks : defaultTasks;
        
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          department: u.department || 'כללי',
          role: u.role || 'עובד/ת',
          manager: u.manager || '',
          target_date: u.target_date || '',
          type: u.type || 'onboarding',
          completed: (u.completed && typeof u.completed === 'object' && !Array.isArray(u.completed)) ? u.completed : {},
          custom_tasks: initialTasks,
          assets: Array.isArray(u.assets) ? u.assets : [],
          notes: Array.isArray(u.notes) ? u.notes : []
        };
      });
      setEmployees(formatted);
      if (!selectedId && formatted.length > 0) {
        setSelectedId(formatted[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadInventory = async () => {
    try {
      const data = await db.getInventory();
      setInventoryList(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadITUsers = async () => {
    try {
      const data = await db.getITUsers();
      setItUsersList(data || []);
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

    const initialTasks = newType === 'offboarding' 
      ? [...DEFAULT_OFFBOARDING_TASKS] 
      : [...(DEPARTMENT_TEMPLATES[newDept] || DEFAULT_ONBOARDING_TASKS)];

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
      custom_tasks: initialTasks,
      assets: [],
      notes: []
    };

    setEmployees([newEmp, ...employees]);
    setSelectedId(newEmp.id);
    setNewName('');
    setNewEmail('');
    setNewDept('כללי');
    setNewRole('');
    setNewManager('');
    setNewTargetDate('');
    setShowAddForm(false);

    await db.addEmployee(newEmp);
  };

  const openEditEmployeeModal = (emp) => {
    setEditForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      role: emp.role,
      manager: emp.manager,
      target_date: emp.target_date
    });
    setShowEditEmployeeModal(true);
  };

  const handleSaveEditEmployee = async (e) => {
    e.preventDefault();
    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const updatedEmp = {
      ...currentEmp,
      name: editForm.name,
      email: editForm.email,
      department: editForm.department,
      role: editForm.role,
      manager: editForm.manager,
      target_date: editForm.target_date
    };

    const updatedEmployees = employees.map(emp => emp.id === selectedId ? updatedEmp : emp);
    setEmployees(updatedEmployees);
    setShowEditEmployeeModal(false);

    await db.updateEmployee(selectedId, {
      name: editForm.name,
      email: editForm.email,
      department: editForm.department,
      role: editForm.role,
      manager: editForm.manager,
      target_date: editForm.target_date
    });
  };

  // Helper to check task completion (supports index or task title)
  const getTaskLog = (emp, task, index) => {
    if (!emp || !emp.completed) return null;
    return emp.completed[task] || emp.completed[String(index)] || null;
  };

  const getEmployeeProgress = (emp) => {
    if (!emp) return { total: 0, done: 0, prog: 0, isDone: false };
    const tasks = emp.custom_tasks && emp.custom_tasks.length > 0
      ? emp.custom_tasks
      : (emp.type === 'offboarding' ? DEFAULT_OFFBOARDING_TASKS : DEFAULT_ONBOARDING_TASKS);
    
    let done = 0;
    tasks.forEach((t, i) => {
      if (getTaskLog(emp, t, i)) done++;
    });
    const total = tasks.length;
    const prog = total > 0 ? Math.round((done / total) * 100) : 100;
    return { total, done, prog, isDone: total > 0 && done === total };
  };

  const handleToggleTask = async (taskName, taskIndex) => {
    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const completedObj = { ...currentEmp.completed };
    const isDone = !!getTaskLog(currentEmp, taskName, taskIndex);

    if (isDone) {
      delete completedObj[taskName];
      delete completedObj[String(taskIndex)];
    } else {
      const now = new Date();
      const timeStr = `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      completedObj[taskName] = {
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

  const handleAddCustomTask = async (e) => {
    e.preventDefault();
    if (!customTaskText.trim()) return;

    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    if (currentEmp.custom_tasks.includes(customTaskText.trim())) {
      alert('משימה זו כבר קיימת ברשימה');
      return;
    }

    const updatedTasks = [...currentEmp.custom_tasks, customTaskText.trim()];
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, custom_tasks: updatedTasks } : emp
    );

    setEmployees(updatedEmployees);
    setCustomTaskText('');
    await db.updateEmployee(selectedId, { custom_tasks: updatedTasks });
  };

  const handleDeleteTask = async (taskName, taskIndex, e) => {
    e.stopPropagation();
    const currentEmp = employees.find(e => e.id === selectedId);
    if (!currentEmp) return;

    const updatedTasks = currentEmp.custom_tasks.filter((t, i) => t !== taskName);
    const updatedCompleted = { ...currentEmp.completed };
    delete updatedCompleted[taskName];
    delete updatedCompleted[String(taskIndex)];

    const updatedEmployees = employees.map(emp => 
      emp.id === selectedId ? { ...emp, custom_tasks: updatedTasks, completed: updatedCompleted } : emp
    );

    setEmployees(updatedEmployees);
    await db.updateEmployee(selectedId, { custom_tasks: updatedTasks, completed: updatedCompleted });
  };

  // Inventory Pool Operations
  const handleAddInventoryBatch = async (e) => {
    e.preventDefault();
    const count = parseInt(newBatchQty) || 1;
    const now = new Date().toLocaleDateString('he-IL');
    const newItems = [];

    for (let i = 0; i < count; i++) {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const serial = `${newBatchPrefix || 'SN-'}${randomSuffix}`;
      newItems.push({
        id: `inv_${Date.now()}_${i}`,
        item: newBatchItem,
        category: newBatchCategory,
        serial: serial,
        status: 'in_stock',
        assigned_to_id: null,
        assigned_to_name: null,
        assigned_by: currentUser?.full_name || 'IT',
        date_added: now,
        notes: ''
      });
    }

    setInventoryList([...newItems, ...inventoryList]);
    await db.addInventoryBatch(newItems);
    alert(`נוספו בהצלחה ${count} פריטים למלאי!`);
  };

  const handleAssignInventoryToEmployee = async (invItem, emp) => {
    if (!emp) return;
    const now = new Date().toLocaleDateString('he-IL');

    // 1. Update inventory item
    const updatedInv = inventoryList.map(item => item.id === invItem.id ? {
      ...item,
      status: 'assigned',
      assigned_to_id: emp.id,
      assigned_to_name: emp.name
    } : item);
    setInventoryList(updatedInv);
    await db.updateInventoryItem(invItem.id, {
      status: 'assigned',
      assigned_to_id: emp.id,
      assigned_to_name: emp.name
    });

    // 2. Add to employee assets
    const newAsset = {
      id: invItem.id,
      item: invItem.item,
      serial: invItem.serial,
      assigned_by: currentUser?.full_name || 'IT',
      date: now
    };
    const updatedAssets = [...(emp.assets || []), newAsset];
    const updatedEmployees = employees.map(e => e.id === emp.id ? { ...e, assets: updatedAssets } : e);
    setEmployees(updatedEmployees);
    await db.updateEmployee(emp.id, { assets: updatedAssets });

    alert(`הציוד (${invItem.item}) שויך בהצלחה לעובד/ת: ${emp.name}`);
  };

  const handleReturnInventoryItem = async (invId) => {
    const updatedInv = inventoryList.map(item => item.id === invId ? {
      ...item,
      status: 'returned',
      assigned_to_id: null,
      assigned_to_name: null
    } : item);
    setInventoryList(updatedInv);
    await db.updateInventoryItem(invId, {
      status: 'returned',
      assigned_to_id: null,
      assigned_to_name: null
    });
  };

  const handleDeleteInventoryItem = async (invId) => {
    if (!confirm('האם למחוק פריט זה ממאגר המלאי?')) return;
    setInventoryList(inventoryList.filter(item => item.id !== invId));
    await db.deleteInventoryItem(invId);
  };

  // IT Users Management
  const handleAddITUser = async (e) => {
    e.preventDefault();
    if (!newITUser.username || !newITUser.password || !newITUser.full_name) return;

    const userObj = {
      username: newITUser.username.trim(),
      full_name: newITUser.full_name.trim(),
      password: newITUser.password.trim()
    };

    const res = await db.addITUser(userObj);
    if (res) {
      setItUsersList([userObj, ...itUsersList]);
      setNewITUser({ username: '', full_name: '', password: '' });
      alert(`משתמש IT ${userObj.full_name} נוסף בהצלחה!`);
    }
  };

  const handleDeleteITUser = async (id, username) => {
    if (username === currentUser?.username) {
      alert('לא ניתן למחוק את המשתמש שמחובר כעת');
      return;
    }
    if (!confirm(`האם למחוק את משתמש ה-IT ${username}?`)) return;
    setItUsersList(itUsersList.filter(u => u.id !== id));
    await db.deleteITUser(id);
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
      const { prog, isDone } = getEmployeeProgress(e);
      const statusText = isDone ? 'הושלם' : 'בתהליך';
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

  // Metrics Calculations
  const totalEmployeesCount = employees.length;
  let completedProcessesCount = 0;
  employees.forEach(emp => {
    const { isDone } = getEmployeeProgress(emp);
    if (isDone) completedProcessesCount++;
  });
  const inProgressCount = totalEmployeesCount - completedProcessesCount;

  // Unique departments for filter dropdown
  const departmentOptions = Array.from(new Set(employees.map(e => e.department).filter(Boolean)));

  // Filtered employees list
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'all' || emp.department === deptFilter;
    const { isDone } = getEmployeeProgress(emp);

    if (statusFilter === 'in_progress') return matchesSearch && matchesDept && !isDone;
    if (statusFilter === 'completed') return matchesSearch && matchesDept && isDone;
    return matchesSearch && matchesDept;
  });

  // Filtered Inventory list
  const filteredInventory = inventoryList.filter(item => {
    if (inventoryFilter === 'in_stock') return item.status === 'in_stock';
    if (inventoryFilter === 'assigned') return item.status === 'assigned';
    if (inventoryFilter === 'returned') return item.status === 'returned';
    return true;
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
    const selectedTasks = selectedEmployee?.custom_tasks && selectedEmployee.custom_tasks.length > 0 
      ? selectedEmployee.custom_tasks 
      : (selectedEmployee?.type === 'offboarding' ? DEFAULT_OFFBOARDING_TASKS : DEFAULT_ONBOARDING_TASKS);
    
    const { total: selTotal, done: selDone, isDone: isSelectedFullyDone } = getEmployeeProgress(selectedEmployee);

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
            <div className="flex items-center gap-1.5">
              <button onClick={() => setShowAdminModal(true)} title="ניהול משתמשי IT" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors">
                <KeyRound size={15} />
              </button>
              <button onClick={handleExportCSV} title="ייצוא לאקסל (CSV)" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <Download size={15} />
              </button>
              <button onClick={handleLogout} className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2.5 py-1.5 rounded-lg border border-rose-500/20 font-bold transition-colors">
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

            {/* Department Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-slate-400 shrink-0" />
              <select 
                value={deptFilter} 
                onChange={e => setDeptFilter(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 outline-none focus:border-cyan-500 font-medium"
              >
                <option value="all">כל המחלקות (הצג הכל)</option>
                {departmentOptions.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              <button 
                onClick={() => setStatusFilter('all')} 
                className={`flex-1 py-1.5 rounded-lg transition-all ${statusFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                הכל ({employees.length})
              </button>
              <button 
                onClick={() => setStatusFilter('in_progress')} 
                className={`flex-1 py-1.5 rounded-lg transition-all ${statusFilter === 'in_progress' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                בתהליך ({inProgressCount})
              </button>
              <button 
                onClick={() => setStatusFilter('completed')} 
                className={`flex-1 py-1.5 rounded-lg transition-all ${statusFilter === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'}`}
              >
                הושלמו ({completedProcessesCount})
              </button>
            </div>
          </div>

          {/* Form Create */}
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
                <select 
                  value={newDept} 
                  onChange={e => setNewDept(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                >
                  <option value="כללי">מחלקה: כללי</option>
                  <option value="כספים">כספים</option>
                  <option value="מערכות מידע">מערכות מידע</option>
                  <option value="קלי פרימיום">קלי פרימיום</option>
                  <option value="שירות לקוחות">שירות לקוחות</option>
                  <option value="משאבי אנוש">משאבי אנוש</option>
                  <option value="שיווק">שיווק</option>
                  <option value="קליטת לקוחות">קליטת לקוחות</option>
                  <option value="גבייה">גבייה</option>
                </select>
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
                + שמור עובד למערכת (טען תבנית מחלקה)
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
                const { prog, isDone } = getEmployeeProgress(emp);
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

        {/* Main Details & Metrics Dashboard Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Top Metrics Dashboard (Clickable) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div 
              onClick={() => setStatusFilter('all')} 
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all hover:border-cyan-500/40"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">סה"כ עובדים</p>
                <h3 className="text-xl font-bold text-white mt-0.5">{totalEmployeesCount}</h3>
              </div>
            </div>

            <div 
              onClick={() => setStatusFilter('in_progress')} 
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all hover:border-amber-500/40"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">פתוחים לטיפול</p>
                <h3 className="text-xl font-bold text-amber-400 mt-0.5">{inProgressCount}</h3>
              </div>
            </div>

            <div 
              onClick={() => setStatusFilter('completed')} 
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all hover:border-emerald-500/40"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">הושלמו (100%)</p>
                <h3 className="text-xl font-bold text-emerald-400 mt-0.5">{completedProcessesCount}</h3>
              </div>
            </div>

            <div 
              onClick={() => setShowInventoryModal(true)} 
              className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all hover:border-blue-500/40"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Boxes size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">מאגר מלאי וציוד (פתח)</p>
                <h3 className="text-xl font-bold text-white mt-0.5">{inventoryList.length}</h3>
              </div>
            </div>
          </div>

          {selectedEmployee ? (
            <div className="max-w-3xl mx-auto space-y-6 pt-2">
              
              {/* Header Box with Edit Button */}
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
                    {selectedEmployee.email} | מחלקה: <strong className="text-slate-200">{selectedEmployee.department}</strong> | תפקיד: <strong className="text-slate-200">{selectedEmployee.role}</strong>
                    {selectedEmployee.manager && ` | מנהל: ${selectedEmployee.manager}`}
                  </p>
                </div>

                <button 
                  onClick={() => openEditEmployeeModal(selectedEmployee)} 
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all self-start sm:self-auto"
                >
                  <Edit2 size={13} className="text-cyan-400" />
                  <span>ערוך פרטים</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 border-b border-slate-800 pb-3 text-sm font-semibold">
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'tasks' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800'}`}
                >
                  📋 צ'ק-ליסט משימות ({selDone}/{selTotal})
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
                <div className="space-y-4">
                  {/* Add Custom Task Input */}
                  <form onSubmit={handleAddCustomTask} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="הוסף משימה מותאמת אישית לעובד זה (למשל: הרשאת תיקיית הנהלת חשבונות / הגדרת מדפסת)..." 
                      value={customTaskText} 
                      onChange={e => setCustomTaskText(e.target.value)} 
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-cyan-500"
                    />
                    <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all flex items-center gap-1 shrink-0">
                      <Plus size={15} />
                      הוסף משימה
                    </button>
                  </form>

                  {/* Tasks List */}
                  <div className="space-y-2.5">
                    {selectedTasks.map((task, idx) => {
                      const taskLog = getTaskLog(selectedEmployee, task, idx);
                      const isDone = !!taskLog;

                      return (
                        <div 
                          key={idx} 
                          onClick={() => handleToggleTask(task, idx)}
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

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            {isDone && (
                              <div className="flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg font-medium">
                                <span className="text-cyan-400 font-bold">👤 {taskLog.by}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-400 flex items-center gap-1">
                                  <Clock size={12} />
                                  {taskLog.at}
                                </span>
                              </div>
                            )}
                            <button 
                              onClick={(e) => handleDeleteTask(task, idx, e)} 
                              title="מחק משימה זו לעובד"
                              className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Assets */}
              {activeTab === 'assets' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                    <span className="text-xs text-slate-300 font-medium">באפשרותך לשייך ציוד ישירות ממאגר המלאי הכללי או להזין פריט ידנית:</span>
                    <button 
                      onClick={() => setShowInventoryModal(true)} 
                      className="px-3.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold rounded-xl border border-blue-500/30 flex items-center gap-1"
                    >
                      <Boxes size={14} />
                      פתח מאגר מלאי לשיוך
                    </button>
                  </div>

                  <form onSubmit={handleAddAsset} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-2">
                    <input 
                      type="text" 
                      placeholder="שם הפריט ידנית (למשל: Dell Latitude 5440 / מסך 27 אינץ')" 
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
            <div className="h-full flex items-center justify-center text-slate-500 text-xs font-medium py-16">
              בחר עובד מהרשימה או הוסף עובד חדש
            </div>
          )}
        </div>

        {/* Edit Employee Modal */}
        {showEditEmployeeModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit2 size={16} className="text-cyan-400" />
                  עריכת פרטי עובד/ת
                </h2>
                <button onClick={() => setShowEditEmployeeModal(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveEditEmployee} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">שם מלא:</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" 
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">כתובת מייל:</label>
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">מחלקה:</label>
                    <input 
                      type="text" 
                      value={editForm.department} 
                      onChange={e => setEditForm({ ...editForm, department: e.target.value })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">תפקיד:</label>
                    <input 
                      type="text" 
                      value={editForm.role} 
                      onChange={e => setEditForm({ ...editForm, role: e.target.value })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">מנהל ישיר:</label>
                    <input 
                      type="text" 
                      value={editForm.manager} 
                      onChange={e => setEditForm({ ...editForm, manager: e.target.value })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">תאריך יעד:</label>
                    <input 
                      type="date" 
                      value={editForm.target_date} 
                      onChange={e => setEditForm({ ...editForm, target_date: e.target.value })} 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500" 
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowEditEmployeeModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">
                    ביטול
                  </button>
                  <button type="submit" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl">
                    שמור שינויים
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inventory Pool Modal */}
        {showInventoryModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Boxes size={22} />
                  <h2 className="text-lg text-white">מאגר מלאי וחומרה ארגונית ({inventoryList.length})</h2>
                </div>
                <button onClick={() => setShowInventoryModal(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Batch Add Form */}
              <form onSubmit={handleAddInventoryBatch} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-2.5 items-center">
                <input 
                  type="text" 
                  placeholder="שם הפריט (למשל: מחשב נייד מנהלי תיקים / מסך 24 אינץ')" 
                  value={newBatchItem} 
                  onChange={e => setNewBatchItem(e.target.value)} 
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 w-full"
                />
                <select 
                  value={newBatchCategory} 
                  onChange={e => setNewBatchCategory(e.target.value)} 
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 w-full md:w-36"
                >
                  <option value="מחשב נייד">מחשב נייד</option>
                  <option value="מסך מחשב">מסך מחשב</option>
                  <option value="תחנת עגינה">תחנת עגינה</option>
                  <option value="ציוד היקפי">ציוד היקפי</option>
                  <option value="סלולר / טאבלט">סלולר / טאבלט</option>
                </select>
                <div className="flex gap-2 w-full md:w-auto">
                  <input 
                    type="number" 
                    min="1" 
                    max="50" 
                    value={newBatchQty} 
                    onChange={e => setNewBatchQty(e.target.value)} 
                    placeholder="כמות" 
                    title="כמות פריטים להוספה"
                    className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-mono text-center"
                  />
                  <input 
                    type="text" 
                    value={newBatchPrefix} 
                    onChange={e => setNewBatchPrefix(e.target.value)} 
                    placeholder="קידומת S/N" 
                    className="w-24 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-mono"
                  />
                  <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all whitespace-nowrap">
                    + הוסף למלאי
                  </button>
                </div>
              </form>

              {/* Filter Tabs for Inventory */}
              <div className="flex gap-2 text-xs font-bold">
                <button 
                  onClick={() => setInventoryFilter('all')} 
                  className={`px-3 py-1.5 rounded-lg ${inventoryFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 bg-slate-950'}`}
                >
                  הכל ({inventoryList.length})
                </button>
                <button 
                  onClick={() => setInventoryFilter('in_stock')} 
                  className={`px-3 py-1.5 rounded-lg ${inventoryFilter === 'in_stock' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 bg-slate-950'}`}
                >
                  במלאי פנוי ({inventoryList.filter(i => i.status === 'in_stock').length})
                </button>
                <button 
                  onClick={() => setInventoryFilter('assigned')} 
                  className={`px-3 py-1.5 rounded-lg ${inventoryFilter === 'assigned' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 bg-slate-950'}`}
                >
                  משויך לעובדים ({inventoryList.filter(i => i.status === 'assigned').length})
                </button>
                <button 
                  onClick={() => setInventoryFilter('returned')} 
                  className={`px-3 py-1.5 rounded-lg ${inventoryFilter === 'returned' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 bg-slate-950'}`}
                >
                  הוחזר / ארכיון ({inventoryList.filter(i => i.status === 'returned').length})
                </button>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-y-auto">
                {filteredInventory.length === 0 ? (
                  <p className="text-center text-xs text-slate-500 py-12 font-medium">לא נמצאו פריטי ציוד בקטגוריה זו</p>
                ) : (
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-bold">
                        <th className="py-2.5 px-3">שם הפריט</th>
                        <th className="py-2.5 px-3">קטגוריה</th>
                        <th className="py-2.5 px-3">מספר סידורי (S/N)</th>
                        <th className="py-2.5 px-3">סטטוס</th>
                        <th className="py-2.5 px-3">משויך אל</th>
                        <th className="py-2.5 px-3 text-left">פעולות</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                      {filteredInventory.map(item => (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3 font-bold text-white">{item.item}</td>
                          <td className="py-3 px-3 text-slate-400">{item.category}</td>
                          <td className="py-3 px-3 font-mono text-cyan-400">{item.serial}</td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.status === 'in_stock' 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                : item.status === 'assigned'
                                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}>
                              {item.status === 'in_stock' ? 'במלאי פנוי' : item.status === 'assigned' ? 'משויך לעובד/ת' : 'הוחזר'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-300 font-medium">
                            {item.assigned_to_name || '—'}
                          </td>
                          <td className="py-3 px-3 text-left">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.status === 'in_stock' && selectedEmployee && (
                                <button 
                                  onClick={() => handleAssignInventoryToEmployee(item, selectedEmployee)} 
                                  className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] font-bold rounded-lg transition-all"
                                >
                                  שייך ל-{selectedEmployee.name.split(' ')[0]}
                                </button>
                              )}
                              {item.status === 'assigned' && (
                                <button 
                                  onClick={() => handleReturnInventoryItem(item.id)} 
                                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold rounded-lg border border-amber-500/30 transition-all"
                                >
                                  סמן כהוחזר
                                </button>
                              )}
                              <button onClick={() => handleDeleteInventoryItem(item.id)} className="text-slate-500 hover:text-rose-400 p-1">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button onClick={() => setShowInventoryModal(false)} className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all">
                  סגור
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin IT Users Management Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound size={18} className="text-cyan-400" />
                  ניהול משתמשי צוות ה-IT
                </h2>
                <button onClick={() => setShowAdminModal(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {/* Add IT User Form */}
              <form onSubmit={handleAddITUser} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <span className="text-xs text-slate-300 font-bold block">הוספת איש/אשת צוות IT חדש/ה:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input 
                    type="text" 
                    placeholder="שם משתמש (באנגלית)" 
                    value={newITUser.username} 
                    onChange={e => setNewITUser({ ...newITUser, username: e.target.value })} 
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-mono" 
                  />
                  <input 
                    type="text" 
                    placeholder="שם מלא" 
                    value={newITUser.full_name} 
                    onChange={e => setNewITUser({ ...newITUser, full_name: e.target.value })} 
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" 
                  />
                  <input 
                    type="password" 
                    placeholder="סיסמה" 
                    value={newITUser.password} 
                    onChange={e => setNewITUser({ ...newITUser, password: e.target.value })} 
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-mono" 
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all">
                  + הוסף משתמש IT
                </button>
              </form>

              {/* IT Users List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {itUsersList.map(u => (
                  <div key={u.id || u.username} className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{u.full_name} <span className="font-mono text-cyan-400 font-normal">(@{u.username})</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleDeleteITUser(u.id, u.username)} 
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="מחק משתמש IT"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button onClick={() => setShowAdminModal(false)} className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all">
                  סגור
                </button>
              </div>
            </div>
          </div>
        )}

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

            <a href="https://form.amirshaul.online" target="_blank" rel="noreferrer" className="block w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-center font-bold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
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
