import { getRedirectUrl } from "../dao/shortUrl.js";
import {
  generateShortUrlWithoutUserService,
  generateShortUrlWithUserService,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let short_url;
  if (req.user) {
    short_url = await generateShortUrlWithUserService(
      data.url,
      req.user._id,
      data.customUrl,
    );
  } else {
    short_url = await generateShortUrlWithoutUserService(data.url);
  }
  res.status(200).json({ short_url: process.env.APP_URL + "/" + short_url });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getRedirectUrl(id);

  if (!url) throw new Error("Short URL not found");
  res.json({ full_url: url.full_url });
});

// export const createCustomShortUrl = wrapAsync( async (req,res) => {
//     const { url, custom_url} = req.body;
//     const short_url = await generateShortUrlWithUserService(url);
//     res.status(200).json({short_url : process.env.APP_URL + short_url})}
// )
