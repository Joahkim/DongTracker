import React from 'react';
import PopulationCharts from './ReCharts/PopulationCharts';

import './Population.scss';

const Population = ({ sideBarCondition, sidePublicData }) => {
  const { region, population_data } = sidePublicData;

  return (
    <div
      className="personModal"
      style={{ right: sideBarCondition && '25%', height: '50%' }}
    >
      <h1 className="personModalHeader">
        {region}
        <span className="personModalHeaderText">
          {population_data.all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          명
        </span>
      </h1>
      <PopulationCharts sidePublicData={sidePublicData} />
      <h2 className="personChartText" style={{ bottom: '190px' }}>
        인구수
      </h2>
      <div className="iconWrapper" style={{ height: '180px' }}>
        <div className="personIconContainer" style={{ width: '40%' }}>
          <div className="personIconBox" style={{ flexDirection: 'column' }}>
            <div className="personIconBoxColumn">
              <div className="personIconBoxFirst">
                <div className="icon" />
                <span className="firstText">10대</span>
              </div>
              <div className="personIconBoxSecond">
                <span className="secondText">
                  {population_data.age_10_per}%
                </span>
              </div>
            </div>
            <div className="personIconBoxColumnTwo">
              <div className="personIconBoxRange">
                <span className="menRangeText">남</span>
                <div
                  className="menRange"
                  style={{
                    width: `${population_data.age_10_male_per}` + '%',
                  }}
                >
                  {population_data.age_10_male_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div
                  className="girlRange"
                  style={{
                    width: `${population_data.age_10_female_per}` + '%',
                  }}
                >
                  {population_data.age_10_female_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <span className="girlRangeText">여</span>
              </div>
            </div>
          </div>
          <div className="personIconBox" style={{ flexDirection: 'column' }}>
            <div className="personIconBoxColumn">
              <div className="personIconBoxFirst">
                <div className="icon" style={{ backgroundColor: '#EE7785' }} />
                <span className="firstText" style={{ color: '#EE7785' }}>
                  20대
                </span>
              </div>
              <div className="personIconBoxSecond">
                <span className="secondText">
                  {population_data.age_20_per}%
                </span>
              </div>
            </div>
            <div className="personIconBoxColumnTwo">
              <div className="personIconBoxRange">
                <span className="menRangeText">남</span>
                <div
                  className="menRange"
                  style={{
                    width: `${population_data.age_20_male_per}` + '%',
                  }}
                >
                  {population_data.age_20_male_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div
                  className="girlRange"
                  style={{
                    width: `${population_data.age_20_female_per}` + '%',
                  }}
                >
                  {population_data.age_20_female_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <span className="girlRangeText">여</span>
              </div>
            </div>
          </div>
          <div className="personIconBox" style={{ flexDirection: 'column' }}>
            <div className="personIconBoxColumn">
              <div className="personIconBoxFirst">
                <div className="icon" style={{ backgroundColor: '#C89EC4' }} />
                <span className="firstText" style={{ color: '#C89EC4' }}>
                  30대
                </span>
              </div>
              <div className="personIconBoxSecond">
                <span className="secondText">
                  {population_data.age_30_per}%
                </span>
              </div>
            </div>
            <div className="personIconBoxColumnTwo">
              <div className="personIconBoxRange">
                <span className="menRangeText">남</span>
                <div
                  className="menRange"
                  style={{
                    width: `${population_data.age_30_male_per}` + '%',
                  }}
                >
                  {population_data.age_30_male_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div
                  className="girlRange"
                  style={{
                    width: `${population_data.age_30_female_per}` + '%',
                  }}
                >
                  {population_data.age_30_female_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <span className="girlRangeText">여</span>
              </div>
            </div>
          </div>
        </div>
        <div className="personIconContainer" style={{ width: '40%' }}>
          <div className="personIconBox" style={{ flexDirection: 'column' }}>
            <div className="personIconBoxColumn">
              <div className="personIconBoxFirst">
                <div className="icon" style={{ backgroundColor: '#84B1ED' }} />
                <span className="firstText" style={{ color: '#84B1ED' }}>
                  40대
                </span>
              </div>
              <div className="personIconBoxSecond">
                <span className="secondText">
                  {population_data.age_40_per}%
                </span>
              </div>
            </div>
            <div className="personIconBoxColumnTwo">
              <div className="personIconBoxRange">
                <span className="menRangeText">남</span>
                <div
                  className="menRange"
                  style={{
                    width: `${population_data.age_40_male_per}` + '%',
                  }}
                >
                  {population_data.age_40_male_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div
                  className="girlRange"
                  style={{
                    width: `${population_data.age_40_female_per}` + '%',
                  }}
                >
                  {population_data.age_40_female_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <span className="girlRangeText">여</span>
              </div>
            </div>
          </div>
          <div className="personIconBox" style={{ flexDirection: 'column' }}>
            <div className="personIconBoxColumn">
              <div className="personIconBoxFirst">
                <div className="icon" style={{ backgroundColor: '#6E7783' }} />
                <span className="firstText" style={{ color: '#6E7783' }}>
                  50대
                </span>
              </div>
              <div className="personIconBoxSecond">
                <span className="secondText">
                  {population_data.age_50_per}%
                </span>
              </div>
            </div>
            <div className="personIconBoxColumnTwo">
              <div className="personIconBoxRange">
                <span className="menRangeText">남</span>
                <div
                  className="menRange"
                  style={{
                    width: `${population_data.age_50_male_per}` + '%',
                  }}
                >
                  {population_data.age_50_male_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div
                  className="girlRange"
                  style={{
                    width: `${population_data.age_50_female_per}` + '%',
                  }}
                >
                  {population_data.age_50_female_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <span className="girlRangeText">여</span>
              </div>
            </div>
          </div>
          <div className="personIconBox" style={{ flexDirection: 'column' }}>
            <div className="personIconBoxColumn">
              <div className="personIconBoxFirst">
                <div className="icon" style={{ backgroundColor: '#C5C6B6' }} />
                <span className="firstText" style={{ color: '#C5C6B6' }}>
                  60대 이상
                </span>
              </div>
              <div className="personIconBoxSecond">
                <span className="secondText">
                  {population_data.age_60_per}%
                </span>
              </div>
            </div>
            <div className="personIconBoxColumnTwo">
              <div className="personIconBoxRange">
                <span className="menRangeText">남</span>
                <div
                  className="menRange"
                  style={{
                    width: `${population_data.age_60_male_per}` + '%',
                  }}
                >
                  {population_data.age_60_male_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div
                  className="girlRange"
                  style={{
                    width: `${population_data.age_60_female_per}` + '%',
                  }}
                >
                  {population_data.age_60_female_count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <span className="girlRangeText">여</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Population;
