import { X } from 'lucide-react';
import React, { useContext } from 'react';
import { Switch } from '@headlessui/react'

const SettingsPage = (props) => {

    return (
        <>
            <div className={`w-screen h-screen z-999 bg-black/30 relative ${props.isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out`}>
                <div onClick={() => { props.setIsOpen(false) }} className="absolute inset-0 z-998 bg-black/40"></div>
                <div className="z-999 w-[90%] max-w-sm sm:max-w-md md:max-w-lg lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-[50%] sm:h-[55%] md:h-[50%] rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white grid grid-rows-[auto_1fr] gap-4 p-4">
                    <span className="flex justify-start items-center gap-2 w-19 h-4">
                        <span onClick={() => { props.setIsOpen(false) }} className="group h-4 w-4 sm:h-4 sm:w-4 bg-red-600 rounded-full flex justify-center items-center cursor-pointer">
                            <X className='group-hover:opacity-100 opacity-0 transition-opacity duration-200' size={8} />
                        </span>
                        <span className="h-4 w-4 sm:h-4 sm:w-4 bg-yellow-500 rounded-full"></span>
                        <span className="h-4 w-4 sm:h-4 sm:w-4 bg-green-500 rounded-full"></span>
                    </span>
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex justify-start items-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#191923] font-bold font-satoshi">Settings</h1>
                        </div>
                        <div className="w-full flex justify-start items-center flex-col overflow-y-auto [&>*:nth-child(odd)]:bg-gray-200 [&>*]:p-3 [&>*]:rounded-lg gap-2">
                            <div
                                onClick={() => {
                                    if (props.count < 0) props.setCount(0)
                                    props.switchToggler(props.setIs1Checked)
                                }}
                                className="w-full flex justify-between items-center h-12 sm:h-14 cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-lg px-2"
                            >
                                <p className="text-sm sm:text-base text-[#191923] font-sans font-normal pointer-events-none">Go beyond zero</p>
                                <Switch
                                    checked={props.is1Checked}
                                    onChange={() => {
                                        if (props.count < 0) props.setCount(0)
                                        props.switchToggler(props.setIs1Checked)
                                    }}
                                    className={`${props.is1Checked ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-5 w-8 sm:h-6 sm:w-10 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer pointer-events-none`}
                                >
                                    <span
                                        className={`${props.is1Checked ? 'translate-x-4 sm:translate-x-5' : 'translate-x-1'} inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out`}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;