import { create } from 'zustand';

export type Role = "system" | "developer" | "user" | "assistant" | "tool";
export type Persona = "ta" | "writer" | "reviewer";

export type Msg = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  source?: "user" | "mock" | "summary" | "dropped" | "tool";
  tool_calls?: any[];
  tool_call_id?: string;
  name?: string;
};

export type PayloadMessage = {
  role: string;
  content: string | null;
  tool_calls?: any[];
  tool_call_id?: string;
  name?: string;
};

export type Payload = {
  model: string;
  temperature: number;
  messages: PayloadMessage[];
  tools?: any[];
};

export type TeachingChatState = {
  persona: Persona;
  systemPrompt: string;
  messages: Msg[];
  windowMessages: Msg[];
  droppedMessages: Msg[];
  summaryMessages: Msg[];
  lastPayload: Payload | null;
  isSummarizing: boolean;
  isSearching: boolean;
  maxTokens: number;
  setPersona: (persona: Persona) => void;
  toggleSummarizing: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
};

const PERSONA_PROMPTS: Record<Persona, string> = {
  ta: "You are a rigorous Teaching Assistant. Explain concepts clearly, add warnings about common pitfalls.",
  writer: "You are a friendly writing assistant. Keep your tone encouraging and creative.",
  reviewer: "You are a strict code reviewer. Focus on performance, security, and edge cases. Be concise."
};

const getSystemPromptWithDate = (persona: Persona) => {
  const dateStr = new Date().toISOString().split('T')[0];
  return `Current date: ${dateStr}. Knowledge cutoff: 2023-10.\n${PERSONA_PROMPTS[persona]}`;
};

const MOCK_MAX_TOKENS = 600; 

function generateMockId() {
  return Math.random().toString(36).substring(2, 9);
}

const SEARCH_TRIGGER_REGEX = /查一下|搜索|search|weather|天气|谁是/i;

const MOCK_TOOLS = [
  {
    type: "function",
    function: {
      name: "web_search",
      description: "Search the web for real-time information",
      parameters: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"]
      }
    }
  }
];

export const useTeachingChatStore = create<TeachingChatState>((set, get) => ({
  persona: "ta",
  systemPrompt: getSystemPromptWithDate("ta"),
  messages: [],
  windowMessages: [],
  droppedMessages: [],
  summaryMessages: [],
  lastPayload: null,
  isSummarizing: true,
  isSearching: false,
  maxTokens: MOCK_MAX_TOKENS,

  setPersona: (persona) => set({ persona, systemPrompt: getSystemPromptWithDate(persona) }),
  
  toggleSummarizing: () => set((state) => ({ isSummarizing: !state.isSummarizing })),

  clearChat: () => set({
    messages: [],
    windowMessages: [],
    droppedMessages: [],
    summaryMessages: [],
    lastPayload: null,
    isSearching: false,
  }),

  sendMessage: async (content) => {
    // Helper to calculate windows and update state
    const updateWindowsAndPayload = (currentMessages: Msg[], withTools: boolean = false) => {
      const { systemPrompt, isSummarizing, maxTokens } = get();
      let windowMsgs: Msg[] = [];
      let droppedMsgs: Msg[] = [];
      let summaryMsgs: Msg[] = [];
      let currentTokens = 0;
      
      for (let i = currentMessages.length - 1; i >= 0; i--) {
        const msg = currentMessages[i];
        // estimate tokens including stringified tool calls
        const textToCount = msg.content || JSON.stringify(msg.tool_calls || "");
        const tokenCost = textToCount.length; 
        
        if (currentTokens + tokenCost <= maxTokens) {
          windowMsgs.unshift(msg);
          currentTokens += tokenCost;
        } else {
          if (isSummarizing && summaryMsgs.length === 0) {
             const summaryMsg: Msg = {
               id: generateMockId(),
               role: "system",
               content: "Earlier context: The user introduced themselves and asked basic questions. The assistant provided standard answers.",
               createdAt: Date.now(),
               source: "summary"
             };
             windowMsgs.unshift(summaryMsg);
             summaryMsgs.push(summaryMsg);
             currentTokens += summaryMsg.content.length;
          } else {
             droppedMsgs.unshift({ ...msg, source: "dropped" });
          }
        }
      }

      const payloadMessages: PayloadMessage[] = [
        { role: "system", content: systemPrompt },
        ...windowMsgs.map(m => {
          const pm: PayloadMessage = { role: m.role, content: m.content || null };
          if (m.tool_calls) pm.tool_calls = m.tool_calls;
          if (m.tool_call_id) pm.tool_call_id = m.tool_call_id;
          if (m.name) pm.name = m.name;
          return pm;
        })
      ];

      const lastPayload: Payload = {
        model: "gpt-4-mock",
        temperature: 0.7,
        messages: payloadMessages,
      };
      if (withTools) lastPayload.tools = MOCK_TOOLS;

      set({
        messages: currentMessages,
        windowMessages: windowMsgs,
        droppedMessages: droppedMsgs,
        summaryMessages: summaryMsgs,
        lastPayload
      });
    };

    // 1. Add User Message
    const userMsg: Msg = {
      id: generateMockId(),
      role: "user",
      content,
      createdAt: Date.now(),
      source: "user"
    };
    let currentMsgs = [...get().messages, userMsg];
    
    const needsSearch = SEARCH_TRIGGER_REGEX.test(content);
    updateWindowsAndPayload(currentMsgs, true); // initial req 1 payload with tools

    if (needsSearch) {
      set({ isSearching: true });
      
      // Simulate Req 1 network delay
      await new Promise(res => setTimeout(res, 1500));

      // 2. Assistant replies with Tool Call
      const toolCallId = "call_" + generateMockId();
      const assistantToolMsg: Msg = {
        id: generateMockId(),
        role: "assistant",
        content: "",
        createdAt: Date.now(),
        source: "mock",
        tool_calls: [{
          id: toolCallId,
          type: "function",
          function: { name: "web_search", arguments: `{"query": "${content}"}` }
        }]
      };
      currentMsgs = [...currentMsgs, assistantToolMsg];
      updateWindowsAndPayload(currentMsgs, true);

      // Simulate Client executing Tool
      await new Promise(res => setTimeout(res, 1500));

      // 3. Client injects Tool Result (very long to push context out)
      const toolResultMsg: Msg = {
        id: generateMockId(),
        role: "tool",
        content: `[Web Search Results]: \n1. The current weather is extremely sunny and warm.\n2. In breaking news, AI technology has advanced significantly, introducing new ways to visualize tool calls.\n3. Extra context padding to consume tokens and demonstrate context eviction: The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.`,
        createdAt: Date.now(),
        source: "tool",
        tool_call_id: toolCallId,
        name: "web_search"
      };
      currentMsgs = [...currentMsgs, toolResultMsg];
      updateWindowsAndPayload(currentMsgs, false); // Req 2

      // Simulate Req 2 network delay
      await new Promise(res => setTimeout(res, 1500));
      set({ isSearching: false });

      // 4. Final Assistant Answer
      const finalReply: Msg = {
        id: generateMockId(),
        role: "assistant",
        content: `Based on the search results, it's sunny and warm! AI tech is also advancing.`,
        createdAt: Date.now(),
        source: "mock"
      };
      currentMsgs = [...currentMsgs, finalReply];
      updateWindowsAndPayload(currentMsgs, false);

    } else {
      // Normal Chat Flow
      await new Promise(res => setTimeout(res, 1000));
      const mockReply: Msg = {
        id: generateMockId(),
        role: "assistant",
        content: `[Mock ${get().persona} Response]: I received your message "${content.substring(0, 10)}...". I am answering normally.`,
        createdAt: Date.now(),
        source: "mock"
      };
      currentMsgs = [...currentMsgs, mockReply];
      updateWindowsAndPayload(currentMsgs, false);
    }
  }
}));
