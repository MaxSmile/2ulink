// src/components/Logo.jsx

import React from 'react';

const Logo = ({className, chain=true}) => {
    return (
        <a href="/" className={`leading-0 inline-block ${className ?? ""}`}>
                <img
                    alt="2UL.top logo"
                    width={60}
                    height={60}
                    src={chain?'/2ul-chain-logo.svg':'/2ul-logo.svg'}
                    loading="lazy"
                />
        </a>
    );
};


export default Logo;
