import React from 'react';
import './App.scss';
import PageWrapper from './components/common/PageWrapper';
import { Route, Routes } from 'react-router-dom';
import MainContainer from './containers/MainContainer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageWrapper />}>
        <Route index element={<MainContainer />} />
        <Route path="*" element={<MainContainer />} />
      </Route>
    </Routes>
  );
}

export default App;
