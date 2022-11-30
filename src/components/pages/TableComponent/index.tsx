/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useState, WheelEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { IData } from '../../../models/IData';

import style from './TableComponent.module.scss';

type TableComponentPropsTypes = {
  currentData: IData | null;
}

const TableComponent = (props: TableComponentPropsTypes) => {
  const { currentData } = props;
  const [period, setPeriod] = useState<string[]>([]);
  const [lastDayPeriod, setLastDayPeriod] = useState<string>('');

  const [ref, inView] = useInView();

  const oneDay = 1000 * 60 * 60 * 24;
  const amountDays = Math.ceil((Date.parse(period[1]?.split('.').reverse().join('-')) - Date.parse(period[0]?.split('.').reverse().join('-'))) / oneDay);
  const amountWeeks = Math.ceil(amountDays / 7);

  useEffect(() => {
    if (currentData?.period) {
      setLastDayPeriod(currentData?.period.split('-')[1].split('.').reverse().join('-'));
    }
  }, [currentData]);

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
      elements.push([obj.period_start, obj.period_end, obj.title]);
    }

    return elements;
  };

  const currentPeriodTask = (currentData?.chart && getPeriodTasks(currentData?.chart).reduce((previousValue, currentValue) => {
    if (previousValue.length === 0) {
      return currentValue.slice(0, 2);
    }
    if (Date.parse(currentValue[0]) < Date.parse(previousValue[0])) {
      previousValue.splice(0, 1, currentValue[0]);
      return previousValue;
    }
    if (Date.parse(currentValue[1]) > Date.parse(previousValue[1])) {
      previousValue.splice(1, 1, lastDayPeriod);
      // if will need return only current period tasks
      // previousValue.splice(1, 1, currentValue[1]);
      return previousValue;
    }
    return previousValue;
  }, []));

  const currentPeriod = useMemo(() => currentPeriodTask, [currentData]);

  useEffect(() => {
    if (currentPeriod) {
      setPeriod(currentPeriod);
    }
  }, [currentPeriod]);

  const getWeeks = () => {
    const firstDate = period[0].split('-').map((item, index) => {
      if (index === 2) {
        return '01';
      }

      return item;
    }).join('-');

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let startDate: any = new Date(firstDate);

    const arrWeek: any[] = [];
    const periodTasks = getPeriodTasks(currentData?.chart).reverse();

    do {
      const arrDays: any[] = [];
      let day = new Date(startDate);

      while (day <= new Date(Date.parse(startDate) + oneDay * 6)) {
        arrDays.push([day.getDate(), []]);

        periodTasks.map((item) => {
          if (new Date(item[0]) <= day && day <= new Date(item[1])) {
            if (Array.isArray(arrDays[arrDays.length - 1])) {
              arrDays[arrDays.length - 1][1].push(item[2]);
            }
          }
        });

        day = new Date(Date.parse(`${day}`) + oneDay);
      }

      if (startDate <= new Date(period[1])) {
        if (new Date(Date.parse(startDate) + oneDay * 6) > new Date(period[1])) {
          arrWeek.push([`${new Date(startDate).getDate()} ${month[new Date(startDate).getMonth()]} - ${new Date(period[1]).getDate()} ${month[new Date(startDate).getMonth()]}`, [...arrDays]]);
        } else {
          arrWeek.push([`${new Date(startDate).getDate()} ${month[new Date(startDate).getMonth()]} - ${new Date(Date.parse(startDate) + oneDay * 6).getDate()} ${month[new Date(startDate).getMonth()]}`, [...arrDays]]);
        }
      }

      startDate = new Date(Date.parse(startDate) + oneDay * 7);
    } while (startDate <= new Date(period[1]));

    return arrWeek;
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const currentElement = event.currentTarget;

    let isScrolling = false;

    let direction = '';

    const { scrollWidth } = currentElement;
    const elemWidth = currentElement.clientWidth;
    const lineWidth = scrollWidth - elemWidth;

    function scrollAnimate(num: number) {
      let counter = 1;
      isScrolling = true;
      const timer = setInterval(() => {
        currentElement.scrollLeft += num;
        counter += 1;
        if (counter > 30) {
          isScrolling = false;
          clearInterval(timer);
        }
      }, 10);
    }

    if (event.deltaY > 0) {
      direction = 'right';
    } else if (event.deltaY < 0) {
      direction = 'left';
    }

    if (currentElement.scrollLeft === 0) {
      if (direction === 'right') {
        scrollAnimate(10);
      }
    } else if (Math.floor(currentElement.scrollLeft) === lineWidth) {
      if (direction === 'left') {
        scrollAnimate(-10);
      }
    } else if (Math.floor(currentElement.scrollLeft) < lineWidth) {
      if (direction === 'left') {
        scrollAnimate(-10);
      } else {
        scrollAnimate(10);
      }
    }
  };

  return (
    <div className={style.container} onWheel={onWheel} style={inView ? { boxShadow: 'none' } : { boxShadow: 'inset -4px 2px 8px rgba(16, 31, 43, 0.1)' }}>
      <div className={style.listWeeks}>
        { amountWeeks > 0 && getWeeks().map((item, index, array) => {
          if (index === array.length - 1) {
            return <div key={index} className={style.week}>
              <div ref={ref} className={style.cellWeek}>{item[0]}</div>
              <div className={style.listdays}>
                {item[1].map((el: any[], ind: number) => <div key={el[0]} className={ind > 4 ? [style.cellDay, style.cellDayOff].join(' ') : style.cellDay}>{el[0]}</div>)}
              </div>
              <div className={style.field}>
                {item[1].map((el: any[]) => <div key={el[0]} className={style.cellFild}>{}</div>)}
              </div>
                   </div>;
          }
          return <div key={index} className={style.week}>
            <div className={style.cellWeek}>{item[0]}</div>
            <div className={style.listdays}>
                {item[1].map((el: any[], ind: number) => <div key={el[0]} className={ind > 4 ? [style.cellDay, style.cellDayOff].join(' ') : style.cellDay}>{el[0]}</div>)}
            </div>
            <div className={style.field}>
                {item[1].map((el: any[]) => <div key={el[0]} className={style.cellFild}>
                  {el[1].map((item: any, index: number) => {
                    const stylePackage: any = {
                      backgroundColor: '',
                      border: ''
                    };

                    if (item === 'Marketing Launch') {
                      stylePackage.backgroundColor = '#E2EBFF';
                      stylePackage.border = '1px solid #497CF6';
                    } else if (item === 'Banners for social networks' || item === 'Custom issue level #5' || item === 'Custom task') {
                      stylePackage.backgroundColor = '#FFF2E0';
                      stylePackage.border = '1px solid #FFA530';
                    } else if (item === 'Choosing a platform for ads' || item === 'Custom issue level #4') {
                      stylePackage.backgroundColor = '#CFF0D6';
                      stylePackage.border = '1px solid #2DB77B';
                    }

                    return <div key={index} className={style.tasksInField} style={stylePackage} />;
                  })}
                                            </div>)}
            </div>
                 </div>;
        }) }
      </div>
    </div>
  );
};

export default TableComponent;
