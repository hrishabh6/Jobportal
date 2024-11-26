import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });    
        }

        req.id = decoded.userId;
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred. Please try again later.",
            success: false,
        });
        
    }
}

export default isAuthenticated;