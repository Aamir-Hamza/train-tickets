import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Paper,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}
        >
          🚆 Train Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            variant="filled"
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                borderRadius: 6,
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                borderRadius: 6,
              },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: '#00c6ff',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 8,
              boxShadow: '0px 4px 20px rgba(0, 198, 255, 0.4)',
              '&:hover': {
                background: '#0072ff',
              },
            }}
          >
            Sign In
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{ color: '#90caf9' }}
            >
              {"Don't have an account? Sign up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
