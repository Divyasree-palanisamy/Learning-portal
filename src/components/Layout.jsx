import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const layoutBackground = 'linear-gradient(135deg, #23235B 0%, #3a0ca3 50%, #00b4d8 100%)';

const Layout = ({ children }) => (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: layoutBackground, width: '100%' }}>
        <Navbar />
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Footer />
    </Box>
);

export default Layout; 