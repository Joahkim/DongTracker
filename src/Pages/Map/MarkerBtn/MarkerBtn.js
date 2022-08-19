import React from 'react';
import { NaverMap } from 'react-naver-maps';
import { Marker } from 'react-naver-maps';

import './MarkerBtn.scss';

const MarkerBtn = ({ showMarkerBtn, input, handleModalCondition }) => {
  const navermaps = window.naver.maps;

  const { name, position, icon, condition } = input;

  return (
    <Marker
      icon={{
        content: `<div class='iconContainer' style="position: absolute; top:20px; left: ${position};">
        <div class="iconBox">
         ${icon}  
         <span>${name}</span>
        </div>
        </div>`,
      }}
      position={new navermaps.LatLng(showMarkerBtn.y, showMarkerBtn.x)}
      title="button"
      onClick={e => {
        handleModalCondition(condition);
      }}
    />
  );
};

export default MarkerBtn;
