import { cookieOptions } from "../config/jwtToken.config.js";
import { registerUser, loginUuser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const register_user = wrapAsync( async (req, res) => {
    const { name, email, password } = req.body;
    const {token, user} = await registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(201).json({ message: 'User registered successfully', user: user});
})

export const login_user = wrapAsync( async (req, res) => {
    const { email, password } = req.body;
    const {token, user} = await loginUuser(email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: 'User login successfull',user: user});
})


export const logout_user = wrapAsync( async (req, res) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = wrapAsync(async (req, res) => {
const user = req.user.toObject ? req.user.toObject() : req.user;
    const { password, ...safeUser } = user;
    res.status(200).json({ user: safeUser });
})
