import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarker, FaDollarSign } from 'react-icons/fa';

const HomeStays = () => {

    const { user } = useAuth();

    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        if (user) {
            fetchHomestays();
        }
    }, [user]);

    const fetchHomestays = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/homestay/homestays_avail');
            setHomestays(response.data)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    if (!user) {
        return (
            <div className='flex justify-center items-center min-h-screen flex-col'>
                <p className='mb-4 text-center'>Please login and see homestays</p>
                <div className='flex space-x-5'>
                    <Link to="/login" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                        Login
                    </Link>
                    <Link to="/" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                        Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className='mt-10 mb-10 text-4xl font-bold uppercase text-center'>Homestays</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-20">
                {homestays.map((homestay) => (
                    <div key={homestay._id} className="bg-white border border-gray-500 p-4 rounded-lg shadow">
                        <div className="flex items-center justify-center mb-2">
                            <FaHome className="text-4xl" />
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{homestay.name}</h2>
                        <p className="text-gray-600 mb-4">
                            <FaMapMarker className='mr-1' />
                            {homestay.description}
                        </p>
                        <p className='text-gray-600 mb-2'>
                            <FaDollarSign className='mr-1' />
                            {homestay.price}
                        </p>
                        <p className="text-gray-600 mb-4">{homestay.description}</p>
                        <Link to={`/booking`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Book
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeStays
