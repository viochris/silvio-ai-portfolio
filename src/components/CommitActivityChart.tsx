"use client"

import React, { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from "recharts";

export interface CommitDatum {
  hour: string;
  commits: number;
  originalHour: number;
}

interface CommitActivityChartProps {
  data: CommitDatum[];
}

export default function CommitActivityChart({ data }: CommitActivityChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="w-full">
      <div className="h-[260px] sm:h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 6, left: 6, bottom: 8 }}>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              interval={isMobile ? 2 : 0}
              tick={{ fill: '#a1a1aa', fontSize: isMobile ? 11 : 12 }}
            />
            <YAxis hide domain={[0, 'dataMax + 15']} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: '#0c1017',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                color: '#fafafa',
              }}
              labelFormatter={(label) => `Hour: ${label}:00`}
            />
            <Bar dataKey="commits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
              {!isMobile && (
                <LabelList
                  dataKey="commits"
                  position="top"
                  style={{ fill: 'hsl(var(--primary))', fontSize: '11px', fontWeight: 'bold' }}
                  offset={8}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-right text-primary font-headline font-bold text-xs sm:text-base mt-3 pt-1">
        commits per hour of day
      </div>
    </div>
  );
}
