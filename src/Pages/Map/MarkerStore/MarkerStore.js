import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Marker, Circle } from 'react-naver-maps';
import { getDistance } from 'geolib';
import data from './data';

import './MarkerStore.scss';
import useMarkerStore from '../../../hooks/useMarkerStore';

const MarkerStore = ({ sideData, navermaps }) => {
  const {
    handleCircle,
    handleRadius,
    getCircleData,
    pushBtnGetCircle,
    inCircleMarker,
    showCircle,
    radius,
    isCircleOn,
    setIsCircleOn,
  } = useMarkerStore();

  const [meterBtnData] = useState(data);

  return (
    <>
      {sideData.map(input => (
        <Marker
          key={input.id}
          position={
            new navermaps.LatLng(input.x_coordinate, input.y_coordinate)
          }
          icon={{
            content: `<div class="storeMarkerBox" >
  <h1 class="storeMarkerCountText">거리</h1>
  <p class="storeMarkerText">${input.name}</p>
  </div>`,
          }}
          title={input.name}
          onClick={e => {
            setIsCircleOn(true);
            handleCircle(e, input.name);
            getCircleData(input.name, input.x_coordinate, input.y_coordinate);
          }}
        />
      ))}

      <Circle
        center={{ x: showCircle.x, y: showCircle.y }}
        radius={radius}
        fillOpacity={0.2}
        fillColor="#8CD790"
        strokeWeight={2}
        strokeColor="#5CAB7D"
        strokeStyle="solid"
        clickable={true}
        visible={isCircleOn}
        onClick={e => {
          setIsCircleOn(false);
        }}
      />

      {isCircleOn &&
        inCircleMarker.map(input => (
          <Marker
            key={input.id}
            position={
              new navermaps.LatLng(input.y_coordinate, input.x_coordinate)
            }
            icon={{
              content: `<div class="inCircleMarker"><i class="fa-solid fa-lg fa-location-dot"></i></div>`,
            }}
          />
        ))}

      {isCircleOn && (
        <div className="meterBox">
          <h2 className="meterHeader">거리(단위: m)</h2>
          <div className="meterBtnBox">
            {meterBtnData.map(input => (
              <button
                key={input.id}
                onClick={e => {
                  handleRadius(input.radius);
                  pushBtnGetCircle(input.radius);
                }}
                style={{
                  backgroundColor: radius === input.radius && '#5cab7d',
                  color: radius === input.radius && 'white',
                }}
              >
                {input.radius}m
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MarkerStore;
