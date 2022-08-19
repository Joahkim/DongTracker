import React from 'react';
import TimeChart from './Charts/TimeChart';
import { CgClose } from 'react-icons/cg';
import './SideBar.scss';
import DateChart from './Charts/DateChart';
import AppChart from './Charts/AppChart';

const SideBar = ({ setSideBarCondition, storeData }) => {
  if (storeData.length === 0) return;

  return (
    <aside className="sideBar">
      <section className="headWrapper">
        <div className="cancelBtn" onClick={() => setSideBarCondition(false)}>
          <CgClose />
        </div>
        <div className="sideBarInfo">
          <div className="storeName">{storeData.store}</div>
          <span className="region">{storeData.region}</span>
          <span className="application">{storeData.application}</span>
        </div>
      </section>
      <section className="timeChart">
        <div>
          <TimeChart storeData={storeData} />
        </div>
      </section>
      <section className="dateChart">
        <div>
          <DateChart storeData={storeData} />
        </div>
      </section>
      <section className="applicationChart">
        <AppChart storeData={storeData} />
      </section>
    </aside>
  );
};

export default SideBar;
