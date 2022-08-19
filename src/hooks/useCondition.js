import { useState } from 'react';

const useCondition = () => {
  const [sideBarCondition, setSideBarCondition] = useState(false);

  const [sideModalCondition, setSideModalCondition] = useState('');

  const [markerBtnCondition, setMarkerBtnCondition] = useState('');
  return {
    sideBarCondition,
    setSideBarCondition,
    sideModalCondition,
    setSideModalCondition,
    markerBtnCondition,
    setMarkerBtnCondition,
  };
};
export default useCondition;
