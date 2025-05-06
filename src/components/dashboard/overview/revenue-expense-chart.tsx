'use client';

import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatToCurrency } from '@/lib/format-currency';

interface MonthlyIncomeExpenseProps {
  data: {
    month: string;
    Revenue: number;
    Expense: number;
  }[];
}

function RevenueExpenseChart({ data }: MonthlyIncomeExpenseProps) {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => formatToCurrency(value)} />
        <Tooltip
          formatter={(value: number) => formatToCurrency(value)}
          labelFormatter={(label: string) => `Month: ${label}`}
        />
        <Legend />
        <Bar dataKey="Revenue" fill="#8884d8" name="Revenue" />
        <Bar dataKey="Expense" fill="#82ca9d" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RevenueExpenseChart;
