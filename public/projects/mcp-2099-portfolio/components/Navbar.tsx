import React from 'react';
import { Terminal, Cpu, Network, FileCode } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'home': return <Terminal size={14} />;
      case 'work': return <FileCode size={14} />;
      case 'about': return <Cpu size={14} />;
      case 'contact': return <Network size={14} />;
      default: return <Terminal size={14} />;
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="group flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyber-primary transition-colors duration-300"
          >
            <span className="group-hover:animate-spin">
              {getIcon(item.id)}
            </span>
            <span className="tracking-wider">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;