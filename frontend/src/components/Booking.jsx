import { useForm } from "react-hook-form";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notification } from "antd";
import axios from "axios";
import { format } from "date-fns";
import { DatePicker, Space } from "antd";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const bookingSchema = z.object({
    userid: z.string(),
    homestayid: z.string(),
    checkindate: z.date(),
    checkoutdate: z.date()
})


const Booking = () => {

    const {
        formState: { errors },
        register,
        handleSubmit,
        watch
    } = useForm({
        defaultValues: {
            userid: "",
            homestayid: "",
            checkindate: new Date(),
            checkoutdate: new Date()
        },
        resolver: zodResolver(bookingSchema)
    })

    const onSubmit = async (data) => {
        try {
            const {
                userid,
                homestayid,
                checkindate,
                checkoutdate
            } = watch();

            const response = await axios.post("http://localhost:9000/api/booking/booking-home", {
                userid: userid,
                homestayid: homestayid,
                checkindate: new Date(checkindate).toISOString(),
                checkoutdate: new Date(checkoutdate).toISOString()
            })

            console.log("Response: ", response.data)

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Homestay Booking Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                        User ID:
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="userId"
                        type="text"
                        name="userid"
                        placeholder="User ID"
                        {...register("userid")}
                    />
                    {errors.userid && (
                        <p className="text-red-500">{errors.userid.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="homestaysId">
                        Homestays ID:
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="homestaysId"
                        type="text"
                        name="homestayid"
                        placeholder="Homestays ID"
                        {...register("homestayid")}
                    />
                    {errors.homestayid && (
                        <p className="text-red-500">{errors.homestayid.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkinDate">
                        Check-in Date:
                    </label>
                    <Space direction="vertical" size={12}>
                        <DatePicker
                            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="checkinDate"
                            type="date"
                            name="checkindate"
                            placeholder="Check-in Date"
                            {...register("checkindate")}
                            format="YYYY-MM-DD"
                        />
                        {errors.checkindate && (
                            <p className="text-red-500">{errors.checkindate.message}</p>
                        )}
                    </Space>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkoutDate">
                        Check-out Date:
                    </label>
                    <Space direction="vertical" size={12}>
                        <DatePicker
                            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="checkoutDate"
                            type="date"
                            name="checkoutdate"
                            placeholder="Check-out Date"
                            {...register("checkoutdate")}
                            format="YYYY-MM-DD"
                        />
                        {errors.checkoutdate && (
                            <p className="text-red-500">{errors.checkoutdate.message}</p>
                        )}
                    </Space>
                </div>
                {/* Repeat the above structure for other fields */}
                <div className="mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Booking
