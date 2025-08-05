import React, { useState } from 'react';
import Dropdown from './Dropdown';

const Body = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => { setIsOpen(prev => !prev) }

    return (
        <>
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-6">
                    <div className="w-full flex justify-center items-center gap-2 h-18">
                        <p className="w-full h-full text-center text-[#191923] bg-white font-medium text-xl rounded-full px-4 py-4 shadow-lg border-1 font-serif flex gap-3 justify-center items-center">
                            <span className='font-satoshi font-bold'>Count</span>
                            <span className="text-[30px] text-purple-600 font-manrope">{props.count}</span>
                        </p>
                        <div className="aspect-square h-full relative">
                            <Dropdown toggleMenu={toggleMenu} isOpen={isOpen} diff={props.setDiff}/>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => props.countHandler(1)} className="px-4 py-3 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-green-400 text-white text-xl font-medium font-sans">Increment</button>
                        <button onClick={() => props.countHandler(2)} className="px-4 py-3 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-red-400 text-white text-xl font-medium font-sans">Reset</button>
                        <button onClick={() => props.countHandler(3)} className="px-4 py-3 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-blue-400 text-white text-xl font-medium font-sans">Decrement</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;