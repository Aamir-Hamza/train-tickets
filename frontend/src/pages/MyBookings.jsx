import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
  Tooltip,
} from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://train-reservation-7aft.onrender.com/api/bookings/myBooking');
      console.log("Booking data received:", response.data);
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const formatBookingDate = (booking) => {
    const date = booking?.bookedAt || booking?.createdAt;
    if (date) {
      const formatted = new Date(date);
      return !isNaN(formatted) ? formatted.toLocaleString() : "Invalid date";
    }

    if (booking?._id) {
      const timestamp = parseInt(booking._id.substring(0, 8), 16) * 1000;
      const fallbackDate = new Date(timestamp);
      return fallbackDate.toLocaleString() + ' (from ID)';
    }

    return new Date().toLocaleString() + ' (fallback)';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Bookings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your recent train seat reservations
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No bookings yet!
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Booking ID</strong></TableCell>
                <TableCell><strong>Seat Number</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Booking Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={booking._id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f8ff',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>
                    <Tooltip title="Reserved Seat" arrow>
                      <Chip
                        icon={<EventSeatIcon />}
                        label={`Seat ${booking.seat.seatNumber}`}
                        color="primary"
                        variant="outlined"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {booking.seat.isBooked ? (
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Booked"
                        color="success"
                        variant="filled"
                      />
                    ) : (
                      <Chip
                        icon={<HourglassBottomIcon />}
                        label="Pending"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>{formatBookingDate(booking)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default MyBookings;
