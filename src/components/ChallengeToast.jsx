import { Bell } from 'lucide-react';
import React from 'react';

const ChallengeToast = () => {
    return (
        <>
            <div className="w-full h-10 rounded-full bg-white/10 border-1 border-white/10 backdrop-blur-md p-2 flex justify-center items-center gap-2">
                <span><Bell size={18} className='text-white' /></span>
                <p className="text-white text-sm font-medium font-satoshi">Challenge Started ! You've tapped <span className="text-purple-400">{}</span> times yet.</p>
            </div>
        </>
    );
};

export default ChallengeToast;