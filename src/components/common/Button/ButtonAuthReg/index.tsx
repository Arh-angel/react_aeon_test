import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './ButtonAuthReg.module.scss';

const ButtonAuthReg = () => (
  <div className={style.wrapper}>
    <NavLink to="/reg" className={({ isActive }) => `${isActive ? style.active : style.reg}`}>Регистрация</NavLink>
    <NavLink to="/auth" className={({ isActive }) => `${isActive ? style.active : style.auth}`}>Авторизация</NavLink>
  </div>
);

export default ButtonAuthReg;
