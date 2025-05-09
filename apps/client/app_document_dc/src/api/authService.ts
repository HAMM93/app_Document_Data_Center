import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
};

export const register = async (email: string, password: string, name: string, role: string) => {
    const res = await axios.post(`${API_URL}/auth/register`, { email, password, name, role });
    return res.data;
};