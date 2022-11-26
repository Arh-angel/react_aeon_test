/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { IData } from '../../../models/IData';

import style from './TableComponent.module.scss';

type TableComponentPropsTypes = {
  currentValue: IData | null;
}

const TableComponent = (props: TableComponentPropsTypes) => {
  const { currentValue } = props;
  const [period, setPeriod] = useState<string[]>([]);
  const oneDay = 1000 * 60 * 60 * 24;
  const amountDays = Math.ceil((Date.parse(period[1]?.split('.').reverse().join('-')) - Date.parse(period[0]?.split('.').reverse().join('-'))) / oneDay);
  const amountWeeks = Math.ceil(amountDays / 7);

  const getPeriodTasks = (obj:any) => {
    const elements: any[] = [];

    if (obj.sub) {
      obj.sub.map((element: any) => {
        getPeriodTasks(element).map((item: any) => {
          elements.push(item);
          return '';
        });

        return '';
      });
    }

    if (obj.period_start) {
      elements.push([obj.period_start, obj.period_end]);
    }

    return elements;
  };

  const currentPeriodTask = (currentValue?.chart && getPeriodTasks(currentValue?.chart).reduce((previousValue, currentValue) => {
    if (previousValue.length === 0) {
      return currentValue;
    }
    if (Date.parse(currentValue[0]) < Date.parse(previousValue[0])) {
      previousValue.splice(0, 1, currentValue[0]);
      return previousValue;
    }
    if (Date.parse(currentValue[1]) > Date.parse(previousValue[1])) {
      previousValue.splice(1, 1, currentValue[1]);
      return previousValue;
    }
    return previousValue;
  }, []));

  const currentPeriod = useMemo(() => currentPeriodTask, [currentValue]);

  useEffect(() => {
    if (currentPeriod) {
      setPeriod(currentPeriod);
    }
  }, [currentPeriod]);

  return (
    <div className={style.container}>
      <div className={style.headerTable}>
        <div className={style.listWeeks}>
          1
        </div>
        <div className={style.listdays}>
          1
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
