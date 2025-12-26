import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Activity } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 px-6 py-2 border-t border-gray-800 bg-cyber-black/90 backdrop-blur-sm flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-wider">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>SYSTEM: ONLINE</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Activity size={12} />
          <span>CPU: 34%</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Wifi size={12} />
          <span>NET: SECURE</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span>LOC: EARTH.SOL</span>
        <span>{time}</span>
        <div className="flex items-center gap-1 text-cyber-primary">
          <Battery size={12} />
          <span>100%</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;