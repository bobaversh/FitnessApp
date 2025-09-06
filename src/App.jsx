
import './App.css';
import BottomBar from './Components/BottomBar/BottomBar.jsx'
import Header from './Components/Header/Header.jsx'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Training from './pages/Training.jsx';

export default function App() {


  return (
    <>
      <Header />

        <Routes>
          {/* <Route path = '/' element = {<Hello />} /> */}
          <Route path = '/training' element = {<Training />} />
        </Routes>

      <BottomBar/>
    </>
  );
}
