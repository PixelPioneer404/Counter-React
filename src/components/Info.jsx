import { X, ArrowRight, ArrowLeft, CornerDownLeft, Keyboard } from 'lucide-react';
import React from 'react';

const Info = (props) => {

    console.log('Info component props:', props);

    const keyboardControls = [
        {
            key: 'A',
            icon: Keyboard,
            description: 'Increment counter by current step value',
            category: 'Counter Controls'
        },
        {
            key: 'D', 
            icon: Keyboard,
            description: 'Decrement counter by current step value',
            category: 'Counter Controls'
        },
        {
            key: 'Space',
            icon: Keyboard,
            description: 'Reset counter to zero',
            category: 'Counter Controls'
        },
        {
            key: '→',
            icon: ArrowRight,
            description: 'Open dropdown or navigate right through options',
            category: 'Dropdown Navigation'
        },
        {
            key: '←',
            icon: ArrowLeft,
            description: 'Navigate left through options or close dropdown',
            category: 'Dropdown Navigation'
        },
        {
            key: 'Enter',
            icon: CornerDownLeft,
            description: 'Select focused dropdown option',
            category: 'Dropdown Navigation'
        }
    ];

    const groupedControls = keyboardControls.reduce((acc, control) => {
        if (!acc[control.category]) {
            acc[control.category] = [];
        }
        acc[control.category].push(control);
        return acc;
    }, {});

    return (
        <>
            <div className={`fixed inset-0 z-[9999] bg-black/30 ${props.isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out`}>
                <div onClick={() => { props.setIsOpen(false) }} className="absolute inset-0 z-[9998] bg-black/40"></div>
                <div className="absolute z-[10000] w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:w-[60%] xl:w-[50%] 2xl:w-[40%] h-[70%] sm:h-[75%] md:h-[70%] rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white grid grid-rows-[auto_1fr] gap-4 p-4">
                    <span className="flex justify-start items-center gap-2 w-19 h-4">
                        <span onClick={() => { props.setIsOpen(false) }} className="group h-4 w-4 sm:h-4 sm:w-4 bg-red-600 rounded-full flex justify-center items-center cursor-pointer">
                            <X className='group-hover:opacity-100 opacity-0 transition-opacity duration-200' size={8} />
                        </span>
                        <span className="h-4 w-4 sm:h-4 sm:w-4 bg-yellow-500 rounded-full"></span>
                        <span className="h-4 w-4 sm:h-4 sm:w-4 bg-green-500 rounded-full"></span>
                    </span>
                    <div className="w-full flex flex-col gap-4 overflow-hidden">
                        <div className="w-full flex justify-start items-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#191923] font-bold font-satoshi">Keyboard Controls</h1>
                        </div>
                        <div className="w-full flex flex-col gap-6 overflow-y-auto pr-2">
                            {Object.entries(groupedControls).map(([category, controls]) => (
                                <div key={category} className="flex flex-col gap-3">
                                    <h2 className="text-lg sm:text-xl text-[#191923] font-semibold font-satoshi border-b border-gray-200 pb-2">
                                        {category}
                                    </h2>
                                    <div className="flex flex-col gap-2">
                                        {controls.map((control, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <control.icon size={16} className="text-purple-600 flex-shrink-0" />
                                                        <kbd className="px-2 py-1 text-sm font-mono bg-white border border-gray-300 rounded shadow-sm min-w-0 flex-shrink-0">
                                                            {control.key}
                                                        </kbd>
                                                    </div>
                                                    <span className="text-sm sm:text-base text-gray-700 font-sans leading-relaxed">
                                                        {control.description}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 className="text-lg font-semibold font-satoshi text-blue-900 mb-2">
                                    Quick Tips
                                </h3>
                                <ul className="text-sm text-blue-800 space-y-1 font-sans">
                                    <li>• Use arrow keys to navigate dropdown options</li>
                                    <li>• Press Enter to select the highlighted option</li>
                                    <li>• Keyboard navigation shows blue focus indicators</li>
                                    <li>• Mouse clicks disable keyboard focus mode</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;
