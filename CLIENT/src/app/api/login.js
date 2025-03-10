import { generateToken } from "../../utils/auth";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, password } = req.body;

    // Example static authentication (replace with DB check)
    if (username === "admin" && password === "password123") {
        const token = generateToken({ username });
        res.setHeader("Set-Cookie", `authToken=${token}; Path=/; HttpOnly`);
        return res.status(200).json({ message: "Login successful", token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
}
