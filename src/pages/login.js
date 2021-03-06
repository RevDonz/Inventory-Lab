import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { vectorLogin } from '../assets'
import { illusLogin } from '../assets'
import Alert from '../components/Alert'

// const accessToken = localStorage.getItem('token')
// if (accessToken) {
//     return <Redirect to="/app/dashboard" />
// } else {
//     return <Login />
// }

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Loading',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const urlEncoded = new URLSearchParams();
        urlEncoded.append('email', email);
        urlEncoded.append('password', password);
        
        axios.post('https://inventorylab.herokuapp.com/user/login/', urlEncoded)
        .then((result) => {
            localStorage.setItem('token', result.data.accessToken)
            Alert(result, 'auth')
        })
        .catch((err) => {
            Alert(err.response, 'auth')
        })
    }

    return (
        <div className="h-screen font-poppins">
            
            <div className="container mx-auto px-5 lg:px-20 h-full relative">
                <img src={illusLogin} className="fixed top-0 right-0 w-1/2" alt="" />
                <div className="flex sm:flex-row h-full justify-between items-center relative">
                    <div className="w-1/3 md:w-1/2 justify-center hidden md:flex">
                        <img src={vectorLogin} className="w-full md:w-2/3" alt="Login Vector" />
                    </div>
                    <form action="/" autoComplete="on" method="POST" className="w-full md:w-1/2 lg:w-1/3 py-10 px-10 rounded-xl shadow-md md:rounded-none md:shadow-none">
                        <div className="rounded-md justify-center">
                            <span className="text-left text-gray-800 font-semibold text-3xl">Login Inventory Lab</span>
                            <div className="pt-10">
                                <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="block w-full px-3 py-2 rounded-md border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Email" />
                            </div>
                            <div className="pt-10">
                                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-3 py-2 rounded-md border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Password" />
                            </div>
                            <div className="pt-10">
                                <div className="flex">
                                    <div className="flex items-center">
                                        <input id="comments" type="checkbox" className="h-5 w-5 bg-white appearance-none form-checkbox border-blue-200 rounded-md ring-offset-2 focus:outline-none focus:ring-2 focus:border-transparent" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="comments" className="font-medium text-gray-700">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-10">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-7 py-2 rounded-md" onClick={onSubmit}>
                                    <span className="text-white font-semibold">Login</span>
                                </button>
                            </div>
                            <div className="pt-5">
                            </div>
                            <div className="pt-5">
                                <a href="/register" className="text-gray-700 font-medium hover:text-gray-800">Dont Have account?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
