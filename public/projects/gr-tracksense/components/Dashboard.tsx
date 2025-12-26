import React, { useEffect, useState, useRef } from 'react';
import { TelemetryData, LogEntry } from '../types';
import { FUJI_SPEEDWAY_PATH } from '../constants';
import { AlertTriangle, Flag, Terminal, Activity, Zap, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// --- SUB-COMPONENTS ---

const Gauge: React.FC<{ value: number; max: number; label: string; unit: string; color: string }> = ({ value, max, label, unit, color }) => {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  // Arc logic for SVG
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage * circumference * 0.75); // 270 degree gauge

  return (
    <div className="relative flex flex-col items-center justify-center p-4 glass-panel h-full">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full rotate-[135deg]" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r={radius} stroke="#27272a" strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={circumference * 0.25} strokeLinecap="round"/>
           <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              stroke={color} 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray={circumference} 
              strokeDashoffset={offset} 
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-[-135deg]">
           <span className="text-3xl font-heading font-bold text-white">{Math.round(value)}</span>
           <span className="text-xs text-zinc-500 uppercase">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-bold text-zinc-400 tracking-widest">{label}</span>
    </div>
  );
};

const TraceChart: React.FC<{ data: any[], color: string, dataKey: string, label: string }> = ({ data, color, dataKey, label }) => (
    <div className="glass-panel p-2 h-24 flex flex-col">
       <span className="text-xs font-mono text-zinc-500 mb-1">{label}</span>
       <div className="flex-1 w-full">
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
               <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
               <YAxis domain={[0, 100]} hide />
            </LineChart>
         </ResponsiveContainer>
       </div>
    </div>
);

// --- MAIN DASHBOARD ---

const Dashboard: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    rpm: 800,
    speed: 0,
    gear: 1,
    throttle: 0,
    brake: 0,
    steering: 0,
    latG: 0,
    longG: 0,
    lapTime: "1:24.332",
    tireTemps: { fl: 85, fr: 90, rl: 80, rr: 82 }
  });

  const [traceHistory, setTraceHistory] = useState<any[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation Loop
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setTelemetry(prev => {
        // Mock physics
        let newRpm = prev.rpm + (prev.throttle > 0 ? 300 : -150);
        let newGear = prev.gear;
        let newSpeed = prev.speed;

        // Auto shift
        if (newRpm > 7200) { newRpm = 4500; newGear = Math.min(newGear + 1, 6); }
        if (newRpm < 3000 && newGear > 1) { newRpm = 6000; newGear--; }
        
        // Speed approx
        newSpeed = (newRpm / 7200) * (newGear * 40);

        // Oscillate inputs based on tick
        const throttle = Math.sin(tick * 0.05) > 0 ? Math.abs(Math.sin(tick * 0.05) * 100) : 0;
        const brake = Math.sin(tick * 0.05) <= 0 ? Math.abs(Math.sin(tick * 0.05) * 100) : 0;
        const steering = Math.sin(tick * 0.02) * 90;

        return {
          ...prev,
          rpm: Math.max(800, newRpm),
          gear: newGear,
          speed: Math.max(0, newSpeed),
          throttle,
          brake,
          steering,
          latG: (steering / 90) * 1.5,
          longG: (throttle - brake) / 100
        };
      });

      // Update History
      setTraceHistory(prev => {
        const newData = [...prev, {
          tick,
          throttle: telemetry.throttle,
          brake: telemetry.brake,
          steering: telemetry.steering + 90 // normalize for chart
        }];
        if (newData.length > 50) newData.shift();
        return newData;
      });

      // Random Logs
      if (Math.random() > 0.95) {
        const msgs = ["Tire Temp Rising", "Sector 3 Clear", "Optimal Shift Point", "Fuel Mix Optimized"];
        const types: LogEntry['level'][] = ['info', 'success', 'warn'];
        setLogs(prev => [...prev, {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            level: types[Math.floor(Math.random() * types.length)],
            message: msgs[Math.floor(Math.random() * msgs.length)]
        }].slice(-10));
      }

    }, 50);

    return () => clearInterval(interval);
  }, [telemetry.throttle, telemetry.brake, telemetry.steering]); // Depend on values to keep closure fresh-ish or use functional updates exclusively

  // Auto scroll logs
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="pt-20 min-h-screen bg-zinc-950 p-4 font-mono text-zinc-300 overflow-hidden">
      
      {/* Top Bar Status */}
      <div className="flex justify-between items-center mb-4 glass-panel p-2 px-4 rounded">
         <div className="flex items-center gap-4">
            <span className="text-gr font-bold flex items-center gap-2"><div className="w-2 h-2 bg-gr rounded-full animate-pulse"/> LIVE CONNECTED</span>
            <span className="text-zinc-500">FUJI SPEEDWAY</span>
         </div>
         <div className="text-xl font-heading font-bold text-white">LAP 14/20</div>
         <div className="text-yellow-500 font-bold">{telemetry.lapTime}</div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-140px)]">
        
        {/* Left Col: Vehicle Dynamics */}
        <div className="col-span-12 md:col-span-3 grid grid-rows-3 gap-4">
           <Gauge value={telemetry.rpm} max={8000} label="RPM" unit="REV/MIN" color="#FF4500" />
           <Gauge value={telemetry.speed} max={300} label="VELOCITY" unit="KM/H" color="#00BFFF" />
           
           <div className="glass-panel flex flex-col items-center justify-center">
              <span className="text-sm text-zinc-500">GEAR</span>
              <span className="text-8xl font-heading font-bold text-white">{telemetry.gear}</span>
           </div>
        </div>

        {/* Center Col: Map & G-Force */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
           {/* Track Map */}
           <div className="flex-1 glass-panel relative p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                 <h3 className="text-white font-heading font-bold">TRACK POSITION</h3>
              </div>
              <svg viewBox="0 0 600 300" className="w-full h-full opacity-80">
                 <path d={FUJI_SPEEDWAY_PATH} stroke="#333" strokeWidth="10" fill="none" />
                 <path d={FUJI_SPEEDWAY_PATH} stroke="#FF4500" strokeWidth="2" fill="none" className="drop-shadow-[0_0_10px_rgba(255,69,0,0.8)]"/>
                 {/* Moving Dot logic would go here calculated from distance */}
                 <circle cx="280" cy="100" r="6" fill="white" className="animate-pulse" />
              </svg>
           </div>

           {/* Traces */}
           <div className="h-1/3 grid grid-cols-3 gap-2">
              <TraceChart data={traceHistory} dataKey="throttle" color="#10B981" label="THROTTLE" />
              <TraceChart data={traceHistory} dataKey="brake" color="#EF4444" label="BRAKE" />
              <TraceChart data={traceHistory} dataKey="steering" color="#3B82F6" label="STEERING" />
           </div>
        </div>

        {/* Right Col: Logs & Tires */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
           {/* Tires */}
           <div className="h-1/3 glass-panel p-4 relative">
              <h3 className="text-xs text-zinc-500 mb-4 text-center">TIRE THERMALS</h3>
              <div className="grid grid-cols-2 gap-8 h-full pb-4">
                  {/* Simple representation of 4 tires */}
                  {['FL', 'FR', 'RL', 'RR'].map((pos, i) => (
                      <div key={pos} className="border border-zinc-700 rounded p-2 flex flex-col items-center justify-center bg-zinc-900/50">
                         <span className="text-xs text-zinc-500">{pos}</span>
                         <span className={`text-xl font-bold ${telemetry.tireTemps[pos.toLowerCase() as keyof typeof telemetry.tireTemps] > 100 ? 'text-red-500' : 'text-green-500'}`}>
                            {telemetry.tireTemps[pos.toLowerCase() as keyof typeof telemetry.tireTemps]}°
                         </span>
                      </div>
                  ))}
              </div>
           </div>

           {/* AI Console */}
           <div className="flex-1 glass-panel flex flex-col p-2 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-2">
                 <Terminal size={14} className="text-gr" />
                 <span className="text-xs font-bold text-white">STRATEGY ENGINE</span>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 text-xs font-mono">
                 {logs.map((log) => (
                    <div key={log.id} className="flex gap-2">
                       <span className="text-zinc-600">[{log.timestamp}]</span>
                       <span className={`${
                           log.level === 'error' ? 'text-red-500' : 
                           log.level === 'warn' ? 'text-yellow-500' : 
                           log.level === 'success' ? 'text-green-500' : 'text-zinc-300'
                       }`}>
                          {log.message}
                       </span>
                    </div>
                 ))}
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800">
                 <div className="flex items-center gap-2">
                    <span className="text-gr animate-pulse">_</span>
                    <input type="text" placeholder="Enter command..." className="bg-transparent border-none text-white focus:ring-0 text-xs w-full" disabled />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;