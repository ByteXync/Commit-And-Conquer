import { verifyToken } from "../../utils/auth"; // Token verification utility

export default function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Check Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || !verifyToken(token)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Protected Data Accessed!" });
}
