import React from 'react';

const techStack = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Scikit-Learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Google Gemini", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
  { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
  { name: "LangChain", icon: "" },
  { name: "FAISS", icon: "" },
  { name: "Pinecone", icon: "" },
  { name: "CrewAI", icon: "" },
  { name: "LangGraph", icon: "" },
  { name: "DSPy", icon: "" },
  { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
  { name: "Telegram Bot", icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" },
  { name: "Prefect", icon: "" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Tableau", icon: "" },
  { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "Seaborn", icon: "" },
  { name: "Google Colab", icon: "" },
  { name: "Kaggle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kaggle/kaggle-original.svg" },
  { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="w-full py-10 bg-muted/30 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex w-max animate-[marquee_80s_linear_infinite]">
        {[...techStack, ...techStack].map((tech, index) => (
          <span 
            key={index} 
            className="flex items-center gap-2 sm:gap-3 mx-4 sm:mx-8 text-sm sm:text-base font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
          >
            {tech.icon && (
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-md" 
                style={tech.name === "Flask" || tech.name === "Next.js" || tech.name === "OpenAI" ? { filter: 'invert(1) opacity(0.8)' } : {}}
              />
            )}
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};