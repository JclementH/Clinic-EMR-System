import { createContext, useState, useEffect } from "react";

const navigationContext = createContext();

function NavigationProvider({ children }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handler = () => {
            setCurrentPath(window.location.pathname)
        };
        window.addEventListener('popstate', handler);

        return () => {
            window.removeEventListener('popstate', handler);
        };
    }, []);

    const navigate = (to) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    };

    return ( <navigationContext.Provider value={{ currentPath, navigate }}> 
        {children} 
        </navigationContext.Provider>
        );
}

export {NavigationProvider};
export default navigationContext;