import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export function StockChart(props) {
  return (
   <LineChart width={800} height={600} data={props.data}>
    <Line isAnimationActive={false} type="linear" dataKey="NASDAQ" stroke="#EB7D3C" />
    <Line isAnimationActive={false} type="linear" dataKey="CAC40" stroke="#5E9CD3" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
  );
}
