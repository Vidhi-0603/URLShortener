import userModel from "../models/user.model.js";
import { verifyJWTToken } from "../utils/token.util.js";

//whenever a route is hit, user must be authenticated
export const authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(401).json({ message: 'Unauthorized!' });

    try {
        const decoded = verifyJWTToken(accessToken);
        const user = await userModel.findOne({ _id: decoded.id });
        if (!user) return res.status(401).json({ message: 'Unauthorized' });        
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}