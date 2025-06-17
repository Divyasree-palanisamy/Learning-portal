import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroPaper = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ff9800 0%, #00bcd4 100%)',
    color: '#fff',
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    padding: theme.spacing(6, 4),
    marginTop: theme.spacing(8),
    position: 'relative',
    overflow: 'hidden',
}));

const BookBox = styled(Box)(({ theme }) => ({
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    minWidth: 180,
}));

const Landing = () => {
    const navigate = useNavigate();
    return (
        <Container maxWidth="md">
            <HeroPaper elevation={0}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                            <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 800, mb: 2 }}>
                                Become a Java Developer
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.95)' }}>
                                Master Java from scratch with our interactive, step-by-step course. No experience needed!
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                sx={{ fontWeight: 700, borderRadius: 8, px: 4, py: 1.5 }}
                                onClick={() => navigate('/lesson/1')}
                            >
                                Start Learning
                            </Button>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                            <BookBox>
                                <img src="/book-java.png" alt="Java Book" style={{ width: '120px', height: 'auto', filter: 'drop-shadow(0 4px 16px #ff9800aa)' }} />
                            </BookBox>
                        </motion.div>
                    </Grid>
                </Grid>
            </HeroPaper>
        </Container>
    );
};

export default Landing; 