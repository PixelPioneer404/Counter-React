import { X, ArrowRight, ArrowLeft, CornerDownLeft, Keyboard, Target, Plus, Minus, RotateCcw, Smartphone, Monitor, Hand, Mouse, Gamepad2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Info = (props) => {

    const [isMobile, setIsMobile] = useState(false);

    // Detect device type
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const keyboardControls = [
        {
            key: 'A',
            icon: Plus,
            description: 'Increment counter by current step value',
            category: 'Counter Controls'
        },
        {
            key: 'D', 
            icon: Minus,
            description: 'Decrement counter by current step value',
            category: 'Counter Controls'
        },
        {
            key: 'Space',
            icon: RotateCcw,
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

    const mobileControls = [
        {
            action: 'Tap Increment',
            icon: Plus,
            description: 'Tap the green "Increment" button to increase counter',
            category: 'Basic Controls'
        },
        {
            action: 'Tap Decrement',
            icon: Minus,
            description: 'Tap the blue "Decrement" button to decrease counter',
            category: 'Basic Controls'
        },
        {
            action: 'Tap Reset',
            icon: RotateCcw,
            description: 'Tap the red "Reset" button to set counter to zero',
            category: 'Basic Controls'
        },
        {
            action: 'Tap Dropdown',
            icon: Hand,
            description: 'Tap the arrow icon to open step value options',
            category: 'Step Selection'
        },
        {
            action: 'Select Step',
            icon: Target,
            description: 'Tap on 1, 10, 50, or 100 to change step value',
            category: 'Step Selection'
        }
    ];

    const groupedControls = (isMobile ? mobileControls : keyboardControls).reduce((acc, control) => {
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
                <div className="absolute z-[10000] w-[95%] max-w-md sm:max-w-lg md:max-w-xl lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[80%] sm:h-[85%] md:h-[80%] rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white grid grid-rows-[auto_1fr] gap-4 p-6">
                    <span className="flex justify-start items-center gap-2 w-19 h-4">
                        <span onClick={() => { props.setIsOpen(false) }} className="group h-4 w-4 sm:h-4 sm:w-4 bg-red-600 rounded-full flex justify-center items-center cursor-pointer">
                            <X className='group-hover:opacity-100 opacity-0 transition-opacity duration-200' size={8} />
                        </span>
                        <span className="h-4 w-4 sm:h-4 sm:w-4 bg-yellow-500 rounded-full"></span>
                        <span className="h-4 w-4 sm:h-4 sm:w-4 bg-green-500 rounded-full"></span>
                    </span>
                    <div className="w-full flex flex-col gap-6 overflow-hidden">
                        {/* Game Objective Section */}
                        <div className="w-full bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                            <div className="flex items-center gap-3 mb-3">
                                <Target className="text-purple-600" size={24} />
                                <h1 className="text-xl sm:text-2xl text-[#191923] font-bold font-satoshi">Game Objective</h1>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700 font-satoshi leading-relaxed">
                                Reach the target number as efficiently as possible! Spin a challenge to get a random target, 
                                then use increment, decrement, and reset buttons with different step values (1, 10, 50, 100) 
                                to reach that number in minimum taps. Your efficiency score shows how close you came to the optimal solution.
                            </p>
                        </div>

                        {/* Device-Specific Controls */}
                        <div className="w-full flex flex-col gap-4 overflow-y-auto pr-2">
                            <div className="flex items-center gap-3">
                                {isMobile ? <Smartphone className="text-blue-600" size={24} /> : <Monitor className="text-green-600" size={24} />}
                                <h2 className="text-xl sm:text-2xl text-[#191923] font-bold font-satoshi">
                                    {isMobile ? 'Touch Controls' : 'Keyboard Controls'}
                                </h2>
                            </div>
                            
                            {Object.entries(groupedControls).map(([category, controls]) => (
                                <div key={category} className="flex flex-col gap-3">
                                    <h3 className="text-lg text-[#191923] font-semibold font-satoshi border-b border-gray-200 pb-2">
                                        {category}
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        {controls.map((control, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <control.icon size={18} className="text-purple-600 flex-shrink-0" />
                                                        {isMobile ? (
                                                            <span className="px-3 py-1 text-sm font-satoshi font-medium bg-blue-100 text-blue-800 rounded-md">
                                                                {control.action}
                                                            </span>
                                                        ) : (
                                                            <kbd className="px-2 py-1 text-sm font-mono bg-white border border-gray-300 rounded shadow-sm min-w-0 flex-shrink-0">
                                                                {control.key}
                                                            </kbd>
                                                        )}
                                                    </div>
                                                    <span className="text-sm sm:text-base text-gray-700 font-satoshi leading-relaxed">
                                                        {control.description}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Tips Section */}
                            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Gamepad2 className="text-green-600" size={18} />
                                    <h3 className="text-lg font-semibold font-satoshi text-green-900">
                                        Pro Tips
                                    </h3>
                                </div>
                                <ul className="text-sm text-green-800 space-y-1 font-satoshi">
                                    {isMobile ? (
                                        <>
                                            <li>• Use larger step values (50, 100) for big numbers</li>
                                            <li>• Sometimes overshooting and coming back is faster</li>
                                            <li>• Watch your tap count during challenges</li>
                                            <li>• Try different strategies to improve efficiency</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>• Use arrow keys to navigate dropdown options</li>
                                            <li>• Press Enter to select the highlighted option</li>
                                            <li>• Keyboard navigation shows blue focus indicators</li>
                                            <li>• Mouse clicks disable keyboard focus mode</li>
                                        </>
                                    )}
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
