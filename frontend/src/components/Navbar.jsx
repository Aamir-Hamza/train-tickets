import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #1c1c1c, #3a3a3a)',
        borderBottom: '2px solid #444',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 5 } }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.6rem',
            letterSpacing: 1,
            '&:hover': {
              color: '#64b5f6',
            },
          }}
        >
          🚄 Train Reservation
        </Typography>

        {user ? (
          <Box>
            <IconButton
              onClick={handleMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  color: '#64b5f6',
                },
              }}
            >
              <AccountCircle sx={{ fontSize: 28 }} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(30,30,30,0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                },
              }}
            >
              <MenuItem component={RouterLink} to="/my-bookings" onClick={handleClose}>
                My Bookings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button
              component={RouterLink}
              to="/login"
              sx={{
                color: '#fff',
                fontWeight: 500,
                textTransform: 'none',
                mx: 1,
                '&:hover': {
                  color: '#64b5f6',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              sx={{
                color: '#64b5f6',
                border: '1px solid #64b5f6',
                fontWeight: 500,
                textTransform: 'none',
                mx: 1,
                '&:hover': {
                  backgroundColor: '#64b5f6',
                  color: '#121212',
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
