import React, { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shield, Activity, Wifi, Database, Cpu } from 'lucide-react';
import gsap from 'gsap';
import ScrambleText from '../components/ui/ScrambleText';

// Mock Data
const trafficData = Array.from({ length: 20 }, (_, i) => ({
  name: `T-${i}`,
  value: Math.floor(Math.random() * 4000) + 1000,
  value2: Math.floor(Math.random() * 2000) + 500,
}));

const performanceData = [
  { name: 'Core 1', load: 85 },
  { name: 'Core 2', load: 45 },
  { name: 'Core 3', load: 90 },
  { name: 'Core 4', load: 60 },
  { name: 'Core 5', load: 30 },
  { name: 'Core 6', load: 75 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; delay: number }> = ({ title, value, icon, color, delay }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, delay: delay * 0.1, ease: 'power3.out' }
    );
  }, [delay]);

  return (
    <div ref={cardRef} className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:border-[#00f3ff]/50 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-opacity-10 ${color === 'orange' ? 'bg-orange-500 text-orange-500' : 'bg-cyan-500 text-cyan-500'}`}>
          {icon}
        </div>
        <div className="text-xs font-mono text-gray-500">+2.4%</div>
      </div>
      <div className="text-gray-400 text-xs font-mono tracking-widest uppercase mb-1">{title}</div>
      <div className="text-2xl font-bold text-white group-hover:text-[#00f3ff] transition-colors">{value}</div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-12 pt-4">
      <header className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">MISSION CONTROL</h2>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM_OPTIMAL
          </div>
        </div>
        <div className="text-right hidden md:block">
           <div className="text-xs text-gray-500 font-mono">SECTOR_ID</div>
           <ScrambleText text="A7-99-ZETA" className="text-[#00f3ff] font-mono text-xl font-bold" />
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Bandwidth" value="84.2 TB/s" icon={<Wifi size={20} />} color="cyan" delay={1} />
        <StatCard title="Threat Level" value="LOW" icon={<Shield size={20} />} color="orange" delay={2} />
        <StatCard title="Active Threads" value="1,024" icon={<Activity size={20} />} color="cyan" delay={3} />
        <StatCard title="Storage Pools" value="89%" icon={<Database size={20} />} color="orange" delay={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Activity size={16} className="text-[#00f3ff]" /> NETWORK_TRAFFIC
          </h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVal2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4d00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#555" fontSize={10} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#333' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00f3ff" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                <Area type="monotone" dataKey="value2" stroke="#ff4d00" strokeWidth={2} fillOpacity={1} fill="url(#colorVal2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CPU/Memory Metrics */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Cpu size={16} className="text-[#ff4d00]" /> CORE_PERFORMANCE
          </h3>
          <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} layout="vertical" barSize={10}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" stroke="#888" width={60} fontSize={10} tickLine={false} axisLine={false} />
                   <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#050505', borderColor: '#333', color: '#fff' }}
                   />
                   <Bar dataKey="load" radius={[0, 4, 4, 0]}>
                      {performanceData.map((entry, index) => (
                         <cell key={`cell-${index}`} fill={entry.load > 80 ? '#ff4d00' : '#00f3ff'} />
                      ))}
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10">
             <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-500">SYSTEM_TEMP</span>
                <span className="text-[#ff4d00] font-mono">68°C</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">FAN_SPEED</span>
                <span className="text-white font-mono">4500 RPM</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;