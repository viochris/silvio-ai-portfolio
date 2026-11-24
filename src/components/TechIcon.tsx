"use client"

import React, { useState } from 'react';

const ICON_URLS: Record<string, string> = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "Scikit-Learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  "Keras": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg",
  "OpenCV": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
  "Google Gemini": "https://cdn.simpleicons.org/googlegemini/8E75B2",
  "Hugging Face": "https://cdn.simpleicons.org/huggingface/FFD21E",
  "LangChain": "https://cdn.simpleicons.org/langchain/22C55E",
  "CrewAI": "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/crewai-color.svg",
  "FAISS": "https://cdn.simpleicons.org/meta/0467DF",
  "Streamlit": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "Flask": "https://cdn.simpleicons.org/flask/FFFFFF",
  "Gradio": "https://cdn.simpleicons.org/gradio/F97316",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Telegram Bot API": "https://cdn.simpleicons.org/telegram/26A5E4",
  "Prefect": "https://cdn.simpleicons.org/prefect/FFFFFF",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Neo4j": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg",
  "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  "Looker Studio": "https://cdn.simpleicons.org/looker/4285F4",
  "Matplotlib": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  "Google Colab": "https://cdn.simpleicons.org/googlecolab/F9AB00",
  "Kaggle": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kaggle/kaggle-original.svg",
  "Jupyter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "Firebase Studio": "https://cdn.simpleicons.org/firebase/FFCA28",
  "LangGraph": "https://cdn.simpleicons.org/langgraph/FFFFFF",
  "Langfuse": "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/langfuse-color.svg",
  "FastMCP": "https://cdn.simpleicons.org/modelcontextprotocol/FFFFFF",
  "Google ADK": "https://cdn.simpleicons.org/google/4285F4",
  "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  "Scrapy": "https://cdn.simpleicons.org/scrapy/60A817",
  "Selenium": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
  "Playwright": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
};

function renderCustomSvg(name: string, className: string) {
  switch (name) {
    case "Groq":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect width="24" height="24" rx="6" fill="#F55036" />
          <path d="M12 6.5a5.5 5.5 0 1 0 5.5 5.5v4.5h-2.2v-1.2A4.5 4.5 0 0 1 12 16.8a4.8 4.8 0 1 1 0-9.6c1.5 0 2.8.7 3.7 1.7l-1.6 1.5A2.6 2.6 0 1 0 12 14.6a2.6 2.6 0 0 0 2.6-2.6H12V9.8h5.5V12" fill="#FFFFFF" />
        </svg>
      );
    case "Pinecone":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <path d="M12 2L5.5 8.5L12 15L18.5 8.5L12 2Z" fill="#38BDF8" />
          <path d="M12 9L6.5 14.5L12 20L17.5 14.5L12 9Z" fill="#0EA5E9" fillOpacity="0.85" />
          <path d="M12 17V22" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Tableau":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <path d="M12 2v5M9.5 4.5h5" stroke="#E97627" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 17v5M9.5 19.5h5" stroke="#E97627" strokeWidth="2" strokeLinecap="round" />
          <path d="M4.5 9.5v5M2 12h5" stroke="#5B8DBE" strokeWidth="2" strokeLinecap="round" />
          <path d="M19.5 9.5v5M17 12h5" stroke="#5B8DBE" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 8.5v7M8.5 12h7" stroke="#E97627" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "Power BI":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="4" y="12" width="4" height="9" rx="1" fill="#E6AD10" />
          <rect x="10" y="8" width="4" height="13" rx="1" fill="#F2C811" />
          <rect x="16" y="3" width="4" height="18" rx="1" fill="#F9E166" />
        </svg>
      );
    case "Microsoft Excel":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#217346" />
          <path d="M8.5 8l7 8M15.5 8l-7 8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "Seaborn":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#1E3A5F" stroke="#60A5FA" strokeWidth="1.5" />
          <path d="M5 14c2.5-3 4.5-3 7 0s4.5 3 7 0" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 10c2-2 4-2 6 0s4 2 6 0" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "Google Antigravity":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <path d="M12 3L4.5 20h3.3l1.7-4h5l1.7 4h3.3L12 3zm-1.4 10l1.4-3.6 1.4 3.6h-2.8z" fill="#60A5FA" />
        </svg>
      );
    case "DSPy":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="4" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.6" />
          <path d="M7.5 9.5L10.5 12l-3 2.5M12 14.5h4.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "LiteLLM":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#16A34A" />
          <path d="M13 6.5L8.5 13h3.5l-1 4.5L15.5 11H12l1-4.5z" fill="#FFFFFF" />
        </svg>
      );
    case "Phoenix Arize":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <path d="M12 3c2.8 3.2 4.5 6 4.5 9a4.5 4.5 0 1 1-9 0c0-3 1.7-5.8 4.5-9z" fill="#F97316" />
          <path d="M12 9c1.3 1.6 2 3 2 4.3a2 2 0 1 1-4 0c0-1.3.7-2.7 2-4.3z" fill="#FDE047" />
        </svg>
      );
    case "LlamaIndex":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#2E1065" stroke="#A78BFA" strokeWidth="1.5" />
          <path d="M8.5 17V9.5L10.5 6l1 2.5L12.5 6l2 3.5V17h-2v-3.5h-2V17h-2z" fill="#E9D5FF" />
          <circle cx="11.5" cy="10.8" r="0.8" fill="#6D28D9" />
        </svg>
      );
    case "ChromaDB":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <circle cx="9.5" cy="12" r="5" fill="#F97316" fillOpacity="0.85" />
          <circle cx="14.5" cy="12" r="5" fill="#3B82F6" fillOpacity="0.85" />
          <circle cx="12" cy="8.5" r="4.2" fill="#FACC15" fillOpacity="0.75" />
        </svg>
      );
    case "BeautifulSoup (BS4)":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <path d="M6 12c0 3.8 2.7 6.5 6 6.5s6-2.7 6-6.5H6z" fill="#3B82F6" />
          <path d="M4.5 12h15" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 6.5c0 1.2 1 1.8 1 3M14 6.5c0 1.2 1 1.8 1 3" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "XGBoost":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#1D4ED8" />
          <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" stroke="#93C5FD" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "CatBoost":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#FACC15" />
          <path d="M7 10l2.5-3.5L12 9l2.5-2.5L17 10v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-5z" fill="#18181B" />
        </svg>
      );
    case "LightGBM":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#0F766E" />
          <path d="M13 5.5L7.5 13h4l-1 5.5L16.5 11h-4l.5-5.5z" fill="#5EEAD4" />
        </svg>
      );
    case "Optuna":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="9" fill="#0284C7" />
          <circle cx="9.5" cy="12" r="2.2" fill="#FFFFFF" />
          <circle cx="14.5" cy="9" r="1.7" fill="#BAE6FD" />
          <circle cx="15" cy="15" r="1.7" fill="#BAE6FD" />
        </svg>
      );
    case "LIME & SHAP":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#365314" stroke="#84CC16" strokeWidth="1.4" />
          <path d="M7 12h4.5M12.5 8h4.5M8.5 16h7" stroke="#BEF264" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#111827" stroke="#E5E7EB" strokeWidth="1.5" />
          <path d="M9 15.5V8.5l7.5 8.5M15 8.5v4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Express":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="4" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.4" />
          <path d="M6.5 12h4M6.5 9.5h4.5M6.5 14.5h4.5M13 9.5l4.5 5M17.5 9.5l-4.5 5" stroke="#F9FAFB" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "SQLAlchemy":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#7F1D1D" />
          <ellipse cx="12" cy="8.5" rx="5.5" ry="2.2" stroke="#FCA5A5" strokeWidth="1.6" />
          <path d="M6.5 8.5v7c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2v-7" stroke="#FCA5A5" strokeWidth="1.6" />
        </svg>
      );
    case "Trafilatura":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#312E81" />
          <path d="M7 8h10M12 8v8.5M9 12.5h6" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "Google Apps Script":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#1D4ED8" />
          <path d="M8 9l4 6 4-6M9.5 15h5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" fill="hsl(var(--primary))" />
        </svg>
      );
  }
}

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-4 h-4 shrink-0" }) => {
  const [failed, setFailed] = useState(false);
  const url = ICON_URLS[name];

  if (!url || failed) {
    return renderCustomSvg(name, className);
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} object-contain`}
    />
  );
};
