import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL, EMAIL_PATTERN, PASSWORD_PATTERN, PASSWORD_REQUIREMENT } from "../../config";

const LoginPage = () => {
    const { state } = useLocation();

    const [ loginDetails, setLoginDetails ] = useState({
        email: "",
        password: "",
        showPassword: false,
        showEmailError: false,
        showPasswordError: false
    })

    const handleLoginDetails = (type, newValue) => { // Update user details
        setLoginDetails(prevValue => {
            return {
                ...prevValue,
                [`${type}`]: newValue
            }
        })
        
    //     // Check if a valid email address has been provided and is valid.
    //     if (loginDetails.email && !EMAIL_PATTERN.test(loginDetails.email)) {
    //         setLoginDetails(prevValue => {
    //             return {...prevValue, showEmailError: true}
    //         })
    //     } else {
    //         setLoginDetails(prevValue => {
    //             return {...prevValue, showEmailError: false}
    //         })
    //     }

    //     // Check if a password has been been provided and is valid.
    //     if (loginDetails.password && !PASSWORD_PATTERN.test(loginDetails.password)) {
    //         setLoginDetails(prevValue => {
    //             return {...prevValue, showPasswordError: true}
    //         })
    //     }
    //     else {
    //         setLoginDetails(prevValue => {
    //             return {...prevValue, showPasswordError: false}
    //         })
    //     }
    }

    useEffect(() => {
        if (state) {
            setLoginDetails(prevValue => { // Automatically prefill data, if user came from register page with prefilled form.
                return {
                    ...prevValue,
                    ...state
                }
            })
        }}, [state])

        const handleLogin = async (e) => {
            e.preventDefault()
            console.log(loginDetails)
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginDetails.email,
                    password: loginDetails.password
                })
            })

            const data = await response.json()
            console.log(data)
        }

    return (
        <>
            <div className="container">
                <div className="border-solid border-[1px] drop-shadow-md overflow-hidden border-slate-300 mt-20 rounded-md max-w-md m-auto">
                    <div className="bg-indigo-500 p-4 text-center text-white">
                        <h2 className="text-2xl font-bold">Login</h2>
                    </div>
                    <form className="flex flex-col p-4 gap-4 bg-white">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-indigo-500 font-medium text-2xl">Email</label>
                            <input className="bg-indigo-100 rounded-md p-2 border-[1px] outline-indigo-500" id="email" value={loginDetails.email} onChange={(e) => handleLoginDetails('email', e.currentTarget.value)} type="email" placeholder=""/>
                            <span className={`text-red-600 text-sm font-normal w-full mx-1 ${loginDetails.showEmailError ? 'block' : 'hidden'}`}>Kindly please provide a valid email.</span>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-indigo-500 font-medium text-2xl">Password</label>
                            <div className="flex w-full items-center gap-2">
                                <input className="bg-indigo-100 rounded-md p-2 border-[1px] border-slate-200 outline-indigo-500 w-full" value={loginDetails.password} onChange={(e) => handleLoginDetails('password', e.currentTarget.value)} id="password" type={loginDetails.showPassword ? 'text' : 'password'} />

                                {loginDetails.showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:cursor-pointer text-indigo-700" onClick={() => handleLoginDetails('showPassword', false)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:cursor-pointer text-indigo-700" onClick={() => handleLoginDetails('showPassword', true)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                }
                            </div>
                            <span className={`text-red-700 text-sm font-normal w-full mx-1 ${loginDetails.showPasswordError ? 'block' : 'hidden'}`}>{PASSWORD_REQUIREMENT}</span>
                        </div>
                        <div className="flex flex-col gap-4 items-center mt-1">
                            <span className="text-gray-500 cursor-default">Don't have an account? 
                                <Link className="text-indigo-500 hover:text-indigo-700 duration-300" to="../register" state={loginDetails}> Register Here</Link>
                            </span>
                            <button className="bg-indigo-500 hover:bg-indigo-700 duration-300 text-white py-2 px-8 text-medium rounded-md cursor-pointer" onClick={handleLogin}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage
