import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X, Maximize2, Minimize2 } from 'lucide-react';
import { getChatResponse } from '../services/aiService';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string, parts: { text: string }[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    const response = await getChatResponse(userMessage, messages);
    
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  const suggestedQuestions = [
    "Analyze the impact of Dupixent on Specialty Care revenue.",
    "Propose a strategic expansion plan for the APAC region.",
    "Evaluate the R&D pipeline risk based on current probability of success.",
    "How does Sanofi's mission drive our current vaccine strategy?",
    "Identify underperforming regions and suggest corrective actions."
  ];

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-sanofi-purple text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform"
        >
          <Sparkles size={28} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '64px' : '600px',
              width: isMinimized ? '300px' : '450px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-sanofi-purple p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Strategic AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Live Analysis</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                  {messages.length === 0 && (
                    <div className="space-y-8 py-4">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-sanofi-purple/10 text-sanofi-purple rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <Sparkles size={40} />
                        </div>
                        <h4 className="font-bold text-xl text-slate-900 tracking-tight">Strategic Intelligence</h4>
                        <p className="text-sm text-slate-500 mt-2 px-8 leading-relaxed">
                          I am trained on Sanofi's global datasets to provide real-time strategic insights and decision support.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Suggested Analysis</p>
                        <div className="grid grid-cols-1 gap-2">
                          {suggestedQuestions.map((q, i) => (
                            <button 
                              key={i}
                              onClick={() => {
                                setInput(q);
                                handleSend();
                              }}
                              className="text-left p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:border-sanofi-purple hover:text-sanofi-purple transition-all"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className={cn(
                      "flex gap-3",
                      msg.role === 'user' ? "flex-row-reverse" : ""
                    )}>
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        msg.role === 'user' ? "bg-slate-200 text-slate-600" : "bg-sanofi-purple text-white"
                      )}>
                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={cn(
                        "max-w-[85%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed",
                        msg.role === 'user' ? "bg-white text-slate-900 rounded-tr-none border border-slate-100" : "bg-sanofi-purple text-white rounded-tl-none"
                      )}>
                        <div className="markdown-body">
                          <Markdown>{msg.parts[0].text}</Markdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-sanofi-purple text-white rounded-xl flex items-center justify-center shrink-0">
                        <Bot size={16} />
                      </div>
                      <div className="bg-sanofi-purple/10 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                        <div className="w-1.5 h-1.5 bg-sanofi-purple rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-sanofi-purple rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-sanofi-purple rounded-full animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[10px] font-bold text-sanofi-purple ml-2 uppercase tracking-widest">Thinking</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask for strategic advice..."
                      className="w-full pl-4 pr-12 py-4 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-sanofi-purple/20 outline-none transition-all"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-sanofi-purple text-white rounded-xl hover:bg-sanofi-purple/90 disabled:opacity-50 transition-all shadow-lg shadow-sanofi-purple/20"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
                    AI-powered insights for Sanofi Strategic Hub.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
