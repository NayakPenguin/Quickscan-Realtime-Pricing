import { jwtDecode } from "jwt-decode";

const getCreatorShopId = () => {
    const token = localStorage.getItem("creatorToken");

    if (!token) {
        return null;
    }
 
    try {
        const decodedToken = jwtDecode(token);

        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        // Check if token is expired
        if (expirationTime < currentTime) {
            console.log("Token has expired");
            return null;
        }

        return decodedToken.creatorShopId;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};

export { getCreatorShopId };