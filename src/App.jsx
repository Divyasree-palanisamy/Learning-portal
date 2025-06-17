import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Landing from './pages/Landing';
import LessonPage from './pages/LessonPage';
import ProgressBar from './components/ProgressBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6f00', // vibrant orange
      contrastText: '#fff',
    },
    secondary: {
      main: '#00bcd4', // bright cyan
      contrastText: '#fff',
    },
    background: {
      default: '#f9f9f9',
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
});

function AppRoutes() {
  const location = useLocation();
  const isLesson = location.pathname.startsWith('/lesson/');
  return (
    <>
      {isLesson && <ProgressBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
