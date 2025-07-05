
import React from 'react';

interface DonutChartProps {
  data: { name: string; percentage: number }[];
  colors?: string[];
}

const DonutSegment: React.FC<{
  percentage: number;
  startAngle: number;
  color: string;
}> = ({ percentage, startAngle, color }) => {
  const radius = 50;
  const cx = 60;
  const cy = 60;
  const strokeWidth = 20;
  const circleRadius = radius - strokeWidth / 2;

  const endAngle = startAngle + (percentage / 100) * 360;

  const startX = cx + Math.cos((startAngle * Math.PI) / 180) * circleRadius;
  const startY = cy + Math.sin((startAngle * Math.PI) / 180) * circleRadius;
  const endX = cx + Math.cos((endAngle * Math.PI) / 180) * circleRadius;
  const endY = cy + Math.sin((endAngle * Math.PI) / 180) * circleRadius;
  const largeArcFlag = percentage > 50 ? 1 : 0;

  const d = `M ${startX} ${startY} A ${circleRadius} ${circleRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  
  return <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />;
};

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
}) => {
  let accumulatedPercentage = 0;

  return (
    <div className="flex items-center gap-6 w-full">
      <div className="relative flex-shrink-0">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {data.map((item, index) => {
            const startAngle = (accumulatedPercentage / 100) * 360 - 90;
            accumulatedPercentage += item.percentage;
            return (
              <DonutSegment
                key={item.name}
                percentage={item.percentage}
                startAngle={startAngle}
                color={colors[index % colors.length]}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center">
            <span
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
            <span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
