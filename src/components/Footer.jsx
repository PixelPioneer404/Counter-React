import React from 'react';

const Footer = (props) => {
    return (
        <>
            <footer className="absolute bottom-0 left-0 right-0 text-center text-white py-2 sm:py-4 px-4">
                <p className="text-xs sm:text-sm">© {props.year} - Created with ❤️ by Rajbeer Saha</p>
            </footer>
        </>
    );
};

export default Footer;