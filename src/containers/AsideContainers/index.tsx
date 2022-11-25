import React, { useEffect, useState } from "react";
import AsideComponent from "../../components/pages/AsideComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { IData } from "../../models/IData";
import { getData, selectData } from "../../store/slice/mainSlice/mainSlice";

const AsideContainer = () => {
  const [data, setData] = useState<IData | null>(null);

  const currentData = useAppSelector(selectData);

  const dispatch = useAppDispatch();

  const getCurrentData = async () => await dispatch(getData());

  useEffect(() => {
      getCurrentData();
  }, []);

  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }, [currentData]);

  return <AsideComponent currentValue={data} />
}

export default AsideContainer;
