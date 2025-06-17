import { useLocation } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const lessonsCount = 3; // Update if you add more lessons

const ProgressBar = () => {
    const location = useLocation();
    const match = location.pathname.match(/lesson\/(\d+)/);
    const current = match ? parseInt(match[1], 10) : 1;
    const progress = (current / lessonsCount) * 100;
    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1200 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 6, bgcolor: '#eee', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #ff9800 0%, #00bcd4 100%)' } }} />
        </Box>
    );
};

export default ProgressBar; 