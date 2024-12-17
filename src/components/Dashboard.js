import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the necessary scales and elements with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [completedTasksData, setCompletedTasksData] = useState([]);
    const auth = getAuth();

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (!user) return;

        // Fetch completed tasks data (change URL as needed)
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/tasks`) // Replace with your tasks API endpoint
            .then((response) => {
                // Process the data to count completed tasks per month
                const tasks = response.data;
                const completedTasksCount = Array(12).fill(0); // Initialize an array to store completed tasks per month

                tasks.forEach(task => {
                    if (task.userId !== user.uid) return;

                    const dueDate = new Date(task.dueDate);
                    const month = dueDate.getMonth(); // Get the month (0 = January, 1 = February, etc.)
                    if (task.isCompleted) {
                        completedTasksCount[month] += 1; // Increment the completed task count for the respective month
                    }
                });

                setCompletedTasksData(completedTasksCount);
            })
            .catch((error) => console.error('Error fetching tasks data:', error));
    }, [user]);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Completed Tasks',
                data: completedTasksData, // Update with the completed tasks data
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? <p>Welcome, {user.email}!</p> : <p>Loading user info...</p>}
            <Line data={data} />
        </div>
    );
};

export default Dashboard;