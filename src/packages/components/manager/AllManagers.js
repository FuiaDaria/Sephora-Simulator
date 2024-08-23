import React, { useState, useEffect } from 'react';
import ManagerService from '../services/ManagerService';
import { Button, Container, Typography, Paper, Alert, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AllManagers.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ec407a', // Pinkish color
    },
    secondary: {
      main: '#f06292', // Another shade of pink
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const AllManagers = () => {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);
  const [newSalaries, setNewSalaries] = useState({});
  const [cartMessage, setCartMessage] = useState(null);
  const [selectedManagerProfile, setSelectedManagerProfile] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  useEffect(() => {
    const managerService = new ManagerService();
    managerService.findAll()
      .then(data => setManagers(data))
      .catch(error => setError(error.message));
  }, []);

  const handleSalaryChange = async (managerId, userDto) => {
    const newSalary = newSalaries[managerId] || '';
    if (!newSalary) {
      setError('Salary cannot be empty');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const managerService = new ManagerService();
      await managerService.changeSalary(managerId, newSalary, userDto);
      setManagers(prevManagers =>
        prevManagers.map(manager =>
          manager.id === managerId ? { ...manager, salary: newSalary } : manager
        )
      );
      setCartMessage('Salary changed successfully');
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      setError('Failed to change salary');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleViewProfile = async (managerId) => {
    try {
      console.log("Fetching profile for manager ID:", managerId);
      const managerService = new ManagerService();
      const profile = await managerService.findById(managerId);
      console.log("Manager profile fetched:", profile);
      const user = profile.userDto;
      console.log("User profile fetched:", user);
      setSelectedManagerProfile(profile);
      setSelectedUserProfile(user);
    } catch (error) {
      console.error('Error fetching customer profile:', error);
    }
  };

  const handleInputChange = (managerId, value) => {
    setNewSalaries(prevNewSalaries => ({ ...prevNewSalaries, [managerId]: value }));
  };

  const handleDelete = async (managerId) => {
    try {
      const managerService = new ManagerService();
      await managerService.deleteById(managerId);
      setManagers(prevManagers => prevManagers.filter(manager => manager.id !== managerId));
      setCartMessage('Manager deleted successfully');
      setTimeout(() => setCartMessage(null), 3000);
    } catch (error) {
      setError('Failed to delete manager');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="manage-salaries">
        <Typography variant="h4" component="h2">Manager List</Typography>
        {error && <Alert severity="error" className="error">{error}</Alert>}
        {cartMessage && <Alert severity="success" className="success">{cartMessage}</Alert>}
        <ul className="manager-list">
          {managers.map(manager => (
            <li key={manager.id} className="manager-item">
              <Paper className="manager-details" elevation={3}>
                <Typography variant="h6" component="p"><strong>Manager {manager.id}</strong></Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={newSalaries[manager.id] || ''}
                  onChange={(e) => handleInputChange(manager.id, e.target.value)}
                  placeholder="Enter new salary"
                  className="salary-input"
                />
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    className="edit-button"
                    onClick={() => handleSalaryChange(manager.id, manager.userDto)}
                  >
                    Edit Salary
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="delete-button"
                    onClick={() => handleDelete(manager.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className="view-button"
                    onClick={() => handleViewProfile(manager.id)}
                  >
                    View Profile
                  </Button>
                </div>
                {selectedManagerProfile && selectedManagerProfile.id === manager.id && selectedUserProfile && (
                  <div className="managerProfile">
                    <Typography variant="h6" component="h4">Manager Profile</Typography>
                    <Typography variant="body1">Username: {selectedUserProfile.username}</Typography>
                    <Typography variant="body1">Email: {selectedUserProfile.email}</Typography>
                    <Typography variant="body1">Salary: {selectedManagerProfile.salary}</Typography>
                  </div>
                )}
              </Paper>
            </li>
          ))}
        </ul>
      </Container>
    </ThemeProvider>
  );
};

export default AllManagers;
