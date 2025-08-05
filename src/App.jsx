import React, { createContext, useState } from 'react';
import Heading from './components/Heading';
import Body from './components/Body';
import Footer from './components/Footer';
import { Settings } from 'lucide-react';
import SettingsPage from './components/SettingsPage';
import bg1 from './assets/bg-1.png';

export const challengeContext = createContext()

const App = () => {

  const [isStarted, setIsStarted] = useState(false);
  let year = new Date().getFullYear();
  const [currenYear, setYear] = useState(year)
  const [count, setCount] = useState(0);
  const [diff, setDiff] = useState(1);
  const [isSettingsOpen, setisSettingsOpen] = useState(false)
  const [isBeyondZeroChecked, setIsBeyondZeroChecked] = useState(false)

  const countHandler = (n) => {
    if (n === 1) setCount(count + diff);
    else if (n === 2) setCount(0);
    else if (n === 3) {
      if (!isBeyondZeroChecked) {
        if (count > 0)
          if ((count - diff) > 0) setCount(count - diff)
          else setCount(0)
      } else {
        setCount(count - diff)
      }
    }
  }

  const switchToggler = (setSwitch) => {
    setSwitch(prev => !prev)
  }

  return (
    <challengeContext.Provider value={{ isStarted, setIsStarted, isBeyondZeroChecked }}>
      <div className='bg-slate-900 w-screen h-screen relative'>
        <img src={bg1} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div onClick={() => { setisSettingsOpen(prev => !prev) }}
          className="group absolute top-6 right-6 w-12 h-12 bg-red-500/20 backdrop-blur-xl cursor-pointer flex items-center justify-center rounded-lg hover:bg-red-500/40 z-50">
          <Settings
            className="text-white group-hover:rotate-90 transition-transform duration-300 ease-in-out"
            size={24}
          />
        </div>
        <Heading className="pointer-events-none" />
        <Body count={count} countHandler={countHandler} setDiff={setDiff} currentDiff={diff} />
        <SettingsPage isOpen={isSettingsOpen} setIsOpen={setisSettingsOpen} is1Checked={isBeyondZeroChecked} setIs1Checked={setIsBeyondZeroChecked} switchToggler={switchToggler} count={count} setCount={setCount} />
        <Footer year={currenYear} />
      </div>
    </challengeContext.Provider>
  );
};

export default App;