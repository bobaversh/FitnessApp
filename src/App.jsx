
import './App.css';
import BottomBar from './Components/BottomBar/BottomBar.jsx'
import Header from './Components/Header/Header.jsx'
import Training from './Components/Training/Training.jsx'
import Food from './Components/Food/Food.jsx'
// import Measurements from './Components/Measurements/Measurements.jsx'
import { useState } from 'react'

export default function App() {
  const [activeSection, setActiveSection] = useState('1')

  const sections = {
    '1': <Training />,
    '2': <Food />,
    // '3': <Measurements />
  };

  return (
    <>
      <Header />
      {sections[activeSection]}
      <BottomBar 
      setActiveSection={setActiveSection}
      activeSection = {activeSection}
      />
    </>
  );
}
