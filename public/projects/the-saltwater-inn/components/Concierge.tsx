import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I\'m your local guide. Ask me anything about our weather, tides, or the best lobster rolls nearby.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      // Error handled in service
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`pointer-events-auto transition-all duration-300 transform origin-bottom-right mb-4 w-80 md:w-96 glass-panel-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 h-0'}`}
        style={{ maxHeight: '500px' }}
      >
        <div className="bg-bay-blue/90 p-4 border-b border-white/10 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <h3 className="font-serif font-medium">Concierge</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bay-blue/80 min-h-[300px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-sunlit-gold text-bay-blue rounded-br-none' 
                    : 'bg-white/10 text-morning-fog rounded-bl-none border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-sunlit-gold" />
                <span className="text-xs text-white/50">Consulting the charts...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-bay-blue/90 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about local sights..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-sunlit-gold/50"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-sunlit-gold text-bay-blue p-2 rounded-full hover:bg-white transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-bay-blue text-sunlit-gold p-4 rounded-full shadow-lg hover:bg-forest-pine transition-all duration-300 group flex items-center gap-2 border border-sunlit-gold/20"
      >
        <MessageCircle size={24} className={isOpen ? 'opacity-0 absolute' : 'opacity-100'} />
        <X size={24} className={!isOpen ? 'opacity-0 absolute' : 'opacity-100'} />
        <span className={`font-serif overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-24 opacity-100 pl-8'}`}>
          Ask Guide
        </span>
      </button>
    </div>
  );
};

export default Concierge;
