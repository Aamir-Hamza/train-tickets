import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: '#121212',
        color: '#e0e0e0',
        py: 6,
        mt: 'auto',
        borderTop: '2px solid #333',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrainIcon sx={{ mr: 1, fontSize: 30, color: '#64b5f6' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  color: '#ffffff',
                }}
              >
                Train Reservation
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              Your trusted partner for hassle-free train bookings. Travel with comfort and convenience.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: '#ffffff', fontWeight: 600 }}
            >
              Quick Links
            </Typography>
            {[
              { label: 'Home', path: '/' },
              { label: 'Book Seats', path: '/book-seats' },
              { label: 'My Bookings', path: '/my-bookings' },
            ].map((link) => (
              <Link
                key={link.path}
                component={RouterLink}
                to={link.path}
                underline="none"
                sx={{
                  display: 'block',
                  mb: 1,
                  color: '#b0b0b0',
                  '&:hover': {
                    color: '#64b5f6',
                    pl: 1,
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: '#ffffff', fontWeight: 600 }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, color: '#64b5f6' }} />
              <Typography variant="body2">+1 (123) 456-7890</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: '#64b5f6' }} />
              <Typography variant="body2">support@trainreservation.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, color: '#64b5f6' }} />
              <Typography variant="body2">123 Station Road, City, Country</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            &copy; {currentYear} Train Reservation System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
