import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: '1인 가구', value: 6200 },
  { name: '2인 가구', value: 2000 },
  { name: '3인 가구', value: 1500 },
  { name: '4인 가구', value: 1100 },
  { name: '5인 가구', value: 340 },
];

const COLORS = ['#67D5B5', '#EE7785', '#C89EC4', '#84B1ED', '#6E7783'];
const PersonCharts = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={190}
        cy={150}
        outerRadius={80}
        fill="#379392"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PersonCharts;
