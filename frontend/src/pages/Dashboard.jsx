import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import TrainIcon from '@mui/icons-material/Train';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import HistoryIcon from '@mui/icons-material/History';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const actions = [
    {
      title: 'Book a Seat',
      description: 'Quickly reserve your seat with preferred options.',
      icon: <TrainIcon sx={{ fontSize: 100, opacity: 0.1, position: 'absolute', top: 10, right: 10 }} />,
      route: '/book-seats',
      gradient: 'linear-gradient(135deg, #2196f3, #21cbf3)',
    },
    {
      title: 'Available Seats',
      description: 'View seat availability and train options.',
      icon: <EventSeatIcon sx={{ fontSize: 100, opacity: 0.1, position: 'absolute', top: 10, right: 10 }} />,
      route: '/book-seats',
      gradient: 'linear-gradient(135deg, #66bb6a, #43a047)',
    },
    {
      title: 'My Bookings',
      description: 'Review, update, or cancel your bookings.',
      icon: <HistoryIcon sx={{ fontSize: 100, opacity: 0.1, position: 'absolute', top: 10, right: 10 }} />,
      route: '/my-bookings',
      gradient: 'linear-gradient(135deg, #ffa726, #fb8c00)',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e88e5, #6ab7ff)',
          color: 'white',
          p: 4,
          borderRadius: '0 0 40px 40px',
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome, {user?.name || 'Traveler'} 🚄
        </Typography>
        <Typography variant="h6">
          Let’s plan your next train journey with ease
        </Typography>
      </Box>

      {/* Action Widgets */}
      <Grid container spacing={4} justifyContent="center" px={4}>
        {actions.map((action, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                backdropFilter: 'blur(8px)',
                background: `${action.gradient}`,
                color: 'white',
                p: 4,
                borderRadius: 4,
                height: '100%',
                minHeight: 220,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                },
              }}
            >
              {action.icon}
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {action.title}
              </Typography>
              <Typography variant="body1" mb={3}>
                {action.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  },
                }}
                onClick={() => navigate(action.route)}
              >
                Go
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
