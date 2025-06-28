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
    [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(6),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
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
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
        padding: theme.spacing(2),
        minWidth: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
    },
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
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
        padding: theme.spacing(1.5, 2),
        minHeight: 50,
    },
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
            { line: 0, explanation: 'The class HelloWorld is defined.', output: '' },
            { line: 1, explanation: 'The main method is the entry point of the program.', output: '' },
            { line: 2, explanation: 'The statement prints "Hello, World!" to the output.', output: 'Hello, World!' },
            { line: 3, explanation: 'The main method ends.', output: 'Hello, World!' },
            { line: 4, explanation: 'The class ends. Program execution is complete.', output: 'Hello, World!' }
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
    },
    {
        title: "If/Else Statement",
        code: [
            'int age = 17;',
            'if (age >= 18) {',
            '    System.out.println("Adult");',
            '} else {',
            '    System.out.println("Minor");',
            '}'
        ],
        steps: [
            { line: 0, explanation: 'Variable age is assigned the value 17.', output: '' },
            { line: 1, explanation: 'The if condition (age >= 18) is checked. 17 >= 18 is false.', output: '' },
            { line: 3, explanation: 'The else block is executed.', output: '' },
            { line: 4, explanation: '"Minor" is printed to the output.', output: 'Minor' },
            { line: 5, explanation: 'If/Else statement ends.', output: 'Minor' }
        ]
    },
    {
        title: "For Loop",
        code: [
            'for (int i = 1; i <= 3; i++) {',
            '    System.out.println(i);',
            '}'
        ],
        steps: [
            { line: 0, explanation: 'The for loop starts with i = 1.', output: '' },
            { line: 1, explanation: 'i = 1, prints 1.', output: '1' },
            { line: 0, explanation: 'i increments to 2, loop continues.', output: '1' },
            { line: 1, explanation: 'i = 2, prints 2.', output: '1\n2' },
            { line: 0, explanation: 'i increments to 3, loop continues.', output: '1\n2' },
            { line: 1, explanation: 'i = 3, prints 3.', output: '1\n2\n3' },
            { line: 0, explanation: 'i increments to 4, loop ends (4 > 3).', output: '1\n2\n3' },
            { line: 2, explanation: 'Loop ends.', output: '1\n2\n3' }
        ]
    },
    {
        title: "Array Access",
        code: [
            'int[] arr = {10, 20, 30};',
            'System.out.println(arr[0]);',
            'System.out.println(arr[2]);'
        ],
        steps: [
            { line: 0, explanation: 'An array arr is created with values 10, 20, 30.', output: '' },
            { line: 1, explanation: 'arr[0] is accessed and prints 10.', output: '10' },
            { line: 2, explanation: 'arr[2] is accessed and prints 30.', output: '10\n30' }
        ]
    },
    {
        title: "Class and Object",
        code: [
            'class Car {',
            '    String brand;',
            '    Car(String b) { brand = b; }',
            '    void honk() { System.out.println(brand + " honks!"); }',
            '}',
            'Car myCar = new Car("Toyota");',
            'myCar.honk();'
        ],
        steps: [
            { line: 0, explanation: 'A class Car is defined.', output: '' },
            { line: 1, explanation: 'The Car class has a brand field.', output: '' },
            { line: 2, explanation: 'The constructor sets the brand.', output: '' },
            { line: 3, explanation: 'The honk method prints the brand + " honks!".', output: '' },
            { line: 5, explanation: 'An object myCar is created with brand "Toyota".', output: '' },
            { line: 6, explanation: 'myCar.honk() prints "Toyota honks!".', output: 'Toyota honks!' }
        ]
    },
    {
        title: "Exception Handling",
        code: [
            'try {',
            '    int x = 5 / 0;',
            '} catch (ArithmeticException e) {',
            '    System.out.println("Error: " + e.getMessage());',
            '}'
        ],
        steps: [
            { line: 0, explanation: 'The try block starts.', output: '' },
            { line: 1, explanation: 'Division by zero occurs, throws ArithmeticException.', output: '' },
            { line: 2, explanation: 'The catch block catches the exception.', output: '' },
            { line: 3, explanation: 'Prints the error message.', output: 'Error: / by zero' },
            { line: 4, explanation: 'Exception handling ends.', output: 'Error: / by zero' }
        ]
    },
    {
        title: "Generics Example",
        code: [
            'class Box<T> {',
            '    T value;',
            '    void set(T v) { value = v; }',
            '    T get() { return value; }',
            '}',
            'Box<String> b = new Box<>();',
            'b.set("Hello");',
            'System.out.println(b.get());'
        ],
        steps: [
            { line: 0, explanation: 'A generic class Box<T> is defined.', output: '' },
            { line: 1, explanation: 'Box has a value field of type T.', output: '' },
            { line: 2, explanation: 'set() assigns a value.', output: '' },
            { line: 3, explanation: 'get() returns the value.', output: '' },
            { line: 5, explanation: 'A Box<String> is created.', output: '' },
            { line: 6, explanation: 'b.set("Hello") stores "Hello" in the box.', output: '' },
            { line: 7, explanation: 'b.get() returns "Hello" and prints it.', output: 'Hello' }
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