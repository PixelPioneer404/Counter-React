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

    return (
        <>
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-5 w-90 translate-y-20">
                    <div className={`${showToast ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-200 ease-in-out`}>
                        <ChallengeToast message={toastMessage} />
                    </div>
                    <div className="w-full flex justify-center items-center gap-2 h-18">
                        <p className="w-full h-full text-center text-[#191923] bg-white font-medium text-xl rounded-full px-4 py-4 shadow-lg border-1 font-serif flex gap-3 justify-center items-center">
                            <span className='font-satoshi font-bold'>Count</span>
                            <span className="text-[30px] text-purple-600 font-manrope">{props.count}</span>
                        </p>
                        <div className="aspect-square h-full relative">
                            <Dropdown toggleMenu={toggleMenu} isOpen={isOpen} diff={props.setDiff} currentDiff={props.currentDiff} />
                        </div>
                    </div>
                    <div className="flex gap-3 w-90">
                        <button onClick={() => {
                            props.countHandler(1)
                            setIsOpen(false)
                            if(isStarted) setTap(tap+1)
                        }} className="px-4 py-3 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-green-400 text-white text-xl font-medium font-sans">Increment</button>
                        <button onClick={() => {
                            props.countHandler(2)
                            setIsOpen(false)
                            if(isStarted) setTap(0)
                        }} className="px-4 py-3 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-red-400 text-white text-xl font-medium font-sans">Reset</button>
                        <button onClick={() => {
                            props.countHandler(3)
                            setIsOpen(false)
                            if(isStarted) {
                                // Increment tap if decrement will actually happen
                                if (props.isBeyondZeroChecked) {
                                    // Beyond zero is enabled, decrement always happens
                                    setTap(tap+1)
                                } else {
                                    // Beyond zero is disabled, decrement only happens if count > 0
                                    if (props.count > 0) setTap(tap+1)
                                }
                            }
                        }} className="px-4 py-3 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-blue-400 text-white text-xl font-medium font-sans">Decrement</button>
                    </div>
                    <div className="relative flex items-center justify-center w-90">
                        <GetChallengeBox />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;