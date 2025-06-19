import { useState, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Paper,
    Chip,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CourseSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
}));

const ContentCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
    borderRadius: 20,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    },
}));

const TopicCard = styled(Card)(({ theme, isActive }) => ({
    background: isActive
        ? 'linear-gradient(135deg, #6A1B9A, #8E24AA)'
        : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
    color: isActive ? '#fff' : '#1A1A1A',
    borderRadius: 20,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    },
}));

const CodeBlock = styled(Box)(({ theme }) => ({
    background: '#1A1A1A',
    color: '#ECF0F1',
    padding: theme.spacing(3),
    borderRadius: 12,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    margin: theme.spacing(2, 0),
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(90deg, #FF1744, #00BCD4)',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
}));

const VoiceButton = styled(IconButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #00BCD4, #008BA3)',
    color: '#fff',
    marginLeft: theme.spacing(1),
    '&:hover': {
        background: 'linear-gradient(135deg, #008BA3, #006064)',
        transform: 'scale(1.1)',
    },
}));

const Course = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const sectionRefs = useRef([]);

    const sections = [
        {
            title: "Introduction to Java",
            subtitle: "What is Java and why learn it?",
            content: `Java is a powerful, versatile, and widely-used programming language. It was created by James Gosling at Sun Microsystems in 1995. Java is known for its "Write Once, Run Anywhere" capability, meaning Java programs can run on any device that has a Java Virtual Machine (JVM).`,
            examples: [
                {
                    title: "Your First Java Program",
                    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
                    explanation: "This is the traditional first program in Java. It prints 'Hello, World!' to the console."
                }
            ],
            keyPoints: [
                "Platform Independent",
                "Object-Oriented",
                "Secure",
                "Robust",
                "High Performance"
            ]
        },
        {
            title: "Variables and Data Types",
            subtitle: "Storing and managing data in Java",
            content: `Variables are containers for storing data values. Java has different data types to store different kinds of data. Understanding data types is crucial for writing efficient Java programs.`,
            examples: [
                {
                    title: "Basic Data Types",
                    code: `// Integer types
int age = 25;
long population = 7800000000L;

// Floating point types
double price = 19.99;
float temperature = 98.6f;

// Character type
char grade = 'A';

// Boolean type
boolean isJavaFun = true;`,
                    explanation: "Java has primitive data types for different kinds of data. Each type has a specific range and purpose."
                }
            ],
            keyPoints: [
                "int - for whole numbers",
                "double - for decimal numbers",
                "char - for single characters",
                "boolean - for true/false values",
                "String - for text (not primitive)"
            ]
        },
        {
            title: "Control Structures",
            subtitle: "Making decisions and repeating actions",
            content: `Control structures allow you to control the flow of your program. They include conditional statements (if-else) and loops (for, while, do-while). These are fundamental concepts in programming.`,
            examples: [
                {
                    title: "If-Else Statement",
                    code: `int score = 85;

if (score >= 90) {
    System.out.println("Excellent!");
} else if (score >= 80) {
    System.out.println("Good job!");
} else if (score >= 70) {
    System.out.println("Keep trying!");
} else {
    System.out.println("Need improvement");
}`,
                    explanation: "This example shows how to use if-else statements to make decisions based on conditions."
                },
                {
                    title: "For Loop",
                    code: `// Print numbers from 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println("Number: " + i);
}

// Result:
// Number: 1
// Number: 2
// Number: 3
// Number: 4
// Number: 5`,
                    explanation: "For loops are used when you know how many times you want to repeat an action."
                }
            ],
            keyPoints: [
                "if-else for decision making",
                "for loop for counting",
                "while loop for unknown iterations",
                "switch for multiple choices",
                "break and continue for control"
            ]
        }
    ];

    const handleVoicePlay = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
            setIsPlaying(true);

            utterance.onend = () => setIsPlaying(false);
        } else {
            alert('Voice feature not supported in this browser');
        }
    };

    const scrollToSection = (index) => {
        setCurrentSection(index);
        if (sectionRefs.current[index]) {
            sectionRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const SectionContent = ({ section, index }) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, margin: "-100px" });

        // Store ref for navigation
        sectionRefs.current[index] = ref.current;

        return (
            <CourseSection ref={ref}>
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <ContentCard>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                                {section.title}
                                            </Typography>
                                            <VoiceButton
                                                onClick={() => handleVoicePlay(section.content)}
                                                disabled={isPlaying}
                                            >
                                                <VolumeUpIcon />
                                            </VoiceButton>
                                        </Box>

                                        <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary', fontWeight: 500 }}>
                                            {section.subtitle}
                                        </Typography>

                                        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                                            {section.content}
                                        </Typography>

                                        <Box sx={{ mb: 4 }}>
                                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'secondary.main' }}>
                                                Key Points:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {section.keyPoints.map((point, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={point}
                                                        color="primary"
                                                        variant="outlined"
                                                        icon={<CheckCircleIcon />}
                                                        sx={{ fontWeight: 500 }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        {section.examples.map((example, idx) => (
                                            <Accordion key={idx} sx={{ mb: 2, borderRadius: 2 }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                            {example.title}
                                                        </Typography>
                                                    </Box>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <CodeBlock>
                                                        {example.code}
                                                    </CodeBlock>
                                                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                                        {example.explanation}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </CardContent>
                                </ContentCard>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #FFC107, #FFB300)' }}>
                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#1A1A1A' }}>
                                        Course Navigation
                                    </Typography>
                                    <Box sx={{ mb: 3 }}>
                                        {sections.map((_, idx) => (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2,
                                                    p: 1,
                                                    borderRadius: 2,
                                                    bgcolor: idx === currentSection ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(255,255,255,0.5)',
                                                    },
                                                }}
                                                onClick={() => scrollToSection(idx)}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: '50%',
                                                        bgcolor: idx === currentSection ? '#4CAF50' : '#ccc',
                                                        mr: 2,
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontWeight: idx === currentSection ? 600 : 400,
                                                        color: idx === currentSection ? '#1A1A1A' : '#666',
                                                    }}
                                                >
                                                    {sections[idx].title}
                                                </Typography>
                                                <NavigateNextIcon sx={{ ml: 'auto', color: '#666' }} />
                                            </Box>
                                        ))}
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => scrollToSection(Math.min(currentSection + 1, sections.length - 1))}
                                        disabled={currentSection >= sections.length - 1}
                                        sx={{ fontWeight: 600, bgcolor: '#1A1A1A', '&:hover': { bgcolor: '#333' } }}
                                    >
                                        Next Section
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Container>
            </CourseSection>
        );
    };

    return (
        <Box sx={{ pt: 8 }}>
            {/* Topics Overview Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{ mb: 6, fontWeight: 700, color: 'primary.main' }}
                    >
                        Java Programming Course
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mb: 8, color: 'text.secondary', fontWeight: 500 }}
                    >
                        Click on any topic to jump to that section
                    </Typography>

                    <Grid container spacing={4}>
                        {sections.map((section, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <TopicCard
                                        isActive={currentSection === index}
                                        onClick={() => scrollToSection(index)}
                                    >
                                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                            <SchoolIcon sx={{
                                                fontSize: 60,
                                                color: currentSection === index ? '#FFD54F' : 'primary.main',
                                                mb: 2
                                            }} />
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                                {section.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                                                {section.subtitle}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                                {section.keyPoints.slice(0, 3).map((point, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={point}
                                                        size="small"
                                                        color={currentSection === index ? "secondary" : "primary"}
                                                        variant="outlined"
                                                        icon={<CheckCircleIcon />}
                                                    />
                                                ))}
                                            </Box>
                                            <Button
                                                variant="contained"
                                                startIcon={<PlayArrowIcon />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    scrollToSection(index);
                                                }}
                                                sx={{
                                                    mt: 2,
                                                    bgcolor: currentSection === index ? '#FFD54F' : 'primary.main',
                                                    color: currentSection === index ? '#1A1A1A' : '#fff',
                                                    '&:hover': {
                                                        bgcolor: currentSection === index ? '#FFC107' : 'primary.dark'
                                                    }
                                                }}
                                            >
                                                Learn This Topic
                                            </Button>
                                        </CardContent>
                                    </TopicCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>

            {/* Individual Section Content */}
            {sections.map((section, index) => (
                <SectionContent key={index} section={section} index={index} />
            ))}
        </Box>
    );
};

export default Course; 