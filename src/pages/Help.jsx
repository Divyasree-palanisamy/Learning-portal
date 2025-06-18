import { useState } from 'react';
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
    TextareaAutosize,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
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
import WarningIcon from '@mui/icons-material/Warning';

const HelpSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
}));

const HelpCard = styled(Card)(({ theme }) => ({
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

const ContactForm = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 20,
    background: 'linear-gradient(135deg, #FFC107, #FFB300)',
    color: '#1A1A1A',
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    minHeight: 120,
    padding: theme.spacing(2),
    borderRadius: 8,
    border: '2px solid #e0e0e0',
    fontFamily: 'inherit',
    fontSize: '1rem',
    resize: 'vertical',
    '&:focus': {
        outline: 'none',
        borderColor: '#FF1744',
    },
}));

const Help = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const faqs = [
        {
            question: "How do I start learning Java?",
            answer: "Begin with our Introduction to Java section. We recommend starting from the basics and progressing through each lesson systematically. Use the voice feature to listen to explanations and practice with the interactive examples."
        },
        {
            question: "What if I don't understand a concept?",
            answer: "Don't worry! Use the animation section to visualize complex concepts. You can also retake lessons multiple times and use the voice feature to hear explanations again. If you're still stuck, contact our support team."
        },
        {
            question: "How do the puzzles work?",
            answer: "Our puzzles are adaptive and adjust to your skill level. Start with beginner level and progress to intermediate and advanced as you improve. Each puzzle tests your understanding of Java concepts with real-world scenarios."
        },
        {
            question: "Can I use this platform on mobile?",
            answer: "Yes! Our platform is fully responsive and works great on mobile devices. All features including voice learning, animations, and puzzles are optimized for mobile use."
        },
        {
            question: "Is there a cost to use this platform?",
            answer: "No! JavaLearn is completely free. We believe in making quality education accessible to everyone. You can access all features without any subscription or payment."
        },
        {
            question: "How do I track my progress?",
            answer: "Your progress is automatically tracked as you complete lessons and puzzles. You can see your score, completed sections, and overall progress in the puzzle section and throughout the course."
        }
    ];

    const supportOptions = [
        {
            title: "Email Support",
            description: "Get detailed responses within 24 hours",
            icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            color: '#FF1744',
            response: "24 hours"
        },
        {
            title: "Live Chat",
            description: "Instant help from our support team",
            icon: <ChatIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
            color: '#00BCD4',
            response: "Instant"
        },
        {
            title: "FAQ Section",
            description: "Find answers to common questions",
            icon: <HelpIcon sx={{ fontSize: 40, color: 'accent.main' }} />,
            color: '#FFC107',
            response: "Always available"
        }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <Box sx={{ pt: 8 }}>
            <HelpSection>
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
                            Need Help?
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ mb: 8, color: 'text.secondary', fontWeight: 500 }}
                        >
                            We're here to help you succeed in your Java learning journey
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <HelpCard>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                            <SupportIcon sx={{ fontSize: 50, color: 'primary.main', mr: 2 }} />
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                                Contact Support
                                            </Typography>
                                        </Box>

                                        {submitted ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                                    <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
                                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#4CAF50' }}>
                                                        Message Sent Successfully!
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                                                        We'll get back to you within 24 hours. Thank you for contacting us!
                                                    </Typography>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => setSubmitted(false)}
                                                        sx={{
                                                            borderColor: 'primary.main',
                                                            color: 'primary.main',
                                                            '&:hover': {
                                                                borderColor: 'primary.dark',
                                                                color: 'primary.dark'
                                                            }
                                                        }}
                                                    >
                                                        Send Another Message
                                                    </Button>
                                                </Box>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Your Name"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            required
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: '#FF1744',
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Email Address"
                                                            name="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            required
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: '#FF1744',
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Subject"
                                                            name="subject"
                                                            value={formData.subject}
                                                            onChange={handleInputChange}
                                                            required
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: '#FF1744',
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                                            Message
                                                        </Typography>
                                                        <StyledTextarea
                                                            name="message"
                                                            value={formData.message}
                                                            onChange={handleInputChange}
                                                            placeholder="Describe your issue or question..."
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            size="large"
                                                            startIcon={<SendIcon />}
                                                            sx={{
                                                                fontWeight: 600,
                                                                bgcolor: 'primary.main',
                                                                '&:hover': { bgcolor: 'primary.dark' }
                                                            }}
                                                        >
                                                            Send Message
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        )}
                                    </CardContent>
                                </HelpCard>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <ContactForm>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                                        Support Options
                                    </Typography>

                                    <List>
                                        {supportOptions.map((option, index) => (
                                            <ListItem key={index} sx={{ mb: 2, p: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 50 }}>
                                                    {option.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                {option.title}
                                                            </Typography>
                                                            <Chip
                                                                label={option.response}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: option.color,
                                                                    color: '#fff',
                                                                    fontWeight: 600
                                                                }}
                                                            />
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Typography variant="body2" sx={{ mt: 1, color: 'rgba(26,26,26,0.7)' }}>
                                                            {option.description}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>

                                    <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <InfoIcon sx={{ color: '#1A1A1A', mr: 1 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                Quick Tips
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'rgba(26,26,26,0.8)' }}>
                                            • Check our FAQ section first for quick answers
                                            <br />
                                            • Include specific details in your message
                                            <br />
                                            • Attach screenshots if relevant
                                            <br />
                                            • We respond within 24 hours
                                        </Typography>
                                    </Box>
                                </ContactForm>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Container>
            </HelpSection>

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
                        Frequently Asked Questions
                    </Typography>

                    <Grid container spacing={3}>
                        {faqs.map((faq, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Accordion sx={{ borderRadius: 2, mb: 2 }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                                {faq.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                                {faq.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Help; 