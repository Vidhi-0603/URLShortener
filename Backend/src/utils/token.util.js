import jwt from 'jsonwebtoken';

export const getJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
}

export const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}