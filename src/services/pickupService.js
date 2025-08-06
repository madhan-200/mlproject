import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

export const sendPickupRequest = (data) => axios.post(`${API_BASE_URL}/pickup`, data);
export const getPickupRequests = () => axios.get(`${API_BASE_URL}/pickup`);
