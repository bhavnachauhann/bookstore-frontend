import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../Store/auth';
import { useDispatch } from 'react-redux';

const LogIn = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        console.log("name",name,"value",value);
    };

    const submit = async () => {
        try {
            if (values.username === "" || values.password === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post("https://backend-bookstore-b7ef.onrender.com/api/v1/sign-in", values);
                
                dispatch(authActions.login());
                dispatch(authActions.changeRole(response.data.role));
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                
                
                navigate("/profile");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
            <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
                <p className='text-zinc-200 text-xl'>Log In</p>
                <div className='mt-4'>
                    <div>
                        <label htmlFor="username" className='text-zinc-400'>Username</label>
                        <input
                            type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='username'
                            name='username'
                            required
                            value={values.username}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <div>
                        <label htmlFor="password" className='text-zinc-400'>Password</label>
                        <input
                            type="password"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='password'
                            name='password'
                            required
                            value={values.password}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <button
                        className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-white hover:text-zinc-900'
                        onClick={submit}
                    >
                        Log In
                    </button>
                </div>
                <span className='text-white flex mt-4 items-center justify-center font-semibold'>Or</span>
                <p className='flex mt-4 items-center justify-center text-zinc-400 font-semibold'>
                    Don't have an account? &nbsp;
                    <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LogIn;
