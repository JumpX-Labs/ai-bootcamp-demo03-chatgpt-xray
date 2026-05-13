import { useState } from 'react';
import { useTeachingChatStore, type Persona } from '../store/useTeachingChatStore';
import { Send, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ChatView() {
  const { messages, sendMessage, persona, setPersona, clearChat, isSearching } = useTeachingChatStore();
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSearching) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 border-r-2 border-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-black bg-white">
        <div>
          <h2 className="font-black text-lg text-black uppercase tracking-tight">User View</h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">The "dumb" UI layer</p>
        </div>
        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value as Persona)}
          className="text-sm font-bold border-2 border-black rounded-none p-1.5 bg-[#ccff00] text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:outline-none cursor-pointer"
        >
          <option value="ta">TA (Rigorous)</option>
          <option value="writer">Writer (Friendly)</option>
          <option value="reviewer">Reviewer (Strict)</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 font-bold uppercase tracking-widest">
            <p>Start a conversation...</p>
          </div>
        ) : (
          messages.map((msg) => {
            if (msg.role === 'tool') {
               return (
                 <div key={msg.id} className="max-w-[85%] mr-auto rounded-none p-2 text-xs bg-zinc-200 border-2 border-black text-zinc-600 font-mono overflow-hidden shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                   <div className="font-black mb-1 flex items-center gap-1 uppercase">🔧 Tool Result ({msg.name})</div>
                   <div className="truncate">{msg.content}</div>
                 </div>
               );
            }
            if (msg.tool_calls) {
               return (
                 <div key={msg.id} className="max-w-[85%] mr-auto rounded-none p-3 text-sm bg-black text-[#ccff00] border-2 border-black flex items-center gap-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-mono">
                   <span className="animate-spin text-lg">⏳</span>
                   <span>ChatGPT is searching: <strong>{JSON.parse(msg.tool_calls[0].function.arguments).query}</strong></span>
                 </div>
               );
            }

            return (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[85%] rounded-none p-3 text-sm border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]",
                  msg.role === 'user' 
                    ? "bg-[#ccff00] text-black ml-auto"
                    : "bg-white text-black mr-auto"
                )}
              >
                <div className="font-black text-[10px] mb-1 opacity-60 uppercase tracking-widest">
                  {msg.role === 'user' ? 'You' : 'ChatGPT'}
                </div>
                <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
              </div>
            );
          })
        )}
        {isSearching && (
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest animate-pulse">Processing request steps...</div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t-2 border-black flex flex-col gap-2">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={clearChat}
            className="p-2 text-zinc-400 hover:text-black border-2 border-transparent hover:border-black rounded-none transition bg-zinc-100 hover:bg-[#ccff00]"
            title="Clear Chat"
          >
            <Trash2 size={20} strokeWidth={2.5} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSearching}
            placeholder="TYPE YOUR MESSAGE..."
            className="flex-1 bg-white border-2 border-black rounded-none py-2 px-4 focus:outline-none focus:bg-[#ccff00]/10 text-black font-bold placeholder:text-zinc-300 disabled:opacity-50 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSearching}
            className="p-2.5 bg-black text-[#ccff00] rounded-none border-2 border-black disabled:opacity-50 hover:bg-[#ccff00] hover:text-black transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          >
            <Send size={18} strokeWidth={2.5} />
          </button>
        </form>
        <div className="text-[10px] font-bold text-center text-zinc-400 uppercase tracking-widest mt-1">
          💡 Try using keywords like <strong className="text-black">"查一下", "搜索", "search", "weather", "天气"</strong> to trigger Tool Calling.
        </div>
      </div>
    </div>
  );
}
