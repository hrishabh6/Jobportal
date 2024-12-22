import jwt from "jsonwebtoken";
import refreshToken from "./refreshToken.js";

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve the access token and refresh token from cookies
        const accessToken = req.cookies.token;
        const refreshTokenFromCookie = req.cookies.refreshToken; // assuming it's stored as 'refreshToken'

        if (!accessToken) {
            return res.status(401).json({
                message: "Access token is missing.",
                success: false,
            });
        }  

        let decoded;
        try {
            // Try to verify the access token
            decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        } catch (err) {
            // If the token is expired, check the refresh token
            if (err.name === 'TokenExpiredError') {
                console.log('Access token expired. Trying to refresh the token.');

                if (!refreshTokenFromCookie) {
                    return res.status(401).json({
                        message: "Refresh token is missing.",
                        success: false,
                    });
                }

                // Call the refreshToken function to generate a new access token
                const newAccessToken = await refreshToken(refreshTokenFromCookie);
                if (!newAccessToken) {
                    return res.status(401).json({
                        message: "Invalid or expired refresh token.",
                        success: false,
                    });
                }

                // Set the new access token in the response headers or cookies
                res.cookie('token', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                });

                // Optionally, refresh the refresh token if needed
                // res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });

                // Now verify the new access token
                decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
            } else {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false,
                });
            }
        }

        // Proceed with the request if the token is valid
        req.id = decoded.userId;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred. Please try again later.",
            success: false,
        });
    }
};

export default isAuthenticated;
