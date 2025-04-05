import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Snackbar,
  useMediaQuery,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const SeatBooking = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  // State management
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]); // Changed to array for multiple seats
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [initializingSeats, setInitializingSeats] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchSeats();
  }, []);

  // Clear selected seats if number of tickets changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [numberOfTickets]);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get('https://train-tickets-ih96.onrender.com/api/seats');
      setSeats(data);
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError(err.response?.data?.message || 'Failed to fetch seats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const initializeSeats = async () => {
    try {
      setInitializingSeats(true);
      setError('');
      await axios.post('https://train-tickets-ih96.onrender.com/api/seats/init');
      setSnackbarMessage('Seats initialized successfully!');
      setSnackbarOpen(true);
      await fetchSeats();
    } catch (err) {
      console.error("Error initializing seats:", err);
      setError(err.response?.data?.message || 'Failed to initialize seats. Please try again.');
    } finally {
      setInitializingSeats(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats(prevSelectedSeats => {
      const isSelected = prevSelectedSeats.some(s => s._id === seat._id);
      
      if (isSelected) {
        // Remove seat if already selected
        return prevSelectedSeats.filter(s => s._id !== seat._id);
      } else if (prevSelectedSeats.length < numberOfTickets) {
        // Add seat if under the ticket limit
        return [...prevSelectedSeats, seat];
      } else {
        // Replace the first selected seat if at limit
        return [...prevSelectedSeats.slice(1), seat];
      }
    });
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0 || selectedSeats.length !== numberOfTickets) {
      setError(`Please select exactly ${numberOfTickets} seat${numberOfTickets > 1 ? 's' : ''}`);
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Book multiple seats
      const bookingPromises = selectedSeats.map(seat => 
        axios.post('https://train-tickets-ih96.onrender.com/api/bookings', {
          seatNumber: seat.seatNumber,
        })
      );

      await Promise.all(bookingPromises);
      
      setBookingSuccess(true);
      setSnackbarMessage(`Successfully booked ${numberOfTickets} ticket${numberOfTickets > 1 ? 's' : ''}! Redirecting to My Bookings...`);
      setSnackbarOpen(true);
      
      await fetchSeats();
      
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
      
    } catch (err) {
      console.error("Error booking seats:", err);
      setError(err.response?.data?.message || 'Failed to book seats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !seats.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  const availableSeats = seats.filter(seat => !seat.isBooked).length;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      py: 4,
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              textAlign: isMobile ? 'center' : 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            <AirlineSeatReclineNormalIcon sx={{ fontSize: 40 }} />
            Book Your Seats
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{
              textAlign: isMobile ? 'center' : 'left',
              mb: 2,
            }}
          >
            Select the number of tickets and choose your seats
          </Typography>
        </Box>

        {/* Ticket Selection */}
        <Paper 
          elevation={3}
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 2,
            background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: 2,
          }}>
            <FormControl 
              sx={{ 
                minWidth: 200,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <InputLabel>Number of Tickets</InputLabel>
              <Select
                value={numberOfTickets}
                label="Number of Tickets"
                onChange={(e) => setNumberOfTickets(e.target.value)}
                disabled={loading || availableSeats === 0}
              >
                {[...Array(Math.min(availableSeats, 5))].map((_, idx) => (
                  <MenuItem key={idx + 1} value={idx + 1}>
                    {idx + 1} {idx === 0 ? 'Ticket' : 'Tickets'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                flex: 1,
                textAlign: isMobile ? 'center' : 'right',
              }}
            >
              {availableSeats} seats available
            </Typography>
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {/* Main Content */}
        {seats.length === 0 ? (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
            }}
          >
            <EventSeatIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="primary.main">
              No Seats Available
            </Typography>
            <Typography color="text.secondary" paragraph>
              The seat system needs to be initialized before booking.
            </Typography>
            <Button
              variant="contained"
              onClick={initializeSeats}
              disabled={initializingSeats}
              sx={{ 
                mt: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                }
              }}
            >
              {initializingSeats ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Initializing...
                </Box>
              ) : (
                'Initialize Seats'
              )}
            </Button>
          </Paper>
        ) : (
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 4 },
              borderRadius: 2,
              background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
            }}
          >
            {/* Seat Layout */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                <EventSeatIcon />
                Train Seat Layout
              </Typography>
              <Divider sx={{ mb: 4 }} />

              {/* Selected Seats Info */}
              <Typography 
                variant="subtitle2" 
                sx={{ mb: 3, color: 'text.secondary' }}
              >
                Selected: {selectedSeats.length} of {numberOfTickets} tickets
                {selectedSeats.length > 0 && (
                  <span> (Seats: {selectedSeats.map(s => s.seatNumber).join(', ')})</span>
                )}
              </Typography>

              {/* Seats Grid */}
              <Grid 
                container 
                spacing={1} 
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                {seats.map((seat) => (
                  <Grid item key={seat._id}>
                    <Button
                      variant={
                        seat.isBooked 
                          ? 'contained' 
                          : selectedSeats.some(s => s._id === seat._id)
                          ? 'contained' 
                          : 'outlined'
                      }
                      color={
                        seat.isBooked 
                          ? 'error' 
                          : selectedSeats.some(s => s._id === seat._id)
                          ? 'primary' 
                          : 'inherit'
                      }
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.isBooked}
                      sx={{
                        minWidth: { xs: '48px', sm: '64px' },
                        height: { xs: '48px', sm: '64px' },
                        m: 0.5,
                        borderRadius: 2,
                        fontSize: { xs: '0.9rem', sm: '1.1rem' },
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: seat.isBooked ? 'none' : 'scale(1.05)',
                          boxShadow: seat.isBooked ? 'none' : '0 4px 10px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      {seat.seatNumber}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              {/* Legend */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 3,
                flexWrap: 'wrap',
              }}>
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ 
                    width: 32,
                    height: 32,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 1,
                  }} />
                  <Typography>Available</Typography>
                </Paper>
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ 
                    width: 32,
                    height: 32,
                    bgcolor: 'error.main',
                    borderRadius: 1,
                  }} />
                  <Typography>Booked</Typography>
                </Paper>
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ 
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                  }} />
                  <Typography>Selected</Typography>
                </Paper>
              </Box>
            </Box>

            {/* Booking Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleBooking}
                disabled={loading || selectedSeats.length !== numberOfTickets}
                sx={{
                  minWidth: 200,
                  height: 48,
                  fontSize: '1.1rem',
                  position: 'relative',
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    {selectedSeats.length === numberOfTickets 
                      ? `Book ${numberOfTickets} Ticket${numberOfTickets > 1 ? 's' : ''}` 
                      : `Select ${numberOfTickets - selectedSeats.length} More Seat${numberOfTickets - selectedSeats.length > 1 ? 's' : ''}`
                    }
                  </>
                )}
              </Button>
            </Box>
          </Paper>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity={bookingSuccess ? "success" : "info"}
            sx={{ 
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: '24px'
              }
            }}
            icon={bookingSuccess ? <CheckCircleOutlineIcon /> : undefined}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default SeatBooking;