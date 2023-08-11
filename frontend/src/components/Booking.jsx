import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Booking = () => {

    const { homestayId } = useParams();
    const { user } = useAuth();
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const bookingData = {
                userId: user._id,
                homestayId,
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
            };

            const response = await axios.post("http://localhost:9000/booking/nooking-home", bookingData);

            console.log(response.data)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div>
            <h1>Booking for Homestay ID: {homestayId}</h1>
            <form onSubmit={handleBooking}>
                <label>Check-in Date:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                />
                <br />
                <label>Check-out Date:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Book Now</button>
            </form>
        </div>
    )
}

export default Booking
