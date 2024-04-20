import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    console.log(token);

    if (!token) {
        return false;
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
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return false;
    }
};


export { isAuthenticated };