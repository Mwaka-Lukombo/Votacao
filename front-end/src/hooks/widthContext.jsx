// WidthContext.jsx
import { createContext, useState, useEffect } from "react";

export const WidthContext = createContext();

export const WidthProvider = ({ children }) => {
    const [width, setWidth] = useState(230);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768; // md breakpoint
            setIsMobile(mobile);
            if (mobile) {
                setWidth(0); // Começa fechada no mobile
            } else {
                setWidth(230); // Abre no desktop
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setWidth(width === 0 ? 280 : 0); // Mobile: abre com 280px
        } else {
            setWidth(width === 0 ? 230 : 0); // Desktop: abre com 230px
        }
    };

    return (
        <WidthContext.Provider value={{ width, setWidth, isMobile, toggleSidebar }}>
            {children}
        </WidthContext.Provider>
    );
};