import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'grf_dynamic_engineering_fallback_secret_key_2026', {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    });
};

export default generateToken;