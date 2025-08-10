import React, { useContext, useState, useEffect } from "react";
import {
  challengeContext,
  scoreContext,
  tapContext,
  resetContext,
} from "../App";
import { Trophy } from "lucide-react";

const ScoreBoard = () => {
  const { tap, setTap } = useContext(tapContext);
  const { randomNumber } = useContext(scoreContext);
  const { count, isStarted, setIsStarted, setCount } =
    useContext(challengeContext);
  const { setResetCheck } = useContext(resetContext);

  const [minimumTaps, setMinimumTaps] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [openScore, setOpenScore] = useState(false);

  const findMinimumTaps = (target) => {
    let stepCount = 0;
    let targetNum = parseInt(target);

    const calcMinSteps = (remaining) => {
      let minDiff = Math.min(
        Math.abs(100 - remaining),
        Math.abs(50 - remaining)
      );
      minDiff = Math.min(minDiff, Math.abs(10 - remaining));

      if (minDiff >= remaining) return remaining;

      if (minDiff > 5) {
        minDiff = calcMinSteps(minDiff);
      }

      stepCount++;
      return minDiff;
    };

    stepCount += Math.floor(targetNum / 100);
    targetNum = targetNum % 100;

    const minTaps = calcMinSteps(targetNum);
    stepCount += minTaps;

    return stepCount;
  };

  const findEfficiency = (minimumTaps, tap) => {
    if (tap === 0 || minimumTaps === 0) {
      setEfficiency(0);
      return;
    }
    const efficiencyValue = Math.max(
      0,
      Math.min((minimumTaps / tap) * 100, 100)
    );
    setEfficiency(efficiencyValue);
  };

  useEffect(() => {
    setMinimumTaps(findMinimumTaps(randomNumber));
    setOpenScore(false);
    setEfficiency(0);
  }, [randomNumber]);

  useEffect(() => {
    if (isStarted && count === parseInt(randomNumber) && randomNumber !== "0") {
      setTimeout(() => {
        setOpenScore(true);
        findEfficiency(minimumTaps, tap);
      }, 400);
    }
  }, [count, randomNumber, minimumTaps, tap, isStarted]);

  return (
    <>
      <div
        className={`w-screen h-screen z-999 bg-black/50 absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${
          openScore
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden z-999 w-[95%] lg:w-[40%] h-[80%] sm:h-[70%] md:h-[60%] rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-2xl border-1 border-white/30 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 grid grid-rows-[auto_1fr_auto] gap-4 sm:gap-6">
          <div className="absolute -bottom-8 -left-30 z-0 hidden lg:block">
            <Trophy size={350} color="white" opacity={0.1} />
          </div>
          <div className="w-full flex flex-col justify-center items-center z-1 text-center">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-satoshi font-bold tracking-wide">
              You Did Great !
            </h1>
            <p className="text-white/40 text-sm sm:text-base md:text-lg font-satoshi font-normal mt-1">
              Your score is given below
            </p>
          </div>
          <div className="grid grid-rows-[1fr_auto] py-4 sm:py-6 md:py-8 lg:py-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10 z-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
              <div className="flex justify-center items-center sm:border-r-1 sm:border-r-white/40 px-3 sm:px-6 text-center border-b-1 border-b-white/40 sm:border-b-0 pb-4 sm:pb-0">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium font-satoshi">
                  You tapped{" "}
                  <span className="font-manrope font-bold text-[#38bdf8] px-1">
                    {tap}
                  </span>{" "}
                  times.
                </p>
              </div>
              <div className="flex justify-center items-center px-3 sm:px-6 text-center pt-4 sm:pt-0">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium font-satoshi">
                  Minimum possible{" "}
                  <span className="font-manrope font-bold text-[#a855f7] px-1">
                    {minimumTaps}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium font-satoshi text-center">
                So, your efficiency is{" "}
                <span className="font-manrope text-[#facc15] font-bold px-1">
                  {efficiency.toFixed(1)}%
                </span>
                . Keep counting !
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                setResetCheck(true);
                setCount(0);
                setOpenScore(false);
                setIsStarted(false);
                setTap(0);
              }}
              className="rounded-xl bg-white/30 border-1 border-white/40 px-3 sm:px-4 py-2 sm:py-3 text-center text-white text-sm sm:text-base font-satoshi cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
            >
              Return to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
