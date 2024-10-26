import React from 'react';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');

            toast.success('Logged out successfully!');
            window.location.reload(); // Reload the page or redirect as needed
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
