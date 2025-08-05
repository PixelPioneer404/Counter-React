import React, { useState } from 'react';
import Heading from './components/Heading';
import Body from './components/Body';
import Footer from './components/Footer';
import { Settings } from 'lucide-react';
import SettingsPage from './components/SettingsPage';

const App = () => {

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
      if(!isBeyondZeroChecked) {
        if(count > 0)
          if((count-diff) > 0) setCount(count-diff)
          else setCount(0)
      } else {
        setCount(count-diff)
      }
    }
  }

  const switchToggler = (setSwitch) => {
    setSwitch(prev => !prev)
  }

  return (
    <div className='bg-slate-900 w-screen h-screen relative'>
      <div onClick={() => { setisSettingsOpen(prev => !prev) }}
        className="group absolute top-6 right-6 w-12 h-12 bg-red-500/20 cursor-pointer flex items-center justify-center rounded-lg hover:bg-red-500/40 z-50">
        <Settings
          className="text-white group-hover:rotate-90 transition-transform duration-300 ease-in-out"
          size={24}
        />
      </div>
      <Heading className="pointer-events-none" />
      <Body count={count} countHandler={countHandler} setDiff={setDiff} />
      <SettingsPage isOpen={isSettingsOpen} setIsOpen={setisSettingsOpen} is1Checked={isBeyondZeroChecked} setIs1Checked={setIsBeyondZeroChecked} switchToggler={switchToggler} />
      <Footer year={currenYear} />
    </div>
  );
};

export default App;