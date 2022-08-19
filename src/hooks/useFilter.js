import { useSearchParams, useLocation } from 'react-router-dom';

const useFilter = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortStore = storeName => {
    if (location.search.includes('application')) {
      const application = searchParams.get('application');
      setSearchParams({ store: `${storeName}`, application });
    } else {
      setSearchParams({ store: `${storeName}` });
    }
  };

  const sortApplication = appName => {
    if (location.search.includes('store')) {
      const store = searchParams.get('store');
      setSearchParams({ store, application: `${appName}` });
    } else {
      setSearchParams({ application: `${appName}` });
    }
  };

  const showAllStoreData = () => {
    location.search.includes('store', 'application') &&
      searchParams.delete('store', 'application');
    setSearchParams(searchParams);
  };

  const showAllAppData = () => {
    location.search.includes('application') &&
      searchParams.delete('application');
    setSearchParams(searchParams);
  };
  return { sortStore, sortApplication, showAllStoreData, showAllAppData };
};

export default useFilter;
