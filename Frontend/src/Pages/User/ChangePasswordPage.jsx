import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { PASSWORD_PATTERN, PASSWORD_REQUIREMENT } from "../../config";
import { useFetch } from "../../Contexts/Fetch";
import { UseUser } from "../../Contexts/UserContext";

const ShowHideEye = ({ condition, onClickHide, onClickShow }) => {
    return (
        <>
            {condition ? (
                <svg onClick={onClickHide} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:cursor-pointer text-indigo-700">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                </svg>
            ) : (
                <svg onClick={onClickShow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:cursor-pointer text-indigo-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )}
        </>
    );
};

const initOptions = {
    showCurrentPassword: false,
    showNewPassword: false,
    showRepeatPassword: false,
};

const initErrors = {
    currentPassword: null,
    newPassword: null,
    repeatNewPassword: null,
    error: null,
};

const ChangePasswordPage = () => {
    const Navigate = useNavigate()
    const [options, setOptions] = useState(initOptions);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const debounceValue = useDebounce(repeatNewPassword, 1000);
    const [errors, setErrors] = useState(initErrors);
    const [sending, setSending] = useState(false);
    const CustomFetch = useFetch();
    const user = UseUser();

    const resetForm = () => {
        setOptions(initOptions);
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        setErrors(initErrors);
    };

    useEffect(() => {
        if (currentPassword !== "") {
            setErrors({ ...errors, currentPassword: null });
        }
    }, [currentPassword]);

    useEffect(() => {
        if (!PASSWORD_PATTERN.test(newPassword)) {
            setErrors({ ...errors, newPassword: PASSWORD_REQUIREMENT });
        } else {
            setErrors({ ...errors, newPassword: null });
        }
    }, [newPassword]);

    useEffect(() => {
        if (newPassword !== repeatNewPassword) {
            setErrors({ ...errors, repeatNewPassword: "New Password And Repeat Password should be equal." });
        } else {
            setErrors({ ...errors, repeatNewPassword: null });
        }
    }, [debounceValue]);

    const isAnyErrors = () => {
        let flag = false;
        let errs = {};
        if (currentPassword === "") {
            flag = true;
            errs.currentPassword = "Current Password cant be empty";
        }
        if (!PASSWORD_PATTERN.test(newPassword)) {
            flag = true;
            errs.newPassword = PASSWORD_REQUIREMENT;
        }
        if (newPassword !== repeatNewPassword) {
            flag = true;
            errs.repeatNewPassword = "New Password And Repeat Password should be equal.";
        }
        if (currentPassword === newPassword) {
            flag = true;
            errs.error = "This password is already in use. Please choose a different password.";
        }
        setErrors({ ...errors, ...errs });
        if (flag) setSending(false);
        return flag;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        if (isAnyErrors()) return;

        const { data, response } = await CustomFetch({
            url: `user/${user.id}`,
            options: {
                method: "PATCH",
                body: JSON.stringify({
                    password: currentPassword,
                    newPassword: newPassword,
                }),
            },
            returnResponse: true,
        });

        if (response.ok) {
            resetForm();
            toast.success("Password changed successfully.", {
                duration: 5000,
                position: "bottom-left",
            });
            Navigate('/')
            setSending(false);
        } else {
            setErrors({ ...errors, error: data.err });
            setSending(false);
        }
    };

    return (
        <div className="border-solid border-[1px] drop-shadow-md overflow-hidden border-slate-300 mt-20 rounded-md max-w-md m-auto">
            <div className="bg-indigo-500 p-4 text-center text-white">
                <h2 className="text-2xl font-bold">Change Password</h2>
            </div>
            <form className="flex flex-col p-4 gap-2 bg-white" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="currentPassword" className="text-indigo-500 font-medium text-2xl">
                        Current Password:
                    </label>
                    <div className="flex w-full items-center gap-2">
                        <input className="bg-indigo-100 rounded-md p-2 border-[1px] border-slate-200 outline-indigo-500 w-full" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} id="currentPassword" type={options.showCurrentPassword ? "text" : "password"} />
                        <ShowHideEye condition={options.showCurrentPassword} onClickHide={() => setOptions({ ...options, showCurrentPassword: false })} onClickShow={() => setOptions({ ...options, showCurrentPassword: true })} />
                    </div>
                    <span className={`text-red-700 text-sm font-normal w-full mx-1 ${errors.currentPassword ? "block" : "hidden"}`}>{errors.currentPassword}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="newPassword" className="text-indigo-500 font-medium text-2xl">
                        New Password:
                    </label>
                    <div className="flex w-full items-center gap-2">
                        <input className="bg-indigo-100 rounded-md p-2 border-[1px] border-slate-200 outline-indigo-500 w-full" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="newPassword" type={options.showNewPassword ? "text" : "password"} />
                        <ShowHideEye condition={options.showNewPassword} onClickHide={() => setOptions({ ...options, showNewPassword: false })} onClickShow={() => setOptions({ ...options, showNewPassword: true })} />
                    </div>
                    <span className={`text-red-700 text-sm font-normal w-full mx-1 ${errors.newPassword ? "block" : "hidden"}`}>{errors.newPassword}</span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="repeatNewPassword" className="text-indigo-500 font-medium text-2xl">
                        Repeat New Password:
                    </label>
                    <div className="flex w-full items-center gap-2">
                        <input className="bg-indigo-100 rounded-md p-2 border-[1px] border-slate-200 outline-indigo-500 w-full" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} id="repeatNewPassword" type={options.showRepeatPassword ? "text" : "password"} />
                        <ShowHideEye condition={options.showRepeatPassword} onClickHide={() => setOptions({ ...options, showRepeatPassword: false })} onClickShow={() => setOptions({ ...options, showRepeatPassword: true })} />
                    </div>
                    <span className={`text-red-700 text-sm font-normal w-full mx-1 ${errors.repeatNewPassword ? "block" : "hidden"}`}>{errors.repeatNewPassword}</span>
                </div>

                {errors.error && <p className="w-full text-center text-red-500">{errors.error}</p>}

                <div className="flex flex-col gap-1 mt-2 items-center">
                    <button disabled={sending} className={`duration-300 text-white py-2 px-8 text-medium rounded-md cursor-pointer ${!sending ? "bg-indigo-500 hover:bg-indigo-700" : "bg-gray-500 "}`}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
