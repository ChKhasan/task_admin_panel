import React, { useState } from 'react'
import { getData } from '../server/common';

const useGetData = (url) => {
  const [apiData, setAPIData] = useState([]);
  const [loading, setLoading] = useState(false);

    const getAPIData = () => {
        setLoading(true);
        getData(url)
          .then((res) => {
            setAPIData(res.data.data.data);
          })
          .finally(() => {
            setLoading(false);
          });
      };
  return [apiData,loading,getAPIData]
}

export default useGetData
