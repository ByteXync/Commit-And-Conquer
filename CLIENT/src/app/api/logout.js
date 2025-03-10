export default function handler(req, res) {
    res.setHeader("Set-Cookie", "authToken=; Path=/; Max-Age=0");
    res.status(200).json({ message: "Logged out successfully" });
}
