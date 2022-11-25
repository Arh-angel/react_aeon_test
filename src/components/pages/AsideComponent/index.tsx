/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { IData } from '../../../models/IData';
import { addArrList, selectArrList } from '../../../store/slice/mainSlice/mainSlice';
import Item from '../../common/Item';
import style from './AsideComponent.module.scss';

type AsideComponentPropsTypes = {
  currentValue: IData | null;
}

const AsideComponent = (props: AsideComponentPropsTypes) => {
  const { currentValue } = props;

  const dispatch = useAppDispatch();
  const actualValue: any = useAppSelector(selectArrList);

  const handlerData = (obj:any) => {
    const elements: any[] = [];

    if (obj.sub) {
      const reversSub = [...obj.sub].reverse();
      reversSub.map((element: any) => {
        handlerData(element).map((item: any) => {
          elements.push(item);
        });
      });
    }

    if (obj.id !== 0) {
      const copyElements = [...elements];

      elements.push(
        <Item obj={obj} copyElements={copyElements.reverse()} />
      );
    }

    return elements.slice(-1);
  };

  const memoizedValue: any = useMemo(() => {
    if (currentValue?.chart) {
      return handlerData(currentValue?.chart);
    }
  }, [currentValue?.chart]);

  useEffect(() => {
    if (memoizedValue) {
      dispatch(addArrList(memoizedValue));
    }
  }, [memoizedValue]);

  return (
    <div className={style.container}>
      <div className={style.workItem}>
        <h2 className={style.workItemTitle}>Work item</h2>
      </div>
      <div className={style.workItemlist}>
        { currentValue?.chart && [...actualValue].reverse().map((item: any) => <React.Fragment key={Date.now() * Math.random() * 10000}>{item}</React.Fragment>) }
      </div>
    </div>
  );
};

export default AsideComponent;
