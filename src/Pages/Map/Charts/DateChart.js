import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './DateChart.scss';
const DateChart = ({ storeData }) => {
  if (storeData.length === 0) return;

  const data = [
    {
      name: '월',
      매출액: storeData.weekday_data[0].pay,
      배달건수: storeData.weekday_data[0].count,
    },
    {
      name: '화',
      매출액: storeData.weekday_data[1].pay,
      배달건수: storeData.weekday_data[1].count,
    },
    {
      name: '수',
      매출액: storeData.weekday_data[2].pay,
      배달건수: storeData.weekday_data[2].count,
    },
    {
      name: '목',
      매출액: storeData.weekday_data[3].pay,
      배달건수: storeData.weekday_data[3].count,
    },
    {
      name: '금',
      매출액: storeData.weekday_data[4].pay,
      배달건수: storeData.weekday_data[4].count,
    },
    {
      name: '토',
      uv: 7000,
      매출액: storeData.weekday_data[5].pay,
      배달건수: storeData.weekday_data[5].count,
    },
    {
      name: '일',
      매출액: storeData.weekday_data[6].pay,
      배달건수: storeData.weekday_data[6].count,
    },
  ];
  return (
    <div>
      <div className="dateTitle">요일별 차트</div>
      <BarChart width={350} height={200} data={data} className="barChart">
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconSize="5"
          wrapperStyle={{
            fontWeight: '700',
          }}
        />
        <Bar dataKey="매출액" fill="#1187CF" radius={3} />
        <Bar dataKey="배달건수" fill="black" radius={3} />
        <XAxis dataKey="name" style={{ fontSize: '12px' }} tickLine={false} />
        <Tooltip
          content={data}
          contentStyle={{ border: 'none' }}
          isAnimationActive={false}
          cursor={false}
        />
      </BarChart>
    </div>
  );
};

export default DateChart;
