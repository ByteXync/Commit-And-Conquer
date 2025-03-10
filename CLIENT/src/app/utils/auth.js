import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
