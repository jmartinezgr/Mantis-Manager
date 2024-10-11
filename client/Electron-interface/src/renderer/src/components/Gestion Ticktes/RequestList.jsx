import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, CircularProgress } from '@mui/material';

const RequestList = ({ onSelectRequest }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de solicitudes
    setTimeout(() => {
      setRequests([
        { id: 1, description: 'Cierre de ticket', status: 'Pending' },
        { id: 2, description: 'Apertura de ticket', status: 'Accepted' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Request List</Typography>
      <List>
        {requests.map((request) => (
          <ListItem key={request.id} button onClick={() => onSelectRequest(request)}>
            <ListItemText primary={request.description} secondary={request.status} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RequestList;

