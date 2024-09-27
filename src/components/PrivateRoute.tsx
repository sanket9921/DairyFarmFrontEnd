import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: JSX.Element;
    roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
    const role = sessionStorage.getItem('role'); // Get the user role from session storage

    // Check if the user's role is authorized to access the route
    if (roles.includes(role!)) {
        return element; // Render the protected component
    } else {
        return <Navigate to="/login" />; // Redirect to login if unauthorized
    }
};

export default PrivateRoute;
