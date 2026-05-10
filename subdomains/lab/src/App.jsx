import React, { useState } from 'react';
import { Terminal, Cpu, Activity, Box } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="center">
      <div className="hero">
        <div className="flex justify-center mb-4 text-cyan-400">
          <Terminal size={48} />
        </div>
        <h1 className="text-4xl font-black text-cyan-400 mb-2 tracking-tighter">AMIR_LAB_v1.1</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mb-8 text-center">
          Module Initialization: Success
        </p>
      </div>

      <button className="counter" onClick={() => setCount((c) => c + 1)}>
        System Pulse: {count}
      </button>

      <div id="next-steps">
        <div id="docs">
          <h2 className="flex items-center gap-2">
            <Cpu size={16} /> Core IT
          </h2>
          <p>בדיקת תקינות מערכות וסאב-דומיינים בזמן אמת.</p>
        </div>
        <div>
          <h2 className="flex items-center gap-2">
            <Activity size={16} /> Monitor
          </h2>
          <p>הדף עולה בהצלחה. השגיאה ב-Lucide טופלה.</p>
        </div>
      </div>
    </div>
  );
}

export default App;