import React, { useState } from 'react'
import { vectorLogin } from '../../assets'
import { illusLogin } from '../../assets'
import Alert from '../../components/Alert'
import PropTypes from 'prop-types';

const Login = ({setToken}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onSubmit = (event) => {
        event.preventDefault();

        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/x-www-form-urlencoded')

        const urlEncoded = new URLSearchParams();
        urlEncoded.append('email', email);
        urlEncoded.append('password', password);

        const reqOptions = {
            method: 'POST',
            headers: myHeader,
            body: urlEncoded,
            redirect: 'follow',
        };

        fetch('https://inventorylab.herokuapp.com/user/login/', reqOptions)
            .then(response => response.json())
            .then(result => Alert(result.status, result.message))
            .catch(error => console.log('error', error))
    }


    return (
        <div className="h-screen font-poppins">
            <div className="container mx-auto px-5 lg:px-20 h-full relative">
                <img src={illusLogin} className="fixed top-0 right-0 w-1/2" alt="" />
                <div className="flex sm:flex-row h-full justify-between items-center relative">
                    <div className="w-1/3 md:w-1/2 justify-center hidden md:flex">
                        <img src={vectorLogin} className="w-full md:w-2/3" alt="Login Vector" />
                    </div>
                    <form action="" className="w-full md:w-1/2 lg:w-1/3 py-10 px-10 rounded-xl shadow-md md:rounded-none md:shadow-none">
                        <div className="rounded-md justify-center">
                            <span className="text-left text-gray-800 font-semibold text-3xl">Login</span>
                            <div className="pt-10">
                                <input type="text" onChange={(e) => setEmail(e.target.value)} className="block w-full px-3 py-2 rounded-md border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Email" />
                            </div>
                            <div className="pt-10">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-3 py-2 rounded-md border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Password" />
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
                                <button className="bg-blue-500 hover:bg-blue-600 px-7 py-2 rounded-md" onClick={onSubmit}>
                                    <span className="text-white font-semibold">Login</span>
                                </button>
                            </div>
                            <div className="pt-5">
                                <a href="/" className="text-gray-700 font-medium hover:text-gray-800">Forgot password?</a>
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login
