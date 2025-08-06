import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const getUserProfile = () => axios.get(`${API_BASE_URL}/user/profile`);
export const updateUserProfile = (data) => axios.put(`${API_BASE_URL}/user/profile`, data);
