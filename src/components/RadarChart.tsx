import React from 'react';

interface RadarChartProps {
  skills: { name: string; value: number }[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ skills }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const numAxes = skills.length;
  
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const x = center + radius * (value / 100) * Math.cos(angle);
    const y = center + radius * (value / 100) * Math.sin(angle);
    return { x, y };
  };

  const polyPoints = skills.map((s, i) => {
    const { x, y } = getCoordinates(i, s.value);
    return `${x},${y}`;
  }).join(' ');

  const gridLevels = [25, 50, 75, 100];
  const color = 'rgba(85, 166, 246, 0.4)';
  const strokeColor = '#55A6F6';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {gridLevels.map((lvl) => {
          const points = skills.map((_, i) => {
            const { x, y } = getCoordinates(i, lvl);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon 
              key={lvl} 
              points={points} 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="1" 
            />
          );
        })}

        {skills.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line 
              key={i} 
              x1={center} 
              y1={center} 
              x2={x} 
              y2={y} 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="1" 
            />
          );
        })}

        <polygon 
          points={polyPoints} 
          fill={color} 
          stroke={strokeColor} 
          strokeWidth="2" 
        />

        {skills.map((s, i) => {
          const { x, y } = getCoordinates(i, 115);
          return (
            <text 
              key={i} 
              x={x} 
              y={y} 
              textAnchor="middle" 
              className="text-[10px] font-headline font-bold uppercase fill-foreground opacity-70"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};