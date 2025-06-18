import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AnimationIcon from '@mui/icons-material/Animation';
import ExtensionIcon from '@mui/icons-material/Extension';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(135deg, #FF1744 0%, #00BCD4 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
    color: active ? '#FFC107' : '#fff',
    margin: '0 8px',
    fontWeight: 600,
    borderRadius: 20,
    padding: '8px 16px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.2)',
        transform: 'translateY(-2px)',
    },
    ...(active && {
        backgroundColor: 'rgba(255,255,255,0.2)',
        boxShadow: '0 4px 12px rgba(255,193,7,0.3)',
    }),
}));

const Logo = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    color: '#FFC107',
    textDecoration: 'none',
    fontSize: '1.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
}));

const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Course', path: '/course', icon: <SchoolIcon /> },
    { text: 'Animation', path: '/animation', icon: <AnimationIcon /> },
    { text: 'Puzzle', path: '/puzzle', icon: <ExtensionIcon /> },
    { text: 'Help', path: '/help', icon: <HelpIcon /> },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List sx={{ pt: 2 }}>
            {menuItems.map((item) => (
                <ListItem
                    button
                    component={RouterLink}
                    to={item.path}
                    key={item.text}
                    onClick={handleDrawerToggle}
                    sx={{
                        backgroundColor: location.pathname === item.path ? 'rgba(255,193,7,0.2)' : 'transparent',
                        borderRadius: 2,
                        margin: '4px 8px',
                    }}
                >
                    <Box sx={{ mr: 2, color: location.pathname === item.path ? '#FFC107' : '#fff' }}>
                        {item.icon}
                    </Box>
                    <ListItemText
                        primary={item.text}
                        sx={{
                            color: location.pathname === item.path ? '#FFC107' : '#fff',
                            fontWeight: location.pathname === item.path ? 700 : 500,
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            <StyledAppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Logo
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{ flexGrow: 1, textDecoration: 'none' }}
                        >
                            JavaLearn
                        </Logo>

                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ color: '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {menuItems.map((item) => (
                                    <NavButton
                                        key={item.text}
                                        component={RouterLink}
                                        to={item.path}
                                        active={location.pathname === item.path ? 1 : 0}
                                        startIcon={item.icon}
                                    >
                                        {item.text}
                                    </NavButton>
                                ))}
                                <Chip
                                    label="FREE"
                                    sx={{
                                        ml: 2,
                                        backgroundColor: '#FFC107',
                                        color: '#1A1A1A',
                                        fontWeight: 700,
                                        fontSize: '0.8rem',
                                    }}
                                />
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </StyledAppBar>

            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, #FF1744 0%, #00BCD4 100%)',
                        color: '#fff',
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar; 