import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    TextField,
    InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

const CourseCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
    },
}));

const courses = [
    {
        id: 1,
        title: 'Web Development Bootcamp',
        description: 'Learn full-stack web development from scratch',
        image: '/course-web.jpg',
        category: 'Development',
        level: 'Beginner',
        duration: '12 weeks',
    },
    {
        id: 2,
        title: 'Data Science Fundamentals',
        description: 'Master the basics of data science and analytics',
        image: '/course-data.jpg',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '8 weeks',
    },
    {
        id: 3,
        title: 'UI/UX Design Masterclass',
        description: 'Create beautiful and functional user interfaces',
        image: '/course-design.jpg',
        category: 'Design',
        level: 'All Levels',
        duration: '6 weeks',
    },
    {
        id: 4,
        title: 'Mobile App Development',
        description: 'Build iOS and Android apps with React Native',
        image: '/course-mobile.jpg',
        category: 'Development',
        level: 'Intermediate',
        duration: '10 weeks',
    },
];

const Courses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Development', 'Data Science', 'Design'];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Box sx={{ py: 8, mt: 8 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    align="center"
                    sx={{ mb: 6, fontWeight: 600 }}
                >
                    Explore Our Courses
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {categories.map((category) => (
                                    <Chip
                                        key={category}
                                        label={category}
                                        onClick={() => setSelectedCategory(category)}
                                        color={selectedCategory === category ? 'primary' : 'default'}
                                        sx={{ m: 0.5 }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={4}>
                    {filteredCourses.map((course, index) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <CourseCard>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={course.image}
                                        alt={course.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {course.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 2 }}
                                        >
                                            {course.description}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={course.category}
                                                size="small"
                                                sx={{ mr: 1 }}
                                            />
                                            <Chip
                                                label={course.level}
                                                size="small"
                                                sx={{ mr: 1 }}
                                            />
                                            <Chip label={course.duration} size="small" />
                                        </Box>
                                        <Button variant="contained" fullWidth>
                                            Enroll Now
                                        </Button>
                                    </CardContent>
                                </CourseCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Courses; 