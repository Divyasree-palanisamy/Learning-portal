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
    TextField,
    IconButton,
    Chip,
    Alert,
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

const AnimationSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
}));

const MemoryContainer = styled(Box)(({ theme }) => ({
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

const MemorySlot = styled(motion.div)(({ theme, isOccupied, isHighlighted }) => ({
    background: isOccupied
        ? 'linear-gradient(135deg, #4CAF50, #45a049)'
        : isHighlighted
            ? 'linear-gradient(135deg, #FFC107, #FFB300)'
            : 'rgba(255,255,255,0.1)',
    border: isOccupied
        ? '2px solid #4CAF50'
        : isHighlighted
            ? '2px solid #FFC107'
            : '2px solid rgba(255,255,255,0.3)',
    borderRadius: 12,
    padding: theme.spacing(2),
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
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

const CodeEditor = styled(Paper)(({ theme }) => ({
    background: '#1A1A1A',
    color: '#ECF0F1',
    padding: theme.spacing(3),
    borderRadius: 12,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '1rem',
    lineHeight: 1.6,
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

const ControlPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    background: 'linear-gradient(135deg, #FFC107, #FFB300)',
    color: '#1A1A1A',
}));

const Animation = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [memorySlots, setMemorySlots] = useState(Array(8).fill(null));
    const [variables, setVariables] = useState([]);
    const [codeExample, setCodeExample] = useState('int x = 5;');
    const [isLooping, setIsLooping] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const controls = useAnimation();
    const containerRef = useRef(null);

    const codeExamples = [
        {
            code: 'int x = 5;',
            variables: [
                { name: 'x', value: 5, type: 'int', color: '#FF1744' }
            ],
            description: 'Declaring an integer variable'
        },
        {
            code: 'String name = "Java";\ndouble price = 19.99;',
            variables: [
                { name: 'name', value: 'Java', type: 'String', color: '#00BCD4' },
                { name: 'price', value: 19.99, type: 'double', color: '#FFC107' }
            ],
            description: 'Multiple variable declarations'
        },
        {
            code: 'int[] numbers = {1, 2, 3, 4, 5};',
            variables: [
                { name: 'numbers', value: [1, 2, 3, 4, 5], type: 'int[]', color: '#9C27B0' }
            ],
            description: 'Array declaration and initialization'
        },
        {
            code: 'x = x + 1;\nname = name + "Script";',
            variables: [
                { name: 'x', value: 6, type: 'int', color: '#FF1744' },
                { name: 'name', value: 'JavaScript', type: 'String', color: '#00BCD4' }
            ],
            description: 'Variable reassignment and concatenation'
        }
    ];

    const currentExample = codeExamples[currentStep % codeExamples.length];

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentStep(prev => prev + 1);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    useEffect(() => {
        setCodeExample(currentExample.code);
        setVariables(currentExample.variables);
        animateVariables(currentExample.variables);
    }, [currentStep]);

    const animateVariables = async (vars) => {
        // Clear memory slots
        setMemorySlots(Array(8).fill(null));

        // Animate each variable into memory
        for (let i = 0; i < vars.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setMemorySlots(prev => {
                const newSlots = [...prev];
                newSlots[i] = {
                    ...vars[i],
                    id: i,
                    address: `0x${(1000 + i).toString(16).toUpperCase()}`
                };
                return newSlots;
            });
        }
    };

    const handlePlay = () => {
        setIsPlaying(true);
        setShowAlert(false);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setMemorySlots(Array(8).fill(null));
        setVariables([]);
    };

    const handleLoop = () => {
        setIsLooping(!isLooping);
        if (!isLooping) {
            setIsPlaying(true);
        }
    };

    const handleSlotClick = (index) => {
        if (memorySlots[index]) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        }
    };

    const handleTouch = () => {
        // Simulate touch interaction
        const randomSlot = Math.floor(Math.random() * 8);
        handleSlotClick(randomSlot);
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
                            Interactive Memory Visualization
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ mb: 8, color: 'text.secondary', fontWeight: 500 }}
                        >
                            Watch how variables are stored in memory with live animations
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <MemoryContainer ref={containerRef}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <MemoryIcon sx={{ color: '#FFC107', mr: 1 }} />
                                        <Typography variant="h6" sx={{ color: '#FFC107', fontWeight: 600 }}>
                                            Memory Stack
                                        </Typography>
                                    </Box>

                                    {memorySlots.map((slot, index) => (
                                        <MemorySlot
                                            key={index}
                                            isOccupied={!!slot}
                                            isHighlighted={showAlert && slot}
                                            onClick={() => handleSlotClick(index)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    {slot?.address || `0x${(1000 + index).toString(16).toUpperCase()}`}
                                                </Typography>
                                                {slot && (
                                                    <VariableBox
                                                        color={slot.color}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <CodeIcon sx={{ fontSize: 16 }} />
                                                        {slot.name} = {typeof slot.value === 'object' ? `[${slot.value.join(', ')}]` : slot.value}
                                                    </VariableBox>
                                                )}
                                            </Box>
                                            {slot && (
                                                <Chip
                                                    label={slot.type}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'rgba(255,255,255,0.2)',
                                                        color: '#fff',
                                                        fontWeight: 600
                                                    }}
                                                />
                                            )}
                                        </MemorySlot>
                                    ))}
                                </MemoryContainer>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <ControlPanel>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                                        Interactive Controls
                                    </Typography>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            Current Code Example
                                        </Typography>
                                        <CodeEditor sx={{ position: 'relative' }}>
                                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                                {codeExample}
                                            </pre>
                                        </CodeEditor>
                                        <Typography variant="body2" sx={{ mt: 1, color: 'rgba(26,26,26,0.8)' }}>
                                            {currentExample.description}
                                        </Typography>
                                    </Box>

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

                                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<LoopIcon />}
                                            onClick={handleLoop}
                                            sx={{
                                                flex: 1,
                                                bgcolor: isLooping ? '#4CAF50' : '#1A1A1A',
                                                '&:hover': { bgcolor: isLooping ? '#45a049' : '#333' }
                                            }}
                                        >
                                            Loop
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<TouchAppIcon />}
                                            onClick={handleTouch}
                                            sx={{ flex: 1, bgcolor: '#2196F3', '&:hover': { bgcolor: '#1976D2' } }}
                                        >
                                            Touch
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
                                            '&:hover': {
                                                borderColor: '#333',
                                                color: '#333',
                                                bgcolor: 'rgba(26,26,26,0.1)'
                                            }
                                        }}
                                    >
                                        Reset
                                    </Button>

                                    <AnimatePresence>
                                        {showAlert && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Alert
                                                    severity="info"
                                                    sx={{ mt: 2 }}
                                                    icon={<StorageIcon />}
                                                >
                                                    Variable stored in memory! Click memory slots to explore.
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
                        How Memory Works in Java
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                                <MemoryIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Stack Memory
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Local variables and method calls are stored in stack memory, which follows LIFO (Last In, First Out) principle.
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                                <StorageIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Variable Storage
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Each variable gets a unique memory address and stores its value. Different data types occupy different amounts of memory.
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                                <TouchAppIcon sx={{ fontSize: 60, color: 'accent.main', mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Interactive Learning
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click on memory slots to explore variables, use touch controls, and loop through different examples to understand memory management.
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Animation; 