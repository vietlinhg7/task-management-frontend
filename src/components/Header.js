import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const Header = ({ user }) => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Left side - Links */}
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
                        <Button color="inherit" component={Link} to="/create-task">Create Task</Button>
                        <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
                        <Button color="inherit" component={Link} to="/timer">Timer</Button>
                    </Box>

                    {/* Right side - User greeting and logout */}
                    {user ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body1" color="inherit">Welcome, {user.email}!</Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </Box>
                    ) : (
                        <Box />
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
