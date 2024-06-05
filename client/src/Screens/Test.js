import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Test = () => {
    const getCreatorShopId = () => {

        const token = localStorage.getItem("creatorToken");

        if (!token) {
            return null;
        }

        try {
            const decodedToken = jwtDecode(token);

            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            console.log("Expiration Time:", new Date(expirationTime).toLocaleString());
            console.log("Current Time:", new Date(currentTime).toLocaleString());

            // Check if token is expired
            if (expirationTime < currentTime) {
                console.log("Token has expired");
                return null;
            }
            else{
                return decodedToken.creatorShopId;
            }

        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    };

    useEffect(() => {
        const resp = getCreatorShopId();
        console.log(resp);
    }, [])

    return (
        <div>Test</div>
    )
}

export default Test