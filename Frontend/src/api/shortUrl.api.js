import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (url, customUrl) => {
    console.log("from api/create",url,customUrl);
    
    const { data } = await axiosInstance.post("/api/create", { url, customUrl });
    console.log("response from/api/create", data, data.short_url);
    return data.short_url;
}