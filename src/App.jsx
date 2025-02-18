import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Terminal from './components/Terminal';
import MatrixBackground from './components/MatrixBackground';
import './App.css';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
        paper: '#1a1a1a',
      },
      text: {
        primary: '#00ff00',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MatrixBackground />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'transparent',
          padding: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Terminal />
      </Box>
    </ThemeProvider>
  )
}

export default App
