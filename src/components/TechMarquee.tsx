import React from 'react';

const techs = [
  "Python", "FastAPI", "LangChain", "OpenAI", "Docker", "Scikit-Learn", 
  "TensorFlow", "PyTorch", "GCP", "AWS", "SQL", "Spark", "Pandas", 
  "Numpy", "Streamlit", "React", "Next.js", "MongoDB", "PostgreSQL"
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="w-full py-10 bg-muted/30 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
        {[...techs, ...techs].map((tech, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4">
            <span className="text-xl font-headline font-semibold text-muted-foreground/60 hover:text-primary transition-colors cursor-default uppercase tracking-widest">
              {tech}
            </span>
            <span className="text-primary opacity-30">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
