import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const HomestaysDetails = () => {
    const { homestayId } = useParams();
    const [homestayDetails, setHomestayDetails] = useState(null);

    useEffect(() => {
        // Fetch homestay details based on homestayId
        async function fetchHomestayDetails() {
            try {
                const response = await axios.get(`http://localhost:9000/api/homestay/${homestayId}`);
                setHomestayDetails(response.data);
                console.log(response.data)
            } catch (error) {
                console.log('Error fetching homestay details:', error);
            }
        }

        fetchHomestayDetails();
    }, [homestayId]);

    return (
        <div>
            {homestayDetails ? (
                <div className="bg-white p-8 rounded shadow-md">
                    <img src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt={homestayDetails.name} className="w-full mb-4 rounded" />

                    <h1 className="text-2xl font-semibold mb-2">{homestayDetails.name}</h1>
                    <p className="text-gray-600 mb-2">Location: {homestayDetails.location}</p>
                    <p className="text-gray-600 mb-2">Description: {homestayDetails.description}</p>
                    <p className="text-gray-600 mb-4">Price: {homestayDetails.price}</p>
                    <Link to="/booking" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Book Now
                    </Link>
                </div>
            ) : (
                <p>Loading homestay details...</p>
            )}
        </div>
    );
};

export default HomestaysDetails;
