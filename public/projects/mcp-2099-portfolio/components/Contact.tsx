import React from 'react';
import { Send, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow specific for contact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 glass-panel p-8 md:p-12 rounded-3xl border border-cyber-primary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">INITIALIZE UPLINK</h2>
          <p className="text-gray-400 font-mono text-sm">
            Secure channel open. Transmission ready.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyber-primary uppercase">Identity</label>
              <input 
                type="text" 
                placeholder="ENTER_NAME"
                className="w-full bg-black/40 border border-gray-700 rounded p-4 text-white focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary/50 transition-all font-mono text-sm placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyber-primary uppercase">Frequency (Email)</label>
              <input 
                type="email" 
                placeholder="ENTER_EMAIL"
                className="w-full bg-black/40 border border-gray-700 rounded p-4 text-white focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary/50 transition-all font-mono text-sm placeholder:text-gray-600"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-primary uppercase">Transmission Data</label>
            <textarea 
              rows={4}
              placeholder="INPUT_MESSAGE_STREAM..."
              className="w-full bg-black/40 border border-gray-700 rounded p-4 text-white focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary/50 transition-all font-mono text-sm placeholder:text-gray-600"
            />
          </div>

          <button className="w-full py-4 bg-cyber-primary text-black font-bold font-mono tracking-widest hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 group">
            <span>TRANSMIT</span>
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 flex justify-center gap-8 border-t border-gray-800 pt-8">
            <a href="#" className="text-gray-500 hover:text-cyber-primary transition-colors"><Github /></a>
            <a href="#" className="text-gray-500 hover:text-cyber-primary transition-colors"><Linkedin /></a>
            <a href="#" className="text-gray-500 hover:text-cyber-primary transition-colors"><Twitter /></a>
            <a href="#" className="text-gray-500 hover:text-cyber-primary transition-colors"><Mail /></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;