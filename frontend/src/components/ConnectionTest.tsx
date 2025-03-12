import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`);
        if (response.data.status === 'ok') {
          setStatus('success');
          setMessage('Successfully connected to the backend!');
        } else {
          setStatus('error');
          setMessage('Unexpected response from backend');
        }
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to connect to backend');
      }
    };

    testConnection();
  }, []);

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Backend Connection Test
      </Typography>
      
      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {status === 'success' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
      
      {status === 'error' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default ConnectionTest;
