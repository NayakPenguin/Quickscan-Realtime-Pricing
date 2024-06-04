import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getCreatorShopId } from './ReastaurantID';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const creatorShopId = getCreatorShopId();
    const navigate = useNavigate();

    if (!creatorShopId) {
        navigate('/restaurant/login');
        return null;
    }

    return <Route {...rest} element={<Element creatorShopId={creatorShopId} />} />;
};

export default ProtectedRoute;