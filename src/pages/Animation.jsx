import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const palette = {
    background: 'linear-gradient(135deg, #23235B 0%, #6A1B9A 100%)',
    card: 'linear-gradient(135deg, #fff 0%, #e3e6f3 100%)',
    accent: '#FFD54F',
    selected: '#8E24AA',
    text: '#23235B',
    white: '#fff',
};

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: 0,
    margin: 0,
    width: '100%',
    background: 'none',
}));

const CodeBlock = styled(Box)(({ theme }) => ({
    background: '#1A1A1A',
    color: '#ECF0F1',
    padding: theme.spacing(3),
    borderRadius: 12,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '1.05rem',
    lineHeight: 1.7,
    margin: theme.spacing(2, 0),
    position: 'relative',
    minWidth: 320,
    maxWidth: 500,
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
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

const OutputBlock = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #fff 0%, #e3e6f3 100%)',
    color: palette.text,
    borderRadius: 12,
    padding: theme.spacing(2, 3),
    minHeight: 60,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '1.05rem',
    boxShadow: '0 4px 16px rgba(35,35,91,0.10)',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const topics = [
    {
        title: "Hello World Program",
        code: [
            'public class HelloWorld {',
            '    public static void main(String[] args) {',
            '        System.out.println("Hello, World!");',
            '    }',
            '}'
        ],
        steps: [
            {
                line: 0,
                explanation: 'The class HelloWorld is defined.',
                output: ''
            },
            {
                line: 1,
                explanation: 'The main method is the entry point of the program.',
                output: ''
            },
            {
                line: 2,
                explanation: 'The statement prints "Hello, World!" to the output.',
                output: 'Hello, World!'
            },
            {
                line: 3,
                explanation: 'The main method ends.',
                output: 'Hello, World!'
            },
            {
                line: 4,
                explanation: 'The class ends. Program execution is complete.',
                output: 'Hello, World!'
            }
        ]
    },
    {
        title: "Variable Assignment",
        code: [
            'public class Variables {',
            '    public static void main(String[] args) {',
            '        int a = 5;',
            '        int b = 10;',
            '        int sum = a + b;',
            '        System.out.println(sum);',
            '    }',
            '}'
        ],
        steps: [
            { line: 0, explanation: 'The class Variables is defined.', output: '' },
            { line: 1, explanation: 'The main method starts.', output: '' },
            { line: 2, explanation: 'Variable a is assigned the value 5.', output: '' },
            { line: 3, explanation: 'Variable b is assigned the value 10.', output: '' },
            { line: 4, explanation: 'Variable sum is assigned the value a + b (5 + 10 = 15).', output: '' },
            { line: 5, explanation: 'The value of sum (15) is printed to the output.', output: '15' },
            { line: 6, explanation: 'The main method ends.', output: '15' },
            { line: 7, explanation: 'The class ends. Program execution is complete.', output: '15' }
        ]
    }
];

const Animation = () => {
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [step, setStep] = useState(0);
    const topic = topics[selectedTopic];
    const currentStep = topic.steps[step];

    const handleNext = () => {
        if (step < topic.steps.length - 1) setStep(step + 1);
    };
    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };
    const handleRestart = () => setStep(0);

    return (
        <MainContainer>
            <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 4, p: { xs: 2, md: 4 }, boxShadow: '0 8px 32px rgba(35,35,91,0.10)' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: palette.accent, mb: 2 }}>
                            {topic.title}
                        </Typography>
                        <CodeBlock>
                            {topic.code.map((line, idx) => (
                                <Box
                                    key={idx}
                                    component={motion.div}
                                    animate={step === idx ? { backgroundColor: '#FFD54F22' } : { backgroundColor: 'transparent' }}
                                    transition={{ duration: 0.3 }}
                                    sx={{
                                        borderRadius: 2,
                                        px: 1,
                                        py: 0.5,
                                        color: step === idx ? palette.accent : '#ECF0F1',
                                        fontWeight: step === idx ? 700 : 500,
                                    }}
                                >
                                    {line}
                                </Box>
                            ))}
                        </CodeBlock>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 220 }}>
                        <Typography variant="h6" sx={{ color: palette.selected, mb: 2, fontWeight: 600 }}>
                            Step {step + 1} of {topic.steps.length}
                        </Typography>
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="body1" sx={{ mb: 2, color: palette.text, fontWeight: 500 }}>
                                {currentStep.explanation}
                            </Typography>
                            <OutputBlock elevation={0}>
                                <Typography variant="subtitle2" sx={{ color: palette.selected, fontWeight: 700 }}>
                                    Output
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: palette.text, mt: 1 }}>
                                    {currentStep.output || <span style={{ opacity: 0.5 }}>&lt;No Output Yet&gt;</span>}
                                </Typography>
                            </OutputBlock>
                        </motion.div>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button variant="outlined" onClick={handlePrev} disabled={step === 0} sx={{ fontWeight: 700, color: palette.selected, borderColor: palette.selected }}>
                                Previous
                            </Button>
                            <Button variant="contained" onClick={handleNext} disabled={step === topic.steps.length - 1} sx={{ fontWeight: 700, bgcolor: palette.accent, color: palette.text }}>
                                Next
                            </Button>
                            <Button variant="text" onClick={handleRestart} sx={{ fontWeight: 700, color: palette.selected }}>
                                Restart
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
                    {topics.map((t, idx) => (
                        <Button
                            key={t.title}
                            variant={selectedTopic === idx ? 'contained' : 'outlined'}
                            onClick={() => { setSelectedTopic(idx); setStep(0); }}
                            sx={{ fontWeight: 700, bgcolor: selectedTopic === idx ? palette.selected : 'transparent', color: selectedTopic === idx ? '#fff' : palette.selected, borderColor: palette.selected }}
                        >
                            {t.title}
                        </Button>
                    ))}
                </Box>
            </Box>
        </MainContainer>
    );
};

export default Animation; 