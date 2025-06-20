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
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const PuzzleSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0a2342 0%, #3a0ca3 50%, #00b4d8 100%)',
}));

const QuestionCard = styled(motion(Card))(({ theme }) => ({
    background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(58,12,163,0.10)',
    border: '2px solid rgba(0,180,216,0.15)',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    '&:hover': {
        transform: 'translateY(-6px) scale(1.02)',
        boxShadow: '0 16px 48px rgba(58,12,163,0.18)',
    },
}));

const ProgressCard = styled(motion(Paper))(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 20,
    background: 'linear-gradient(135deg, #ffd60a, #ffc300)',
    color: '#0a2342',
    boxShadow: '0 4px 24px rgba(0,180,216,0.10)',
}));

const OptionButton = styled(motion(Button))(({ theme, selected, correct, answered }) => ({
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 14,
    textAlign: 'left',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: '1.1rem',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    background: selected
        ? (correct ? 'linear-gradient(90deg, #00b4d8, #3a0ca3)' : 'linear-gradient(90deg, #f44336, #720026)')
        : 'linear-gradient(90deg, #fff, #e0e7ff)',
    color: selected ? '#fff' : '#0a2342',
    border: selected ? 'none' : '2px solid #bdbdbd',
    boxShadow: selected ? '0 2px 12px rgba(58,12,163,0.10)' : 'none',
    '&:hover': {
        transform: selected ? 'scale(1.01)' : 'translateY(-2px) scale(1.03)',
        boxShadow: selected ? '0 4px 16px rgba(0,180,216,0.12)' : '0 4px 16px rgba(58,12,163,0.10)',
    },
}));

// Confetti effect (simple SVG burst)
const Confetti = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
    >
        <CelebrationIcon sx={{ fontSize: 80, color: '#ffd60a' }} />
    </motion.div>
);

const Puzzle = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [difficulty, setDifficulty] = useState('beginner');
    const [showConfetti, setShowConfetti] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false);
    const scoreRef = useRef(null);
    const [displayScore, setDisplayScore] = useState(0);
    const energeticMessages = {
        correct: [
            "Awesome! Keep it up!",
            "Great job! You're on fire!",
            "Correct! You're crushing it!",
            "Fantastic! Keep going!",
            "Brilliant! Next one!"
        ],
        incorrect: [
            "Don't worry, try the next one!",
            "Keep going, you can do it!",
            "Almost there! Stay focused!",
            "Keep your spirits high!",
            "You'll get the next one!"
        ]
    };
    const [energeticMsg, setEnergeticMsg] = useState("");

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
            let isCorrect = selectedAnswer === currentQuestions[currentQuestion].correct;
            if (isCorrect) {
                setScore(score + 1);
            }
            // Pick a random energetic message
            const msgArr = isCorrect ? energeticMessages.correct : energeticMessages.incorrect;
            setEnergeticMsg(msgArr[Math.floor(Math.random() * msgArr.length)]);
        }
    };

    const handleNext = () => {
        if (currentQuestion < currentQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setAnswered(false);
            setEnergeticMsg(""); // Reset energetic message
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

    useEffect(() => {
        if (showResult) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2500);
            setShowResultDialog(true);
        }
    }, [showResult]);

    useEffect(() => {
        if (showResult) {
            let start = 0;
            const end = score;
            if (start === end) return;
            let increment = end > 0 ? 1 : 0;
            let timer = setInterval(() => {
                start += increment;
                setDisplayScore(start);
                if (start === end) clearInterval(timer);
            }, 80);
            return () => clearInterval(timer);
        } else {
            setDisplayScore(0);
        }
    }, [showResult, score]);

    return (
        <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', p: 0, m: 0 }}>
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
                            sx={{ mb: 6, fontWeight: 700, color: '#ffd60a', textShadow: '0 2px 8px #0a2342' }}
                        >
                            Test Your Java Knowledge
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ mb: 8, color: '#e0e7ff', fontWeight: 500, textShadow: '0 1px 4px #3a0ca3' }}
                        >
                            Challenge yourself with adaptive puzzles based on your progress
                        </Typography>
                        <Grid container spacing={4} alignItems="flex-start">
                            <Grid item xs={12} md={8}>
                                <AnimatePresence mode="wait">
                                    <QuestionCard
                                        key={currentQuestion}
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -80 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <CardContent sx={{ p: 4, position: 'relative' }}>
                                            {showConfetti && <Confetti />}
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#3a0ca3', bgcolor: '#ffd60a', px: 2, py: 0.5, borderRadius: 2 }}>
                                                    Score: {score} / {currentQuestions.length}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                <PsychologyIcon sx={{ fontSize: 40, color: '#3a0ca3', mr: 2 }} />
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#3a0ca3' }}>
                                                        Question {currentQuestion + 1} of {currentQuestions.length}
                                                    </Typography>
                                                    <Chip
                                                        label={difficulty.toUpperCase()}
                                                        sx={{ fontWeight: 600, bgcolor: '#00b4d8', color: '#fff', letterSpacing: 1 }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, lineHeight: 1.4, color: '#0a2342' }}>
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
                                                            whileTap={{ scale: 0.97 }}
                                                            whileHover={{ scale: 1.03, boxShadow: '0 4px 24px #00b4d833' }}
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
                                                    <Paper sx={{ p: 3, mt: 3, bgcolor: 'rgba(0,180,216,0.08)', border: '2px solid #00b4d8' }}>
                                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#3a0ca3' }}>
                                                            {currentQuestions[currentQuestion].explanation}
                                                        </Typography>
                                                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: '#ffd60a', textAlign: 'center' }}>
                                                            {energeticMsg}
                                                        </Typography>
                                                    </Paper>
                                                </motion.div>
                                            )}
                                            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                                <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleSubmit}
                                                        disabled={selectedAnswer === null || answered}
                                                        sx={{
                                                            fontWeight: 700,
                                                            bgcolor: '#3a0ca3',
                                                            color: '#fff',
                                                            px: 4,
                                                            boxShadow: '0 2px 12px #3a0ca344',
                                                            '&:hover': { bgcolor: '#0a2342', color: '#ffd60a' }
                                                        }}
                                                    >
                                                        Submit Answer
                                                    </Button>
                                                </motion.div>
                                                {answered && (
                                                    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={handleNext}
                                                            sx={{
                                                                fontWeight: 700,
                                                                borderColor: '#00b4d8',
                                                                color: '#00b4d8',
                                                                px: 4,
                                                                '&:hover': {
                                                                    borderColor: '#3a0ca3',
                                                                    color: '#3a0ca3',
                                                                    bgcolor: '#e0e7ff',
                                                                }
                                                            }}
                                                        >
                                                            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' : 'See Results'}
                                                        </Button>
                                                    </motion.div>
                                                )}
                                            </Box>
                                        </CardContent>
                                    </QuestionCard>
                                </AnimatePresence>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ position: { md: 'sticky' }, top: { md: 32 }, zIndex: 2, minWidth: { md: 320 }, maxWidth: { md: 400 }, width: '100%', mx: 'auto' }}>
                                    <ProgressCard
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.2 }}
                                    >
                                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#0a2342' }}>
                                            Your Progress
                                        </Typography>
                                        <Box sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2">Progress</Typography>
                                                <Typography variant="body2">{Math.round(progress)}%</Typography>
                                            </Box>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.7 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={progress}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        bgcolor: 'rgba(255,255,255,0.3)',
                                                        '& .MuiLinearProgress-bar': {
                                                            bgcolor: '#3a0ca3',
                                                        }
                                                    }}
                                                />
                                            </motion.div>
                                        </Box>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#3a0ca3' }}>
                                                Score: <motion.span
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1.1 }}
                                                    transition={{ duration: 0.5 }}
                                                    style={{ color: '#3a0ca3' }}
                                                >{showResult ? displayScore : score}</motion.span>
                                                <span style={{ color: '#3a0ca3' }}>/ {currentQuestions.length}</span>
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(26,26,26,0.7)' }}>
                                                Correct answers so far
                                            </Typography>
                                        </Box>
                                        <FormControl fullWidth sx={{ mb: 3 }}>
                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#0a2342' }}>
                                                Difficulty Level
                                            </Typography>
                                            <RadioGroup
                                                value={difficulty}
                                                onChange={(e) => {
                                                    setDifficulty(e.target.value);
                                                    handleRestart();
                                                }}
                                            >
                                                <FormControlLabel value="beginner" control={<Radio sx={{ color: '#00b4d8' }} />} label="Beginner" />
                                                <FormControlLabel value="intermediate" control={<Radio sx={{ color: '#3a0ca3' }} />} label="Intermediate" />
                                                <FormControlLabel value="advanced" control={<Radio sx={{ color: '#ffd60a' }} />} label="Advanced" />
                                            </RadioGroup>
                                        </FormControl>
                                        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
                                            <Button
                                                variant="outlined"
                                                onClick={handleRestart}
                                                fullWidth
                                                sx={{
                                                    borderColor: '#0a2342',
                                                    color: '#0a2342',
                                                    fontWeight: 700,
                                                    '&:hover': {
                                                        borderColor: '#3a0ca3',
                                                        color: '#3a0ca3',
                                                        bgcolor: '#e0e7ff',
                                                    }
                                                }}
                                            >
                                                Restart Quiz
                                            </Button>
                                        </motion.div>
                                    </ProgressCard>
                                </Box>
                            </Grid>
                        </Grid>
                        {/* Result Dialog with animation */}
                        <Dialog open={showResultDialog} onClose={() => setShowResultDialog(false)} maxWidth="xs" fullWidth>
                            <DialogTitle sx={{ textAlign: 'center', bgcolor: '#3a0ca3', color: '#ffd60a', fontWeight: 700, fontSize: 28 }}>
                                <motion.div
                                    initial={{ scale: 0.7, rotate: -10 }}
                                    animate={{ scale: 1.1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    style={{ display: 'inline-block' }}
                                >
                                    <EmojiEmotionsIcon sx={{ fontSize: 48, color: '#ffd60a', mb: -1 }} />
                                </motion.div>
                                <br />Quiz Complete!
                            </DialogTitle>
                            <DialogContent sx={{ textAlign: 'center', py: 4, bgcolor: '#e0e7ff' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#3a0ca3', mb: 2 }}>
                                    Score: {score} / {currentQuestions.length}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#00b4d8', mb: 2 }}>
                                    {getPerformanceMessage()}
                                </Typography>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <CelebrationIcon sx={{ fontSize: 60, color: '#ffd60a' }} />
                                </motion.div>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'center', bgcolor: '#e0e7ff', pb: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setShowResultDialog(false);
                                        handleRestart();
                                    }}
                                    sx={{
                                        bgcolor: '#00b4d8',
                                        color: '#fff',
                                        fontWeight: 700,
                                        px: 4,
                                        '&:hover': { bgcolor: '#3a0ca3', color: '#ffd60a' }
                                    }}
                                >
                                    Try Again
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </motion.div>
                </Container>
            </PuzzleSection>
        </Box>
    );
};

export default Puzzle; 