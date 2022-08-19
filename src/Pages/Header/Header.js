import React from 'react';
import './Header.scss';

import useFilter from '../../hooks/useFilter';

const Header = ({ dongData }) => {
  const { applications, stores } = dongData[0];
  const { sortStore, sortApplication, showAllAppData, showAllStoreData } =
    useFilter();

  const goRefresh = () => {
    window.open('http://43.200.4.19:80/regions', '_self');
  };

  return (
    <>
      <header className="header">
        <section className="headerContext">
          <div className="logo">
            <div className="goToMain" onClick={goRefresh}>
              <img className="logoImage" src="/images/logo.png" alt="logo" />
            </div>
          </div>
          <div className="storesButtons">
            <button className="storeBtn" onClick={showAllStoreData}>
              매장 전체 보기
            </button>
            {stores.map(data => (
              <button
                className="storeBtn"
                onClick={() => sortStore(data.name)}
                key={data.id}
              >
                {data.name}
              </button>
            ))}
          </div>
        </section>
      </header>
      <header className="platformHeader">
        <div className="btnContainer">
          <button className="btnBox" onClick={showAllAppData}>
            <span className="btnText">전체</span>
          </button>
          {applications.map(input => (
            <button
              className="btnBox"
              key={input.id}
              onClick={() => sortApplication(input.name)}
            >
              <span className="btnText">{input.name}</span>
            </button>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
