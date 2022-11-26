import React from 'react';
import style from './MainComponent.module.scss';
import TableContainer from '../../../containers/TableContainer';
import AsideContainer from '../../../containers/AsideContainers';

const MainComponent = () => (
  <div className={style.container}>
    <AsideContainer />
    <TableContainer />
  </div>
);

export default MainComponent;
