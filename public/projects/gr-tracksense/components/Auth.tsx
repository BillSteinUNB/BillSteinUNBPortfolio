import React, { useState } from 'react';
import RacingBackground from './RacingBackground';
import { authService } from '../services/authService';
import Logo from './Logo';

interface AuthProps {
  onLoginSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authService.login(email);
    setLoading(false);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <RacingBackground />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-full max-w-md p-8 glass-panel border-zinc-800 shadow-2xl">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
          {isLogin ? 'SYSTEM ACCESS' : 'NEW REGISTRATION'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Operator ID (Email)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-gr focus:ring-1 focus:ring-gr transition-all"
              placeholder="engineer@gr-tracksense.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Security Key (Password)</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-gr focus:ring-1 focus:ring-gr transition-all"
              placeholder="••••••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-gr text-white font-heading font-bold py-3 uppercase tracking-wider hover:bg-gr-light transition-all
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? 'AUTHENTICATING...' : (isLogin ? 'INITIALIZE SESSION' : 'REGISTER')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-zinc-500 hover:text-white underline font-mono"
          >
            {isLogin ? 'REQUEST ACCESS CREDENTIALS' : 'RETURN TO LOGIN'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;