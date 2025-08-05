import { X } from 'lucide-react';
import React from 'react';
import { Switch } from '@headlessui/react'

const SettingsPage = (props) => {
    return (
        <>
            <div className={`w-screen h-screen z-999 bg-black/30 relative ${props.isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out`}>
                <div onClick={() => { props.setIsOpen(false) }} className="absolute inset-0 z-998 bg-black/30"></div>
                <div className="z-999 w-[30%] h-[50%] rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white grid grid-rows-[20%_1fr] gap-4">
                    <span className="absolute top-4 left-3 flex justify-center items-center gap-2 w-19 h-4">
                        <span onClick={() => { props.setIsOpen(false) }} className="group h-full aspect-square bg-red-600 rounded-full flex justify-center items-center">
                            <X className='group-hover:opacity-100 opacity-0' size={10} />
                        </span>
                        <span className="h-full aspect-square bg-yellow-500 rounded-full"></span>
                        <span className="h-full aspect-square bg-green-500 rounded-full"></span>
                    </span>
                    <div className="w-full flex justify-start items-center pl-4 mt-12">
                        <h1 className="text-[38px] text-[#191923] font-bold font-satoshi">Settings</h1>
                    </div>
                    <div className="w-full flex justify-start items-center p-4 flex-col overflow-y-auto [&>*:nth-child(odd)]:bg-gray-200 [&>*]:p-2 [&>*]:rounded-lg">
                        <div className="w-full flex justify-between items-center h-12">
                            <p className="text-md text-[#191923] font-sans font-normal">Go beyond zero</p>
                            <Switch
                                checked={props.is1Checked}
                                onChange={() => {
                                    if (props.count < 0) props.setCount(0)
                                    props.switchToggler(props.setIs1Checked)
                                }}
                                className={`${props.is1Checked ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer`}
                            >
                                <span
                                    className={`${props.is1Checked ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;