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

function Packaging({ userInfo }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Packaging Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Packaging Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Packaging Schedule" />
            <CardContent>
              <Typography variant="body1">
                Current packaging schedule and upcoming tasks will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory Status Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Inventory Status" />
            <CardContent>
              <Typography variant="body1">
                Current packaging material inventory levels will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quality Checks Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quality Checks" />
            <CardContent>
              <Typography variant="body1">
                Packaging quality inspection results will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Packaging Reports Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Packaging Reports" />
            <CardContent>
              <Typography variant="body1">
                Daily packaging reports and statistics will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Packaging" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Packaging; 