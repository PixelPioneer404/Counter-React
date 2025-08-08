import React, { useContext, useState, useEffect } from 'react';
import { challengeContext, scoreContext, tapContext } from '../App';

const ScoreBoard = () => {

    const { tap } = useContext(tapContext);
    const { randomNumber } = useContext(scoreContext)
    const { count, isStarted } = useContext(challengeContext)

    const [minimumTaps, setMinimumTaps] = useState(0)
    const [efficiency, setEfficiency] = useState(0)
    const [openScore, setOpenScore] = useState(false)

    const findMinimumTaps = (target) => {
        const increments = [100, 50, 10, 1];
        let taps = 0;
        let current = 0;

        for (let increment of increments) {
            if (current < target) {
                const steps = Math.floor((target - current) / increment);
                taps += steps;
                current += steps * increment;
            }
        }

        // Handle case where we overshot and need to decrement
        for (let increment of increments) {
            if (current > target) {
                const steps = Math.floor((current - target) / increment);
                taps += steps;
                current -= steps * increment;
            }
        }

        return taps;
    };

    const findEfficiency = (minimumTaps, tap) => {
        if (tap === 0 || minimumTaps === 0) {
            setEfficiency(0);
            return;
        }
        // Calculate efficiency: 100% = perfect, lower = less efficient
        const efficiencyValue = (minimumTaps / tap) * 100;
        setEfficiency(Math.min(efficiencyValue, 100)); // Cap at 100% for perfect or better play
    }

    // Use useEffect to calculate minimum taps when randomNumber changes
    useEffect(() => {
        setMinimumTaps(findMinimumTaps(randomNumber));
        // Reset scoreboard when new challenge starts
        setOpenScore(false);
        setEfficiency(0);
    }, [randomNumber]);

    useEffect(() => {
        // Check if count matches the target AND a challenge is actually started
        if (isStarted && count === parseInt(randomNumber) && randomNumber !== "0") {
            setTimeout(() => {
                setOpenScore(true);
                // Calculate efficiency when the goal is reached
                findEfficiency(minimumTaps, tap);
            }, 400);
        }
    }, [count, randomNumber, minimumTaps, tap, isStarted])

    return (
        <>
            <div className={`w-screen h-screen z-999 bg-black/50 absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${openScore ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="z-999 w-[30%] h-[50%] rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-xl border-1 border-white/30 shadow-xl p-12 grid grid-rows-[20%_1fr_5%]">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-white text-[38px] font-satoshi font-bold text-center tracking">You Did Great !</h1>
                        <p className="text-white/40 text-lg font-satoshi font-normal">Your score is given below</p>
                    </div>
                    <div className="grid grid-rows-[1fr_20%] py-12 gap-10">
                        <div className="grid grid-cols-2">
                            <div className="flex justify-center items-center border-r-1 border-r-white/40 px-6 text-center">
                                <p className="text-white text-lg font-medium font-satoshi">You tapped <span className="text-[26px] text-purple-600 px-1 translate-y-1 inline-block">{tap}</span> times.</p>
                            </div>
                            <div className="flex justify-center items-center px-6 text-center">
                                <p className="text-white text-lg font-medium font-satoshi">The minimum possible tap to reach this target is <span className="text-[26px] text-purple-600 px-1 translate-y-1 inline-block">{minimumTaps}</span></p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-white text-xl font-medium font-satoshi">So, this time your efficiency is <span className="text-purple-600 px-1 inline-block">{efficiency.toFixed(1)}%</span>. Keep counting !</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={() => { setOpenScore(false) }}
                            className="rounded-xl bg-white/30 border-1 border-white/40 px-4 py-3 text-center text-white font-satoshi cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Return to home</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScoreBoard;