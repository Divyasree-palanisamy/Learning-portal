import { useState } from 'react';
import {
    Box,
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
    List,
    ListItem,
    ListItemIcon,
    Paper,
    TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import SupportIcon from '@mui/icons-material/Support';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

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

const SupportOption = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: palette.white,
}));

const ContentCard = styled(Card)(({ theme }) => ({
    background: palette.card,
    borderRadius: 20,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    minWidth: 0,
    width: '100%',
    maxWidth: 700,
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
}));

const Help = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const faqs = [
        { question: "How do I start learning Java?", answer: "Begin with our Introduction to Java section. We recommend starting from the basics and progressing through each lesson systematically. Use the voice feature to listen to explanations and practice with the interactive examples." },
        { question: "What if I don't understand a concept?", answer: "Don't worry! Use the animation section to visualize complex concepts. You can also retake lessons multiple times and use the voice feature to hear explanations again. If you're still stuck, contact our support team." },
        { question: "How do the puzzles work?", answer: "Our puzzles are adaptive and adjust to your skill level. Start with beginner level and progress to intermediate and advanced as you improve. Each puzzle tests your understanding of Java concepts with real-world scenarios." },
        { question: "Can I use this platform on mobile?", answer: "Yes! Our platform is fully responsive and works great on mobile devices. All features including voice learning, animations, and puzzles are optimized for mobile use." },
        { question: "Is there a cost to use this platform?", answer: "No! JavaLearn is completely free. We believe in making quality education accessible to everyone. You can access all features without any subscription or payment." },
        { question: "How do I track my progress?", answer: "Your progress is automatically tracked as you complete lessons and puzzles. You can see your score, completed sections, and overall progress in the puzzle section and throughout the course." }
    ];

    const supportOptions = [
        { title: "Email Support", description: "Get detailed responses within 24 hours", icon: <EmailIcon sx={{ fontSize: 40, color: '#FFD54F' }} />, color: '#FFD54F', response: "24 hours" },
        { title: "Live Chat", description: "Instant help from our support team", icon: <ChatIcon sx={{ fontSize: 40, color: '#00BCD4' }} />, color: '#00BCD4', response: "Instant" },
        { title: "FAQ Section", description: "Find answers to common questions", icon: <HelpIcon sx={{ fontSize: 40, color: '#8E24AA' }} />, color: '#8E24AA', response: "Always available" }
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <MainContainer>
            <Box sx={{ display: 'flex', flex: 1, width: '100%', gap: 4, mt: 2, mb: 2, px: { xs: 2, md: 4 } }}>
                <Sidebar elevation={3}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: palette.accent, letterSpacing: 1 }}>
                        Support Options
                    </Typography>
                    {supportOptions.map((option, idx) => (
                        <SupportOption key={idx}>
                            {option.icon}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>{option.title}</Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>{option.description}</Typography>
                                <Chip label={option.response} size="small" sx={{ bgcolor: option.color, color: '#fff', fontWeight: 600, mt: 1 }} />
                            </Box>
                        </SupportOption>
                    ))}
                    <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <InfoIcon sx={{ color: palette.accent, mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Quick Tips</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                            • Check our FAQ section first for quick answers<br />
                            • Include specific details in your message<br />
                            • Attach screenshots if relevant<br />
                            • We respond within 24 hours
                        </Typography>
                    </Box>
                </Sidebar>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, px: { xs: 2, md: 4 } }}>
                    <ContentCard>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: palette.text, mb: 2 }}>
                                Need Help?
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, color: palette.selected, fontWeight: 500 }}>
                                We're here to help you succeed in your Java learning journey
                            </Typography>
                            {submitted ? (
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
                                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#4CAF50' }}>
                                            Message Sent Successfully!
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: palette.text, mb: 3 }}>
                                            We'll get back to you within 24 hours. Thank you for contacting us!
                                        </Typography>
                                        <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ borderColor: palette.selected, color: palette.selected, '&:hover': { borderColor: palette.accent, color: palette.accent } }}>
                                            Send Another Message
                                        </Button>
                                    </Box>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleInputChange} required sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: palette.selected } } }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: palette.selected } } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleInputChange} required sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: palette.selected } } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleInputChange} required multiline minRows={4} sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: palette.selected } } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" size="large" startIcon={<SendIcon />} sx={{ fontWeight: 600, bgcolor: palette.selected, '&:hover': { bgcolor: palette.accent, color: palette.text } }}>
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </CardContent>
                    </ContentCard>
                    <Box sx={{ mt: 6 }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: palette.selected }}>
                            Frequently Asked Questions
                        </Typography>
                        <Grid container spacing={3}>
                            {faqs.map((faq, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                                        <Accordion sx={{ borderRadius: 2, mb: 2 }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: palette.selected }}>
                                                    {faq.question}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" sx={{ color: palette.text, lineHeight: 1.6 }}>
                                                    {faq.answer}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </MainContainer>
    );
};

export default Help; 