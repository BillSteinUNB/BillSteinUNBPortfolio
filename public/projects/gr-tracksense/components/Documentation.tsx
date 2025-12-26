import React from 'react';
import TechBackground from './TechBackground';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex bg-zinc-950">
       <TechBackground variant="network" className="opacity-10 fixed" />
       
       {/* Sidebar */}
       <div className="w-64 fixed h-full border-r border-zinc-800 bg-zinc-950/80 p-6 hidden md:block z-20">
          <h3 className="font-heading font-bold text-white mb-6">DOCS V2.4</h3>
          <ul className="space-y-4 text-sm text-zinc-400">
             <li className="text-gr font-bold">Introduction</li>
             <li className="hover:text-white cursor-pointer">Installation</li>
             <li className="hover:text-white cursor-pointer">Authentication</li>
             <li className="hover:text-white cursor-pointer">Telemetry Stream</li>
             <li className="hover:text-white cursor-pointer">WebSockets</li>
             <li className="hover:text-white cursor-pointer">Predictive Models</li>
          </ul>
       </div>

       {/* Content */}
       <div className="flex-1 md:ml-64 p-8 relative z-10 max-w-4xl">
          <h1 className="text-4xl font-heading font-bold text-white mb-6">Introduction</h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
             The GR TrackSense API provides developers with high-frequency access to vehicle telemetry, track conditions, and AI-generated strategy predictions. 
             Built for the Gazoo Racing ecosystem.
          </p>

          <h2 className="text-2xl font-heading font-bold text-white mb-4">Python SDK Installation</h2>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded mb-8 font-mono text-sm overflow-x-auto">
             <code className="text-zinc-300">
                <span className="text-gr">$</span> pip install gr-tracksense-sdk
             </code>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white mb-4">Quick Start</h2>
          <p className="text-zinc-400 mb-4">Initialize the client with your vehicle ID and API key.</p>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded mb-8 font-mono text-sm overflow-x-auto">
             <code className="text-blue-400">import</code> <code className="text-white">gr_tracksense</code> <code className="text-blue-400">as</code> <code className="text-white">gr</code><br/>
             <br/>
             <code className="text-white">client = gr.Client(api_key=<span className="text-green-400">"gr_live_..."</span>)</code><br/>
             <code className="text-white">stream = client.connect(vehicle_id=<span className="text-green-400">"GR-COROLLA-001"</span>)</code><br/>
             <br/>
             <code className="text-purple-400">for</code> <code className="text-white">packet</code> <code className="text-purple-400">in</code> <code className="text-white">stream:</code><br/>
             &nbsp;&nbsp;<code className="text-white">print(f"RPM: {`{packet.rpm}`} | Gear: {`{packet.gear}`}")</code>
          </div>
       </div>
    </div>
  );
};

export default Documentation;