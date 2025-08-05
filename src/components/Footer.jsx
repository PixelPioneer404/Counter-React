import React from 'react';

const Footer = (props) => {
    return (
        <>
            <footer className="absolute bottom-0 left-0 right-0 text-center text-white py-4">
                <p className="text-sm">© {props.year} - Created with ❤️ by Rajbeer Saha</p>
            </footer>
        </>
    );
};

export default Footer;