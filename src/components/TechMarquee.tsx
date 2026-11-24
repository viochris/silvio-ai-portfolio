import React from 'react';
import { TechIcon } from '@/components/TechIcon';

const techStack = [
  "Python",
  "SQL",
  "TypeScript",
  "Pandas",
  "NumPy",
  "Scikit-Learn",
  "XGBoost",
  "CatBoost",
  "TensorFlow",
  "Google Gemini",
  "Hugging Face",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "ChromaDB",
  "Neo4j",
  "FAISS",
  "Pinecone",
  "CrewAI",
  "LiteLLM",
  "Phoenix Arize",
  "FastAPI",
  "Flask",
  "Streamlit",
  "Gradio",
  "React",
  "Next.js",
  "PostgreSQL",
  "Supabase",
  "MySQL",
  "Telegram Bot API",
  "Prefect",
  "Docker",
  "Tableau",
  "Matplotlib",
  "Seaborn",
  "Git",
];

const TechList = ({ prefix }: { prefix: string }) => (
  <div className="flex shrink-0 items-center gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused]">
    {techStack.map((name, index) => (
      <span
        key={`${prefix}-${index}`}
        className="inline-flex items-center gap-2.5 rounded-xl border border-border/80 bg-card/80 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-200 tracking-wide whitespace-nowrap"
      >
        <TechIcon name={name} className="w-4 h-4 shrink-0" />
        <span>{name}</span>
      </span>
    ))}
  </div>
);

export const TechMarquee: React.FC = () => {
  return (
    <section
      aria-label="Core technology stack"
      className="group relative w-full overflow-hidden border-y border-border/70 bg-card/40 py-5 flex select-none"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
      />

      <div className="flex w-max">
        <TechList prefix="a" />
        <div className="flex shrink-0" aria-hidden="true">
          <TechList prefix="b" />
        </div>
      </div>
    </section>
  );
};
