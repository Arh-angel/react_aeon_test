/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useMemo } from 'react';
import { IData } from '../../../models/IData';
import Item from '../../common/Item';
import style from './AsideComponent.module.scss';

type AsideComponentPropsTypes = {
  currentValue: IData | null;
}

const AsideComponent = (props: AsideComponentPropsTypes) => {
  const { currentValue } = props;

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

  return (
    <div className={style.container}>
      <div className={style.workItem}>
        <h2 className={style.workItemTitle}>Work item</h2>
      </div>
      <div className={style.workItemlist}>
        { currentValue?.chart && memoizedValue.reverse().map((item: any) => <React.Fragment key={Date.now() * Math.random() * 10000}>{item}</React.Fragment>) }
      </div>
    </div>
  );
};

export default AsideComponent;
