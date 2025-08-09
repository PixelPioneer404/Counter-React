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
        
        // Dynamic programming with memoization for 100% accuracy
        const memo = new Map();
        
        const minTapsToReach = (current, target, depth = 0) => {
            // Prevent infinite recursion and optimize for reasonable bounds
            if (depth > 20 || Math.abs(current) > absTarget + 200) return Infinity;
            if (current === target) return 0;
            
            const key = current;
            if (memo.has(key)) return memo.get(key);
            
            let minTaps = Infinity;
            
            // Try each increment/decrement operation
            for (let inc of increments) {
                // Try adding
                const newCurrent1 = current + inc;
                const taps1 = 1 + minTapsToReach(newCurrent1, target, depth + 1);
                minTaps = Math.min(minTaps, taps1);
                
                // Try subtracting  
                const newCurrent2 = current - inc;
                const taps2 = 1 + minTapsToReach(newCurrent2, target, depth + 1);
                minTaps = Math.min(minTaps, taps2);
            }
            
            memo.set(key, minTaps);
            return minTaps;
        };
        
        // However, for performance in a real game, let's use a hybrid approach
        // that's highly accurate but still fast
        
        let globalMin = Infinity;
        
        // 1. Standard greedy approach
        let directTaps = 0;
        let remaining = absTarget;
        for (let inc of increments) {
            const steps = Math.floor(remaining / inc);
            directTaps += steps;
            remaining -= steps * inc;
        }
        globalMin = Math.min(globalMin, directTaps);
        
        // 2. Test overshoot with each increment type
        for (let mainInc of increments) {
            // Test different overshoot amounts
            for (let overshootSteps = 1; overshootSteps <= Math.ceil(absTarget / mainInc) + 2; overshootSteps++) {
                const overshootValue = overshootSteps * mainInc;
                const correction = Math.abs(overshootValue - absTarget);
                
                // Calculate minimum taps for correction
                let correctionTaps = 0;
                let correctionRemaining = correction;
                for (let inc of increments) {
                    const correctionSteps = Math.floor(correctionRemaining / inc);
                    correctionTaps += correctionSteps;
                    correctionRemaining -= correctionSteps * inc;
                }
                
                const totalTaps = overshootSteps + correctionTaps;
                globalMin = Math.min(globalMin, totalTaps);
            }
        }
        
        // 3. Test mixed strategies (combinations of different increments)
        for (let inc1 of increments) {
            for (let steps1 = 0; steps1 <= Math.ceil(absTarget / inc1) + 1; steps1++) {
                const value1 = steps1 * inc1;
                const remaining1 = Math.abs(absTarget - value1);
                
                if (remaining1 === 0) {
                    globalMin = Math.min(globalMin, steps1);
                    continue;
                }
                
                // Complete with greedy approach for remaining
                let remainingTaps = 0;
                let remainingValue = remaining1;
                for (let inc2 of increments) {
                    const steps2 = Math.floor(remainingValue / inc2);
                    remainingTaps += steps2;
                    remainingValue -= steps2 * inc2;
                }
                
                globalMin = Math.min(globalMin, steps1 + remainingTaps);
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
                <div className="overflow-hidden z-999 w-[30%] h-[50%] rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-2xl border-1 border-white/30 shadow-xl p-12 grid grid-rows-[20%_1fr_5%]">
                    <div className="absolute -bottom-8 -left-30 z-0">
                        <Trophy 
                            size={350}
                            color='white'
                            opacity={0.1}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center z-1">
                        <h1 className="text-white text-[38px] font-satoshi font-bold text-center tracking">You Did Great !</h1>
                        <p className="text-white/40 text-lg font-satoshi font-normal">Your score is given below</p>
                    </div>
                    <div className="grid grid-rows-[1fr_20%] py-12 gap-10 z-1">
                        <div className="grid grid-cols-2">
                            <div className="flex justify-center items-center border-r-1 border-r-white/40 px-6 text-center">
                                <p className="text-white text-xl font-medium font-satoshi whitespace-nowrap">You tapped <span className="font-manrope font-bold text-[#38bdf8] px-1">{tap}</span> times.</p>
                            </div>
                            <div className="flex justify-center items-center px-6 text-center">
                                <p className="text-white text-xl font-medium font-satoshi whitespace-nowrap">Minimum possible <span className="font-manrope font-bold text-[#a855f7] px-1">{minimumTaps}</span></p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-white text-xl font-medium font-satoshi text-center">So, your efficiency is <span className="font-manrope text-[#facc15] font-bold px-1">{efficiency.toFixed(1)}%</span>. Keep counting !</p>
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
                            className="rounded-xl bg-white/30 border-1 border-white/40 px-4 py-3 text-center text-white font-satoshi cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Return to home</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScoreBoard;