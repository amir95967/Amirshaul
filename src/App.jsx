import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

// קומפוננטה בטוחה לאייקון
const SafeIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name] || Icons.Code2 || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

// --- כאן אתה מעדכן את הפרויקטים שלך ואת הלינקים לתמונות ---
const MY_PROJECTS = [
  {
    iconName: "Layout",
    title: "Project",
    desc: "ניסויים ב-Frontend ורכיבי React מתקדמים.",
    link: "lab.amir.online",
    // כאן שמים לינק לצילום מסך של האתר (אפשר להשתמש ב-URL של תמונה שהעלית)
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQEzjSswwPZKzA/profile-displayphoto-scale_200_200/B4DZe61udOGkAY-/0/1751186351205?e=1779926400&v=beta&t=nNzRWOQM47aTWZeBWK0oFy_qoAf9ls4lrEBNDBFB6LI" 
  },
  {
    iconName: "Layout",
    title: "Project",
    desc: "ניסויים ב-Frontend ורכיבי React מתקדמים.",
    link: "lab.amir.online",
    // כאן שמים לינק לצילום מסך של האתר (אפשר להשתמש ב-URL של תמונה שהעלית)
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQEzjSswwPZKzA/profile-displayphoto-scale_200_200/B4DZe61udOGkAY-/0/1751186351205?e=1779926400&v=beta&t=nNzRWOQM47aTWZeBWK0oFy_qoAf9ls4lrEBNDBFB6LI" 
  },
  {
    iconName: "Layout",
    title: "Project",
    desc: "ניסויים ב-Frontend ורכיבי React מתקדמים.",
    link: "lab.amir.online",
    // כאן שמים לינק לצילום מסך של האתר (אפשר להשתמש ב-URL של תמונה שהעלית)
    imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQEzjSswwPZKzA/profile-displayphoto-scale_200_200/B4DZe61udOGkAY-/0/1751186351205?e=1779926400&v=beta&t=nNzRWOQM47aTWZeBWK0oFy_qoAf9ls4lrEBNDBFB6LI" 
  },
];

const ProjectCard = ({ iconName, title, desc, link, imageUrl }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="relative group h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-[#020617]"
  >
    {/* תמונת הרקע של האתר */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    
    {/* שכבת גרדיאנט שחורה כדי שהטקסט יהיה קריא */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />

    {/* תוכן הכרטיס */}
    <div className="relative h-full p-8 flex flex-col items-center text-center justify-end z-10">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="w-16 h-16 rounded-2xl bg-cyan-500/20 backdrop-blur-xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500"
      >
        <SafeIcon name={iconName} size={32} />
      </motion.div>
      
      <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tighter">{title}</h3>
      <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-[240px] font-medium drop-shadow-md">
        {desc}
      </p>
      
      <a 
        href={`https://${link}`} 
        target="_blank" 
        rel="noreferrer"
        className="w-full py-4 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 rounded-2xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Access System</span>
        <SafeIcon name="ArrowUpRight" size={14} />
      </a>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] w-full flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center w-full max-w-7xl px-6 py-24">
        
        {/* Hero Section */}
        <section className="text-center mb-32 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>AI WEB DEVELOPER</span>
            </div>

            <h1 className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter text-white mb-8 italic uppercase">
              Amir.<br />
              <span className="text-slate-800 not-italic">Online</span>
            </h1>

            <p className="text-xl md:text-3xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-bold uppercase tracking-wide">
              "Powered by Hobby."
            </p>

            <div className="flex justify-center space-x-8">
               <a href="https://github.com" className="text-slate-500 hover:text-white transition-colors flex items-center space-x-2 no-underline">
                 <SafeIcon name="Github" size={20} />
                 <span className="text-xs font-black tracking-widest uppercase">Code</span>
               </a>
               <div className="w-px h-4 bg-white/10 self-center" />
               <div className="text-cyan-500 flex items-center space-x-2">
                 <SafeIcon name="ShieldCheck" size={20} />
                 <span className="text-xs font-black tracking-widest uppercase text-slate-500">Verified</span>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Project Grid */}
        <section className="w-full max-w-6xl">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-600 mb-4">Network Instances</h2>
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
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full text-center py-16 mt-20 border-t border-white/5 bg-white/[0.01] relative z-10">
        <p className="text-[10px] font-bold tracking-[0.7em] text-slate-700 uppercase">
          © 2026 AMIR.ONLINE | All Systems Nominal
        </p>
      </footer>
    </div>
  );
}