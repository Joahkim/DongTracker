import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Map from '../Map/Map';
import './Main.scss';

const Main = () => {
  const location = useLocation();

  const [dongData, setDongData] = useState([]);

  const url = location.search;

  useEffect(() => {
    fetch(`http://43.200.4.19:80/regions${url}`)
      .then(res => res.json())
      .then(data => {
        setDongData(data.result);
      });
  }, [url]);

  if (dongData.length === 0) return;
  return (
    <>
      <Header dongData={dongData} url={url} />
      <Map
        dongData={dongData[1].region_data}
        sideBarDongData={dongData}
        url={url}
      />
    </>
  );
};

export default Main;
