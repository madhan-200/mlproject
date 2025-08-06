import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const submitAttendanceRequest = (data) => axios.post(`${API_BASE_URL}/attendance`, data);
export const getAttendanceStatus = (id) => axios.get(`${API_BASE_URL}/attendance/${id}`);
