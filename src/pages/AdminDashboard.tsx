import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin! Here are your options:</p>
            <ul>
                <li><Link to="/admin-dashboard/add-animal">Add Animal</Link></li>
                <li><Link to="/admin-dashboard/manage-breeding">Manage Breeding Records</Link></li>
                <li><Link to="/admin-dashboard/assign-tasks">Assign Tasks to Employees</Link></li>
                <li><Link to="/admin-dashboard/view-animals">View Animal Records</Link></li>
            </ul>
        </div>
    );
};

export default AdminDashboard;
