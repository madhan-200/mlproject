import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const loginUser = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_BASE_URL}/auth/register`, data);
