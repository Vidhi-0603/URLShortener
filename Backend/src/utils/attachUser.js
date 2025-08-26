import { findUserById } from "../dao/findUser.js";
import { verifyJWTToken } from "./token.util.js";

export const attachUserIfExists = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) return next();

    try {
        const decoded = verifyJWTToken(accessToken);
        const user = await findUserById(decoded.id);
        if (!user) return next();

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next();
    }
}