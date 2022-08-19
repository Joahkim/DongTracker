import React, { useState } from 'react';

const useInfoWindow = () => {
  const [showInfoWindow, setShowInfoWindow] = useState('');

  const handleInfoWindow = (event, input) => {
    const { x, y } = event.overlay.position;
    setShowInfoWindow({
      x,
      y,
      display: 'block',
      dong: input.ub_myeon_dong,
      pay: input.total_pay,
      delivery: input.total_count,
    });
  };
  const mouseOut = () => {
    setShowInfoWindow({ x: 0, y: 0, display: 'none' });
  };

  return {
    handleInfoWindow,
    showInfoWindow,
    setShowInfoWindow,
    mouseOut,
  };
};

export default useInfoWindow;
