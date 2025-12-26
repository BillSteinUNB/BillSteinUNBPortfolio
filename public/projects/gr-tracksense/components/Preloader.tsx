import React, { useEffect, useState } from 'react';
import TechBackground from './TechBackground';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING GR_TRACKSENSE KERNEL...",
  "LOADING MODULES: TELEMETRY, AI, PHYSICS...",
  "CHECKING ECU CONNECTION... OK",
  "SYNCING SATELLITE UPLINK... [4ms]",
  "CALIBRATING SENSORS... OK",
  "ESTABLISHING SECURE HANDSHAKE...",
  "SYSTEM READY."
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-gr font-mono flex flex-col items-center justify-center overflow-hidden">
      <TechBackground variant="grid" />
      
      <div className="z-10 w-full max-w-lg p-8 relative">
        <div className="mb-8 flex justify-center">
             {/* HUD Circle */}
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" stroke="#333" strokeWidth="2" fill="none" strokeDasharray="10 5" />
                </svg>
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                   <circle 
                     cx="50" 
                     cy="50" 
                     r="40" 
                     stroke="#FF4500" 
                     strokeWidth="4" 
                     fill="none" 
                     strokeDasharray="251.2" 
                     strokeDashoffset={251.2 * (1 - progress / 100)} 
                   />
                </svg>
                <span className="text-2xl font-bold font-heading text-white">{progress}%</span>
             </div>
        </div>

        <div className="border border-zinc-800 bg-black/80 p-4 h-48 overflow-y-auto font-xs rounded">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">
              <span className="text-zinc-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? "animate-pulse text-white" : "text-gr"}>
                {log}
              </span>
            </div>
          ))}
          <div className="h-4 w-2 bg-gr animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;