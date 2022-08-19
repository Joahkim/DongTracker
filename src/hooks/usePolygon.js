import React, { useState } from 'react';
import { useEffect } from 'react';
import { NaverMap } from 'react-naver-maps';

const usePolygon = () => {
  const navermaps = window.naver.maps;

  const [poly, setPoly] = useState([]);

  let onHoverPaths = [];

  const handleHoverCoordinate = data => {
    setPoly(data.coordinate.coordinates[0][0]);
  };

  poly.forEach(coordinate => {
    onHoverPaths.push(new navermaps.LatLng(coordinate[1], coordinate[0]));
  });

  return {
    onHoverPaths,
    handleHoverCoordinate,
  };
};

export default usePolygon;
