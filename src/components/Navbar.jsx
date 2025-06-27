import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(90deg, #23235B 0%, #6A1B9A 60%, #00BCD4 100%)',
    color: '#fff',
    boxShadow: '0 4px 24px rgba(35,35,91,0.15)',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
    color: active ? '#FFD54F' : '#fff',
    fontWeight: active ? 700 : 500,
    fontSize: '1.1rem',
    marginLeft: theme.spacing(2),
    borderBottom: active ? '3px solid #FFD54F' : '3px solid transparent',
    borderRadius: 0,
    background: 'none',
    '&:hover': {
        color: '#FFD54F',
        background: 'rgba(255,255,255,0.05)',
        borderBottom: '3px solid #FFD54F',
    },
}));

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Course', path: '/course' },
    { label: 'Animation', path: '/animation' },
    { label: 'Puzzle', path: '/puzzle' },
    { label: 'Help', path: '/help' },
];

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    return (
        <GradientAppBar position="sticky" elevation={0}>
            <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 4 } }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, letterSpacing: 1, flexGrow: 1 }}
                    component={Link}
                    to="/"
                    style={{ textDecoration: 'none', color: '#FFD54F' }}
                >
                    JavaLearn 📖
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <NavButton
                            key={link.path}
                            component={Link}
                            to={link.path}
                            active={location.pathname === link.path ? 1 : 0}
                            disableRipple
                        >
                            {link.label}
                        </NavButton>
                    ))}
                </Box>
            </Toolbar>
        </GradientAppBar>
    );
};

export default Navbar; 