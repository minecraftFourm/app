import React from "react";

const Registerpage = () => {
    return (
        <>
            <div className="container">
                <div className="border-solid border-[1px] drop-shadow-md overflow-hidden border-slate-300 mt-20 rounded-md max-w-md m-auto">
                    <div className="bg-indigo-500 p-4 text-center text-white">
                        <h2 className="text-2xl font-bold">Register</h2>
                    </div>
                    <form className="flex flex-col p-4 gap-6 bg-white">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-indigo-500 font-medium text-2xl">Email</label>
                            <input className="bg-indigo-100 rounded-md p-2 border-[1px] outline-slate-500" id="email" type="email" placeholder=""/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-indigo-500 font-medium text-2xl">Username</label>
                            <input className="bg-indigo-100 rounded-md p-2 border-[1px] outline-slate-500" id="username" type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-indigo-500 font-medium text-2xl">Password</label>
                            <input className="bg-indigo-100 rounded-md p-2 border-[1px] outline-slate-500" id="password" type="password"/>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <span className="text-gray-500 cursor-default">Already have an Account?
                                <a className="text-indigo-500 hover:text-indigo-700 duration-300" href="/login"> Login Here</a>
                            </span>
                            <a className="bg-indigo-500 hover:bg-indigo-700 duration-300 text-white py-2 px-8 text-medium rounded-md cursor-pointer">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registerpage;

