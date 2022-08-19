import React, { useState } from 'react';

const useMarkerBtn = () => {
  const [showMarkerBtn, setShowMarkerBtn] = useState('');

  const handleMarkerBtn = (event, regionCode) => {
    const { x, y } = event.overlay.position;
    setShowMarkerBtn({ x, y, regionCode });
  };

  return {
    handleMarkerBtn,
    showMarkerBtn,
  };
};

export default useMarkerBtn;
