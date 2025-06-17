import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Snackbar,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactCard = styled(Card)(({ theme }) => ({
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
}));

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        setSnackbar({
            open: true,
            message: 'Thank you for your message! We will get back to you soon.',
            severity: 'success',
        });
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const contactInfo = [
        {
            icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Email',
            content: 'contact@learnhub.com',
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Phone',
            content: '+1 (555) 123-4567',
        },
        {
            icon: <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Location',
            content: '123 Education Street, Tech City, TC 12345',
        },
    ];

    return (
        <Box sx={{ py: 8, mt: 8 }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{ mb: 6, fontWeight: 600 }}
                    >
                        Contact Us
                    </Typography>

                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        {contactInfo.map((info, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <ContactCard>
                                        {info.icon}
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {info.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {info.content}
                                            </Typography>
                                        </CardContent>
                                    </ContactCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="h4" gutterBottom>
                                    Send us a Message
                                </Typography>
                                <Typography color="text.secondary" paragraph>
                                    Have questions? We'd love to hear from you. Send us a message
                                    and we'll respond as soon as possible.
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Message"
                                                name="message"
                                                multiline
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box
                                    component="img"
                                    src="/contact-image.jpg"
                                    alt="Contact us"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 2,
                                    }}
                                />
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Contact; 