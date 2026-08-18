import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Code2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  Mail, 
  Github 
} from 'lucide-react';

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
    {/* רקע גרדיאנט קל משקל */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
    
    {/* שכבת עומק כהה */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />

    {/* תוכן הכרטיס */}
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] w-full flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* Background Glows מותאם לביצועים ללא חישובי Blur כבדים */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.15),transparent_60%)]" />

      {/* כפתור יצירת קשר מרחף */}
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

        {/* Hero Section */}
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

               {/* כפתור יצירת קשר מהבהב */}
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

        {/* Project Grid */}
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
