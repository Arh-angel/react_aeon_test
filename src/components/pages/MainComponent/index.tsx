import React from "react";
import style from './MainComponent.module.scss';
import AsideComponent from "../AsideComponent";
import TableContainer from "../../../containers/TableContainer";

const MainComponent = () => {
  return (
    <div className={style.container}>
      <AsideComponent />
      <TableContainer />
    </div>
  )
}

export default MainComponent;
