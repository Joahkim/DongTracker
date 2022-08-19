import React from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
import './TimeChart.scss';

const PieChartComponent = ({ storeData }) => {
  if (storeData.length === 0) return;
  const data = [
    { name: '아침', value: storeData.offer_time_data[0].pay },
    { name: '점심', value: storeData.offer_time_data[1].pay },
    { name: '저녁', value: storeData.offer_time_data[2].pay },
  ];

  const COLORS = ['#1AA7EC', '#1E2F97', '#4bAAAD'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {percent ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  return (
    <div>
      <div className="timeTitle">시간별 차트</div>
      <div className="row d-flex justify-content-center text-center">
        <div className="col-md-8">
          <PieChart width={300} height={200}>
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="bottom"
              iconSize="13"
              wrapperStyle={{
                fontWeight: '700',
                border: '1px solid #FAFAFA',
                borderRadius: '10px',
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                padding: '5px',
              }}
            />
            <Pie
              data={data}
              cx="65%"
              cy="70%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: `drop-shadow(5px 5px 5px #666`,
                  }}
                  stroke="1"
                />
              ))}
            </Pie>
            <Tooltip isAnimationActive={false} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
export default PieChartComponent;
