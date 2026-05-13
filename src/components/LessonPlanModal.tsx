import { useState } from 'react';
import { BookOpen, X } from 'lucide-react';

export function LessonPlanModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-1.5 bg-white text-black border-2 border-black hover:bg-[#ccff00] transition-colors text-sm font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transform uppercase tracking-wider"
      >
        <BookOpen size={16} strokeWidth={2.5} />
        查看配套教案
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col border-4 border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] overflow-hidden rounded-none">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-black bg-[#ccff00]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-black text-[#ccff00] text-xs font-bold uppercase tracking-wider">熊布朗AI 实践营</span>
                  <span className="text-xs font-black text-black uppercase border border-black px-1">Demo 3</span>
                </div>
                <h2 className="text-3xl font-black text-black tracking-tight uppercase">GPT 核心机制透视指南</h2>
                <p className="text-sm font-bold text-black mt-1">从一句“你好”开始，用 X-Ray 视角验证课件中的核心原理。</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-black hover:bg-black hover:text-[#ccff00] border-2 border-transparent hover:border-black transition-colors"
              >
                <X size={32} strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 text-black bg-zinc-50 font-medium">
              
              <section className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-3">
                  <span className="bg-black text-[#ccff00] w-8 h-8 flex items-center justify-center text-lg border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">1</span>
                  生成 vs 查询：每次发出的都是“超长前文”
                </h3>
                <div className="text-base leading-relaxed text-zinc-800 space-y-2 p-4 border-2 border-black bg-white">
                  <p><strong className="text-black bg-[#ccff00] px-1">课件对应：</strong>GPT 不是在查答案，而是在用训练出来的语言规律生成答案。</p>
                  <p><strong className="text-black bg-[#ccff00] px-1">X-Ray 验证：</strong>
                  当你在界面输入一句“你好”时，大模型并不是去数据库里检索回复。在右侧的 <strong>LLM Perspective (Flattened)</strong> 视图中，你可以看到，客户端（Client）其实在背后偷偷拼接了很长的 <code className="font-bold bg-zinc-200 px-1 border border-zinc-400">System Prompt</code>（比如日期、人设），加上你的话，形成了一段长长的文本。模型接收到这段长文本后，唯一做的事情就是<strong>“给定上文，预测下文”</strong>（闪烁的光标）。</p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-3">
                  <span className="bg-black text-[#ccff00] w-8 h-8 flex items-center justify-center text-lg border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">2</span>
                  为什么聊久了会忘？（上下文窗口与压缩机制）
                </h3>
                <div className="text-base leading-relaxed text-zinc-800 space-y-2 p-4 border-2 border-black bg-white">
                  <p><strong className="text-black bg-[#ccff00] px-1">课件对应：</strong>AI 没有“长期记忆”，它只读当前的上下文（包）。</p>
                  <p><strong className="text-black bg-[#ccff00] px-1">X-Ray 验证：</strong>
                  在多轮对话中，你会在中间栏 <strong>Prompt Assembly View</strong> 看到，每一次点击发送，之前的聊天记录都会像打包裹一样重新拼接到一起。
                  但包裹大小是有限的。当你聊得太多（触发 Token 上限），最前面的对话会被挤出窗口，或者被客户端偷偷压缩成一句 <code className="font-bold bg-zinc-200 px-1 border border-zinc-400">[Client Action: Context Compression]</code>。
                  这就直观解释了：所谓长对话变笨，本质上不是模型智商下降，而是<strong>关键信息被挤出视野了</strong>。</p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-3">
                  <span className="bg-black text-[#ccff00] w-8 h-8 flex items-center justify-center text-lg border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">3</span>
                  提示词的本质：为接龙铺路
                </h3>
                <div className="text-base leading-relaxed text-zinc-800 space-y-2 p-4 border-2 border-black bg-white">
                  <p><strong className="text-black bg-[#ccff00] px-1">课件对应：</strong>提示词不是提问，而是在给“接龙铺路”。你给它看什么，决定它生成什么。</p>
                  <p><strong className="text-black bg-[#ccff00] px-1">X-Ray 验证：</strong>
                  你可以尝试切换左上角的 <strong>Persona（人设）</strong>（比如换成 Strict Reviewer）。你会发现，随着人设的切换，最底层的 System Prompt 改变了。因为模型是根据眼前的上文来“算”下一步概率的，既然上文设定了它是严苛的审查员，它生成的下文就会沿着这条路变成严厉的语气。这证明了：<strong>路越清晰、越具体，走到终点的结果就越好。</strong></p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-3">
                  <span className="bg-black text-[#ccff00] w-8 h-8 flex items-center justify-center text-lg border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">4</span>
                  Tool Calling：拆解“AI 联网查资料”的幻觉
                </h3>
                <div className="p-5 border-2 border-black bg-[#ccff00] text-black text-base leading-relaxed font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <p className="mb-4">大模型没有自带浏览器，它甚至没有外网权限，它是怎么知道今天天气的？<br/>尝试在对话框输入“<strong>查一下巴黎的天气</strong>”，观察中间栏和右侧栏的剧变：</p>
                  <ol className="list-decimal list-inside space-y-3 ml-2 font-medium">
                    <li><strong>第一轮请求：</strong>客户端把包含 <code>web_search</code> 的工具说明书传给了模型。</li>
                    <li><strong>特殊输出：</strong>模型依然在做文字预测，但它预测出了一个特殊的 <code className="bg-black text-[#ccff00] px-1">&lt;|tool_call|&gt;</code> 指令。</li>
                    <li><strong>客户端拦截：</strong>工程侧看到这个指令，暂停对话，立刻在本地发起真实的 Google 搜索（UI 显示 ⏳ 正在搜索）。</li>
                    <li><strong>结果注入：</strong>搜索结果回来后，客户端把它伪装成一长段前文（<code>role: "tool"</code>），再次强行塞回上下文。</li>
                    <li><strong>挤占记忆：</strong>因为搜索结果通常很长，你会看到右侧的 Tokens 条瞬间飙升，强行将更早的聊天记录挤出窗口（Eviction）。</li>
                    <li><strong>最终生成：</strong>模型看到了这段超长搜索结果，顺理成章地接龙出答案。</li>
                  </ol>
                  <p className="mt-6 text-sm font-black uppercase border-t-2 border-black pt-4">
                    💡 结论：AI 依旧是从未联网的接龙机器，所谓的“查资料”，只是客户端在做苦力并把资料“喂”到了它的眼前。
                  </p>
                </div>
              </section>

              <div className="pt-8 mt-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-base font-black uppercase text-black bg-[#ccff00] p-2 border-2 border-black">
                  “AI 从来不‘懂’你，它只是在你给定的上下文边界里，按概率完成一场文字接龙。”
                </span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-black text-white font-black uppercase tracking-wider hover:bg-[#ccff00] hover:text-black border-2 border-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] whitespace-nowrap"
                >
                  去 X-Ray 里验证
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
