import React, { useState } from 'react';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';


import { Grid, Typography, Box } from '@mui/material';


const RequestsManager = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Request Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <RequestList onSelectRequest={handleSelectRequest} />
        </Grid>
        <Grid item xs={6}>
          {selectedRequest ? (
            <RequestDetails request={selectedRequest} />
          ) : (
            <Typography>Select a request to view details</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestsManager;

