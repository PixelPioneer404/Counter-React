import React, { useContext, useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import GetChallengeBox from './GetChallengeBox';
import ChallengeToast from './ChallengeToast';
import { challengeContext, tapContext } from '../App';

const Body = (props) => {

    const { isStarted } = useContext(challengeContext)

    const { tap, setTap } = useContext(tapContext)

    const [isOpen, setIsOpen] = useState(false)

    const [showToast, setShowToast] = useState(false)

    const [toastMessage, setToastMessage] = useState({ type: "", tap: 0 })

    const toggleMenu = () => { setIsOpen(prev => !prev) }

    useEffect(() => {

        let toastTimer;

        if (isStarted) {
            setShowToast(true);
            setToastMessage({ type: "started", tap: tap });
        } else {
            setToastMessage({ type: "ended" })
            toastTimer = setTimeout(() => {
                setShowToast(false)
            }, 600)
        }

        return () => {
            clearTimeout(toastTimer);
        }
    }, [isStarted, tap])

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the dropdown container
            const dropdownContainer = event.target.closest('.dropdown-container');
            if (!dropdownContainer && isOpen) {
                setIsOpen(false);
            }
        };

        // Add event listener when dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        // Cleanup function to remove event listeners
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen])

    return (
        <>
            <div className="absolute inset-0 flex justify-center items-center px-4 py-8">
                <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-sm sm:max-w-md lg:w-90 -translate-y-8 sm:-translate-y-4 md:translate-y-0 lg:translate-y-4 xl:translate-y-8">
                    <div className={`${showToast ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-200 ease-in-out w-full`}>
                        <ChallengeToast message={toastMessage} />
                    </div>
                    <div className="w-full flex justify-center items-center gap-2 h-18 sm:h-16 md:h-18">
                        <p className="flex-1 h-full text-center text-[#191923] bg-white font-medium text-base sm:text-lg md:text-xl rounded-full px-3 sm:px-4 py-3 sm:py-4 shadow-lg border-1 font-serif flex gap-2 sm:gap-3 justify-center items-center">
                            <span className='font-satoshi font-bold text-lg sm:text-base md:text-lg'>Count</span>
                            <span className="text-2xl sm:text-2xl md:text-3xl text-purple-600 font-manrope">{props.count}</span>
                        </p>
                        <div className="aspect-square h-full relative flex-shrink-0 dropdown-container">
                            <Dropdown toggleMenu={toggleMenu} isOpen={isOpen} setIsOpen={setIsOpen} diff={props.setDiff} currentDiff={props.currentDiff} />
                        </div>
                    </div>
                    <div className="flex gap-2 sm:gap-3 w-full flex-col sm:flex-row">
                        {/* Top row: Increment and Decrement on mobile, all three on desktop */}
                        <div className="flex gap-2 sm:gap-3 w-full">
                            <button onClick={() => {
                                props.countHandler(1)
                                setIsOpen(false)
                                if (isStarted) setTap(tap + 1)
                            }} className="flex-1 px-4 sm:px-4 py-3 sm:py-3 rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out bg-green-400 text-white text-sm sm:text-lg md:text-xl font-medium font-sans touch-manipulation">Increment</button>

                            {/* Reset button shows inline on sm and up */}
                            <button onClick={() => {
                                props.countHandler(2)
                                setIsOpen(false)
                                if (isStarted) setTap(0)
                            }} className="hidden sm:flex flex-1 px-4 sm:px-4 py-3 sm:py-3 rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out bg-red-400 text-white text-sm sm:text-lg md:text-xl font-medium font-sans touch-manipulation items-center justify-center">Reset</button>

                            <button onClick={() => {
                                props.countHandler(3)
                                setIsOpen(false)
                                if (isStarted) {
                                    // Increment tap if decrement will actually happen
                                    if (props.isBeyondZeroChecked) {
                                        // Beyond zero is enabled, decrement always happens
                                        setTap(tap + 1)
                                    } else {
                                        // Beyond zero is disabled, decrement only happens if count > 0
                                        if (props.count > 0) setTap(tap + 1)
                                    }
                                }
                            }} className="flex-1 px-4 sm:px-4 py-3 sm:py-3 rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out bg-blue-400 text-white text-sm sm:text-lg md:text-xl font-medium font-sans touch-manipulation">Decrement</button>
                        </div>

                        {/* Bottom row: Reset button full width on mobile only */}
                        <button onClick={() => {
                            props.countHandler(2)
                            setIsOpen(false)
                            if (isStarted) setTap(0)
                        }} className="sm:hidden w-full px-4 py-3 rounded-2xl shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out bg-red-400 text-white text-sm font-medium font-sans touch-manipulation">Reset</button>
                    </div>
                    <div className="relative flex items-center justify-center w-full">
                        <GetChallengeBox />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;