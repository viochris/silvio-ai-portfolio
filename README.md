# 🌌 Silvio.AI — Personal Portfolio

<div align="center">
  <img src="public/icon.png" width="120" height="120" alt="Silvio.AI Logo" />
  <br />

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Genkit](https://img.shields.io/badge/Genkit-AI-blue?style=for-the-badge)](https://firebase.google.com/docs/genkit)

**Data Scientist | AI Engineer | Informatics Undergraduate**  
*Transforming unstructured data into intelligent, production-ready solutions.*

[Live Demo](https://silvio-ai-portfolio.vercel.app/) • [View Projects](https://github.com/viochris?tab=repositories) • [Contact Me](mailto:viochristian12@gmail.com)

</div>

---

## 🚀 About The Project

**Silvio.AI** is a high-performance personal portfolio designed to showcase the intersection of Data Science and AI Engineering. Built with a futuristic "Cyberpunk-Hacker" aesthetic, it prioritizes technical transparency, interactive user experience, and seamless integration with external AI engines.

This project serves as a living laboratory for my work in **Natural Language Processing (NLP)**, **Predictive Modeling**, and **Autonomous AI Agents**. Unlike standard static portfolios, Silvio.AI utilizes **Genkit** as an orchestration layer to communicate with specialized backends on Hugging Face Spaces.

---

## ✨ Key Features

### 🤖 Neural Chatbot Assistant
A live RAG-powered AI interface using **Genkit** and calling a specialized FastAPI backend on Hugging Face Spaces.
- **Dynamic Status Check**: Features a "Neural Engine" status check that pings the external API to notify the user if the server is active, checking, or waking up.
- **Multilingual Support**: Switchable interface between English and Indonesian.
- **Context-Aware**: Maintains conversation history for multi-turn reasoning.

### 📟 System Bootloader
An immersive terminal-style loading sequence simulating a BIOS/Kernel initialization.
- Built with **Framer Motion** and React state hooks.
- Simulates resource checks for React components, Tailwind, and AI Engines.
- Provides a "Hacker" feel while assets load in the background.

### ♾️ Seamless Tech Marquee
A perfectly gapless, infinite-looping tech stack display.
- Custom CSS keyframes optimized for high refresh rates.
- Features over 25+ official brand icons.
- Responsive scaling for mobile and desktop displays.

### 📊 Skill Radar Architecture
Visual proficiency mapping using custom SVG-based Radar Charts.
- Maps expertise in GenAI, NLP, Data Modeling, ML, Backend, and Cloud.
- Interactive progress bars with precise percentage indicators.

### 🔍 Verified Credentials Hub
A searchable and filterable database of professional certifications.
- Includes credentials from **Oracle (AI Vector Search, Generative AI)**, **IBM (Machine Learning)**, and **Dicoding**.
- Real-time search filtering and category switching.

### 🔄 Interactive Avatar Toggle
A hidden "Easter Egg" in the Hero section allowing users to toggle between a professional photo and an AI-animated version.

---

## 🛠️ Tech Stack

### **Frontend & Core**
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS & Lucide React (Icons)
- **Animations**: Framer Motion & Tailwind Animate
- **Components**: Shadcn UI (Radix UI Primitives)

### **AI & Data Science**
- **Orchestration**: Genkit AI (Server Flows)
- **LLM Integration**: Google Gemini 2.5 Flash
- **Visualization**: Custom SVG Radar Charts
- **Backend API**: Hugging Face Spaces (FastAPI / LangGraph)
- **NLP Models**: SBERT, TF-IDF, RoBERTa (via APIs)

### **Infrastructure**
- **Platform**: Firebase App Hosting
- **CI/CD**: GitHub Actions
- **Containerization**: Docker (for backend services)

---

## 📂 Folder Structure

```text
silvio-ai/
├── public/               # Static assets (icon.png, CV, images)
├── src/
│   ├── ai/               # Genkit flows, prompts, and server-side AI logic
│   │   ├── flows/        # AI orchestration logic
│   │   └── genkit.ts     # Core Genkit configuration
│   ├── app/              # Next.js App Router
│   │   ├── about/        # About page with roadmap
│   │   ├── contact/      # Contact page with chatbot
│   │   ├── projects/     # Featured projects view
│   │   ├── repository/   # Searchable GitHub database
│   │   └── skills/       # Radar chart and tech stack
│   ├── components/       # Reusable UI & Core modules
│   │   ├── ui/           # Shadcn UI primitives
│   │   └── ...           # Custom components (Navbar, Chatbot, Marquee)
│   ├── context/          # React Context (Navigation state)
│   ├── hooks/            # Custom React hooks (useToast, useMobile)
│   └── lib/              # Utilities, static data, and TypeScript interfaces
├── tailwind.config.ts    # Custom themes and animations
└── package.json          # Dependencies and script definitions
```

---

## 📂 Highlighted Repositories

| Project Name | Type | Key Tech |
| :--- | :--- | :--- |
| **InsightSQL (LangGraph)** | GenAI | LangGraph, Gemini, SQL |
| **SpendSense** | Data Science | Streamlit, Gemini Vision, Pandas |
| **Resume Scanner API** | Backend | FastAPI, SBERT, TF-IDF |
| **InsightData** | GenAI | Pandas Agent, Gemini 2.5 Flash |
| **NovaCal AI** | Automation | LangChain, Telegram Bot |
| **Stuntify API** | MLOps | FastAPI, Scikit-Learn |

---

## 💻 Getting Started

### **Prerequisites**
- Node.js (v18.x or later)
- npm or yarn
- Google Generative AI API Key

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/viochris/silvio-ai-portfolio.git
   cd silvio-ai-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:9002](http://localhost:9002) in your browser.

---

## 🏁 Workflow Philosophy

1. **Research & Design**: Deep analysis of problem statements to find the most efficient mathematical approach.
2. **Architect & Build**: Constructing modular pipelines that are robust and testable.
3. **Deploy & Scale**: Transitioning models into production via high-performance APIs.
4. **Optimization**: Continuous monitoring and fine-tuning for peak performance.

---

## 📫 Contact & Connect

Feel free to reach out for collaborations or just a technical chat!

- **LinkedIn**: [Silvio Christian Joe](https://www.linkedin.com/in/silvio-christian-joe)
- **GitHub**: [@viochris](https://github.com/viochris)
- **Kaggle**: [@viochristian](https://www.kaggle.com/viochristian)
- **X (Twitter)**: [@SilvioCodes](https://x.com/SilvioCodes)
- **YouTube**: [@silviocodes](https://youtube.com/@silviocodes)
- **TikTok**: [@silvio.codes](https://www.tiktok.com/@silvio.codes?_r=1&_t=ZS-96drUPoz4zP)
- **Medium**: [@silviochristian](https://medium.com/@silviochristian)
- **Instagram**: [@silvio.codes](https://www.instagram.com/silvio.codes)
- **Email**: [viochristian12@gmail.com](mailto:viochristian12@gmail.com)

---

<div align="center">
  <p>Built with 💙 and 🤖 by Silvio Christian Joe</p>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=viochris&theme=radical&hide_border=true" alt="GitHub Streak" />
</div>