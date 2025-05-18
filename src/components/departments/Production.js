import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import FileUpload from '../common/FileUpload';

function Production({ userInfo }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Production Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Production Overview Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Production Overview" />
            <CardContent>
              <Typography variant="body1">
                Daily production metrics and statistics will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Production Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Production Schedule" />
            <CardContent>
              <Typography variant="body1">
                Current production schedule and upcoming tasks will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quality Metrics Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quality Metrics" />
            <CardContent>
              <Typography variant="body1">
                Quality control metrics and statistics will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resource Utilization Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Resource Utilization" />
            <CardContent>
              <Typography variant="body1">
                Resource utilization metrics and statistics will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Production" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Production; 