import React, { useState, useRef, useEffect } from 'react';
import { generateBrutalistResponse } from '../services/geminiService';
import { TerminalStatus, ChatMessage } from '../types';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'system', content: 'system_initialized. waiting_for_input...', timestamp: Date.now() }
  ]);
  const [status, setStatus] = useState<TerminalStatus>(TerminalStatus.IDLE);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === TerminalStatus.THINKING) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setStatus(TerminalStatus.THINKING);

    const responseText = await generateBrutalistResponse(userMsg.content);

    const modelMsg: ChatMessage = { role: 'model', content: responseText, timestamp: Date.now() };
    setHistory(prev => [...prev, modelMsg]);
    setStatus(TerminalStatus.IDLE);
  };

  return (
    <div className="w-full border-2 border-primary p-4 my-12 bg-bg relative overflow-hidden">
      {/* Decorative Header for Terminal */}
      <div className="absolute top-0 left-0 bg-primary text-bg text-xs px-2 py-1 font-bold">
        TERMINAL_V.1.0
      </div>
      
      <div className="mt-6 h-64 overflow-y-auto font-mono text-sm space-y-2 mb-4 scrollbar-hide">
        {history.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-muted mb-1 uppercase">
              {msg.role} // {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            <div className={`
              max-w-[90%] p-2 border border-muted 
              ${msg.role === 'model' ? 'bg-bg text-primary border-l-4 border-l-primary' : 'bg-muted/10 text-primary'}
            `}>
              <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm">{msg.content}</pre>
            </div>
          </div>
        ))}
        {status === TerminalStatus.THINKING && (
          <div className="flex items-center text-xs text-secondary animate-pulse">
             > processing_request... <span className="ml-1 inline-block w-2 h-4 bg-primary animate-blink"></span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center border-t border-muted pt-2">
        <span className="text-primary mr-2">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-primary font-mono placeholder-muted focus:ring-0"
          placeholder="query_system..."
          autoFocus
        />
        <button 
          type="submit" 
          disabled={status === TerminalStatus.THINKING}
          className="text-xs uppercase hover:bg-primary hover:text-bg px-2 py-1 transition-colors disabled:opacity-50"
        >
          EXEC
        </button>
      </form>
    </div>
  );
};

export default Terminal;
