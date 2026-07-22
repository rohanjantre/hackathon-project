import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, FileText, Server, Copy, Search, MessageSquare, Trash2, ChevronRight, Pin } from 'lucide-react';
import { copilotService } from '../../services/copilot';
import type { ChatMessage, Conversation } from '../../services/copilot';
import { Button } from '../../components/ui/button';

export const CopilotChat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHistory();
    loadSuggestions();
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const data = await copilotService.getConversationHistory();
      setConversations(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSuggestions = async () => {
    try {
      const data = await copilotService.getSuggestions();
      setSuggestions(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectConversation = async (id: string) => {
    try {
      const data = await copilotService.getConversation(id);
      setActiveConversation(data);
      setMessages(data.messages || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await copilotService.sendMessage(text, activeConversation?._id);
      setMessages(prev => [...prev, res.message]);
      
      if (!activeConversation) {
        // Reload history if this was the first message
        loadHistory();
        const updated = await copilotService.getConversation(res.conversationId);
        setActiveConversation(updated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-900 text-slate-200">
      {/* Left Sidebar: History */}
      <div className="w-80 border-r border-slate-700/60 bg-slate-900/50 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-slate-700/60">
          <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-500 text-white" onClick={() => { setActiveConversation(null); setMessages([]); }}>
            <MessageSquare className="w-4 h-4" /> New Chat
          </Button>
        </div>
        <div className="p-4 border-b border-slate-700/60 relative">
          <Search className="w-4 h-4 absolute left-7 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" placeholder="Search chats..." className="w-full bg-slate-800 border border-slate-700 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent</div>
          {conversations.map(c => (
            <div 
              key={c._id} 
              onClick={() => handleSelectConversation(c._id)}
              className={`p-3 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-between group ${activeConversation?._id === c._id ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
            >
              <span className="truncate pr-2 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                {c.title}
              </span>
              <Trash2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat Interface */}
      <div className="flex-1 flex flex-col relative bg-slate-900 bg-grid">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="h-16 border-b border-slate-700/60 flex items-center px-6 justify-between bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-200">Industrial Copilot <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full ml-2">GPT-4o RAG</span></h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-slate-400 hover:text-slate-200"><Pin className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 relative z-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-sky-500/10 border border-blue-500/30 flex items-center justify-center mb-4 shadow-glow">
                <Bot className="w-10 h-10 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">How can I assist your operations today?</h1>
              <p className="text-slate-400">I have access to all your uploaded SOPs, manuals, and real-time asset telemetry.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl mt-8">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(s)}
                    className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 text-sm text-left transition-all text-slate-300 hover:text-slate-100 flex items-center justify-between group"
                  >
                    {s}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-4 max-w-4xl mx-auto ${m.role === 'user' ? 'justify-end' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`p-5 rounded-2xl ${m.role === 'user' ? 'bg-slate-800 border border-slate-700/60 ml-12 text-slate-200' : 'bg-slate-900/60 border border-blue-500/20 shadow-inner mr-12 text-slate-300'}`}>
                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-3 mb-3 border-b border-slate-700/50 pb-2">
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">AI Engineer</span>
                        {m.confidence && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-mono">Confidence: {m.confidence}%</span>
                        )}
                        <button className="ml-auto text-slate-500 hover:text-slate-300"><Copy className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                    <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-a:text-blue-400 whitespace-pre-wrap">
                      {m.content}
                    </div>
                    {m.role === 'assistant' && m.citations && m.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-700/40">
                        <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">Evidence Citations</p>
                        <div className="space-y-2">
                          {m.citations.map((c, j) => (
                            <div key={j} className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-xs">
                              <span className="text-blue-400 font-semibold">{c.doc} (Page {c.page})</span>: &quot;{c.text}&quot;
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4 max-w-4xl mx-auto">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-blue-500/20 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input */}
        <div className="p-4 md:px-8 pb-8 z-10">
          <div className="max-w-4xl mx-auto relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
              placeholder="Ask about assets, manuals, or maintenance records..."
              className="w-full bg-slate-800/80 border border-slate-700 focus:border-blue-500/50 rounded-2xl pl-4 pr-16 py-4 shadow-glass resize-none min-h-[60px] max-h-[200px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
              rows={1}
            />
            <Button
              size="icon"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 bottom-2 rounded-xl bg-blue-600 hover:bg-blue-500"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-3">
            ForgeMind Copilot can make mistakes. Always verify engineering parameters with physical assets.
          </p>
        </div>
      </div>

      {/* Right Sidebar: Context Panel */}
      <div className="w-72 border-l border-slate-700/60 bg-slate-900/50 hidden xl:flex flex-col overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Server className="w-4 h-4" /> Active Context</h3>
          {messages.length > 0 && messages[messages.length - 1].referencedAssets?.map(a => (
            <div key={a} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center gap-3 mb-2">
              <Server className="w-8 h-8 p-1.5 bg-blue-500/20 text-blue-400 rounded-lg" />
              <div>
                <p className="text-sm font-medium text-slate-200">{a}</p>
                <p className="text-xs text-slate-500">Asset Profile Linked</p>
              </div>
            </div>
          ))}
          {(!messages.length || !messages[messages.length - 1].referencedAssets?.length) && (
            <p className="text-xs text-slate-500">No specific assets referenced yet.</p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><FileText className="w-4 h-4" /> Retrieved Sources</h3>
          {messages.length > 0 && messages[messages.length - 1].referencedDocuments?.map(d => (
            <div key={d} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 flex items-start gap-3 mb-2 hover:border-blue-500/30 cursor-pointer transition-colors">
              <FileText className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-200 line-clamp-2 leading-snug">{d}</p>
                <p className="text-[10px] text-slate-500 mt-1">Parsed by RAG Engine</p>
              </div>
            </div>
          ))}
          {(!messages.length || !messages[messages.length - 1].referencedDocuments?.length) && (
            <p className="text-xs text-slate-500">No documents actively used in current response.</p>
          )}
        </div>
      </div>
    </div>
  );
};
