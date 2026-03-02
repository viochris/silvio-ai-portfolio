import React from 'react';

const timeline = [
  { year: "2020 - 2024", title: "B.Sc. in Computer Science", school: "University Name", desc: "Specialization in Artificial Intelligence and Data Engineering." },
  { year: "2023", title: "Machine Learning Internship", school: "Tech Corp", desc: "Worked on predictive analytics for e-commerce trends." },
];

export const Timeline: React.FC = () => {
  return (
    <div className="space-y-8">
      {timeline.map((item, idx) => (
        <div key={idx} className="relative pl-8 border-l-2 border-primary/20">
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
          <div className="text-xs font-bold text-primary mb-1">{item.year}</div>
          <h4 className="text-lg font-headline font-bold">{item.title}</h4>
          <div className="text-sm font-semibold opacity-70 mb-2">{item.school}</div>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};
