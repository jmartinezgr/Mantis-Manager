import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const RequestDetails = ({ request }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Request Details
        </Typography>
        <Typography>ID: {request.id}</Typography>
        <Typography>Description: {request.description}</Typography>
        <Typography>Status: {request.status}</Typography>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={() => alert('Accept Request')}>
            Accept
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginLeft: 2 }}
            onClick={() => alert('Reject Request')}
          >
            Reject
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestDetails;
