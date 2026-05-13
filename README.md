# 👁️ 熊布朗的 AI 实践课 Demo 03: ChatGPT X-Ray Playground (透视大模型工作原理)

[🌍 Read this in English](#english-version)

## 📖 这是什么？
这是 JumpX Labs **"熊布朗 AI 实战营"** 第三课的官方开源 Demo。
它是一款纯前端运行、零后端、**极客工业风 (Editorial Dev Tool)** 的 ChatGPT 工作原理透视教学工具。基于 React + Zustand + Framer Motion 构建。

本系统旨在帮助初学者直观理解大语言模型（如 ChatGPT）的工作全过程——从你敲出一句话到 AI 给你回复，中间到底发生了什么？
* 客户端是如何将你的聊天记录、系统指令、工具定义**组装成一个巨大的 Prompt** 发送给模型的？
* 什么是 **上下文压缩 (Context Compression)**？为什么对话越长，AI 越容易"健忘"？
* 什么是 **Tool Calling (函数调用)**？AI 是如何"使用工具"来查天气、搜网页的？
* 模型真的在"思考"吗？还是只是在做**概率接龙 (Next-Token Prediction)**？

## 🚀 如何本地运行？

确保你的电脑上安装了 Node.js (推荐 v18+)。

```bash
# 1. 克隆本仓库
git clone https://github.com/JumpX-Labs/ai-bootcamp-demo03-chatgpt-xray.git

# 2. 进入项目目录
cd ai-bootcamp-demo03-chatgpt-xray

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```
启动后，在浏览器中访问 `http://localhost:5173` 即可开始体验。

## 💡 如何学习和使用它？(核心交互流)

1. **💬 发送消息 (Chat UI)**
   * 在左侧面板中像使用 ChatGPT 一样输入消息并发送。
   * 你会看到 AI 的"打字效果"回复，但这只是表象——真正的魔法在中间和右侧面板。
   * *教学点：对话界面只是冰山一角，客户端在背后做了大量的状态管理工作。*
2. **🔧 观察上下文组装 (Prompt Assembly View)**
   * 切换到中间面板，实时观察你的每一条消息是如何被**拼接成 messages 数组**的。
   * **打开 System Prompt 开关**，观察系统指令是如何被静默注入到对话最前端的。
   * **打开 Tool Definitions 开关**，看看"工具清单"是如何和对话一起被打包发送的。
   * *教学点：理解 ChatGPT 不是在"对话"，而是每次都在处理一个**完整的、从头组装的上下文窗口**。*
3. **📡 查看网络载荷 (Payload View)**
   * 右侧黑色终端面板展示了**真正发送给 OpenAI API 的 JSON 数据包**。
   * 对比上下文面板的视觉化和这里的原始数据，深入理解 API 通信的细节。
   * *教学点：每一次"发送"本质上就是一个 HTTP POST 请求，携带着完整的上下文和参数配置。*
4. **📖 查阅配套教案**
   * 点击右上角的**"📖 查看配套教案"**按钮，阅读关于 ChatGPT 工作原理的深度图文教案。
   * 教案与 Demo 的交互模块一一对应，手把手引导你验证每一个知识点。

---

## 🎓 课后实战作业：扩展 Tool Calling 工具

**🐞 现有情况：**
目前系统内置了天气查询和网页搜索两个模拟工具 (Mock Tool)，在 `src/store/chatStore.ts` 中定义。

**🛠️ 你的任务 (Your Mission)：**
去源码里扩展它！添加一个你自己设计的全新工具。
1. 使用编辑器（如 VSCode）打开本项目中的 `src/store/chatStore.ts` 文件。
2. 找到 `toolDefinitions` 数组，仿照现有的 `get_weather` 或 `search_web` 工具，新增一个工具定义。
3. 自己设计一个有趣的工具（比如：**翻译工具** `translate_text`，接收 `text` 和 `target_language` 两个参数）。
4. 在工具调用逻辑中添加对应的 Mock 响应。
5. **验收标准**：打开 Tool Definitions 开关后，你的新工具应出现在工具清单中；在 Payload View 中也应该能看到它被包含在发送给 API 的 JSON 中！

---

## 🐻 关于"熊布朗的 AI 实践课"

如果你对本项目背后的完整课程体系感兴趣，欢迎关注我们的实战营。

<div align="center">
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_1.jpg" alt="Course Intro 1" width="48%" />
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_2.jpg" alt="Course Intro 2" width="48%" />
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_3.jpg" alt="Course Intro 3" width="48%" />
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_4.jpg" alt="Course Intro 4" width="48%" />
</div>

---
---

<a name="english-version"></a>

# 👁️ Xiong Bulang's AI Bootcamp Demo 03: ChatGPT X-Ray Playground

## 📖 What is this?
This is the official open-source Demo for Lesson 3 of the **"Xiong Bulang AI Bootcamp"** by JumpX Labs.
It is a **brutalist, developer-style interactive visualization tool** built with React, Zustand, and Framer Motion, running entirely in the browser with no backend dependencies.

It is designed to demystify the inner workings of ChatGPT — what actually happens between you typing a message and receiving a response?
* How does the client **assemble your chat history, system prompts, and tool definitions into a single massive prompt** sent to the model?
* What is **Context Compression**? Why does the AI become more "forgetful" as conversations grow longer?
* What is **Tool Calling**? How does AI "use tools" to check the weather or search the web?
* Is the model really "thinking"? Or is it simply playing **next-token prediction** — a probabilistic relay race?

## 🚀 How to run locally?

Ensure you have Node.js installed (v18+ recommended).

```bash
git clone https://github.com/JumpX-Labs/ai-bootcamp-demo03-chatgpt-xray.git
cd ai-bootcamp-demo03-chatgpt-xray
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## 💡 How to explore? (Core Interaction Flow)

1. **💬 Send Messages (Chat UI)** — Type and send messages in the left panel just like ChatGPT. The magic is in the middle and right panels.
2. **🔧 Watch Context Assembly (Prompt Assembly View)** — See how each message is stitched into the `messages[]` array in real-time. Toggle System Prompt and Tool Definitions to see invisible injections.
3. **📡 Inspect Network Payload (Payload View)** — The dark terminal panel shows the raw JSON that would be sent to the OpenAI API.
4. **📖 Read the Lesson Plan** — Click "📖 查看配套教案" for a deep-dive walkthrough.

## 🎓 Homework: Add Your Own Tool

Open `src/store/chatStore.ts`, find the `toolDefinitions` array, and add a new custom tool (e.g., a `translate_text` function). Verify it appears in the Tool Definitions panel and in the Payload View!

---

## 🐻 About "Xiong Bulang's AI Bootcamp"

<div align="center">
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_1.jpg" alt="Course Intro 1" width="48%" />
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_2.jpg" alt="Course Intro 2" width="48%" />
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_3.jpg" alt="Course Intro 3" width="48%" />
  <img src="https://assets.jumpxai.com/courses/ai-bootcamp/post_4.jpg" alt="Course Intro 4" width="48%" />
</div>
