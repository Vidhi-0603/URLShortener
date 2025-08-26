import { checkCustomUrlExists, saveShortUrl } from "../dao/shortUrl.js";
import { createId } from "../utils/shortUrl.util.js";

export const generateShortUrlWithoutUserService = async (url) => {
    const short_url = await createId(6);
    if(!short_url) throw new Error("Failed to generate short URL");
    await saveShortUrl(short_url, url);

    return short_url;
}

export const generateShortUrlWithUserService = async (url, userId, custom_url = null) => {
    const short_url = custom_url || createId(6);
    const custom_url_exists = await checkCustomUrlExists(custom_url);
    if (custom_url_exists) throw new Error('custom url already exists');
    await saveShortUrl(short_url, url, userId);

    return short_url;
}