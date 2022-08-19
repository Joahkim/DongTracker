import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = [
  '#67D5B5',
  '#EE7785',
  '#C89EC4',
  '#84B1ED',
  '#6E7783',
  '#C5C6B6',
];

const PopulationCharts = ({ sidePublicData }) => {
  const { population_data } = sidePublicData;

  const data = [
    { name: '10대', value: population_data.age_10_count },
    { name: '20대', value: population_data.age_20_count },
    { name: '30대', value: population_data.age_30_count },
    { name: '40대', value: population_data.age_40_count },
    { name: '50대', value: population_data.age_50_count },
    { name: '60대 이상', value: population_data.age_60_count },
  ];
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

export default PopulationCharts;
