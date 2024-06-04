import { jwtDecode } from "jwt-decode";

const RestaurantId = () => {
    const token = localStorage.getItem("creatorToken");

    console.log(creatorToken);

    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        const expirationTime = decodedToken.exp * 1000;
        const expirationDate = new Date(expirationTime);
        console.log("Token expiration time:", expirationDate.toLocaleString());

        const currentTime = new Date();
        console.log("Current time:", currentTime.toLocaleString());


        // Check if token is expired
        if (expirationDate < Date.now()) {
            console.log("Token has expired");
            return null;
        }
        return decodedToken.creatorShopId;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return false;
    }
};


export { isAuthenticated };