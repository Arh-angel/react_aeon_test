import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

import style from './PageWrapper.module.scss';

const PageWrapper = () => (
  <div className={style.page_wrapper}>
    <Header />
    <main className={style.content}><Outlet /></main>
  </div>
);

export default PageWrapper;
