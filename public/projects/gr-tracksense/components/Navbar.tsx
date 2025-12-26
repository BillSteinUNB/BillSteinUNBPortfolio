import React from 'react';
import Logo from './Logo';
import { ViewState } from '../types';
import { Menu, X, User, BarChart2, BookOpen, Users } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium font-heading transition-colors
        ${currentView === view ? 'text-gr border-b-2 border-gr' : 'text-zinc-400 hover:text-white'}
      `}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavItem view="landing" label="Platform" icon={BarChart2} />
            <NavItem view="team" label="Team" icon={Users} />
            <NavItem view="docs" label="Docs" icon={BookOpen} />
            {isAuthenticated ? (
               <>
                <NavItem view="dashboard" label="Mission Control" icon={BarChart2} />
                <button
                  onClick={onLogout}
                  className="ml-4 px-4 py-2 border border-gr/50 text-gr hover:bg-gr hover:text-white transition-all rounded font-heading text-sm"
                >
                  Disconnect
                </button>
               </>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="ml-4 flex items-center gap-2 px-4 py-2 bg-gr hover:bg-gr-dark text-white rounded font-heading text-sm transition-all shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]"
              >
                <User size={16} />
                Access Terminal
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavItem view="landing" label="Platform" icon={BarChart2} />
            <NavItem view="team" label="Team" icon={Users} />
            <NavItem view="docs" label="Docs" icon={BookOpen} />
            {isAuthenticated ? (
               <>
                <NavItem view="dashboard" label="Mission Control" icon={BarChart2} />
                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-zinc-400 hover:text-gr">Disconnect</button>
               </>
            ) : (
              <button onClick={() => { onNavigate('auth'); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-gr hover:text-white">Access Terminal</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;