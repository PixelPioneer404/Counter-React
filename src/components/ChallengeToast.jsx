import { Bell } from 'lucide-react';
import React from 'react';

const ChallengeToast = ({ message }) => {
    // Safety check to ensure message is an object
    if (!message || typeof message !== 'object') {
        return null;
    }
    
    return (
        <>
            <div className="w-full h-12 sm:h-10 rounded-full bg-white/10 border-1 border-white/10 backdrop-blur-md p-2 flex justify-center items-center gap-2">
                <span><Bell size={14} className='hidden sm:inline-block text-white sm:w-[18px] sm:h-[18px]' /></span>
                {
                    message.type === "started" && (
                        <p className="text-white text-xs sm:text-sm font-medium font-satoshi text-center">Challenge Started ! You've tapped <span className="text-purple-400">{message.tap}</span> times yet</p>
                    )
                }
                {
                    message.type === "ended" && (
                        <p className="text-white text-xs sm:text-sm font-medium font-satoshi text-center">Challenge ended !</p>
                    )
                }

            </div>
        </>
    );
};

export default ChallengeToast;