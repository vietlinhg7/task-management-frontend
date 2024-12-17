import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Stack,
  InputLabel,
  FormControl,
} from '@mui/material';
import { UserContext } from '../context/UserContext';

const TaskForm = ({ onTaskCreated, onTaskUpdated, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate.split('T')[0]); // Format date for input[type="date"]
      setPriority(task.priority);
    }
  }, [task]);

  const mapStatusEnumToStatus = (statusEnum) => {
    switch (statusEnum) {
      case 0:
        return 'Expired';
      case 1:
        return 'Todo';
      case 2:
        return 'Doing';
      case 3:
        return 'Done';
      default:
        return 'Todo';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert('Please fill out all fields');
      return;
    }

    const statusEnum = task ? task.statusEnum : 1; // Default to 'Todo'
    const newTask = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      status: mapStatusEnumToStatus(statusEnum),
      statusEnum: statusEnum,
      isCompleted: task ? task.isCompleted : false,
      priority,
      userId: user ? user.uid : null, // Include user ID
    };

    try {
      if (task) {
        await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/api/tasks/${task.id}`, newTask);
        onTaskUpdated({ ...newTask, id: task.id });
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/tasks`, newTask);
        alert('Task created successfully!');
        onTaskCreated(newTask);
      }
      // Clear form
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    } catch (error) {
      console.error('Error creating/updating task:', error);
      alert('Error creating/updating task');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 4,
          border: '1px solid #ddd',
          borderRadius: '12px',
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          {task ? 'Update Task' : 'Create Task'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />

            <TextField
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              fullWidth
            />

            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default TaskForm;