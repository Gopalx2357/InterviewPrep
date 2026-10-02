import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Loader2,
  MessageSquare,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'How to crack TCS Digital & NQT?',
  'Explain 0/1 Knapsack DP pattern',
  'What is the difference between HLD and LLD?',
  'Top 5 Amazon Leadership Principles tips',
];

const AI_KNOWLEDGE_BASE = {
  tcs: 'For TCS NQT & Digital:\n1. Focus on Advanced Coding: 2 problems (30m & 45m) covering DP, Strings, and Arrays.\n2. Master Pseudocode debugging and SQL Joins.\n3. Digital roles require clearing both Foundation and Advanced sections with 70%+ score.',
  knapsack: '0/1 Knapsack DP:\n• State: dp[i][w] = max value using first i items with weight limit w.\n• Recurrence: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]).\n• Optimization: 1D array space optimization reduces memory to O(W)!',
  system: 'High Level Design (HLD) focuses on system architecture (Load Balancers, API Gateway, DB Sharding, Caching).\nLow Level Design (LLD) focuses on class diagrams, OOP design patterns (Factory, Singleton, Strategy), and SOLID principles.',
  amazon: 'Amazon Interview Strategy:\n1. Prepare 2 STAR method stories for each of the 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action).\n2. Master Monotonic Stack, Two Pointer, and Graph BFS for the coding round.',
  dsa: 'To master DSA efficiently:\n1. Solve topic-wise LeetCode Mediums (15 Arrays, 15 Trees, 15 Graphs, 15 DP).\n2. Focus on pattern recognition rather than memorizing individual code.',
};

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I am ASK AI Assistant 🤖. How can I help you crack your upcoming Online Assessment or Tech Interview today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      const lower = query.toLowerCase();

      if (lower.includes('tcs') || lower.includes('ninja') || lower.includes('digital')) {
        replyText = AI_KNOWLEDGE_BASE.tcs;
      } else if (lower.includes('knapsack') || lower.includes('dp') || lower.includes('dynamic')) {
        replyText = AI_KNOWLEDGE_BASE.knapsack;
      } else if (lower.includes('hld') || lower.includes('lld') || lower.includes('system design')) {
        replyText = AI_KNOWLEDGE_BASE.system;
      } else if (lower.includes('amazon') || lower.includes('leadership')) {
        replyText = AI_KNOWLEDGE_BASE.amazon;
      } else if (lower.includes('dsa') || lower.includes('leetcode') || lower.includes('coding')) {
        replyText = AI_KNOWLEDGE_BASE.dsa;
      } else {
        replyText = `Great question! For "${query}", I recommend checking our verified company prep packages and DSA handbooks in the marketplace. You get exact previous year OA questions and step-by-step solutions!`;
      }

      const aiMsg = {
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Opened Chat Modal Window (Docked in Bottom-Right Corner) */}
      {isOpen && (
        <div className="mb-4 w-[92vw] sm:w-96 h-[500px] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>ASK AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  Online • Powered by Gemini AI
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 pl-1">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-[11px] font-medium">ASK is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="p-2.5 bg-slate-100/60 border-t border-slate-200 overflow-x-auto flex gap-1.5 custom-scrollbar">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask interview or prep question..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs text-slate-900"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button Fixed in Bottom Right Corner */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full shadow-2xl shadow-blue-600/40 ring-4 ring-white hover:ring-blue-400 hover:scale-105 active:scale-95 transition-all select-none"
        title="ASK AI Assistant"
      >
        {/* Glowing Animated Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-ping opacity-20 pointer-events-none"></span>

        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <span className="text-sm font-black tracking-wider drop-shadow-md bg-gradient-to-b from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent uppercase">
            ASK
          </span>
        )}

        {/* Online Indicator Dot */}
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
};

export default AIAssistantWidget;
