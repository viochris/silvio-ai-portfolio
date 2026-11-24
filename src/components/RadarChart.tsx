import React from 'react';

interface RadarChartProps {
  skills: { name: string; value: number }[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ skills }) => {
  const width = 468;
  const height = 394;
  const centerX = width / 2;
  const centerY = height / 2 + 4;
  const radius = 134;
  const numAxes = skills.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const x = centerX + radius * (value / 100) * Math.cos(angle);
    const y = centerY + radius * (value / 100) * Math.sin(angle);
    return { x, y };
  };

  const polyPoints = skills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.value);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Skill proficiency radar chart"
        className="w-full max-w-[460px] h-auto overflow-visible"
      >
        {gridLevels.map((lvl) => {
          const points = skills
            .map((_, i) => {
              const { x, y } = getCoordinates(i, lvl);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');
          return (
            <polygon
              key={lvl}
              points={points}
              fill={lvl === 100 ? 'rgba(255,255,255,0.02)' : 'none'}
              stroke={lvl === 100 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)'}
              strokeWidth={lvl === 100 ? '1.4' : '1'}
            />
          );
        })}

        {skills.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x.toFixed(1)}
              y2={y.toFixed(1)}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.1"
            />
          );
        })}

        <polygon
          points={polyPoints}
          fill="hsl(var(--primary) / 0.30)"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
        />

        {skills.map((s, i) => {
          const { x, y } = getCoordinates(i, s.value);
          return (
            <circle
              key={`dot-${s.name}`}
              cx={x.toFixed(1)}
              cy={y.toFixed(1)}
              r="4.5"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth="1.5"
            />
          );
        })}

        {skills.map((s, i) => {
          const { x, y } = getCoordinates(i, 121);
          return (
            <text
              key={s.name}
              x={x.toFixed(1)}
              y={y.toFixed(1)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[12px] font-headline font-bold uppercase fill-zinc-100 tracking-wider"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
