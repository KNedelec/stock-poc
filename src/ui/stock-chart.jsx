import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export function StockChart(props) {
  return (
   <LineChart width={1000} height={600} data={props.data}>
     <Line isAnimationActive={false}
       type="linear"
       dataKey="NASDAQ"
       stroke="#EB7D3C"
       strokeWidth="3"
       dot={false}
     />
     <Line isAnimationActive={false}
       type="linear"
       dataKey="CAC40"
       stroke="#5E9CD3"
       strokeWidth="3"
       dot={false}
     />
    <CartesianGrid vertical={false} stroke="#ccc" />
    <XAxis ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]} />
    <YAxis axisLine={false} />
  </LineChart>
  );
}
