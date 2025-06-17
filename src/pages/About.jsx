import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const TeamMemberCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    textAlign: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
}));

const teamMembers = [
    {
        name: 'Sarah Johnson',
        role: 'Founder & CEO',
        image: '/team-1.jpg',
        bio: 'Former tech executive with 15+ years of experience in education technology.',
    },
    {
        name: 'Michael Chen',
        role: 'Head of Education',
        image: '/team-2.jpg',
        bio: 'PhD in Computer Science with a passion for making education accessible.',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Lead Instructor',
        image: '/team-3.jpg',
        bio: 'Award-winning educator with expertise in curriculum development.',
    },
];

const About = () => {
    return (
        <Box sx={{ py: 8, mt: 8 }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{ mb: 6, fontWeight: 600 }}
                    >
                        About LearnHub
                    </Typography>

                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
                    >
                        We're on a mission to make quality education accessible to everyone,
                        everywhere. Our platform combines cutting-edge technology with expert
                        instruction to create an engaging learning experience.
                    </Typography>

                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                                    10K+
                                </Typography>
                                <Typography variant="h6">Active Students</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                                    500+
                                </Typography>
                                <Typography variant="h6">Courses Available</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                                    95%
                                </Typography>
                                <Typography variant="h6">Student Satisfaction</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="h3"
                        align="center"
                        sx={{ mb: 6, fontWeight: 600 }}
                    >
                        Meet Our Team
                    </Typography>

                    <Grid container spacing={4}>
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <TeamMemberCard>
                                        <StyledAvatar src={member.image} alt={member.name} />
                                        <CardContent>
                                            <Typography variant="h5" component="h3" gutterBottom>
                                                {member.name}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                                gutterBottom
                                            >
                                                {member.role}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {member.bio}
                                            </Typography>
                                        </CardContent>
                                    </TeamMemberCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default About; 