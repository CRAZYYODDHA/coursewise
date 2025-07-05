import React from 'react';
import type { ComparisonRating } from '../types';

interface RadarChartProps {
  data1: ComparisonRating[];
  data2: ComparisonRating[];
  labels: string[];
  size?: number;
  colors?: [string, string];
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data1,
  data2,
  labels,
  size = 300,
  colors = ['#0ea5e9', '#f97316'] // sky-500, orange-500
}) => {
  const center = size / 2;
  const radius = size * 0.35;
  const numAxes = labels.length;
  const angleSlice = (Math.PI * 2) / numAxes;
  const maxValue = 10;

  // Generate points for a dataset
  const getPoints = (data: ComparisonRating[]): string => {
    return data
      .map((d, i) => {
        const value = d.score;
        const angle = angleSlice * i - Math.PI / 2;
        const x = center + (radius * value / maxValue) * Math.cos(angle);
        const y = center + (radius * value / maxValue) * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const points1 = getPoints(data1);
  const points2 = getPoints(data2);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Axes and Grid Lines */}
      <g className="grid">
        {[...Array(5)].map((_, i) => (
          <circle
            key={`grid-${i}`}
            cx={center}
            cy={center}
            r={(radius / 5) * (i + 1)}
            fill="none"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-700"
            strokeWidth="1"
          />
        ))}
        {labels.map((_, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return <line key={`axis-${i}`} x1={center} y1={center} x2={x} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="1" />;
        })}
      </g>

      {/* Data Polygons */}
      <polygon points={points1} fill={colors[0]} fillOpacity="0.3" stroke={colors[0]} strokeWidth="2" />
      <polygon points={points2} fill={colors[1]} fillOpacity="0.3" stroke={colors[1]} strokeWidth="2" />
      
      {/* Labels */}
      <g className="labels">
        {labels.map((label, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const labelRadius = radius * 1.4; // Increased multiplier for more padding
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          const textParts = label.split(' ');
          
          return (
             <text
              key={`label-${i}`}
              x={x}
              y={y}
              dy={textParts.length > 1 ? "-0.4em" : "0.3em"}
              textAnchor={x > center + 1 ? 'start' : x < center - 1 ? 'end' : 'middle'}
              className="text-[11px] font-semibold fill-current text-slate-600 dark:text-slate-300"
            >
              {textParts[0]}
              {textParts.length > 1 && 
                <tspan x={x} dy="1.2em">{textParts.slice(1).join(' ')}</tspan>
              }
            </text>
          );
        })}
      </g>
    </svg>
  );
};