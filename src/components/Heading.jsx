import React from 'react';

const Heading = () => {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 mt-30 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-20 px-4">
                <h1 
                    className="text-center text-[70px] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[160px] font-bold text-white transition-all duration-300"
                >
                    COUNTER
                </h1>
            </div>
        </>
    );
};

export default Heading;