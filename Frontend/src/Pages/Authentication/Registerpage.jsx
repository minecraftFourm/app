import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { EMAIL_PATTERN, PASSWORD_PATTERN, PASSWORD_REQUIREMENT, USERNAME_PATTERN, USERNAME_REQUIREMENT } from "../../config";
import { UseSetUser } from "../../Contexts/UserContext";
import { useFetch } from "../../Contexts/Fetch";

const Registerpage = () => {
    const [ err, setErr ] = useState(null);
    const CustomFetch = useFetch();
    const Navigate = useNavigate();
    const setUser = UseSetUser();
    const { state } = useLocation();
    const [ formSubmittable, setFormSubmittable ] = useState(false);
    const [ options, setOptions ] = useState({
        showPassword: false,
        showEmailError: false,
        showPasswordError: false,
        showUsernameError: false
    });
    const fields = {
        email: "",
        password: "",
        username: "",
    }

    const [ registerDetails, setRegisterDetails ] = useState(fields)
    
    const resetForm = () => {
        setRegisterDetails(fields);
    }

    const handleRegisterDetails = (type, newValue) => { // Update user details
        setRegisterDetails(prevValue => {
            return {
                ...prevValue,
                [`${type}`]: newValue
            }
        })
    }

    useEffect(() => { // Automatically prefill data, if user came from login page with prefilled form.
        if (state) {
            setRegisterDetails(prevValue => {
                return {
                    ...prevValue,
                    ...state,
                }
            })
        }
    }, [state]);

    useEffect(() => {
        if (registerDetails.email && !EMAIL_PATTERN.test(registerDetails.email)) {
            setOptions(prevValue => {
                return {...prevValue, showEmailError: true}
            })
        } else {
            setOptions(prevValue => {
                return {...prevValue, showEmailError: false}
            })
        }

        if (registerDetails.username && !USERNAME_PATTERN.test(registerDetails.username)) {
            setOptions(prevValue => {
                return {...prevValue, showUsernameError: true}
            })
        } else {
            setOptions(prevValue => {
                return {...prevValue, showUsernameError: false}
            })
        }

        // Check if a password has been been provided and is valid.
        if (registerDetails.password && !PASSWORD_PATTERN.test(registerDetails.password)) {
            setOptions(prevValue => {
                return {...prevValue, showPasswordError: true}
            })
        }
        else {
            setOptions(prevValue => {
                return {...prevValue, showPasswordError: false}
            })
        }
        // The form becomes submittable when there are no password or email errors.
        (!options.showPasswordError && !options.showEmailError) ? setFormSubmittable(true) : setFormSubmittable(false)

    }, [registerDetails]);

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!formSubmittable) return
        const { data, response } = await CustomFetch({ url: 'register', options: {
            method: 'POST',
            body: JSON.stringify({
                email: registerDetails.email,
                password: registerDetails.password,
                username: registerDetails.username
            })
        }, returnResponse: true})

        // Reset login form and Navigate to the main page.
        if (response.ok) {
            setErr(null)
            setUser({ isAuthenticated: true, id: data.id, username: data.username })
            resetForm();
            Navigate('/', {
                replace: true
            })
        }
        else {
            setErr(data.err)
        }
    }

    return (
        <>
            <div className="container">
                <div className="border-solid border-[1px] drop-shadow-md overflow-hidden border-slate-300 mt-20 rounded-md max-w-md m-auto">
                    <div className="bg-indigo-500 p-4 text-center text-white">
                        <h2 className="text-2xl font-bold">Register</h2>
                    </div>
                    <form className="flex flex-col p-4 gap-2 bg-white">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-indigo-500 font-medium text-2xl">Email</label>
                            <input className="bg-indigo-100 rounded-md p-2 border-[1px] outline-slate-500" value={registerDetails.email} onChange={(e) => handleRegisterDetails('email', e.currentTarget.value)} id="email" type="email" placeholder=""/>
                            <span className={`text-red-700 text-sm font-normal w-full mx-1 ${options.showEmailError ? 'block' : 'hidden'}`}>Kindly please provide a valid email.</span>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-indigo-500 font-medium text-2xl">Username</label>
                            <input className="bg-indigo-100 rounded-md p-2 border-[1px] outline-slate-500" value={registerDetails.username} onChange={(e) => handleRegisterDetails('username', e.currentTarget.value)} id="username" type="text"/>
                            <span className={`text-red-700 text-sm font-normal w-full mx-1 ${options.showUsernameError ? 'block' : 'hidden'}`}>{USERNAME_REQUIREMENT}</span>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-indigo-500 font-medium text-2xl">Password</label>
                            <div className="flex w-full items-center gap-2">
                                <input className="bg-indigo-100 rounded-md p-2 border-[1px] border-slate-200 outline-indigo-500 w-full" value={registerDetails.password} onChange={(e) => handleRegisterDetails('password', e.currentTarget.value)} id="password" type={options.showPassword ? 'text' : 'password'} />

                                {options.showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:cursor-pointer text-indigo-700" onClick={() => setOptions(prevValue =>  Object.create({...prevValue, showPassword: false}))}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:cursor-pointer text-indigo-700" onClick={() => setOptions(prevValue =>  Object.create({...prevValue, showPassword: true}))}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                }

                            </div>
                            <span className={`text-red-700 text-sm font-normal w-full mx-1 ${options.showPasswordError ? 'block' : 'hidden'}`}>{PASSWORD_REQUIREMENT}</span>
                        </div>
                        {err && <p className="w-full text-center text-red-500 underline">{err}</p>}
                        <div className="flex flex-col gap-4 items-center">
                            <span className="text-gray-500 cursor-default">Already have an Account?
                                <Link className="text-indigo-500 hover:text-indigo-700 duration-300" to="../login" state={registerDetails}> Login Here</Link>
                            </span>
                            <button className={`duration-300 text-white py-2 px-8 text-medium rounded-md cursor-pointer ${formSubmittable ? "bg-indigo-500 hover:bg-indigo-700" : "bg-gray-500 "}`} onClick={handleRegister}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registerpage;

