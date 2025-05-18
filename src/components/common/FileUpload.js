import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

function FileUpload({ department, userInfo }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate file upload - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to upload the files
      // const formData = new FormData();
      // files.forEach(file => formData.append('files', file));
      // await axios.post('/api/upload', formData);

      setSuccess('Files uploaded successfully');
      setFiles([]);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader 
        title="Upload Reports" 
        subheader={`Upload department reports for ${department}`}
      />
      <CardContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <input
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileSelect}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              disabled={uploading}
            >
              Select Files
            </Button>
          </label>
        </Box>

        {files.length > 0 && (
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <DescriptionIcon sx={{ mr: 1 }} />
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(index)}
                    disabled={uploading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {uploading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress />
          </Box>
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            startIcon={<CloudUploadIcon />}
          >
            Upload Files
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Supported file types: PDF, DOC, DOCX, XLS, XLSX
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FileUpload; 