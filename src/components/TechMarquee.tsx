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
  { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/white" },
  { name: "FAISS", icon: "https://cdn.simpleicons.org/meta/white" },
  { name: "Pinecone", icon: "https://cdn.simpleicons.org/pinecone/white" },
  { name: "CrewAI", icon: "" },
  { name: "LangGraph", icon: "https://cdn.simpleicons.org/langchain/white" },
  { name: "DSPy", icon: "" },
  { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
  { name: "Telegram Bot", icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" },
  { name: "Prefect", icon: "https://cdn.simpleicons.org/prefect/white" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/E97627" },
  { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "Seaborn", icon: "" },
  { name: "Google Colab", icon: "https://cdn.simpleicons.org/googlecolab/F9AB00" },
  { name: "Kaggle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kaggle/kaggle-original.svg" },
  { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-900/50 border-y border-slate-800/50 py-4 sm:py-6 mb-12 flex">
      {/* Gradients for smooth fade effect */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Wrapper */}
      <div className="flex w-max animate-[marquee_60s_linear_infinite]">
        
        {/* First Set */}
        <div className="flex shrink-0">
          {techStack.map((tech, index) => (
            <span 
              key={index} 
              className="flex items-center gap-2 sm:gap-3 mx-4 sm:mx-8 text-sm sm:text-base font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
            >
              {tech.icon && (
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-md`}
                  style={tech.name === "Flask" || tech.name === "Next.js" || tech.name === "OpenAI" ? { filter: 'invert(1) opacity(0.8)' } : {}}
                />
              )}
              {tech.name}
            </span>
          ))}
        </div>

        {/* Second Set (Exact duplicate to fill the gap seamlessly) */}
        <div className="flex shrink-0">
          {techStack.map((tech, index) => (
            <span 
              key={`dup-${index}`} 
              className="flex items-center gap-2 sm:gap-3 mx-4 sm:mx-8 text-sm sm:text-base font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
            >
              {tech.icon && (
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-md`}
                  style={tech.name === "Flask" || tech.name === "Next.js" || tech.name === "OpenAI" ? { filter: 'invert(1) opacity(0.8)' } : {}}
                />
              )}
              {tech.name}
            </span>
          ))}
        </div>

      </div>
      
      {/* CSS Keyframes injected safely */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};
