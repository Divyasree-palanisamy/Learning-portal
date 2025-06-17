import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    margin: '0 8px',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
}));

const Logo = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.primary.main,
    textDecoration: 'none',
}));

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Courses', path: '/courses' },
        { text: 'About', path: '/about' },
        { text: 'Contact', path: '/contact' },
    ];

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem
                    button
                    component={RouterLink}
                    to={item.path}
                    key={item.text}
                    onClick={handleDrawerToggle}
                >
                    <ListItemText primary={item.text} />
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
                            LearnHub
                        </Logo>

                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <Box>
                                {menuItems.map((item) => (
                                    <NavButton
                                        key={item.text}
                                        component={RouterLink}
                                        to={item.path}
                                    >
                                        {item.text}
                                    </NavButton>
                                ))}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ ml: 2 }}
                                >
                                    Get Started
                                </Button>
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
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar; 