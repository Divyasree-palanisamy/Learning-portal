import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const HeroSection = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    paddingTop: theme.spacing(8),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
    },
}));

const Home = () => {
    const features = [
        {
            icon: <SchoolIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
            title: 'Expert Instructors',
            description: 'Learn from industry professionals with years of experience',
        },
        {
            icon: <AutoStoriesIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
            title: 'Comprehensive Courses',
            description: 'Access a wide range of courses designed for all skill levels',
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
            title: 'Certification',
            description: 'Earn certificates recognized by top companies worldwide',
        },
    ];

    return (
        <Box>
            <HeroSection>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                >
                                    Transform Your Future with Online Learning
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="text.secondary"
                                    sx={{ mb: 4 }}
                                >
                                    Discover the best courses and start your learning journey today
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ mr: 2, mb: { xs: 2, md: 0 } }}
                                >
                                    Get Started
                                </Button>
                                <Button variant="outlined" size="large">
                                    Learn More
                                </Button>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Box
                                    component="img"
                                    src="/hero-image.png"
                                    alt="Learning illustration"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 600,
                                        height: 'auto',
                                    }}
                                />
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h2"
                    align="center"
                    sx={{ mb: 6, fontWeight: 600 }}
                >
                    Why Choose Us
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <FeatureCard>
                                    {feature.icon}
                                    <CardContent>
                                        <Typography variant="h5" component="h3" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </FeatureCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Home; 