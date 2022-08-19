import React from 'react';
import PersonCharts from './ReCharts/PersonCharts';

import './PersonModal.scss';

const PersonModal = ({ sideBarCondition }) => {
  return (
    <div className="personModal" style={{ right: sideBarCondition && '25%' }}>
      <h1 className="personModalHeader">
        역삼동 <span className="personModalHeaderText">1.1만 가구</span>
      </h1>
      <PersonCharts />
      <h2 className="personChartText">가구수</h2>
      <div className="iconWrapper">
        <div className="personIconContainer">
          <div className="personIconBox">
            <div className="personIconBoxFirst">
              <div className="icon" />
              <span className="firstText">1인 가구 </span>
            </div>
            <div className="personIconBoxSecond">
              <span className="secondText">55.1%</span>
            </div>
          </div>
          <div className="personIconBox">
            <div className="personIconBoxFirst">
              <div className="icon" style={{ backgroundColor: '#EE7785' }} />
              <span className="firstText" style={{ color: '#EE7785' }}>
                2인 가구
              </span>
            </div>
            <div className="personIconBoxSecond">
              <span className="secondText">18.3%</span>
            </div>
          </div>
          <div className="personIconBox">
            <div className="personIconBoxFirst">
              <div className="icon" style={{ backgroundColor: '#C89EC4' }} />
              <span className="firstText" style={{ color: '#C89EC4' }}>
                3인 가구
              </span>
            </div>
            <div className="personIconBoxSecond">
              <span className="secondText">13.5%</span>
            </div>
          </div>
        </div>
        <div className="personIconContainer">
          <div className="personIconBox">
            <div className="personIconBoxFirst">
              <div className="icon" style={{ backgroundColor: '#84B1ED' }} />
              <span className="firstText" style={{ color: '#84B1ED' }}>
                4인 가구
              </span>
            </div>
            <div className="personIconBoxSecond">
              <span className="secondText">10.2%</span>
            </div>
          </div>
          <div className="personIconBox">
            <div className="personIconBoxFirst">
              <div className="icon" style={{ backgroundColor: '#6E7783' }} />
              <span className="firstText" style={{ color: '#6E7783' }}>
                5인 이상
              </span>
            </div>
            <div className="personIconBoxSecond">
              <span className="secondText">3.0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonModal;
