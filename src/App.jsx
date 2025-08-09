import React, { createContext, useState, useEffect } from 'react';
import Heading from './components/Heading';
import Body from './components/Body';
import Footer from './components/Footer';
import { Info, Settings } from 'lucide-react';
import SettingsPage from './components/SettingsPage';
import InfoPage from './components/Info';
import bg1 from './assets/bg-1.png';
import ScoreBoard from './components/ScoreBoard';

export const challengeContext = createContext()
export const tapContext = createContext();
export const scoreContext = createContext();
export const resetContext = createContext();


const App = () => {

  const [isStarted, setIsStarted] = useState(false);
  let year = new Date().getFullYear();
  const [currenYear, setYear] = useState(year)
  const [count, setCount] = useState(0);
  const [diff, setDiff] = useState(1);
  const [isSettingsOpen, setisSettingsOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isBeyondZeroChecked, setIsBeyondZeroChecked] = useState(false)
  const [tap, setTap] = useState(0)
  const [randomNumber, setRandomNumber] = useState("0");
  const [resetCheck, setResetCheck] = useState(false)

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

  useEffect(() => {
    const handlerKeyPress = (e) => {
      e.preventDefault();
      
      if (e.key === "a" || e.key === "A") {
        // Use functional update to avoid stale closure
        setCount(prevCount => prevCount + diff);
        if (isStarted) setTap(prevTap => prevTap + 1);
      }
      else if (e.key === " " || e.code === "Space") {
        setCount(0);
        if (isStarted) setTap(0);
      }
      else if (e.key === "d" || e.key === "D") {
        setCount(prevCount => {
          if (!isBeyondZeroChecked) {
            if (prevCount > 0) {
              return (prevCount - diff) > 0 ? prevCount - diff : 0;
            }
            return 0;
          } else {
            return prevCount - diff;
          }
        });
        if (isStarted) {
          setTap(prevTap => {
            if (isBeyondZeroChecked) {
              return prevTap + 1;
            } else {
              // Only increment tap if decrement actually happens
              if (count > 0) return prevTap + 1;
              return prevTap;
            }
          });
        }
      }
    }

    document.addEventListener("keydown", handlerKeyPress)

    return () => {
      document.removeEventListener("keydown", handlerKeyPress)
    }
  }, [diff, isBeyondZeroChecked, isStarted, count])

  return (
    <resetContext.Provider value={{ resetCheck, setResetCheck }}>
      <scoreContext.Provider value={{ randomNumber, setRandomNumber }}>
        <tapContext.Provider value={{ tap, setTap }}>
          <challengeContext.Provider value={{ count, setCount, isStarted, setIsStarted, isBeyondZeroChecked }}>
            <div className='bg-slate-900 w-screen h-[100dvh] relative overflow-hidden touch-manipulation tap-highlight-transparent select-none min-h-screen-mobile safe-area-inset'>
              <img src={bg1} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />
              <div onClick={() => { setisSettingsOpen(prev => !prev) }}
                className="group absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 backdrop-blur-xl cursor-pointer flex items-center justify-center rounded-lg hover:bg-red-500/40 z-50 transition-all duration-300 touch-manipulation">
                <Settings
                  className="text-white group-hover:rotate-90 transition-transform duration-300 ease-in-out"
                  size={20}
                />
              </div>
              <div onClick={() => { 
                console.log('Info button clicked, current state:', isInfoOpen);
                setIsInfoOpen(prev => !prev);
              }}
                className="group absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 backdrop-blur-xl cursor-pointer flex items-center justify-center rounded-lg hover:bg-blue-500/40 z-50 transition-all duration-300 touch-manipulation">
                <Info size={20} className="text-white group-hover:scale-110 transition-transform duration-300 ease-in-out" />
              </div>
              <Heading className="pointer-events-none" />
              <Body count={count} countHandler={countHandler} setDiff={setDiff} currentDiff={diff} isBeyondZeroChecked={isBeyondZeroChecked} setIsBeyondZeroChecked={setIsBeyondZeroChecked} />
              <SettingsPage isOpen={isSettingsOpen} setIsOpen={setisSettingsOpen} is1Checked={isBeyondZeroChecked} setIs1Checked={setIsBeyondZeroChecked} switchToggler={switchToggler} count={count} setCount={setCount} />
              <InfoPage isOpen={isInfoOpen} setIsOpen={setIsInfoOpen} />
              <ScoreBoard />
              <Footer year={currenYear} />
            </div>
          </challengeContext.Provider>
        </tapContext.Provider>
      </scoreContext.Provider>
    </resetContext.Provider>
  );
};

export default App;