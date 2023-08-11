import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const schema = z.object({
    email: z.string().min(1, "Enter your email").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email"),
    password: z.string().min(1, "Enter password").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Enter a valid password")
})


const Login = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "all",
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const {
                email,
                password
            } = watch()

            const response = await axios.post("http://localhost:9000/api/users/login_user", {
                email: email,
                password: password
            });

            console.log("Response: ", response.data);

            if (response.status === 200) {
                notification.success({
                    message: "You logedin successfuly"
                });
                login(response.data)
                navigate("/homestays")
            } else if (response.status === 400) {
                notification.warning({
                    message: "Account already exists"
                })
            } else {
                notification.error({
                    message: "Something went wrong"
                })
            }
        } catch (error) {
            console.log("Error: ", error)
            notification.warning({
                message: "Something went wrong"
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Your email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className='text-red-500'>{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Your password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className='text-red-500'>{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
