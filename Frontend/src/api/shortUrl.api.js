import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (url, customUrl) => {    
    const { data } = await axiosInstance.post("/api/create", { url, customUrl });
    return data.short_url;
}