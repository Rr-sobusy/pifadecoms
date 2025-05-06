'use client';

import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatToCurrency } from '@/lib/format-currency';

interface NetSurplusMovementProps {
  data: {
    month: string;
    netSurplus: number;
  }[];
}

function NetSurplusMovement({ data }: NetSurplusMovementProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(val) => formatToCurrency(val as number)} />
        <Line type="monotone" dataKey="netSurplus" stroke="#8884d8" strokeWidth={2} name="Accumulated Surplus" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default NetSurplusMovement;
