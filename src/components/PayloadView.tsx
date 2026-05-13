import { useState } from 'react';
import { useTeachingChatStore } from '../store/useTeachingChatStore';
import { Code, Settings2, Copy, CheckCircle2 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';

export function PayloadView() {
  const { 
    lastPayload, 
    windowMessages, 
    droppedMessages, 
    maxTokens,
    isSummarizing,
    toggleSummarizing
  } = useTeachingChatStore();

  const [copied, setCopied] = useState(false);

  // Mock token counting (1 char = 1 token roughly)
  const currentTokens = windowMessages.reduce((acc, msg) => acc + msg.content.length, 0);
  const tokenPercentage = Math.min(100, (currentTokens / maxTokens) * 100);

  const handleCopy = () => {
    if (lastPayload) {
      navigator.clipboard.writeText(JSON.stringify(lastPayload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 font-sans">
      <div className="p-4 border-b-2 border-zinc-800 bg-black flex justify-between items-center">
        <div>
          <h2 className="font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
            <Settings2 size={20} className="text-[#ccff00]" strokeWidth={2.5} />
            Engineering View
          </h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Context Window & Payload</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <label className="flex items-center gap-2 cursor-pointer bg-zinc-900 px-3 py-1.5 border border-zinc-800">
            <input 
              type="checkbox" 
              checked={isSummarizing}
              onChange={toggleSummarizing}
              className="accent-[#ccff00] w-4 h-4"
            />
            Auto-Summary
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Context Window Usage */}
        <div className="p-4 border-b-2 border-zinc-800 bg-zinc-950">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
            <span className="text-zinc-400">Context Window (Mock Tokens)</span>
            <span className={cn(currentTokens >= maxTokens ? "text-red-500" : "text-[#ccff00]")}>
              {currentTokens} / {maxTokens}
            </span>
          </div>
          <div className="h-4 w-full bg-zinc-900 border border-zinc-800 overflow-hidden flex">
            <div 
              className={cn(
                "h-full transition-all duration-300",
                currentTokens >= maxTokens ? "bg-red-500" : "bg-[#ccff00]"
              )}
              style={{ width: `${tokenPercentage}%` }}
            />
          </div>
        </div>

        {/* Dropped / Truncated Info */}
        {droppedMessages.length > 0 && (
          <div className="p-4 border-b-2 border-zinc-800 bg-black">
            <div className="text-xs font-black text-red-500 mb-3 uppercase tracking-widest">Dropped Messages (Exceeded Window)</div>
            <div className="space-y-3">
              {droppedMessages.map(msg => (
                <div key={msg.id} className="text-xs font-mono bg-red-950/20 border border-red-900/50 p-3 text-red-400/80 truncate">
                  <strong className="uppercase mr-2">[{msg.role}]</strong> {msg.content}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API vs LLM View Tabs */}
        <div className="p-4 flex-1 flex flex-col min-h-0 bg-zinc-950">
          <Tabs.Root defaultValue="api" className="flex flex-col h-full">
            <Tabs.List className="flex border-b-2 border-zinc-800 mb-4">
              <Tabs.Trigger 
                value="api" 
                className="px-6 py-3 text-xs font-black uppercase tracking-widest text-zinc-500 data-[state=active]:text-[#ccff00] data-[state=active]:border-b-2 data-[state=active]:border-[#ccff00] hover:text-zinc-300 transition-colors bg-black/50 data-[state=active]:bg-zinc-900"
              >
                OpenAI API (JSON)
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="llm" 
                className="px-6 py-3 text-xs font-black uppercase tracking-widest text-zinc-500 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white hover:text-zinc-300 transition-colors bg-black/50 data-[state=active]:bg-zinc-900"
              >
                LLM Perspective (Flattened)
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="api" className="flex-1 flex flex-col min-h-0 outline-none">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#ccff00] flex items-center gap-2 bg-[#ccff00]/10 px-2 py-1 border border-[#ccff00]/20">
                  <Code size={14} strokeWidth={2.5} /> Final API Request Payload
                </div>
                {lastPayload && (
                  <button 
                    onClick={handleCopy}
                    className="text-[10px] font-bold uppercase tracking-widest bg-zinc-900 hover:bg-[#ccff00] text-zinc-300 hover:text-black border border-zinc-700 hover:border-[#ccff00] px-3 py-1.5 flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                )}
              </div>
              
              <div className="bg-black border-2 border-zinc-800 p-4 text-xs font-mono overflow-y-auto flex-1 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                {lastPayload ? (
                  <pre className="text-[#ccff00] whitespace-pre-wrap break-all leading-relaxed">
                    {JSON.stringify(lastPayload, null, 2)}
                  </pre>
                ) : (
                  <span className="text-zinc-600 font-bold uppercase tracking-widest">Waiting for first request...</span>
                )}
              </div>
            </Tabs.Content>

            <Tabs.Content value="llm" className="flex-1 flex flex-col min-h-0 outline-none">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 bg-zinc-800 px-2 py-1 border border-zinc-700">
                  <Code size={14} strokeWidth={2.5} /> Flattened Text (ChatML format)
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">How the LLM sees it</div>
              </div>
              <div className="bg-black border-2 border-zinc-800 p-4 text-xs font-mono overflow-y-auto flex-1 text-zinc-300 whitespace-pre-wrap leading-relaxed shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                {lastPayload ? (
                  <>
                    {lastPayload.messages.map((m: any, i: number) => {
                      if (m.tool_calls) {
                        return (
                          <div key={i} className="mb-4">
                            <span className="text-zinc-600">{'<|im_start|>'}</span>
                            <span className="text-white font-bold">{m.role}</span>
                            <br/>
                            <span className="text-[#ccff00]">{'<|tool_call|>'}</span>
                            <span className="text-zinc-400">{JSON.stringify({name: m.tool_calls[0].function.name, arguments: JSON.parse(m.tool_calls[0].function.arguments)})}</span>
                            <span className="text-zinc-600">{'<|im_end|>'}</span>
                          </div>
                        );
                      }
                      if (m.role === 'tool') {
                        return (
                          <div key={i} className="mb-4">
                            <span className="text-zinc-600">{'<|im_start|>'}</span>
                            <span className="text-white font-bold">{m.role}</span>
                            <br/>
                            <span className="text-zinc-400">{m.content}</span>
                            <span className="text-zinc-600">{'<|im_end|>'}</span>
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="mb-4">
                          <span className="text-zinc-600">{'<|im_start|>'}</span>
                          <span className="text-white font-bold">{m.role}</span>
                          <br/>
                          <span className="text-zinc-300">{m.content}</span>
                          <span className="text-zinc-600">{'<|im_end|>'}</span>
                        </div>
                      );
                    })}
                    {/* Render Assistant wait cursor only if the last message was user or tool */}
                    {['user', 'tool', 'system'].includes(lastPayload.messages[lastPayload.messages.length - 1]?.role) && (
                      <div>
                        <span className="text-zinc-600">{'<|im_start|>'}</span>
                        <span className="text-white font-bold">assistant</span>
                        <br/>
                        <span className="text-[#ccff00] animate-pulse block h-4 w-2 bg-[#ccff00] mt-1 shadow-[0_0_8px_#ccff00]"></span>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-zinc-600 font-bold uppercase tracking-widest">Waiting for first request...</span>
                )}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
