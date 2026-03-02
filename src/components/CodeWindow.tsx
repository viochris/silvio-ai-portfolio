import React from 'react';

const codeLines = [
  { text: "from fastapi import FastAPI, Depends", color: "text-purple-400" },
  { text: "from langchain.chat_models import ChatOpenAI", color: "text-purple-400" },
  { text: "", color: "" },
  { text: "app = FastAPI(title='Silvio.AI API')", color: "text-blue-400" },
  { text: "model = ChatOpenAI(temperature=0.7)", color: "text-blue-400" },
  { text: "", color: "" },
  { text: "@app.post('/v1/predict')", color: "text-yellow-400" },
  { text: "async def get_insight(query: str):", color: "text-green-400" },
  { text: "    response = await model.ainvoke(query)", color: "text-slate-300" },
  { text: "    return {'ai_response': response}", color: "text-slate-300" },
];

export const CodeWindow: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-border shadow-2xl bg-[#1e1e1e] font-code text-sm">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-[#333]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-4 text-xs text-slate-400 uppercase tracking-tighter">main.py - Silvio.AI</div>
      </div>
      <div className="p-6 space-y-1">
        {codeLines.map((line, idx) => (
          <div 
            key={idx} 
            className="flex animate-slide-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <span className="w-8 text-slate-600 select-none">{idx + 1}</span>
            <span className={`${line.color} whitespace-pre`}>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
