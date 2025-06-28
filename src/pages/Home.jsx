import { Box, Container, Typography, Button, Grid, Card, CardContent, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import AnimationIcon from '@mui/icons-material/Animation';
import ExtensionIcon from '@mui/icons-material/Extension';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CodeIcon from '@mui/icons-material/Code';

const HeroSection = styled(Box)(({ theme }) => ({
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #23235B 0%, #6A1B9A 100%)',
    color: '#fff',
    paddingTop: theme.spacing(8),
    position: 'relative',
    overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    textAlign: 'center',
    background: 'linear-gradient(135deg, #fff 0%, #e3e6f3 100%)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: 16,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
    },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255,255,255,0.2)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    }
}));

const CTAButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #FFD54F, #FFC107)',
    color: '#1A1A1A',
    borderRadius: 25,
    padding: '12px 32px',
    fontSize: '1.1rem',
    fontWeight: 700,
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, #FFC107, #FFB300)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(255, 193, 7, 0.4)',
    },
}));

const pageBackground = 'linear-gradient(135deg, #23235B 0%, #3a0ca3 50%, #00b4d8 100%)';

const Home = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: <SchoolIcon sx={{ fontSize: 60, color: '#23235B' }} />,
            title: 'Step-by-Step Learning',
            description: 'Learn Java from basics to advanced with comprehensive lessons and real examples',
        },
        {
            icon: <VolumeUpIcon sx={{ fontSize: 60, color: '#00BCD4' }} />,
            title: 'Voice Learning',
            description: 'Listen to lessons and practice pronunciation with our voice feature',
        },
        {
            icon: <AnimationIcon sx={{ fontSize: 60, color: '#6A1B9A' }} />,
            title: 'Visual Animations',
            description: 'Watch complex concepts come to life with engaging animations',
        },
        {
            icon: <ExtensionIcon sx={{ fontSize: 60, color: '#FFD54F' }} />,
            title: 'Smart Puzzles',
            description: 'Test your knowledge with adaptive puzzles based on your progress',
        },
    ];
    const stats = [
        {
            number: '100+',
            label: 'Interactive Lessons',
            icon: <SchoolIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
            color: '#4CAF50'
        },
        {
            number: '50+',
            label: 'Smart Puzzles',
            icon: <ExtensionIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
            color: '#2196F3'
        },
        {
            number: '24/7',
            label: 'Voice Support',
            icon: <VolumeUpIcon sx={{ fontSize: 40, color: '#FF5722' }} />,
            color: '#FF5722'
        }
    ];
    return (
        <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', p: 0, m: 0 }}>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth={false} disableGutters sx={{ px: { xs: 0, sm: 2 } }}>
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={7}>
                            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                                <Typography variant="h1" sx={{ fontWeight: 800, mb: 2, color: '#FFD54F', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                                    Master Java Programming
                                </Typography>
                                <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
                                    From beginner to expert - Learn Java with comprehensive lessons, voice guidance, and smart puzzles
                                </Typography>
                                <CTAButton variant="contained" size="large" startIcon={<PlayArrowIcon />} onClick={() => navigate('/course')}>
                                    Start Learning
                                </CTAButton>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CodeIcon sx={{ fontSize: 120, color: '#FFD54F' }} />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>
            {/* Features Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth={false} disableGutters sx={{ px: { xs: 0, sm: 2 } }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                        <Typography variant="h2" align="center" sx={{ mb: 6, fontWeight: 700, color: '#FFD54F' }}>
                            Why Choose JavaLearn?
                        </Typography>
                        <Grid container spacing={4}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <FeatureCard>
                                        {feature.icon}
                                        <CardContent>
                                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </FeatureCard>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>
            {/* Statistics Section */}
            <Box sx={{ background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%)', py: 8, color: '#fff', position: 'relative' }}>
                <Container maxWidth={false} disableGutters sx={{ position: 'relative', zIndex: 1, px: { xs: 0, sm: 2 } }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                        <Typography variant="h2" align="center" sx={{ mb: 6, fontWeight: 700, color: '#FFD54F', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                            Learning Statistics
                        </Typography>
                        <Grid container spacing={4} justifyContent="center">
                            {stats.map((stat, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <StatsCard>
                                        {stat.icon}
                                        <Typography variant="h3" sx={{ color: stat.color, mb: 2, fontWeight: 700 }}>
                                            {stat.number}
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#FFD54F', fontWeight: 600 }}>
                                            {stat.label}
                                        </Typography>
                                    </StatsCard>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>
            {/* Call to Action Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth={false} disableGutters sx={{ px: { xs: 0, sm: 2 } }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, color: '#FFD54F' }}>
                                Ready to Start Your Java Journey?
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<PlayArrowIcon />}
                                onClick={() => navigate('/course')}
                                sx={{
                                    background: 'linear-gradient(135deg, #FFD54F, #FFC107)',
                                    color: '#1A1A1A',
                                    borderRadius: 25,
                                    padding: '12px 32px',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #FFC107, #FFB300)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(255, 193, 7, 0.4)',
                                    },
                                }}
                            >
                                Start Learning
                            </Button>
                        </Box>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default Home; 