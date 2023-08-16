'use client'
import { AUTH_TOKEN, BASE_SERVEFR_URL } from "./constant";



export const getToken = () => {
    if ((typeof window === 'undefined') ) return;
    return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string) => {
    if ((typeof window === 'undefined') ) return;
    if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    if ((typeof window === 'undefined') ) return;
    localStorage.removeItem(AUTH_TOKEN);
};

export type StrapiPhoto = {
    url: string
}
export const getPhotoUrl = (photo:StrapiPhoto ) => {
    
    return BASE_SERVEFR_URL + photo.url
}