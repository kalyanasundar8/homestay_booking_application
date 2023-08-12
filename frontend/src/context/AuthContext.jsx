import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null);
        console.log(localStorage.getItem('token'))
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}