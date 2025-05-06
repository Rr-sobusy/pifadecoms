'use client';

import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface TopMovedItemsChartProps {
  data: {
    itemName: string;
    quantityPurchased: number;
  }[];
}

// Utility: Generate up to 5 random colors
const getRandomColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < Math.min(count, 5); i++) {
    const hue = Math.floor(Math.random() * 360);
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

// Sample data (only use up to 5 items)

function TopMovedItemsChart({ data }: TopMovedItemsChartProps) {
  const colors = getRandomColors(data?.length);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="quantityPurchased" nameKey="itemName" cx="50%" cy="50%" outerRadius={120} label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TopMovedItemsChart;
