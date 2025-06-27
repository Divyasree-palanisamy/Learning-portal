import { useState, useEffect } from 'react';
import { Box, Typography, Card, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const QuizResult = ({ score, total, onRestart, onNextTopic }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    const percentage = total > 0 ? (score / total) * 100 : 0;
    let performanceMessage;
    let trophyColor;

    if (percentage >= 90) {
        performanceMessage = "Outstanding! You're a Java Virtuoso!";
        trophyColor = '#FFD700'; // Gold
    } else if (percentage >= 70) {
        performanceMessage = "Excellent Work! You've got strong skills!";
        trophyColor = '#C0C0C0'; // Silver
    } else if (percentage >= 50) {
        performanceMessage = 'Good Job! Keep practicing to master it!';
        trophyColor = '#CD7F32'; // Bronze
    } else {
        performanceMessage = 'Great start! Review and try again!';
        trophyColor = '#94a3b8'; // Slate
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(10, 35, 66, 0.75)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={300} recycle={false} tweenDuration={8000} />
            <motion.div
                initial={{ scale: 0.7, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Card sx={{
                    minWidth: { xs: 340, md: 450 },
                    textAlign: 'center',
                    borderRadius: 6,
                    p: { xs: 4, md: 5 },
                    background: 'linear-gradient(145deg, #1e293b, #0f172a)', // Dark Slate
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 50px rgba(0, 180, 216, 0.25)', // Blue glow
                    color: '#e2e8f0',
                    position: 'relative',
                    overflow: 'visible'
                }}>
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 15 }}
                        style={{ position: 'absolute', top: -50, left: '50%', x: '-50%' }}
                    >
                        <EmojiEventsIcon sx={{ fontSize: { xs: 90, md: 110 }, color: trophyColor, filter: `drop-shadow(0 4px 12px ${trophyColor}77)` }} />
                    </motion.div>
                    <Typography variant="h3" sx={{ fontWeight: 900, mt: { xs: 7, md: 8 }, color: '#ffffff' }}>
                        Quiz Complete!
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1, color: '#94a3b8', fontWeight: 500 }}>
                        Well done! Here's a summary of your performance.
                    </Typography>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    >
                        <Typography variant="h1" sx={{ fontWeight: 'bold', my: 2, color: '#00b4d8', letterSpacing: -2 }}>
                            {score} <span style={{ fontSize: '2.5rem', color: '#94a3b8' }}>/ {total}</span>
                        </Typography>
                    </motion.div>
                    <Typography variant="h5" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
                        {performanceMessage}
                    </Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            mt: 3,
                            display: 'inline-block',
                            background: 'rgba(0,0,0,0.25)',
                            borderColor: 'rgba(255,255,255,0.15)',
                            borderRadius: 3
                        }}
                    >
                        <Typography variant="body1" sx={{ color: '#e2e8f0' }}>Accuracy: <strong>{percentage.toFixed(0)}%</strong></Typography>
                        <Typography variant="body1" sx={{ color: '#e2e8f0' }}>Correct Answers: <strong>{score}</strong></Typography>
                        <Typography variant="body1" sx={{ color: '#e2e8f0' }}>Incorrect Answers: <strong>{total - score}</strong></Typography>
                    </Paper>

                    <Typography sx={{ mt: 3, mb: 1, color: '#94a3b8' }}>
                        Keep up the momentum! Choose an option below to continue.
                    </Typography>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={onRestart}
                                startIcon={<ReplayIcon />}
                                sx={{
                                    color: '#e2e8f0',
                                    borderColor: '#94a3b8',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                                        borderColor: '#e2e8f0',
                                    }
                                }}
                            >
                                Restart Topic
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onNextTopic}
                                disabled={!onNextTopic}
                                startIcon={<SkipNextIcon />}
                                sx={{
                                    bgcolor: '#ffd60a',
                                    color: '#0a2342',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 3,
                                    boxShadow: '0 4px 16px #ffd60a88',
                                    '&:hover': { bgcolor: '#ffc300' },
                                    '&:disabled': {
                                        background: 'rgba(148, 163, 184, 0.2)',
                                        color: 'rgba(148, 163, 184, 0.5)',
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                Next Topic
                            </Button>
                        </Box>
                    </motion.div>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default QuizResult; 