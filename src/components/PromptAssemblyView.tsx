import { useTeachingChatStore } from '../store/useTeachingChatStore';
import { Layers } from 'lucide-react';
import { cn } from '../lib/utils';

export function PromptAssemblyView() {
  const { systemPrompt, windowMessages } = useTeachingChatStore();

  return (
    <div className="flex flex-col h-full bg-zinc-100 border-r-2 border-black">
      <div className="p-4 border-b-2 border-black bg-white">
        <h2 className="font-black text-lg text-black uppercase tracking-tight flex items-center gap-2">
          <Layers size={20} strokeWidth={2.5} />
          Prompt Assembly
        </h2>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Logical Messages Array (Before Request)</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {/* System Prompt Block */}
        <div className="space-y-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-black bg-[#ccff00] inline-block px-2 py-1 border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            1. System Prompt (Injected)
          </div>
          <div className="bg-white border-2 border-black border-dashed rounded-none p-4 text-sm text-black font-mono shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            {systemPrompt}
          </div>
        </div>

        {/* History Block */}
        <div className="space-y-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-black bg-white inline-block px-2 py-1 border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            2. Context Window (History + Current)
          </div>
          {windowMessages.length === 0 ? (
            <div className="text-sm font-bold text-zinc-400 italic bg-white p-4 border-2 border-dashed border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] uppercase">
              No history yet. Wait for next message.
            </div>
          ) : (
            <div className="space-y-3">
              {windowMessages.map((msg, idx) => {
                const isSummary = msg.source === 'summary';
                return (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "p-3 text-sm border-2 border-black font-mono shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
                      isSummary 
                        ? "bg-zinc-200 border-dashed" 
                        : "bg-white"
                    )}
                  >
                    <div className="flex justify-between items-center mb-2 border-b-2 border-black pb-2">
                      <span className={cn(
                        "text-xs font-black uppercase tracking-wider",
                        msg.role === 'user' ? 'text-blue-600' : 
                        msg.role === 'system' ? 'text-amber-600' : 
                        msg.role === 'tool' ? 'text-zinc-500' : 'text-green-600',
                        isSummary && 'text-purple-600'
                      )}>
                        [{msg.role}] {isSummary && '— Client Action: Context Compression'}
                      </span>
                      {idx === windowMessages.length - 1 && (
                        <span className="text-[10px] bg-black text-[#ccff00] font-bold px-2 py-0.5 uppercase tracking-widest">
                          Current Input
                        </span>
                      )}
                    </div>
                    
                    {msg.tool_calls ? (
                      <div className="text-pink-600 font-bold whitespace-pre-wrap">
                        {`[Tool Call]: ${msg.tool_calls[0].function.name}(${msg.tool_calls[0].function.arguments})`}
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-black font-medium">
                        {msg.content}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
