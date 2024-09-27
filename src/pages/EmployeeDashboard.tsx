import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeDashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h2>Employee Dashboard</h2>
            <p>Welcome, Employee! Here are your options:</p>
            <ul>
                <li><Link to="/employee-dashboard/daily-tasks">View Daily Tasks</Link></li>
                <li><Link to="/employee-dashboard/health-report">Report Health Issues</Link></li>
            </ul>
        </div>
    );
};

export default EmployeeDashboard;
