import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import FileUpload from '../common/FileUpload';

function Maintenance({ userInfo }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Maintenance Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Maintenance Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Maintenance Schedule" />
            <CardContent>
              <Typography variant="body1">
                Upcoming maintenance tasks and their status will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Equipment Status Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Equipment Status" />
            <CardContent>
              <Typography variant="body1">
                Current status of all equipment and machinery will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Requests Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Maintenance Requests" />
            <CardContent>
              <Typography variant="body1">
                Pending and completed maintenance requests will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Reports Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Maintenance Reports" />
            <CardContent>
              <Typography variant="body1">
                Recent maintenance activities and their outcomes will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Maintenance" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Maintenance; 