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

function Quality({ userInfo }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quality Control Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
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

        {/* Inspection Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Inspection Schedule" />
            <CardContent>
              <Typography variant="body1">
                Upcoming quality inspections and their status will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Defect Analysis Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Defect Analysis" />
            <CardContent>
              <Typography variant="body1">
                Analysis of defects and quality issues will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quality Reports Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quality Reports" />
            <CardContent>
              <Typography variant="body1">
                Recent quality reports and their findings will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Quality Control" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Quality; 