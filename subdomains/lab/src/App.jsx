import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Globe, Activity, Code2, ShieldAlert } from 'lucide-react';

const SystemNode = ({ label, status, icon: Icon }) => (
  <div className="bg-slate-900/50 border border-cyan-500/20 p-4 rounded-xl flex items-center gap-4">
    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest">{label}</div>
      <div className="text-sm font-mono text-slate-200">{status}</div>
    </div>
  </div>
);

export default function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono p-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <main className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex justify-between items-end mb-12 border-b border-cyan-500/20 pb-8">
          <div>
            <h1 className="text-cyan-400 text-2xl font-black tracking-tighter mb-2">AMIR_LAB_v1.0</h1>
            <p className="text-xs text-slate-500 uppercase tracking-[0.5em]">Subdomain Infrastructure Verified</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-500 text-xl font-bold">{time}</div>
            <div className="text-[10px] text-slate-500 uppercase">System Time</div>
          </div>
        </header>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SystemNode label="Environment" status="Production" icon={Globe} />
          <SystemNode label="Uptime" status="99.9% Nominal" icon={Activity} />
          <SystemNode label="Security" status="Active Encryption" icon={ShieldAlert} />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Terminal Section */}
          <div className="lg:col-span-2 bg-black/60 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-cyan-400">$ system_init --verbose</p>
              <p className="text-slate-500 font-light italic">Loading kernel modules...</p>
              <p className="text-slate-400 leading-relaxed">
                ברוכים הבאים ל-Lab. כאן אני בוחן טכנולוגיות חדשות, בוטים לאוטומציה ורכיבי React מתקדמים. 
                הסביבה הזו מחוברת ישירות לתיקיית ה-subdomains שלי.
              </p>
              <div className="flex items-center gap-2 text-green-400 animate-pulse">
                <span>_</span>
                <span className="text-[10px] uppercase font-bold tracking-widest">Awaiting Command</span>
              </div>
            </div>
          </div>

          {/* Tools/Stack Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={14} /> Technical Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'Tailwind', 'Node.js', 'Vercel', 'Git'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
              <h3 className="text-cyan-400 text-sm font-bold mb-2 flex items-center gap-2">
                <Code2 size={16} /> Next Sprint
              </h3>
              <ul className="text-[11px] space-y-2 text-slate-400 leading-tight">
                <li>• Integrating AI Lead Gen Bot</li>
                <li>• Supabase Database Link</li>
                <li>• Custom IT Monitoring API</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-8 left-8 text-[10px] text-slate-600 font-bold tracking-[0.5em] uppercase">
        Amir_Shaul // System_Engineer
      </footer>
    </div>
  );
}