import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
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
    Drawer,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAlt';

const palette = {
    background: 'linear-gradient(135deg, #23235B 0%, #6A1B9A 100%)',
    card: 'linear-gradient(135deg, #fff 0%, #e3e6f3 100%)',
    accent: '#FFD54F',
    nav: 'linear-gradient(135deg, #00bcd4 0%, #23235B 100%)',
    selected: '#8E24AA',
    text: '#23235B',
    white: '#fff',
};

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(8),
    paddingBottom: 0,
    margin: 0,
    width: '100%',
}));

const Sidebar = styled(Paper)(({ theme }) => ({
    background: palette.nav,
    borderRadius: 20,
    padding: theme.spacing(3, 2),
    minWidth: 240,
    color: palette.white,
    marginRight: theme.spacing(4),
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        marginRight: 0,
        marginBottom: theme.spacing(3),
    },
}));

const TopicButton = styled(Button)(({ theme, selected }) => ({
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: theme.spacing(1),
    background: selected ? palette.selected : 'transparent',
    color: palette.white,
    fontWeight: selected ? 700 : 500,
    borderRadius: 12,
    boxShadow: selected ? '0 4px 16px rgba(142,36,170,0.15)' : 'none',
    border: selected ? `2px solid ${palette.accent}` : '2px solid transparent',
    transition: 'all 0.2s',
    '&:hover': {
        background: palette.selected,
        color: palette.white,
    },
    textTransform: 'none',
    fontSize: '1.1rem',
    padding: theme.spacing(1.5, 2),
    gap: theme.spacing(1),
}));

const ContentCard = styled(Card)(({ theme }) => ({
    background: palette.card,
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    border: '2px solid rgba(255,255,255,0.18)',
    minWidth: 0,
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 0, 4, 0),
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
        background: 'linear-gradient(90deg, #FFD54F, #00BCD4)',
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

const KeyPointChip = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #FFD54F, #00BCD4)',
    color: palette.text,
    borderRadius: 16,
    padding: theme.spacing(0.5, 2),
    fontWeight: 600,
    fontSize: '1rem',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(35,35,91,0.08)',
}));

const HeaderBar = styled(Box)(({ theme }) => ({
    width: '100%',
    background: 'linear-gradient(90deg, #23235B 0%, #6A1B9A 100%)',
    color: '#FFD54F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: theme.spacing(3, 4),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    boxShadow: '0 4px 16px rgba(35,35,91,0.10)',
}));

const Course = () => {
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const sections = [
        {
            title: "Introduction to Java",
            subtitle: "What is Java and why learn it?",
            content: `Java is a powerful, versatile, and widely-used programming language. It was created by James Gosling at Sun Microsystems in 1995. Java is known for its "Write Once, Run Anywhere" capability, meaning Java programs can run on any device that has a Java Virtual Machine (JVM).`,
            examples: [
                {
                    title: "Your First Java Program",
                    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}`,
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
                    code: `// Integer types\nint age = 25;\nlong population = 7800000000L;\n\n// Floating point types\ndouble price = 19.99;\nfloat temperature = 98.6f;\n\n// Character type\nchar grade = 'A';\n\n// Boolean type\nboolean isJavaFun = true;`,
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
                    code: `int score = 85;\n\nif (score >= 90) {\n    System.out.println(\"Excellent!\");\n} else if (score >= 80) {\n    System.out.println(\"Good job!\");\n} else if (score >= 70) {\n    System.out.println(\"Keep trying!\");\n} else {\n    System.out.println(\"Need improvement\");\n}`,
                    explanation: "This example shows how to use if-else statements to make decisions based on conditions."
                },
                {
                    title: "For Loop",
                    code: `// Print numbers from 1 to 5\nfor (int i = 1; i <= 5; i++) {\n    System.out.println(\"Number: \" + i);\n}\n\n// Result:\n// Number: 1\n// Number: 2\n// Number: 3\n// Number: 4\n// Number: 5`,
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

    const topic = sections[selectedTopic];

    return (
        <MainContainer>
            <Box sx={{ display: 'flex', flex: 1, width: '100%', gap: 4, mt: 2, mb: 2, px: { xs: 2, md: 4 } }}>
                <Sidebar elevation={3}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: palette.accent, letterSpacing: 1 }}>
                        Topics
                    </Typography>
                    <List>
                        {sections.map((section, idx) => (
                            <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                                <TopicButton
                                    selected={selectedTopic === idx}
                                    onClick={() => setSelectedTopic(idx)}
                                    startIcon={<ArrowRightIcon sx={{ color: selectedTopic === idx ? palette.accent : '#fff' }} />}
                                >
                                    {section.title}
                                </TopicButton>
                            </ListItem>
                        ))}
                    </List>
                </Sidebar>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, px: { xs: 2, md: 4 } }}>
                    <motion.div
                        key={selectedTopic}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ContentCard>
                            <HeaderBar>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFD54F', letterSpacing: 1 }}>
                                    {topic.title}
                                </Typography>
                            </HeaderBar>
                            <Box sx={{ p: { xs: 2, md: 4 } }}>
                                <Typography variant="h6" sx={{ mb: 3, color: palette.selected, fontWeight: 600 }}>
                                    {topic.subtitle}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: palette.text }}>
                                    {topic.content}
                                </Typography>
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: palette.accent }}>
                                        Key Points
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {topic.keyPoints.map((point, idx) => (
                                            <KeyPointChip key={idx}>{point}</KeyPointChip>
                                        ))}
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 4, borderColor: palette.selected, opacity: 0.3 }} />
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: palette.selected }}>
                                        Example Code
                                    </Typography>
                                    {topic.examples.map((ex, i) => (
                                        <Box key={i} sx={{ mb: 3 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: palette.accent, mb: 1 }}>
                                                {ex.title}
                                            </Typography>
                                            <CodeBlock>
                                                {ex.code}
                                            </CodeBlock>
                                            <Typography variant="body1" sx={{ color: '#23235B', fontWeight: 500 }}>
                                                {ex.explanation}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </ContentCard>
                    </motion.div>
                </Box>
            </Box>
        </MainContainer>
    );
};

export default Course; 