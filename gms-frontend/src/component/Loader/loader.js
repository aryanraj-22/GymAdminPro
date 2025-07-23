import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <Box className="flex flex-col items-center space-y-4">
        <CircularProgress size={100} sx={{ color: 'white' }} />
        <span className="text-white text-lg font-medium">Loading, please wait...</span>
      </Box>
    </div>
  );
};

export default Loader;
