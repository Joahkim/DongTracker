import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import usePolygon from '../../hooks/usePolygon';
import useInfoWindow from '../../hooks/useInfoWindow';
import useMarkerBtn from '../../hooks/useMarkerBtn';
import useCondition from '../../hooks/useCondition';
import useFilter from '../../hooks/useFilter';
import InfoWindow from './InfoWindow/InfoWindow';
import MarkerBtn from './MarkerBtn/MarkerBtn';
import MarkerStore from './MarkerStore/MarkerStore';
import SideBar from './SideBar';
import PersonModal from './PublicCharts/PersonModal';
import Population from './PublicCharts/Population';
import data from './data';

import './Map.scss';

import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Polyline,
  Polygon,
  Circle,
} from 'react-naver-maps';
import './Map.scss';

function NaverMapAPI({ dongData, url, sideBarDongData }) {
  const navermaps = window.naver.maps;

  const { onHoverPaths, handleHoverCoordinate } = usePolygon();

  const { handleInfoWindow, showInfoWindow, mouseOut } = useInfoWindow();

  const { handleMarkerBtn, showMarkerBtn } = useMarkerBtn();

  const {
    sideBarCondition,
    setSideBarCondition,
    sideModalCondition,
    setSideModalCondition,
    markerBtnCondition,
    setMarkerBtnCondition,
  } = useCondition();

  const [isMouseOn, setIsMouseOn] = useState(false);

  const [publicData] = useState(data);

  const [sidePublicData, setSidePublicData] = useState([]);

  const [storeData, setStoreData] = useState([]);

  const handleModalCondition = condition => {
    setSideModalCondition(condition);
  };

  const handleMarkerBtnCondition = condition => {
    setMarkerBtnCondition(condition);
  };

  const getSideModalData = regionCode => {
    fetch(`http://43.200.4.19:80/regions/population?region_code=${regionCode}`)
      .then(res => res.json())
      .then(data => {
        setSidePublicData(data.result);
      });
  };

  const requestStoreData = input => {
    if (url.includes('store')) {
      fetch(`http://43.200.4.19:80/regions/info${url}&region_code=${input}`)
        .then(res => res.json())
        .then(data => {
          setStoreData(data.result);
        });
      setSideBarCondition(true);
    }
    return;
  };

  return (
    <NaverMap
      id="react-naver-maps-introduction"
      style={{ width: '100vw', height: '90vh', borderTop: 'transparent' }}
      defaultCenter={{ lat: 37.497175, lng: 127.027926 }}
      defaultZoom={13}
      onClick={() => {
        handleModalCondition('');
        handleMarkerBtnCondition('');
      }}
    >
      {dongData.map(input => (
        <>
          <Marker
            key={input.region_code}
            position={
              new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
            }
            icon={{
              content: `<div class="markerBox" >
            <h1 class="markerCountText">${input.total_count}</h1>
            <p class="markerText">${input.ub_myeon_dong}</p>
            </div>`,
            }}
            title={input.ub_myeon_dong}
            onClick={e => {
              handleMarkerBtn(e);
              handleMarkerBtnCondition('btnOn');
              getSideModalData(input.region_code);
              requestStoreData(input.region_code);
            }}
            onMouseover={e => {
              handleHoverCoordinate(input);
              handleInfoWindow(e, input);
              setIsMouseOn(true);
            }}
            onMouseout={() => {
              mouseOut();
              setIsMouseOn(false);
            }}
          />
          {showInfoWindow && <InfoWindow showInfoWindow={showInfoWindow} />}

          {sideModalCondition === 'population' ? (
            <Population
              sideBarCondition={sideBarCondition}
              sidePublicData={sidePublicData}
            />
          ) : null}

          {sideBarCondition && (
            <SideBar
              storeData={storeData}
              sideBarCondition={sideBarCondition}
              setSideBarCondition={setSideBarCondition}
            />
          )}
        </>
      ))}

      {markerBtnCondition === 'btnOn'
        ? publicData.map(input => (
            <MarkerBtn
              key={input.id}
              showMarkerBtn={showMarkerBtn}
              input={input}
              handleModalCondition={handleModalCondition}
            />
          ))
        : null}

      <MarkerStore sideData={sideBarDongData[0].stores} navermaps={navermaps} />

      {isMouseOn && (
        <>
          <Polyline
            clickable={true}
            strokeColor="rgb(17, 135, 207)"
            strokeStyle="solid"
            strokeWeight={2}
            path={onHoverPaths}
          />
          <Polygon
            fillColor="rgb(17, 135, 207)"
            fillOpacity={0.35}
            clickable={true}
            paths={onHoverPaths}
          />
        </>
      )}
    </NaverMap>
  );
}

const Map = ({ dongData, url, sideBarDongData }) => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId="n5yxltth29"
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI
        dongData={dongData}
        url={url}
        sideBarDongData={sideBarDongData}
      />
    </RenderAfterNavermapsLoaded>
  );
};

export default Map;
