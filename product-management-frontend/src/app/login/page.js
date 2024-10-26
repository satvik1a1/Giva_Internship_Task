"use client";

import axios from '../lib/axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {3
            const { data } = await axios.post('/auth/login', { username, password });
            localStorage.setItem('token', data.token);
            toast.success('Login successful'); 
            router.push('/products');
        } catch (err) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <style jsx>{`
                .login-container {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    text-align: center;
                }
                .error {
                    color: red;
                    text-align: center;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                }
                input {
                    margin-bottom: 10px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 10px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #005bb5;
                }
            `}</style>
        </div>
    );
}
    