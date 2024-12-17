import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';

const Timer = () => {
  const [time, setTime] = useState(0); // Total time in hundredths of a second
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1); // Increment by 1 hundredth of a second
      }, 10); // Update every 10ms (100Hz for centiseconds)
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const centiseconds = time % 100;

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: 'center' }}>
      <Box
        sx={{
          p: 3,
          border: '1px solid #ddd',
          borderRadius: '12px',
          boxShadow: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Timer
        </Typography>

        <Typography
          variant="h3"
          sx={{ fontFamily: 'monospace', color: 'primary.main', mb: 3 }}
        >
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}:
          {centiseconds < 10 ? `0${centiseconds}` : centiseconds}
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            color={isActive ? 'secondary' : 'primary'}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button variant="outlined" color="error" onClick={reset}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Timer;
