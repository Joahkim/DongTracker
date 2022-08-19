import React from 'react';
import './AppChart.scss';

const AppChart = ({ storeData }) => {
  if (storeData.length === 0) return;
  const fully = storeData.platform_data[0].per;

  return (
    <>
      <div className="appTitle">플랫폼별 차트</div>
      <div className="appDescription">
        <div className="bemin">
          <p className="appName">{storeData.platform_data[0].platform}</p>
          <p className="sales">배달건수 : {storeData.platform_data[0].count}</p>
          <p className="sales">매출액 : {storeData.platform_data[0].pay}</p>
        </div>
        <div className="yogiyo">
          <p className="appName">{storeData.platform_data[1].platform}</p>
          <p className="sales">{storeData.platform_data[1].count} : 배달건수</p>
          <p className="sales">{storeData.platform_data[1].pay} : 매출액</p>
        </div>
      </div>
      <div className="rangeBar">
        <div
          className="bedalMinJockBar"
          style={
            fully === 100
              ? {
                  width: `${storeData.platform_data[0].per}%`,
                  borderRadius: '15px',
                }
              : { width: `${storeData.platform_data[0].per}%` }
          }
        >
          {storeData.platform_data[0].per}%
        </div>
        <div
          className="yogiyoBar"
          style={
            (fully === 100
              ? { display: 'none' }
              : { width: `${storeData.platform_data[1].per}%` },
            fully === 0
              ? {
                  width: `${storeData.platform_data[1].per}%`,
                  borderRadius: '15px',
                }
              : { width: `${storeData.platform_data[1].per}%` })
          }
        >
          {storeData.platform_data[1].per}%
        </div>
      </div>
    </>
  );
};

export default AppChart;
