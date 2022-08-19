import React, { useState } from 'react';
import { getDistance } from 'geolib';

const useMarkerStore = () => {
  const [isCircleOn, setIsCircleOn] = useState(false);

  const [showCircle, setShowCircle] = useState('');

  const [radius, setRadius] = useState(1000);

  const [inCircleMarker, setInCircleMarker] = useState([]);

  const handleCircle = (event, name) => {
    const { x, y } = event.overlay.position;
    setShowCircle({ x, y, name });
  };

  const handleRadius = input => {
    setRadius(input);
  };

  const getCircleData = (name, x, y) => {
    fetch(`http://43.200.4.19:80/deliveries?store=${name}`)
      .then(res => res.json())
      .then(data => {
        const circleFilter = data.result.filter(
          input =>
            getDistance(
              { latitude: x, longitude: y },
              { latitude: input.y_coordinate, longitude: input.x_coordinate }
            ) < radius
        );
        setInCircleMarker(prev => {
          return circleFilter;
        });
      });
  };

  const pushBtnGetCircle = inputRadius => {
    fetch(`http://43.200.4.19:80/deliveries?store=${showCircle.name}`)
      .then(res => res.json())
      .then(data => {
        const circleFilter = data.result.filter(
          input =>
            getDistance(
              { latitude: showCircle.y, longitude: showCircle.x },
              { latitude: input.y_coordinate, longitude: input.x_coordinate }
            ) < inputRadius
        );
        setInCircleMarker(prev => {
          return circleFilter;
        });
      });
  };

  return {
    handleCircle,
    showCircle,
    radius,
    handleRadius,
    inCircleMarker,
    getCircleData,
    pushBtnGetCircle,
    isCircleOn,
    setIsCircleOn,
  };
};

export default useMarkerStore;
