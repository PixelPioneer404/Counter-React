import React, { createContext, useContext, useState } from 'react';
import ChallengeLayout from './ChallengeLayout';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { challengeContext, scoreContext, tapContext } from '../App';

const GetChallengeBox = () => {

    const { setCount, isStarted, setIsStarted, isBeyondZeroChecked } = useContext(challengeContext)
    const { setTap } = useContext(tapContext)
    const { randomNumber, setRandomNumber } = useContext(scoreContext)

    const [showedChallenge, setShowedChallenge] = useState(false);
    const [hideButton, setHideButton] = useState(false)

    const numberGenerator = () => {
        let random = 0;
        isBeyondZeroChecked ? random = (Math.floor(Math.random() * 10001) - 5000).toString() : random = (Math.floor(Math.random() * 5001)).toString();
        setRandomNumber(random);
    }

    const startChallenge = () => {
        // Reset tap counter and start challenge
        setTap(0);
        setIsStarted(true);
        setHideButton(true);

        // After 500ms: Generate number and show challenge layout
        setTimeout(() => {
            numberGenerator();
            setShowedChallenge(true);
        }, 500);
    }

    return (
        <>
            <div className="relative bg-white/20 backdrop-blur-md border-1 border-white/30 w-full h-50 rounded-3xl overflow-hidden flex justify-center items-center">
                <button onClick={() => {
                    numberGenerator();
                    if (isStarted) {
                        setCount(0);
                        setTap(0);
                    }
                }}
                    className={`${showedChallenge ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} absolute top-4 right-4 text-white/50 text-[4px] group cursor-pointer`}>
                    <RotateCcw className='group-hover:-rotate-360 transition-all duration-500 ease-in-out active:-rotate-440' />
                </button>
                <button onClick={() => {
                    setShowedChallenge(false)
                    setIsStarted(false)
                    setTap(0) // Reset tap counter when cancelling
                    setCount(0);
                    setTimeout(() => {
                        setHideButton(false)
                    }, 500)
                }}
                    className={`${showedChallenge ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} absolute top-4 left-4 text-white/50 text-[4px] group cursor-pointer hover:scale-110 transition-all duration-500 ease-in-out`}>
                    <ArrowLeft />
                </button>
                <button
                    onClick={startChallenge}
                    className={`${isStarted || hideButton ? "opacity-0 pointer-events-none" : 'opacity-100 pointer-events-auto'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg font-satoshi font-medium bg-white/20 backdrop-blur-md border-1 border-white/30 rounded-2xl px-4 py-3 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out`}
                >
                    Spin a challenge
                </button>
                <div className={`${showedChallenge ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-500 ease-in-out`}>
                    <ChallengeLayout number={randomNumber} />
                </div>
            </div>
        </>
    );
};

export default GetChallengeBox;