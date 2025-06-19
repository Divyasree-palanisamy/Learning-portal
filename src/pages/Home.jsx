import { Box, Container, Typography, Button, Grid, Card, CardContent, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import AnimationIcon from '@mui/icons-material/Animation';
import ExtensionIcon from '@mui/icons-material/Extension';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #FF1744 0%, #00BCD4 50%, #FFC107 100%)',
    paddingTop: theme.spacing(8),
    position: 'relative',
    overflow: 'hidden',
}));

const PhoneFrame = styled(Box)(({ theme }) => ({
    background: '#1A1A1A',
    borderRadius: 40,
    padding: 12,
    boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
    position: 'relative',
    border: '3px solid #333',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 80,
        height: 6,
        background: '#333',
        borderRadius: 3,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 4,
        background: '#333',
        borderRadius: 2,
    },
}));

const PhoneScreen = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 28,
    padding: theme.spacing(4),
    color: '#fff',
    textAlign: 'center',
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
}));

const PhoneButton = styled(Button)(({ theme }) => ({
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: 12,
    padding: '8px 16px',
    margin: '4px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255,255,255,0.3)',
        transform: 'scale(1.05)',
    },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    textAlign: 'center',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
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

const Home = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -200]);
    const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.8, 0.6]);

    const features = [
        {
            icon: <SchoolIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
            title: 'Step-by-Step Learning',
            description: 'Learn Java from basics to advanced with comprehensive lessons and real examples',
            color: '#FF1744',
        },
        {
            icon: <VolumeUpIcon sx={{ fontSize: 60, color: 'secondary.main' }} />,
            title: 'Voice Learning',
            description: 'Listen to lessons and practice pronunciation with our voice feature',
            color: '#00BCD4',
        },
        {
            icon: <AnimationIcon sx={{ fontSize: 60, color: 'accent.main' }} />,
            title: 'Visual Animations',
            description: 'Watch complex concepts come to life with engaging animations',
            color: '#FFC107',
        },
        {
            icon: <ExtensionIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
            title: 'Smart Puzzles',
            description: 'Test your knowledge with adaptive puzzles based on your progress',
            color: '#FF1744',
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
        <Box>
            {/* 1. HERO SECTION */}
            <HeroSection>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 2,
                                        color: '#fff',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                        textAlign: { xs: 'center', md: 'left' },
                                    }}
                                >
                                    Master Java Programming
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 4,
                                        color: 'rgba(255,255,255,0.9)',
                                        fontWeight: 500,
                                        textAlign: { xs: 'center', md: 'left' },
                                    }}
                                >
                                    From beginner to expert - Learn Java with comprehensive lessons, voice guidance, and smart puzzles
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="secondary"
                                        startIcon={<PlayArrowIcon />}
                                        onClick={() => navigate('/course')}
                                        sx={{
                                            fontWeight: 700,
                                            borderRadius: 25,
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        Start Learning
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            fontWeight: 700,
                                            borderRadius: 25,
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            color: '#fff',
                                            borderColor: '#fff',
                                            '&:hover': {
                                                borderColor: '#FFC107',
                                                color: '#FFC107',
                                            },
                                        }}
                                        onClick={() => navigate('/animation')}
                                    >
                                        Watch Demo
                                    </Button>
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{ y, opacity }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <PhoneFrame>
                                        <PhoneScreen>
                                            <Box>
                                                <CodeIcon sx={{ fontSize: 80, mb: 2, color: '#FFC107' }} />
                                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                                    JavaLearn
                                                </Typography>
                                                <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                                                    Your journey to becoming a Java expert starts here
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                                                <PhoneButton
                                                    onClick={() => navigate('/course')}
                                                    startIcon={<SchoolIcon />}
                                                >
                                                    Course
                                                </PhoneButton>
                                                <PhoneButton
                                                    onClick={() => navigate('/animation')}
                                                    startIcon={<AnimationIcon />}
                                                >
                                                    Animation
                                                </PhoneButton>
                                                <PhoneButton
                                                    onClick={() => navigate('/puzzle')}
                                                    startIcon={<ExtensionIcon />}
                                                >
                                                    Puzzle
                                                </PhoneButton>
                                                <PhoneButton
                                                    onClick={() => navigate('/help')}
                                                    startIcon={<VolumeUpIcon />}
                                                >
                                                    Help
                                                </PhoneButton>
                                            </Box>

                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FFC107' }} />
                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />
                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />
                                            </Box>
                                        </PhoneScreen>
                                    </PhoneFrame>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* 2. FEATURES SECTION */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{ mb: 6, fontWeight: 700, color: 'primary.main' }}
                    >
                        Why Choose JavaLearn?
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
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
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>

            {/* 3. STATISTICS SECTION */}
            <Box sx={{
                background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%)',
                py: 8,
                color: '#fff',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.3,
                }
            }}>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="h2"
                            align="center"
                            sx={{
                                mb: 6,
                                fontWeight: 700,
                                color: '#FFD54F',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                        >
                            Learning Statistics
                        </Typography>

                        <Grid container spacing={4} justifyContent="center">
                            {stats.map((stat, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <StatsCard>
                                            {stat.icon}
                                            <Typography variant="h3" sx={{ color: stat.color, mb: 2, fontWeight: 700 }}>
                                                {stat.number}
                                            </Typography>
                                            <Typography variant="h6" sx={{ mb: 2, color: '#FFD54F', fontWeight: 600 }}>
                                                {stat.label}
                                            </Typography>
                                        </StatsCard>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* 4. CALL TO ACTION SECTION */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h2"
                            sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}
                        >
                            Ready to Start Your Java Journey?
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{ mb: 6, color: 'text.secondary', fontWeight: 500, maxWidth: 600, mx: 'auto' }}
                        >
                            Join thousands of learners who have mastered Java programming with our comprehensive platform
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <CTAButton
                                variant="contained"
                                size="large"
                                startIcon={<PlayArrowIcon />}
                                onClick={() => navigate('/course')}
                            >
                                Start Learning Now
                            </CTAButton>
                            <CTAButton
                                variant="outlined"
                                size="large"
                                startIcon={<AnimationIcon />}
                                onClick={() => navigate('/animation')}
                                sx={{
                                    borderColor: '#FFD54F',
                                    color: '#FFD54F',
                                    '&:hover': {
                                        borderColor: '#FFC107',
                                        color: '#FFC107',
                                        bgcolor: 'rgba(255, 193, 7, 0.1)',
                                    }
                                }}
                            >
                                Explore Animations
                            </CTAButton>
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Home; 