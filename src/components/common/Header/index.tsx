/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
// import { IData } from "../../../models/IData";
// import { getData, selectData } from "../../../store/slice/mainSlice/mainSlice";
import Button from '../Button';

import style from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getData, selectData } from '../../../store/slice/mainSlice/mainSlice';

const Header = () => {
  const [data, setData] = useState<any>();

  const currentData = useAppSelector(selectData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    if (currentData) {
      setData(currentData);
    }
  }, [currentData]);

  return (
    <div className={style.container}>
      <h1 className={style.project_period_title}>
        {data?.project || data?.period ? `${data.project} / ${data.period}` : 'Данных нет'}
      </h1>
      <Button
        clName={null}
        title="Export"
        handler={() => null}
        width={null}
        height={null}
        background={null}
        textColor={null}
        fontSize={null}
        fontWeight={null}
        margin={null}
        borderRadius={null}
        icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2083 17.0833C15.3741 17.0833 15.5331 17.1492 15.6503 17.2664C15.7675 17.3836 15.8333 17.5426 15.8333 17.7083C15.8333 17.8741 15.7675 18.0331 15.6503 18.1503C15.5331 18.2675 15.3741 18.3333 15.2083 18.3333L4.375 18.3367C4.20924 18.3367 4.05027 18.2708 3.93306 18.1536C3.81585 18.0364 3.75 17.8774 3.75 17.7117C3.75 17.5459 3.81585 17.3869 3.93306 17.2697C4.05027 17.1525 4.20924 17.0867 4.375 17.0867L15.2083 17.0833ZM9.70667 1.67667L9.79167 1.67084C9.9427 1.67084 10.0886 1.72554 10.2024 1.82481C10.3163 1.92408 10.3903 2.06121 10.4108 2.21084L10.4167 2.29584L10.4158 13.7L13.5175 10.6C13.6233 10.4942 13.7636 10.4298 13.9129 10.4186C14.0621 10.4075 14.2104 10.4502 14.3308 10.5392L14.4017 10.6C14.5074 10.7059 14.5716 10.8463 14.5826 10.9955C14.5936 11.1448 14.5507 11.293 14.4617 11.4133L14.4008 11.4833L10.2367 15.6475C10.1308 15.7534 9.99055 15.8177 9.84129 15.8289C9.69203 15.84 9.54372 15.7973 9.42333 15.7083L9.3525 15.6475L5.18333 11.4842C5.07122 11.3728 5.00546 11.2231 4.99929 11.0652C4.99313 10.9072 5.04702 10.7529 5.15011 10.6331C5.2532 10.5133 5.39784 10.437 5.55492 10.4196C5.71199 10.4022 5.86983 10.4449 5.99667 10.5392L6.06667 10.5992L9.16583 13.6942L9.16667 2.29584C9.16667 2.14481 9.22137 1.99889 9.32064 1.88506C9.41991 1.77124 9.55704 1.69721 9.70667 1.67667L9.79167 1.67084L9.70667 1.67667Z" fill="#262842" />
        </svg>} />
    </div>
  );
};

export default Header;
