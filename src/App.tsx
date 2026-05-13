import { ChatView } from './components/ChatView';
import { PromptAssemblyView } from './components/PromptAssemblyView';
import { PayloadView } from './components/PayloadView';
import { LessonPlanModal } from './components/LessonPlanModal';

function App() {
  return (
    <div className="h-screen w-full flex flex-col bg-zinc-100 overflow-hidden font-sans text-zinc-900">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b-2 border-black flex items-center justify-between px-6 shrink-0 z-10 relative">
        <div className="flex items-center">
          <h1 className="text-xl font-black tracking-tight uppercase flex items-center gap-2">
            <span className="bg-[#ccff00] text-black px-2 py-0.5 border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">X-RAY</span>
            PLAYGROUND
          </h1>
          <div className="ml-6 px-2.5 py-0.5 bg-black text-[#ccff00] text-xs font-bold uppercase tracking-widest">
            熊布朗AI 实践营 - Demo 3
          </div>
          <div className="ml-4 text-sm font-medium text-zinc-600 hidden lg:block">
            透视大模型工作原理：从上下文组装到概率接龙
          </div>
        </div>
        <LessonPlanModal />
      </header>

      {/* Main 3-column Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left: Chat UI */}
        <div className="w-1/3 min-w-[300px] h-full border-r-2 border-black bg-zinc-50 relative z-0">
          <ChatView />
        </div>

        {/* Middle: Logic Assembly */}
        <div className="w-1/3 min-w-[300px] h-full border-r-2 border-black bg-zinc-100">
          <PromptAssemblyView />
        </div>

        {/* Right: Network/Payload details */}
        <div className="w-1/3 min-w-[300px] h-full bg-zinc-950">
          <PayloadView />
        </div>
      </main>
    </div>
  );
}

export default App;
