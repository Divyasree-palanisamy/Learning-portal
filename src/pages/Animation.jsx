import { useState, useEffect, useRef } from 'react';
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
    Alert,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CodeIcon from '@mui/icons-material/Code';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import LoopIcon from '@mui/icons-material/Loop';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const AnimationSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
}));

const VisualizationArea = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #1A1A1A 0%, #2C3E50 100%)',
    borderRadius: 16,
    padding: theme.spacing(4),
    minHeight: 500,
    position: 'relative',
    overflow: 'hidden',
    border: '3px solid #FFC107',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
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
    border: '2px solid #FFC107',
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

const VariableBox = styled(motion.div)(({ theme, color }) => ({
    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
    borderRadius: 8,
    padding: theme.spacing(1, 2),
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    border: '2px solid rgba(255,255,255,0.3)',
}));

const ControlPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    background: 'linear-gradient(135deg, #FFC107, #FFB300)',
    color: '#1A1A1A',
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

const Animation = () => {
    const [currentTopic, setCurrentTopic] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const controls = useAnimation();
    const containerRef = useRef(null);

    const topics = [
        {
            title: "Introduction to Java",
            subtitle: "What is Java and why learn it?",
            content: `Java is a powerful, versatile, and widely-used programming language. It was created by James Gosling at Sun Microsystems in 1995. Java is known for its "Write Once, Run Anywhere" capability, meaning Java programs can run on any device that has a Java Virtual Machine (JVM).`,
            code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
            explanation: "This is the traditional first program in Java. It prints 'Hello, World!' to the console.",
            keyPoints: [
                "Platform Independent",
                "Object-Oriented",
                "Secure",
                "Robust",
                "High Performance"
            ],
            animation: "helloWorld"
        },
        {
            title: "Variables and Data Types",
            subtitle: "Storing and managing data in Java",
            content: `Variables are containers for storing data values. Java has different data types to store different kinds of data. Understanding data types is crucial for writing efficient Java programs.`,
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
            explanation: "Java has primitive data types for different kinds of data. Each type has a specific range and purpose.",
            keyPoints: [
                "int - for whole numbers",
                "double - for decimal numbers",
                "char - for single characters",
                "boolean - for true/false values",
                "String - for text (not primitive)"
            ],
            animation: "variables"
        },
        {
            title: "Control Structures",
            subtitle: "Making decisions and repeating actions",
            content: `Control structures allow you to control the flow of your program. They include conditional statements (if-else) and loops (for, while, do-while). These are fundamental concepts in programming.`,
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
            explanation: "This example shows how to use if-else statements to make decisions based on conditions.",
            keyPoints: [
                "if-else for decision making",
                "for loop for counting",
                "while loop for unknown iterations",
                "switch for multiple choices",
                "break and continue for control"
            ],
            animation: "controlStructures"
        }
    ];

    const currentTopicData = topics[currentTopic];

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentStep(prev => prev + 1);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
        setShowExplanation(false);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setShowExplanation(false);
    };

    const handleTopicClick = (index) => {
        setCurrentTopic(index);
        setCurrentStep(0);
        setIsPlaying(false);
        setShowExplanation(false);
    };

    const handleVoicePlay = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        }
    };

    const renderAnimation = () => {
        switch (currentTopicData.animation) {
            case "helloWorld":
                return (
                    <Box sx={{ textAlign: 'center', color: '#fff' }}>
                        <motion.div
                            animate={isPlaying ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <CodeIcon sx={{ fontSize: 80, color: '#FFC107', mb: 2 }} />
                        </motion.div>
                        <motion.div
                            animate={isPlaying ? {
                                y: [0, -20, 0],
                                opacity: [0, 1, 0]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                            <Typography variant="h4" sx={{ color: '#FFC107', fontWeight: 700 }}>
                                Hello, World!
                            </Typography>
                        </motion.div>
                    </Box>
                );
            case "variables":
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {currentTopicData.keyPoints.slice(0, 3).map((point, index) => (
                            <motion.div
                                key={index}
                                animate={isPlaying ? {
                                    x: [0, 50, 0],
                                    opacity: [0.5, 1, 0.5]
                                } : {}}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.5
                                }}
                            >
                                <VariableBox
                                    color={['#FF1744', '#00BCD4', '#FFC107'][index]}
                                    sx={{ width: 'fit-content' }}
                                >
                                    <CodeIcon sx={{ fontSize: 16 }} />
                                    {point}
                                </VariableBox>
                            </motion.div>
                        ))}
                    </Box>
                );
            case "controlStructures":
                return (
                    <Box sx={{ textAlign: 'center', color: '#fff' }}>
                        <motion.div
                            animate={isPlaying ? {
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            } : {}}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Box sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    IF
                                </Typography>
                            </Box>
                        </motion.div>
                        <motion.div
                            animate={isPlaying ? {
                                y: [0, -10, 0],
                                opacity: [0.7, 1, 0.7]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        >
                            <Typography variant="body1" sx={{ color: '#FFC107' }}>
                                Decision Making Flow
                            </Typography>
                        </motion.div>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ pt: 8 }}>
            <AnimationSection>
                <Container maxWidth="lg">
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
                            Interactive Java Learning
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ mb: 8, color: 'text.secondary', fontWeight: 500 }}
                        >
                            Visualize Java concepts with interactive animations and course content
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <VisualizationArea ref={containerRef}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <SchoolIcon sx={{ color: '#FFC107', mr: 1 }} />
                                        <Typography variant="h6" sx={{ color: '#FFC107', fontWeight: 600 }}>
                                            {currentTopicData.title}
                                        </Typography>
                                    </Box>

                                    {renderAnimation()}

                                    <Box sx={{ mt: 4 }}>
                                        <CodeBlock>
                                            {currentTopicData.code}
                                        </CodeBlock>

                                        <AnimatePresence>
                                            {showExplanation && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Alert
                                                        severity="info"
                                                        sx={{ mt: 2 }}
                                                        icon={<CodeIcon />}
                                                    >
                                                        {currentTopicData.explanation}
                                                    </Alert>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Box>
                                </VisualizationArea>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <ControlPanel>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                                        Learning Controls
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<PlayArrowIcon />}
                                            onClick={handlePlay}
                                            disabled={isPlaying}
                                            sx={{ flex: 1, bgcolor: '#1A1A1A', '&:hover': { bgcolor: '#333' } }}
                                        >
                                            Play
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<PauseIcon />}
                                            onClick={handlePause}
                                            disabled={!isPlaying}
                                            sx={{ flex: 1, bgcolor: '#1A1A1A', '&:hover': { bgcolor: '#333' } }}
                                        >
                                            Pause
                                        </Button>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        startIcon={<RestartAltIcon />}
                                        onClick={handleReset}
                                        fullWidth
                                        sx={{
                                            borderColor: '#1A1A1A',
                                            color: '#1A1A1A',
                                            mb: 3,
                                            '&:hover': {
                                                borderColor: '#333',
                                                color: '#333',
                                                bgcolor: 'rgba(26,26,26,0.1)'
                                            }
                                        }}
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        variant="contained"
                                        startIcon={<VolumeUpIcon />}
                                        onClick={() => handleVoicePlay(currentTopicData.content)}
                                        fullWidth
                                        sx={{
                                            bgcolor: '#4CAF50',
                                            mb: 3,
                                            '&:hover': { bgcolor: '#45a049' }
                                        }}
                                    >
                                        Listen to Explanation
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        onClick={() => setShowExplanation(!showExplanation)}
                                        fullWidth
                                        sx={{
                                            borderColor: '#1A1A1A',
                                            color: '#1A1A1A',
                                            '&:hover': {
                                                borderColor: '#333',
                                                color: '#333',
                                                bgcolor: 'rgba(26,26,26,0.1)'
                                            }
                                        }}
                                    >
                                        {showExplanation ? 'Hide' : 'Show'} Code Explanation
                                    </Button>
                                </ControlPanel>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Container>
            </AnimationSection>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{ mb: 6, fontWeight: 700, color: 'secondary.main' }}
                    >
                        Java Learning Topics
                    </Typography>

                    <Grid container spacing={3}>
                        {topics.map((topic, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <TopicCard
                                        isActive={currentTopic === index}
                                        onClick={() => handleTopicClick(index)}
                                    >
                                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                            <SchoolIcon sx={{
                                                fontSize: 60,
                                                color: currentTopic === index ? '#FFD54F' : 'primary.main',
                                                mb: 2
                                            }} />
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                                {topic.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                                                {topic.subtitle}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                                {topic.keyPoints.slice(0, 3).map((point, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={point}
                                                        size="small"
                                                        color={currentTopic === index ? "secondary" : "primary"}
                                                        variant="outlined"
                                                        icon={<CheckCircleIcon />}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </TopicCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Animation; 