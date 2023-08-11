import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-semibold mb-4">Welcome to Homestays</h1>
            <p className="text-lg text-center mb-6">
                Your perfect destination for finding cozy homestays around the world.
            </p>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                    Register
                </Link>
            </div>
        </div>
    )
}

export default WelcomePage
