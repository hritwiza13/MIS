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

function Coloring({ userInfo }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Coloring Department Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Coloring Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Coloring Schedule" />
            <CardContent>
              <Typography variant="body1">
                Current coloring schedule and upcoming tasks will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Color Inventory Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Color Inventory" />
            <CardContent>
              <Typography variant="body1">
                Current color material inventory levels will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quality Control Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quality Control" />
            <CardContent>
              <Typography variant="body1">
                Color quality inspection results will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Coloring Reports Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Coloring Reports" />
            <CardContent>
              <Typography variant="body1">
                Daily coloring reports and statistics will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Coloring" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Coloring; 