import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import TechBackground from './TechBackground';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-zinc-950 relative overflow-hidden">
      <TechBackground variant="hex" className="opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl font-heading font-bold text-white mb-4">THE CREW</h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
          Engineers, Data Scientists, and Racing enthusiasts building the future of GR motorsport analytics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="group relative glass-panel p-6 overflow-hidden hover:border-gr transition-colors duration-300">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                 <span className="text-6xl font-heading font-bold text-white">{member.id}</span>
              </div>
              
              <div className="w-20 h-20 rounded-full bg-zinc-800 mb-6 overflow-hidden border-2 border-zinc-700 group-hover:border-gr transition-colors">
                 <img src={`https://picsum.photos/id/${member.image}/200/200`} alt={member.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-2xl font-bold text-white font-heading">{member.name}</h3>
              <p className="text-gr font-mono text-sm mb-2">{member.role}</p>
              <div className="h-px w-12 bg-zinc-700 my-4 group-hover:w-full group-hover:bg-gr transition-all duration-500" />
              <p className="text-zinc-400 text-sm">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;