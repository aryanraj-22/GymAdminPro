import axios from "axios"
import { URL } from "../url/url";
const getMonthlyJoined = async () => {
    try {
        const response = await axios.get(`${URL}/members/monthly-member`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const threeDayExpire = async () => {
    try {
        const response = await axios.get(`${URL}/members/within-3-days-expiring`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const fourToSevenDaysExpire = async () => {
    try {
        const response = await axios.get(`${URL}/members/within-4-7-expiring`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const expired = async () => {
    try {
        const response = await axios.get(`${URL}/members/expired-member`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
const inActiveMembers = async () => {
    try {
        const response = await axios.get(`${URL}/members/inactive-member`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export { getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire, expired, inActiveMembers }


