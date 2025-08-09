import React, { useContext, useState, useEffect } from 'react';
import { challengeContext, scoreContext, tapContext, resetContext } from '../App';
import { Trophy } from 'lucide-react';

const ScoreBoard = () => {

    const { tap, setTap } = useContext(tapContext);
    const { randomNumber, setRandomNumber } = useContext(scoreContext)
    const { count, isStarted, setIsStarted, setCount } = useContext(challengeContext)
    const {resetCheck, setResetCheck} = useContext(resetContext)

    const [minimumTaps, setMinimumTaps] = useState(0)
    const [efficiency, setEfficiency] = useState(0)
    const [openScore, setOpenScore] = useState(false)

    const findMinimumTaps = (target) => {
        const targetNum = parseInt(target);
        if (targetNum === 0) return 0;
        
        const increments = [100, 50, 10, 1];
        const absTarget = Math.abs(targetNum);
        
        // Use BFS (Breadth-First Search) to find the absolute minimum
        // This guarantees we find the optimal solution
        const queue = [{position: 0, taps: 0}];
        const visited = new Set([0]);
        const maxSearchRange = absTarget + 200; // Reasonable bounds
        
        while (queue.length > 0) {
            const {position, taps} = queue.shift();
            
            // Found the target!
            if (position === absTarget) {
                return taps;
            }
            
            // Try each increment/decrement
            for (let inc of increments) {
                // Try adding
                const newPos1 = position + inc;
                if (newPos1 <= maxSearchRange && !visited.has(newPos1)) {
                    visited.add(newPos1);
                    queue.push({position: newPos1, taps: taps + 1});
                }
                
                // Try subtracting
                const newPos2 = position - inc;
                if (newPos2 >= -maxSearchRange && !visited.has(newPos2)) {
                    visited.add(newPos2);
                    queue.push({position: newPos2, taps: taps + 1});
                }
            }
        }
        
        // Fallback: if BFS doesn't find solution (shouldn't happen), use comprehensive approach
        let globalMin = Infinity;
        
        // Strategy 1: Pure greedy
        let directTaps = 0;
        let remaining = absTarget;
        for (let inc of increments) {
            const steps = Math.floor(remaining / inc);
            directTaps += steps;
            remaining -= steps * inc;
        }
        globalMin = Math.min(globalMin, directTaps);
        
        // Strategy 2: Test all overshoot combinations systematically
        for (let inc100 = 0; inc100 <= Math.ceil(absTarget / 100) + 3; inc100++) {
            for (let inc50 = 0; inc50 <= Math.ceil((absTarget - inc100 * 100) / 50) + 3; inc50++) {
                for (let inc10 = 0; inc10 <= Math.ceil((absTarget - inc100 * 100 - inc50 * 50) / 10) + 3; inc10++) {
                    const current = inc100 * 100 + inc50 * 50 + inc10 * 10;
                    const diff = Math.abs(current - absTarget);
                    const inc1needed = diff; // 1s needed to correct
                    
                    const totalTaps = inc100 + inc50 + inc10 + inc1needed;
                    globalMin = Math.min(globalMin, totalTaps);
                    
                    // Also test negative correction (if we overshot)
                    if (current > absTarget) {
                        const correctionNeeded = current - absTarget;
                        
                        // Try correcting with larger increments first
                        let correctionTaps = 0;
                        let tempCorrection = correctionNeeded;
                        
                        // Correct with 100s
                        const correct100 = Math.floor(tempCorrection / 100);
                        correctionTaps += correct100;
                        tempCorrection -= correct100 * 100;
                        
                        // Correct with 50s
                        const correct50 = Math.floor(tempCorrection / 50);
                        correctionTaps += correct50;
                        tempCorrection -= correct50 * 50;
                        
                        // Correct with 10s
                        const correct10 = Math.floor(tempCorrection / 10);
                        correctionTaps += correct10;
                        tempCorrection -= correct10 * 10;
                        
                        // Correct with 1s
                        correctionTaps += tempCorrection;
                        
                        const totalTapsWithCorrection = inc100 + inc50 + inc10 + correctionTaps;
                        globalMin = Math.min(globalMin, totalTapsWithCorrection);
                    }
                }
            }
        }
        
        return globalMin;
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
                <div className="overflow-hidden z-999 w-[95%] lg:w-[40%] h-[80%] sm:h-[70%] md:h-[60%] rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-2xl border-1 border-white/30 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 grid grid-rows-[auto_1fr_auto] gap-4 sm:gap-6">
                    <div className="absolute -bottom-8 -left-30 z-0 hidden lg:block">
                        <Trophy 
                            size={350}
                            color='white'
                            opacity={0.1}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center z-1 text-center">
                        <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-satoshi font-bold tracking-wide">You Did Great !</h1>
                        <p className="text-white/40 text-sm sm:text-base md:text-lg font-satoshi font-normal mt-1">Your score is given below</p>
                    </div>
                    <div className="grid grid-rows-[1fr_auto] py-4 sm:py-6 md:py-8 lg:py-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10 z-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
                            <div className="flex justify-center items-center sm:border-r-1 sm:border-r-white/40 px-3 sm:px-6 text-center border-b-1 border-b-white/40 sm:border-b-0 pb-4 sm:pb-0">
                                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium font-satoshi">You tapped <span className="font-manrope font-bold text-[#38bdf8] px-1">{tap}</span> times.</p>
                            </div>
                            <div className="flex justify-center items-center px-3 sm:px-6 text-center pt-4 sm:pt-0">
                                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium font-satoshi">Minimum possible <span className="font-manrope font-bold text-[#a855f7] px-1">{minimumTaps}</span></p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium font-satoshi text-center">So, your efficiency is <span className="font-manrope text-[#facc15] font-bold px-1">{efficiency.toFixed(1)}%</span>. Keep counting !</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={() => {
                            setResetCheck(true);
                            setCount(0);
                            // Close scoreboard
                            setOpenScore(false);
                            // Reset challenge state
                            setIsStarted(false);
                            setTap(0);
                         }}
                            className="rounded-xl bg-white/30 border-1 border-white/40 px-3 sm:px-4 py-2 sm:py-3 text-center text-white text-sm sm:text-base font-satoshi cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Return to home</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScoreBoard;