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
        <div className="flex items-center gap-3">
          <LessonPlanModal />
          <a
            href="https://github.com/JumpX-Labs/ai-bootcamp-demo03-chatgpt-xray"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ccff00] hover:text-black transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]"
            title="View source on GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">SOURCE</span>
          </a>
        </div>
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
