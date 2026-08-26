// Container.jsx
import React, { useContext, useEffect, useState } from 'react';
import { WidthContext } from '../hooks/widthContext';

export const Container = ({ children }) => {
    const { width, isMobile } = useContext(WidthContext);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(width > 50);
    }, [width]);

    return (
        <div 
            className='p-5 min-h-screen transition-all duration-300'
            style={{ 
                marginLeft: isMobile ? '20px' : (isOpen ? `${width + 10}px` : '60px'),
                paddingTop: isMobile ? '70px' : '20px',
                width: isMobile ? 'calc(100% - 40px)' : (isOpen ? `calc(100% - ${width + 10}px)` : 'calc(100% - 60px)')
            }}
        >
            {children}
        </div>
    );
};