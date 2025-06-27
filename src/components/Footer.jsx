import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
    <Box sx={{ color: '#fff', py: 3, textAlign: 'center', mt: 8, background: 'transparent' }}>
        <Typography variant="body2">
            © {new Date().getFullYear()} JavaLearn. All rights reserved.
        </Typography>
    </Box>
);

export default Footer; 