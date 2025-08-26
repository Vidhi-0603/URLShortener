import shortUrlModel from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (short_url, full_url, userId) => {
    try{
        const newUrl = new shortUrlModel({
            full_url: full_url,
            short_url: short_url
        })
        if(userId) newUrl.user = userId;
        await newUrl.save(); 

    }catch(err){
        if(err.code === 11000) throw new ConflictError("short url already exists!");
        throw new Error(err);
    }
}

export const getRedirectUrl = async (shortUrl) => {
    return await shortUrlModel.findOneAndUpdate({short_url : shortUrl},{$inc: {clicks: 1}});
}

export const checkCustomUrlExists = async (custom_url) => {
    return await shortUrlModel.findOne({short_url : custom_url});
}
