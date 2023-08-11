import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    const { user, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between p-4 bg-blue-500">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-white text-2xl font-extrabold">Homestays</span>
            </div>

            {/* Links */}
            <ul className="flex space-x-4">
                {user && (
                    <button onClick={logout} className="text-white ml-auto">
                        logout
                    </button>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
