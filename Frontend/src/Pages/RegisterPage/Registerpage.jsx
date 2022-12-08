import React from "react";

const Registerpage = () => {
    return (
        <>
            <div className="container">
                <div className="border-solid border-[1px] overflow-hidden border-black mt-20 rounded-md max-w-md m-auto">
                    <div className="bg-violet p-4 text-center text-white">
                        <h2 className="text-2xl font-bold">Register</h2>
                    </div>
                    <form className="flex flex-col p-4 gap-6 bg-white">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-violet font-bold text-2xl">Email</label>
                            <input className="bg-platinum p-2 border-[1px] border-[#D1D5DB] outline-none" id="email" type="email" placeholder=""/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-violet font-bold text-2xl">Username</label>
                            <input className="bg-platinum p-2 border-[1px] border-[#D1D5DB]" id="username" type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-violet font-bold text-2xl">Password</label>
                            <input className="bg-platinum p-2 border-[1px] border-[#D1D5DB]" id="password" type="password"/>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <span>Already have an Account?
                                <a className="text-violet" href="/login"> Login Here</a>
                            </span>
                            <a className="bg-violet text-white py-2 px-10 font-bold text-2xl rounded-md cursor-pointer">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registerpage;

