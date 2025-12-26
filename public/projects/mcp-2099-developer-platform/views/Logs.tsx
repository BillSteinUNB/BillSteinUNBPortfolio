import React, { useState, useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import clsx from 'clsx';

const LOG_MESSAGES = [
  "Initializing handshake protocol...",
  "Encrypted connection established [TLS 1.3]",
  "Fetching decentralized node list...",
  "Node 0x4f... connected (Latency: 12ms)",
  "Verifying smart contract signatures...",
  "Warning: High memory usage in sector 7",
  "Optimizing neural pathways...",
  "Firewall: Blocked suspicious packet from 192.168.x.x",
  "Syncing ledger state...",
  "System fully operational."
];

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Hydration
    setLogs(LOG_MESSAGES.map((msg, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(Date.now() - (10000 - i * 1000)).toISOString(),
      level: msg.includes('Warning') ? 'WARN' : msg.includes('Block') ? 'SEC' : 'INFO',
      message: msg
    })));

    // Live Updates
    const interval = setInterval(() => {
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        level: msg.includes('Warning') ? 'WARN' : msg.includes('Block') ? 'SEC' : 'INFO',
        message: msg
      };

      setLogs(prev => [...prev.slice(-49), newLog]);
      
      // Auto-scroll
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 h-[calc(100vh-120px)]">
       <div className="h-full bg-black/90 border border-white/10 rounded-lg overflow-hidden flex flex-col font-mono text-sm shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-white/5">
             <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
             </div>
             <div className="ml-4 text-xs text-gray-500">root@mcp-2099:~</div>
          </div>

          {/* Log Content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
             {logs.map((log) => (
               <div key={log.id} className="grid grid-cols-[140px_60px_1fr] gap-4 hover:bg-white/5 p-1 rounded transition-colors">
                  <span className="text-gray-600 text-xs">{log.timestamp.split('T')[1].split('.')[0]}</span>
                  <span className={clsx(
                    "text-xs font-bold px-1 rounded text-center w-fit",
                    log.level === 'INFO' && "bg-blue-900/30 text-blue-400",
                    log.level === 'WARN' && "bg-orange-900/30 text-orange-400",
                    log.level === 'SEC' && "bg-red-900/30 text-red-400"
                  )}>
                    {log.level}
                  </span>
                  <span className="text-gray-300">{log.message}</span>
               </div>
             ))}
             <div className="animate-pulse text-[#00f3ff]">_</div>
          </div>
       </div>
    </div>
  );
};

export default Logs;
