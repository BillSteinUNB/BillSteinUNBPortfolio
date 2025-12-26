import React from 'react';
import { View, ThemeMode } from '../types';
import { Monitor, Cpu, FileJson, Terminal, LayoutDashboard, Sun, Moon, Power } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  children: React.ReactNode;
}

const NavItem: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string 
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={clsx(
      "group flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 relative overflow-hidden",
      active ? "text-[#00f3ff]" : "text-gray-400 hover:text-white"
    )}
  >
    <span className="relative z-10 flex items-center gap-2">
       {active && <span className="text-xs text-[#ff4d00] animate-pulse">&gt;</span>}
       {icon}
       <span className="tracking-widest">{label}</span>
    </span>
    {active && (
      <div className="absolute inset-0 bg-[#00f3ff]/10 border-b border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.2)]" />
    )}
  </button>
);

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, theme, toggleTheme, children }) => {
  return (
    <div className={clsx("min-h-screen w-full transition-colors duration-500", 
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-gray-100 text-gray-900'
    )}>
      {/* Top Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl 
                      backdrop-blur-md bg-opacity-70 border border-white/10 rounded-full
                      shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-2 py-1 flex items-center justify-between
                      bg-[#0a0a0a]/80"
      >
        <div className="flex items-center gap-2 pl-4">
          <div className="w-2 h-2 bg-[#ff4d00] rounded-full animate-ping" />
          <span className="font-mono font-bold tracking-tighter text-lg">MCP<span className="text-[#00f3ff]">-2099</span></span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <NavItem 
            active={currentView === View.HERO} 
            onClick={() => onNavigate(View.HERO)} 
            icon={<Monitor size={14}/>} 
            label="INTERFACE" 
          />
          <NavItem 
            active={currentView === View.NEURAL_NET} 
            onClick={() => onNavigate(View.NEURAL_NET)} 
            icon={<Cpu size={14}/>} 
            label="NEURAL_NET" 
          />
           <NavItem 
            active={currentView === View.DASHBOARD} 
            onClick={() => onNavigate(View.DASHBOARD)} 
            icon={<LayoutDashboard size={14}/>} 
            label="DASHBOARD" 
          />
          <NavItem 
            active={currentView === View.PROTOCOL} 
            onClick={() => onNavigate(View.PROTOCOL)} 
            icon={<FileJson size={14}/>} 
            label="PROTOCOL" 
          />
          <NavItem 
            active={currentView === View.LOGS} 
            onClick={() => onNavigate(View.LOGS)} 
            icon={<Terminal size={14}/>} 
            label="LOGS" 
          />
        </div>

        <div className="flex items-center gap-3 pr-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
             onClick={() => onNavigate(View.DASHBOARD)}
             className="flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6a00] text-black text-xs font-bold px-4 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(255,77,0,0.4)] hover:shadow-[0_0_30px_rgba(255,77,0,0.6)]"
          >
            <Power size={14} /> INITIALIZE
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative w-full min-h-screen pt-20">
        {children}
      </main>
      
      {/* Decorative Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
};

export default Layout;
