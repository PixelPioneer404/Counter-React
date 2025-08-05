import React, { useState } from 'react';
import FlipNumbers from 'react-flip-numbers';

const ChallengeLayout = (props) => {

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-6">
                <p className="text-white text-lg font-medium font-satoshi text-center">Create this count in least steps</p>
                <div className="text-white font-satoshi font-medium bg-white/20 backdrop-blur-md border-1 border-white/30 rounded-2xl w-[140px] h-[64px] flex justify-center items-center">
                    <FlipNumbers
                        height={20}
                        width={18}
                        color="white"
                        play
                        perspective={100}
                        numbers={props.number || "0"}
                        duration={2}
                    />
                </div>
            </div>
        </>
    );
};

export default ChallengeLayout;