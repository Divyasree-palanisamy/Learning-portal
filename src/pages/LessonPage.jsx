import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper, MobileStepper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const lessons = [
    {
        title: 'Introduction to Java',
        bookImg: '/book-java.png',
        content: `Java is a powerful, versatile, and widely-used programming language. It is platform-independent, object-oriented, and used for building everything from mobile apps to large-scale enterprise systems.`,
        graphic: <EmojiObjectsIcon sx={{ fontSize: 80, color: 'secondary.main' }} />,
        highlight: 'Java runs on billions of devices worldwide!'
    },
    {
        title: 'Variables & Data Types',
        bookImg: '/book-java.png',
        content: `Variables are containers for storing data values. Java has different data types such as int, double, char, and boolean.`,
        graphic: <CodeIcon sx={{ fontSize: 80, color: 'secondary.main' }} />,
        highlight: 'int age = 25; // This is a variable declaration.'
    },
    {
        title: 'Object-Oriented Programming',
        bookImg: '/book-java.png',
        content: `Java is built on the principles of Object-Oriented Programming (OOP): Encapsulation, Inheritance, Polymorphism, and Abstraction.`,
        graphic: <EmojiObjectsIcon sx={{ fontSize: 80, color: 'secondary.main' }} />,
        highlight: 'OOP makes code reusable and easier to maintain.'
    },
];

const BookBox = styled(Box)(({ theme }) => ({
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    minWidth: 140,
    marginBottom: theme.spacing(2),
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #fffde4 0%, #f9f9f9 100%)',
    borderRadius: 20,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: theme.spacing(4, 3),
    marginTop: theme.spacing(4),
}));

const LessonPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const idx = parseInt(lessonId, 10) - 1;
    const lesson = lessons[idx];

    if (!lesson) return <Container sx={{ mt: 10 }}><Typography variant="h4">Lesson not found.</Typography></Container>;

    return (
        <Container maxWidth="md" sx={{ pt: { xs: 4, md: 10 }, pb: 6 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>{lesson.title}</Typography>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={5}>
                        <BookBox>
                            <img src={lesson.bookImg} alt="Book" style={{ width: '90px', height: 'auto', filter: 'drop-shadow(0 4px 16px #ff9800aa)' }} />
                        </BookBox>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <ContentPaper>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                {lesson.graphic}
                                <Typography variant="h5" sx={{ fontWeight: 600, ml: 2 }}>{lesson.highlight}</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>{lesson.content}</Typography>
                        </ContentPaper>
                    </Grid>
                </Grid>
                <MobileStepper
                    variant="progress"
                    steps={lessons.length}
                    position="static"
                    activeStep={idx}
                    sx={{ mt: 5, bgcolor: 'transparent' }}
                    nextButton={
                        <Button
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={() => navigate(`/lesson/${idx + 2}`)}
                            disabled={idx === lessons.length - 1}
                            sx={{ fontWeight: 700, borderRadius: 8, px: 4, ml: 2 }}
                        >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button
                            size="large"
                            color="secondary"
                            variant="outlined"
                            onClick={() => navigate(idx === 0 ? '/' : `/lesson/${idx}`)}
                            disabled={idx === 0}
                            sx={{ fontWeight: 700, borderRadius: 8, px: 4 }}
                        >
                            Previous
                        </Button>
                    }
                />
            </motion.div>
        </Container>
    );
};

export default LessonPage; 