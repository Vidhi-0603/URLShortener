import { findUrlsByUserId } from "../dao/findUser.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const getAllUserUrls = wrapAsync(async (req, res) => {
    console.log(req.user,"controller urls");
    
    const { _id } = req.user;
    const urls = await findUrlsByUserId(_id);
    res.status(200).json({message:"success",urls})
})