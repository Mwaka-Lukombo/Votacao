// SideBar.jsx
import { 
    ChartArea, 
    Check, 
    Home, 
    LogOut, 
    PaperBag, 
    Settings, 
    Users,
    Menu,
    X
} from 'lucide-react'
import {
    Link,
    useLocation
} from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { useUser } from '../store/userStore';
import { WidthContext } from '../hooks/widthContext';

export const SideBar = () => {
    const location = useLocation();
    const { logout } = useUser();
    const { width, setWidth, isMobile, toggleSidebar } = useContext(WidthContext);

    const sideItems = [
        {
            id: 1,
            name: "Dashbord",
            icon: Home,
            link: "/"
        },
        {
            id: 2,
            name: "Votações",
            icon: PaperBag,
            link: "/votacoes"
        },
        {
            id: 3,
            name: "Participantes",
            icon: Users,
            link: "/participantes"
        },
        {
            id: 4,
            name: "Resultados",
            icon: ChartArea,
            link: "/resultados"
        },
        {
            id: 5,
            name: "Configurações",
            icon: Settings,
            link: "/settings"
        }
    ];

    const isOpen = width > 50;

    // Fecha a sidebar ao clicar em um link no mobile
    const handleLinkClick = () => {
        if (isMobile && isOpen) {
            setWidth(0);
        }
    };

    return (
        <>
            {/* Overlay para mobile */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setWidth(0)}
                />
            )}

            {/* Botão de menu - visível apenas no mobile ou quando sidebar fechada */}
            <button 
                onClick={toggleSidebar}
                className={`fixed z-50 p-2 bg-primary-color text-white rounded-md hover:bg-secundary-color transition-all duration-300
                    ${isMobile ? 'top-4 left-4' : 'top-4 left-4 md:block hidden'}`}
                style={{ 
                    left: isOpen && !isMobile ? '240px' : '20px',
                    display: isOpen && !isMobile ? 'none' : 'flex'
                }}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 bg-side-bar-color p-4 transition-all duration-300 h-screen overflow-y-auto z-50
                    ${isMobile ? 'shadow-2xl' : ''}`}
                style={{ 
                    width: `${isOpen ? (isMobile ? 280 : 230) : 0}px`,
                    transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
                    overflow: 'hidden'
                }}
            >
                {/* logo */}
                <div className={`flex items-center gap-2 mt-3 ${width < 100 ? 'justify-center' : 'justify-center'}`}>
                    <div className='w-[30px] h-[30px] flex items-center justify-center border-4 border-primary-color rounded-md flex-shrink-0'>
                        <Check className='font-bold text-secundary-color' size={25}/>
                    </div>
                    {width >= 150 && (
                        <h3 className='text-md font-bold uppercase whitespace-nowrap'>Votação</h3>
                    )}
                </div>

                <div className='mt-12'>
                    <ul className='w-full flex flex-col gap-3'>
                        {Array.isArray(sideItems) && sideItems.map((item) => (
                            <li key={item.id}>
                                <Link 
                                    to={item?.link} 
                                    onClick={handleLinkClick}
                                    className={`${location.pathname === item?.link && "text-primary-color bg-sidebar-menu"} 
                                        flex items-center p-2 gap-3 w-full h-[45px] rounded-md hover:bg-sidebar-menu transition-colors
                                        ${width < 100 ? 'justify-center' : ''}`}
                                    title={width < 100 ? item.name : ''}
                                >
                                    <span className='w-[30px] h-[30px] flex items-center justify-center flex-shrink-0'>
                                        {<item.icon size={20}/>}
                                    </span>
                                    {width >= 120 && (
                                        <span className={`text-xs ${location.pathname === item?.link && "font-bold"} whitespace-nowrap`}>
                                            {item?.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => {
                            logout();
                            if (isMobile) setWidth(0);
                        }} 
                        className={`absolute bottom-12 md:bottom-10 flex items-center gap-2 hover:text-primary-color transition-colors
                            ${width < 100 ? 'justify-center' : ''}`}
                        style={{ 
                            left: width >= 120 ? '16px' : '16px',
                            width: width >= 120 ? 'auto' : '30px'
                        }}
                    >
                        <div className='w-[30px] h-[30px] flex items-center justify-center transition-all duration-300 bg-primary-color/80 rounded-md hover:bg-secundary-color flex-shrink-0'>
                            <LogOut className='text-white' size={20}/>
                        </div>
                        {width >= 120 && (
                            <span className='text-xs font-bold whitespace-nowrap'>Logout</span>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};