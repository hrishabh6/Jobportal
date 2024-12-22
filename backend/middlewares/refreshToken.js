import jwt from 'jsonwebtoken';

const refreshToken = async (refreshToken) => {
    try {
        // Verify the refresh token
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Generate a new access token using the user ID from the decoded refresh token
        const newAccessToken = jwt.sign(
            { userId: decodedRefreshToken.userId }, // Or any other relevant data
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Expiry for the new access token
        );

        return newAccessToken;

    } catch (error) {
        console.error('Error refreshing token:', error);
        return null; // If the refresh token is invalid or expired
    }
};

export default refreshToken;
