import React from 'react'
import { vectorLogin } from '../../assets'
import { illusLogin } from '../../assets'

const Login = () => {
    return (
        <div className="h-screen font-poppins">
            <div className="container mx-auto px-5 lg:px-20 h-full">
                <div className="flex sm:flex-row h-full justify-between items-center">
                    <div className="w-2/3 justify-center hidden md:flex">
                        <img src={vectorLogin} className="" alt="Login Vector" />
                    </div>
                    <div className="w-full md:w-1/3 py-10 px-10 rounded-xl shadow-md md:rounded-none md:shadow-none border-2 md:border-none">
                        <div className="rounded-md justify-center">
                            <span className="text-left text-gray-800 font-semibold text-3xl">Login</span>
                            <div className="pt-10">
                                <input type="text" className="block w-full px-3 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" />
                            </div>
                            <div className="pt-10">
                                <input type="text" className="block w-full px-3 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" />
                            </div>
                            <div className="pt-10">
                                <div className="flex">
                                    <div className="flex items-center">
                                        <input id="comments" type="checkbox" className="h-5 w-5 appearance-none form-checkbox border-2 rounded-md ring-offset-2 checked:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="comments" className="font-medium text-gray-700">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-10">
                                <button className="bg-purple-500 px-7 py-2 rounded-md">
                                    <span className="text-white font-semibold">Login</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
