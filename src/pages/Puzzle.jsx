import { useState, useEffect } from 'react';
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
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PuzzleSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
}));

const QuestionCard = styled(Card)(({ theme }) => ({
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

const ProgressCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    background: 'linear-gradient(135deg, #FFC107, #FFB300)',
    color: '#1A1A1A',
}));

const OptionButton = styled(Button)(({ theme, selected, correct, answered }) => ({
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 12,
    textAlign: 'left',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1),
    transition: 'all 0.3s ease',
    background: selected
        ? (correct ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #d32f2f)')
        : 'linear-gradient(135deg, #fff, #f8f9fa)',
    color: selected ? '#fff' : '#1A1A1A',
    border: selected ? 'none' : '2px solid #e0e0e0',
    '&:hover': {
        transform: selected ? 'none' : 'translateY(-2px)',
        boxShadow: selected ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
    },
}));

const Puzzle = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [difficulty, setDifficulty] = useState('beginner');

    const questions = {
        beginner: [
            {
                question: "What is the correct way to declare a variable in Java?",
                options: [
                    "var name = 'John';",
                    "String name = 'John';",
                    "name = 'John';",
                    "variable name = 'John';"
                ],
                correct: 1,
                explanation: "In Java, you must specify the data type when declaring a variable. 'String name = \"John\";' is the correct syntax."
            },
            {
                question: "Which keyword is used to create a class in Java?",
                options: [
                    "class",
                    "Class",
                    "className",
                    "type"
                ],
                correct: 0,
                explanation: "The 'class' keyword is used to define a class in Java."
            },
            {
                question: "What is the output of: System.out.println(5 + 3);",
                options: [
                    "53",
                    "8",
                    "5 + 3",
                    "Error"
                ],
                correct: 1,
                explanation: "The + operator performs addition when both operands are numbers, so 5 + 3 = 8."
            },
            {
                question: "Which data type is used for whole numbers in Java?",
                options: [
                    "float",
                    "double",
                    "int",
                    "String"
                ],
                correct: 2,
                explanation: "The 'int' data type is used for whole numbers in Java."
            },
            {
                question: "How do you create a comment in Java?",
                options: [
                    "// This is a comment",
                    "/* This is a comment */",
                    "<!-- This is a comment -->",
                    "All of the above"
                ],
                correct: 3,
                explanation: "Java supports both single-line comments (//) and multi-line comments (/* */)."
            }
        ],
        intermediate: [
            {
                question: "What is the difference between == and .equals() in Java?",
                options: [
                    "There is no difference",
                    "== compares references, .equals() compares content",
                    "== compares content, .equals() compares references",
                    "Both compare references"
                ],
                correct: 1,
                explanation: "== compares object references (memory addresses), while .equals() compares the actual content of objects."
            },
            {
                question: "Which of the following is NOT a valid access modifier in Java?",
                options: [
                    "public",
                    "private",
                    "protected",
                    "internal"
                ],
                correct: 3,
                explanation: "Java has four access modifiers: public, private, protected, and default (no modifier). 'internal' is not a Java keyword."
            },
            {
                question: "What happens when you try to access an array element at an invalid index?",
                options: [
                    "The program continues normally",
                    "ArrayIndexOutOfBoundsException is thrown",
                    "The element is automatically created",
                    "The program crashes"
                ],
                correct: 1,
                explanation: "Accessing an array with an invalid index throws an ArrayIndexOutOfBoundsException."
            },
            {
                question: "Which method is called when an object is created?",
                options: [
                    "main()",
                    "constructor",
                    "init()",
                    "create()"
                ],
                correct: 1,
                explanation: "A constructor is automatically called when an object is created using the 'new' keyword."
            },
            {
                question: "What is the purpose of the 'static' keyword in Java?",
                options: [
                    "To make a variable constant",
                    "To make a method belong to the class rather than instances",
                    "To prevent inheritance",
                    "To make a class abstract"
                ],
                correct: 1,
                explanation: "The 'static' keyword makes a method or variable belong to the class itself rather than to instances of the class."
            }
        ],
        advanced: [
            {
                question: "What is the difference between ArrayList and LinkedList?",
                options: [
                    "There is no difference",
                    "ArrayList is faster for random access, LinkedList is faster for insertions/deletions",
                    "LinkedList is faster for random access, ArrayList is faster for insertions/deletions",
                    "ArrayList can only store objects, LinkedList can store primitives"
                ],
                correct: 1,
                explanation: "ArrayList provides O(1) random access but O(n) insertions/deletions, while LinkedList provides O(n) random access but O(1) insertions/deletions."
            },
            {
                question: "What is the purpose of the 'volatile' keyword in Java?",
                options: [
                    "To make a variable constant",
                    "To ensure thread safety for a single variable",
                    "To prevent garbage collection",
                    "To make a method synchronized"
                ],
                correct: 1,
                explanation: "The 'volatile' keyword ensures that a variable's value is always read from main memory, not from thread cache, providing thread safety for single variables."
            },
            {
                question: "What is the difference between 'final' and 'finally' in Java?",
                options: [
                    "There is no difference",
                    "'final' is for variables, 'finally' is for exception handling",
                    "'finally' is for variables, 'final' is for exception handling",
                    "Both are for exception handling"
                ],
                correct: 1,
                explanation: "'final' is used to make variables, methods, or classes unchangeable, while 'finally' is used in exception handling to ensure code always executes."
            },
            {
                question: "What is the purpose of the 'transient' keyword in Java?",
                options: [
                    "To make a variable constant",
                    "To prevent serialization of a field",
                    "To make a method synchronized",
                    "To prevent inheritance"
                ],
                correct: 1,
                explanation: "The 'transient' keyword prevents a field from being serialized when the object is converted to a byte stream."
            },
            {
                question: "What is the difference between 'synchronized' and 'volatile'?",
                options: [
                    "There is no difference",
                    "'synchronized' provides mutual exclusion, 'volatile' provides visibility",
                    "'volatile' provides mutual exclusion, 'synchronized' provides visibility",
                    "Both provide the same functionality"
                ],
                correct: 1,
                explanation: "'synchronized' provides both mutual exclusion and visibility, while 'volatile' only provides visibility for a single variable."
            }
        ]
    };

    const currentQuestions = questions[difficulty];
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    // Helper functions
    const getScorePercentage = () => {
        return (score / questions.length) * 100;
    };

    const getPerformanceMessage = () => {
        const percentage = getScorePercentage();
        if (percentage >= 90) return "Excellent! You're a Java master!";
        if (percentage >= 70) return "Great job! You have a solid understanding!";
        if (percentage >= 50) return "Good effort! Keep practicing!";
        return "Keep learning! Review the basics and try again!";
    };

    const getProgressPercentage = () => {
        return ((currentQuestion + 1) / questions.length) * 100;
    };

    const handleAnswerSelect = (answerIndex) => {
        if (!answered) {
            setSelectedAnswer(answerIndex);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setAnswered(true);
            if (selectedAnswer === currentQuestions[currentQuestion].correct) {
                setScore(score + 1);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestion < currentQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    return (
        <Box sx={{ pt: 8 }}>
            <PuzzleSection>
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
                            Test Your Java Knowledge
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ mb: 8, color: 'text.secondary', fontWeight: 500 }}
                        >
                            Challenge yourself with adaptive puzzles based on your progress
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <QuestionCard>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                                    Question {currentQuestion + 1} of {currentQuestions.length}
                                                </Typography>
                                                <Chip
                                                    label={difficulty.toUpperCase()}
                                                    color="secondary"
                                                    size="small"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Box>
                                        </Box>

                                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, lineHeight: 1.4 }}>
                                            {currentQuestions[currentQuestion].question}
                                        </Typography>

                                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                                            <RadioGroup value={selectedAnswer} onChange={(e) => handleAnswerSelect(parseInt(e.target.value))}>
                                                {currentQuestions[currentQuestion].options.map((option, index) => (
                                                    <OptionButton
                                                        key={index}
                                                        selected={selectedAnswer === index}
                                                        correct={currentQuestions[currentQuestion].correct === index}
                                                        answered={answered}
                                                        onClick={() => handleAnswerSelect(index)}
                                                        startIcon={
                                                            answered && (
                                                                selectedAnswer === index ? (
                                                                    currentQuestions[currentQuestion].correct === index ? (
                                                                        <CheckCircleIcon />
                                                                    ) : (
                                                                        <CancelIcon />
                                                                    )
                                                                ) : currentQuestions[currentQuestion].correct === index ? (
                                                                    <CheckCircleIcon />
                                                                ) : null
                                                            )
                                                        }
                                                    >
                                                        {option}
                                                    </OptionButton>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>

                                        {answered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Paper sx={{ p: 3, mt: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4CAF50' }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#2E7D32' }}>
                                                        {currentQuestions[currentQuestion].explanation}
                                                    </Typography>
                                                </Paper>
                                            </motion.div>
                                        )}

                                        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleSubmit}
                                                disabled={selectedAnswer === null || answered}
                                                sx={{
                                                    fontWeight: 600,
                                                    bgcolor: 'primary.main',
                                                    '&:hover': { bgcolor: 'primary.dark' }
                                                }}
                                            >
                                                Submit Answer
                                            </Button>
                                            {answered && (
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleNext}
                                                    sx={{
                                                        fontWeight: 600,
                                                        borderColor: 'secondary.main',
                                                        color: 'secondary.main',
                                                        '&:hover': {
                                                            borderColor: 'secondary.dark',
                                                            color: 'secondary.dark'
                                                        }
                                                    }}
                                                >
                                                    {currentQuestion < currentQuestions.length - 1 ? 'Next Question' : 'See Results'}
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </QuestionCard>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <ProgressCard>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                                        Your Progress
                                    </Typography>

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Progress</Typography>
                                            <Typography variant="body2">{Math.round(progress)}%</Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: 'rgba(255,255,255,0.3)',
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: '#1A1A1A',
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            Score: {score}/{currentQuestions.length}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(26,26,26,0.7)' }}>
                                            Correct answers so far
                                        </Typography>
                                    </Box>

                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                                            Difficulty Level
                                        </Typography>
                                        <RadioGroup
                                            value={difficulty}
                                            onChange={(e) => {
                                                setDifficulty(e.target.value);
                                                handleRestart();
                                            }}
                                        >
                                            <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                                            <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                                            <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
                                        </RadioGroup>
                                    </FormControl>

                                    <Button
                                        variant="outlined"
                                        onClick={handleRestart}
                                        fullWidth
                                        sx={{
                                            borderColor: '#1A1A1A',
                                            color: '#1A1A1A',
                                        }}
                                    >
                                        Restart Quiz
                                    </Button>
                                </ProgressCard>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Container>
            </PuzzleSection>
        </Box>
    );
};

export default Puzzle; 