import React from 'react';
import { Lock, FileCode, Share2, Layers } from 'lucide-react';

const DocCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="group relative p-8 bg-[#0a0a0a]/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-[#00f3ff]/30 transition-all duration-500 hover:bg-[#0a0a0a]/60">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
       {icon}
    </div>
    <div className="relative z-10">
       <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-white/5 text-[#00f3ff] group-hover:scale-110 transition-transform duration-500">
             {icon}
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
       </div>
       <div className="text-gray-400 leading-relaxed text-sm">
         {children}
       </div>
       <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-[#ff4d00]">v2.1.0</span>
          <button className="text-xs text-white hover:text-[#00f3ff] transition-colors uppercase tracking-widest flex items-center gap-1">
            Read Spec <span className="text-[10px]">&rarr;</span>
          </button>
       </div>
    </div>
    {/* Hover Glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-[#00f3ff] to-[#ff4d00] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
  </div>
);

const Protocol: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">SYSTEM PROTOCOLS</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Technical specifications for the MCP-2099 decentralized neural grid interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocCard title="Encryption Layer" icon={<Lock size={24} />}>
          <p>
            Utilizing quantum-resistant lattice-based cryptography (Kyber-1024) for all node-to-node communications.
            Ensures complete forward secrecy and immunity to retro-causal decryption attacks.
          </p>
        </DocCard>

        <DocCard title="Smart Contracts" icon={<FileCode size={24} />}>
          <p>
            Self-executing neural contracts deployed on the hyper-ledger.
            Supports Turing-complete execution with sub-millisecond finality and automated gas optimization based on network load.
          </p>
        </DocCard>

        <DocCard title="Mesh Topology" icon={<Share2 size={24} />}>
          <p>
            Dynamic peer-to-peer discovery using Kademlia DHT modified for spatial locality.
            Nodes automatically rebalance to minimize latency, forming a resilient, self-healing mesh.
          </p>
        </DocCard>

        <DocCard title="Data Sharding" icon={<Layers size={24} />}>
          <p>
            Adaptive database sharding splits the global state into manageable chunks.
            Hot-path data is cached in edge memory, while cold storage utilizes holographic encoding.
          </p>
        </DocCard>
      </div>
    </div>
  );
};

export default Protocol;
