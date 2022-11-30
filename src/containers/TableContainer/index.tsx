import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/pages/TableComponent';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { IData } from '../../models/IData';
import { getData, selectData } from '../../store/slice/mainSlice/mainSlice';

const TableContainer = () => {
  const [data, setData] = useState<IData | null>(null);

  const currentData = useAppSelector(selectData);

  const dispatch = useAppDispatch();

  const getCurrentData = () => dispatch(getData());

  useEffect(() => {
    getCurrentData();
  }, []);

  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }, [currentData]);

  return (
    <TableComponent currentData={data} />
  );
};

export default TableContainer;
