import axios from 'axios';
import { urls } from '../../utils/urls';

export const getUserByEmail = async (email: string) => {
    const result = await axios.post(urls.api.user.get, {
        email: email
    });

    if (result?.data?.success){
        return result.data;
    } else {
        throw new Error(result?.data?.error);
    }
}

export const createUserByEmail = async (email: string) => {
    const result = await axios.post(urls.api.user.create, {
        email: email
    });

    if (result?.data?.success){
        return result.data;
    } else {
        throw new Error(result?.data?.error);
    }
}