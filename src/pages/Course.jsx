import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Chip,
    IconButton,
    Paper,
    LinearProgress,
    Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const palette = {
    background: 'linear-gradient(135deg, #23235B 0%, #6A1B9A 100%)',
    card: 'linear-gradient(135deg, #fff 0%, #e3e6f3 100%)',
    accent: '#FFD54F',
    nav: 'linear-gradient(135deg, #00bcd4 0%, #23235B 100%)',
    selected: '#8E24AA',
    text: '#23235B',
    white: '#fff',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336'
};

const CoursePageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: '2rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '1rem',
    },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    height: 'calc(100vh - 80px)', // Adjust based on your header height
    overflowY: 'auto',
    paddingRight: '1rem',
    [theme.breakpoints.down('sm')]: {
        height: 'auto',
        paddingRight: 0,
        paddingLeft: 0,
    },
}));

const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(8),
    paddingBottom: 0,
    margin: 0,
    width: '100%',
    background: palette.background,
    [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(6),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
}));

const Sidebar = styled(Paper)(({ theme }) => ({
    background: palette.nav,
    borderRadius: 20,
    padding: theme.spacing(3, 2),
    width: 320,
    minWidth: 240,
    maxWidth: 360,
    color: palette.white,
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: '20px', // Adjust as needed
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
        position: 'relative',
        width: '100%',
        minWidth: '100%',
        marginRight: 0,
        marginBottom: theme.spacing(3),
        maxHeight: 'none',
    },
}));

const ModuleHeader = styled(Box)(({ theme, expanded }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    background: expanded ? 'rgba(255,255,255,0.08)' : 'none',
    borderRadius: 10,
    padding: theme.spacing(1.2, 1.5),
    marginBottom: 2,
    transition: 'background 0.2s',
}));

const LessonButton = styled(Button)(({ theme, selected }) => ({
    justifyContent: 'flex-start',
    width: '100%',
    background: selected ? palette.selected : 'transparent',
    color: selected ? palette.accent : palette.white,
    fontWeight: selected ? 700 : 500,
    borderRadius: 8,
    textTransform: 'none',
    fontSize: '1rem',
    padding: theme.spacing(1, 2),
    marginBottom: 2,
    boxShadow: selected ? '0 2px 8px rgba(142,36,170,0.10)' : 'none',
    border: selected ? `2px solid ${palette.accent}` : '2px solid transparent',
    '&:hover': {
        background: palette.selected,
        color: palette.accent,
    },
}));

const ContentCard = styled(Card)(({ theme }) => ({
    background: palette.card,
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    border: '2px solid rgba(255,255,255,0.18)',
    minWidth: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 0, 4, 0),
}));

const CodeBlock = styled(Box)(({ theme }) => ({
    background: '#1A1A1A',
    color: '#ECF0F1',
    padding: theme.spacing(3),
    borderRadius: 12,
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    margin: theme.spacing(2, 0),
    position: 'relative',
    overflowX: 'auto',
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

const VoiceButton = styled(IconButton)(({ theme }) => ({
    background: 'linear-gradient(135deg, #00BCD4, #008BA3)',
    color: '#fff',
    marginLeft: theme.spacing(1),
    '&:hover': {
        background: 'linear-gradient(135deg, #008BA3, #006064)',
        transform: 'scale(1.1)',
    },
}));

const KeyPointChip = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #FFD54F, #00BCD4)',
    color: palette.text,
    borderRadius: 16,
    padding: theme.spacing(0.5, 2),
    fontWeight: 600,
    fontSize: '1rem',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(35,35,91,0.08)',
}));

const HeaderBar = styled(Box)(({ theme }) => ({
    width: '100%',
    background: 'linear-gradient(90deg, #23235B 0%, #6A1B9A 100%)',
    color: '#FFD54F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: theme.spacing(3, 4),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    boxShadow: '0 4px 16px rgba(35,35,91,0.10)',
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    '& .MuiLinearProgress-bar': {
        borderRadius: 4,
        background: 'linear-gradient(90deg, #4CAF50, #66BB6A)',
    },
}));

function flattenLessons(modules) {
    // Returns [{moduleIndex, lessonIndex, title, ...}]
    return modules.flatMap((mod, mIdx) =>
        mod.lessons.map((lesson, lIdx) => ({
            ...lesson,
            moduleIndex: mIdx,
            lessonIndex: lIdx,
            moduleTitle: mod.title,
        }))
    );
}

const Course = () => {
    const [expandedModules, setExpandedModules] = useState([0]);
    const [selected, setSelected] = useState({ module: 0, lesson: 0 });
    const [completedModules, setCompletedModules] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const contentRef = useRef(null);
    const [contentKey, setContentKey] = useState('0-0');

    const courseModules = [
        {
            id: 0,
            title: "Java Fundamentals",
            description: "Learn the basics of Java programming",
            icon: <SchoolIcon />,
            lessons: [
                {
                    title: "Introduction to Java",
                    subtitle: "What is Java and why learn it?",
                    content: `Java is a powerful, versatile, and widely-used programming language. It was created by James Gosling at Sun Microsystems in 1995. Java is known for its "Write Once, Run Anywhere" capability, meaning Java programs can run on any device that has a Java Virtual Machine (JVM).

Key Features of Java:
• Platform Independent
• Object-Oriented
• Secure
• Robust
• High Performance
• Multithreaded`,
                    examples: [
                        {
                            title: "Your First Java Program",
                            code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
                            explanation: "This is the traditional first program in Java. It prints 'Hello, World!' to the console. Every Java program must have a main method as the entry point."
                        }
                    ],
                    keyPoints: ["Platform Independent", "Object-Oriented", "Secure", "Robust", "High Performance"]
                },
                {
                    title: "Variables and Data Types",
                    subtitle: "Storing and managing data in Java",
                    content: `Variables are containers for storing data values. Java has different data types to store different kinds of data. Understanding data types is crucial for writing efficient Java programs.

Java has two categories of data types:
1. Primitive Data Types
2. Reference Data Types

Primitive types are the basic building blocks and include:
• byte, short, int, long (for integers)
• float, double (for floating-point numbers)
• char (for single characters)
• boolean (for true/false values)`,
                    examples: [
                        {
                            title: "Basic Data Types",
                            code: `// Integer types
int age = 25;
long population = 7800000000L;

// Floating point types
double price = 19.99;
float temperature = 98.6f;

// Character type
char grade = 'A';

// Boolean type
boolean isJavaFun = true;

// String (Reference type)
String name = "Java Learner";`,
                            explanation: "Java has primitive data types for different kinds of data. Each type has a specific range and purpose."
                        }
                    ],
                    keyPoints: ["Primitive Types", "Reference Types", "Type Conversion", "Variable Declaration"]
                }
            ]
        },
        {
            id: 1,
            title: "Control Structures",
            description: "Learn decision making and loops",
            icon: <CodeIcon />,
            lessons: [
                {
                    title: "Conditional Statements",
                    subtitle: "Making decisions in your programs",
                    content: `Conditional statements allow your program to make decisions based on certain conditions. Java provides several ways to implement decision-making logic.

Types of conditional statements:
1. if statement
2. if-else statement
3. if-else if-else statement
4. switch statement

These structures help you control the flow of your program based on different conditions.`,
                    examples: [
                        {
                            title: "Basic if Statement",
                            code: `int age = 18;

if (age >= 18) {
    System.out.println("You are an adult");
}

// if-else statement
if (age >= 18) {
    System.out.println("You can vote");
} else {
    System.out.println("You cannot vote yet");
}`,
                            explanation: "The if statement executes a block of code only if the condition is true."
                        }
                    ],
                    keyPoints: ["if Statement", "if-else", "Switch", "Logical Operators", "Comparison Operators"]
                }
            ]
        },
        {
            id: 2,
            title: "Object-Oriented Programming",
            description: "Master OOP concepts in Java",
            icon: <BookIcon />,
            lessons: [
                {
                    title: "Classes and Objects",
                    subtitle: "Understanding the foundation of OOP",
                    content: `Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects". Java is built around OOP principles.

Key OOP Concepts:
1. Classes - Blueprints for objects
2. Objects - Instances of classes
3. Encapsulation - Bundling data and methods
4. Inheritance - Creating new classes from existing ones
5. Polymorphism - Same interface, different implementations
6. Abstraction - Hiding complex implementation details

Classes define the structure and behavior of objects, while objects are the actual instances that contain data and can perform actions.`,
                    examples: [
                        {
                            title: "Creating a Simple Class",
                            code: `public class Car {
    // Instance variables (attributes)
    private String brand;
    private String model;
    private int year;
    
    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    // Methods
    public void startEngine() {
        System.out.println("Starting " + brand + " " + model);
    }
    
    public String getInfo() {
        return year + " " + brand + " " + model;
    }
}

// Creating objects
Car myCar = new Car("Toyota", "Camry", 2020);
myCar.startEngine();
System.out.println(myCar.getInfo());`,
                            explanation: "This example shows how to create a class with attributes, constructor, and methods, then create objects from that class."
                        }
                    ],
                    keyPoints: ["Classes", "Objects", "Constructors", "Methods", "Instance Variables"]
                }
            ]
        },
        {
            id: 3,
            title: "Data Structures",
            description: "Learn arrays, collections, and data organization",
            icon: <CodeIcon />,
            lessons: [
                {
                    title: "Arrays",
                    subtitle: "Working with ordered collections of data",
                    content: `Arrays are fixed-size collections of elements of the same type. They are one of the most fundamental data structures in programming.

Key characteristics of arrays:
• Fixed size (cannot be resized after creation)
• Indexed access (elements accessed by position)
• Same data type for all elements
• Zero-based indexing

Arrays are useful for storing and processing large amounts of data efficiently.`,
                    examples: [
                        {
                            title: "Creating and Using Arrays",
                            code: `// Declaring and initializing arrays
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";

// Accessing array elements
System.out.println("First number: " + numbers[0]);
System.out.println("Array length: " + numbers.length);

// Iterating through arrays
for (int i = 0; i < numbers.length; i++) {
    System.out.println("Number " + i + ": " + numbers[i]);
}

// Enhanced for loop
for (String name : names) {
    System.out.println("Name: " + name);
}`,
                            explanation: "Arrays provide efficient storage and access to collections of data with the same type."
                        }
                    ],
                    keyPoints: ["Array Declaration", "Array Initialization", "Index Access", "Array Length", "Multi-dimensional Arrays"]
                }
            ]
        },
        {
            id: 4,
            title: "Exception Handling",
            description: "Managing errors and exceptions gracefully",
            icon: <CodeIcon />,
            lessons: [
                {
                    title: "Understanding Exceptions",
                    subtitle: "What are exceptions and why handle them?",
                    content: `Exceptions are events that occur during the execution of a program that disrupt the normal flow of instructions. Java provides a robust exception handling mechanism.

Types of exceptions:
1. Checked Exceptions - Must be handled or declared
2. Unchecked Exceptions - Runtime exceptions that don't need explicit handling
3. Errors - Serious problems that are not typically recoverable

Exception handling helps create robust, user-friendly applications that can gracefully handle unexpected situations.`,
                    examples: [
                        {
                            title: "Basic Exception Handling",
                            code: `try {
    // Code that might throw an exception
    int result = 10 / 0; // This will throw ArithmeticException
    System.out.println("Result: " + result);
} catch (ArithmeticException e) {
    // Handle the exception
    System.out.println("Error: Cannot divide by zero");
    System.out.println("Exception details: " + e.getMessage());
} finally {
    // This block always executes
    System.out.println("Cleanup code here");
}`,
                            explanation: "The try-catch-finally block allows you to handle exceptions gracefully and ensure cleanup code runs."
                        }
                    ],
                    keyPoints: ["try-catch", "finally", "Exception Types", "Exception Hierarchy", "Error Handling"]
                }
            ]
        },
        {
            id: 5,
            title: "Advanced Java Concepts",
            description: "Master advanced Java programming techniques",
            icon: <StarIcon />,
            lessons: [
                {
                    title: "Generics",
                    subtitle: "Type-safe collections and methods",
                    content: `Generics allow you to write type-safe code that can work with different data types. They provide compile-time type checking and eliminate the need for type casting.

Benefits of generics:
• Type safety at compile time
• Elimination of type casting
• Better code reusability
• Improved performance

Generics are widely used in the Collections Framework and are essential for writing robust, reusable code.`,
                    examples: [
                        {
                            title: "Generic Classes",
                            code: `// Generic class
public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}

// Using generic class
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String message = stringBox.get(); // No casting needed

Box<Integer> intBox = new Box<>();
intBox.set(42);
Integer number = intBox.get(); // No casting needed`,
                            explanation: "Generic classes can work with any data type while maintaining type safety."
                        }
                    ],
                    keyPoints: ["Generic Classes", "Generic Methods", "Type Parameters", "Bounded Generics", "Type Erasure"]
                }
            ]
        }
    ];

    const flatLessons = flattenLessons(courseModules);
    const currentLesson = courseModules[selected.module].lessons[selected.lesson];
    const progress = (flatLessons.findIndex(l => l.moduleIndex === selected.module && l.lessonIndex === selected.lesson) + 1) / flatLessons.length * 100;

    // Navigation helpers
    const goToLesson = (moduleIdx, lessonIdx) => {
        setSelected({ module: moduleIdx, lesson: lessonIdx });
        setContentKey(`${moduleIdx}-${lessonIdx}-${Date.now()}`); // force animation
    };
    const goToFlatLesson = (flatIdx) => {
        const l = flatLessons[flatIdx];
        setSelected({ module: l.moduleIndex, lesson: l.lessonIndex });
        setContentKey(`${l.moduleIndex}-${l.lessonIndex}-${Date.now()}`); // force animation
        if (!expandedModules.includes(l.moduleIndex)) {
            setExpandedModules([...expandedModules, l.moduleIndex]);
        }
    };
    const currentFlatIdx = flatLessons.findIndex(l => l.moduleIndex === selected.module && l.lessonIndex === selected.lesson);

    // Sidebar expand/collapse
    const toggleModule = (idx) => {
        setExpandedModules(expandedModules.includes(idx)
            ? expandedModules.filter(i => i !== idx)
            : [...expandedModules, idx]);
    };

    // Auto-scroll to content on lesson change
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [contentKey]);

    return (
        <MainContainer>
            <Container maxWidth="xl" sx={{ mt: 4, width: '100%' }}>
                <Typography variant="h2" sx={{ fontWeight: 900, color: 'white', mb: 3, textAlign: 'center' }}>
                    Interactive Java Course
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, p: 2, background: 'rgba(0,0,0,0.2)', borderRadius: 3 }}>
                    <Button
                        onClick={() => goToFlatLesson(flatLessons.findIndex(l => l.title === currentLesson.title) - 1)}
                        disabled={flatLessons.findIndex(l => l.title === currentLesson.title) === 0}
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'white' }}
                    >
                        Previous Lesson
                    </Button>
                    <Box sx={{ flex: 1, mx: 3 }}>
                        <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', mb: 0.5 }}>
                            Overall Progress
                        </Typography>
                        <ProgressBar variant="determinate" value={progress} />
                    </Box>
                    <Button
                        onClick={() => goToFlatLesson(flatLessons.findIndex(l => l.title === currentLesson.title) + 1)}
                        disabled={flatLessons.findIndex(l => l.title === currentLesson.title) === flatLessons.length - 1}
                        variant="contained"
                        sx={{ bgcolor: palette.accent, color: palette.text, '&:hover': { bgcolor: '#FFC107' } }}
                    >
                        Next Lesson
                    </Button>
                </Box>

                <CoursePageContainer>
                    <Sidebar>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
                            <BookIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Java Course
                        </Typography>
                        {courseModules.map((module, idx) => (
                            <Box key={module.id} sx={{ mb: 1 }}>
                                <ModuleHeader onClick={() => toggleModule(idx)} expanded={expandedModules.includes(idx)}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {module.icon}
                                        <Typography variant="h6" sx={{ ml: 1.5, flexGrow: 1 }}>
                                            {module.title}
                                        </Typography>
                                    </Box>
                                    <IconButton size="small" sx={{ color: 'white' }}>
                                        {expandedModules.includes(idx) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </ModuleHeader>
                                <Collapse in={expandedModules.includes(idx)}>
                                    <Box sx={{ pl: 2, borderLeft: `2px solid ${palette.accent}`, ml: 1, mt: 1 }}>
                                        {module.lessons.map((lesson, lIdx) => (
                                            <LessonButton
                                                key={lIdx}
                                                onClick={() => goToLesson(idx, lIdx)}
                                                selected={selected.module === idx && selected.lesson === lIdx}
                                            >
                                                {selected.module === idx && selected.lesson === lIdx && <StarIcon sx={{ fontSize: 16, mr: 1, color: palette.accent }} />}
                                                {lesson.title}
                                            </LessonButton>
                                        ))}
                                    </Box>
                                </Collapse>
                            </Box>
                        ))}
                    </Sidebar>

                    <ContentContainer ref={contentRef}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={contentKey}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ContentCard>
                                    <HeaderBar>
                                        <SchoolIcon sx={{ fontSize: 40 }} />
                                        <Box>
                                            <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                                {currentLesson.title}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ color: '#e3e6f3' }}>
                                                {currentLesson.subtitle}
                                            </Typography>
                                        </Box>
                                    </HeaderBar>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: palette.text, mb: 3 }}
                                            dangerouslySetInnerHTML={{ __html: currentLesson.content.replace(/\n/g, '<br/>') }} />

                                        {currentLesson.examples && currentLesson.examples.map((ex, index) => (
                                            <Box key={index} sx={{ mb: 3 }}>
                                                <Typography variant="h6" sx={{ color: palette.text, fontWeight: 700, mb: 1 }}>{ex.title}</Typography>
                                                <CodeBlock>
                                                    <pre><code>{ex.code}</code></pre>
                                                </CodeBlock>
                                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6A1B9A' }}>{ex.explanation}</Typography>
                                            </Box>
                                        ))}

                                        <Typography variant="h6" sx={{ color: palette.text, fontWeight: 700, mb: 2, mt: 4 }}>Key Points</Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {currentLesson.keyPoints && currentLesson.keyPoints.map((point, index) => (
                                                <KeyPointChip key={index}>
                                                    <StarIcon sx={{ fontSize: 16, mr: 1 }} />
                                                    {point}
                                                </KeyPointChip>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </ContentCard>
                            </motion.div>
                        </AnimatePresence>
                    </ContentContainer>
                </CoursePageContainer>
            </Container>
        </MainContainer>
    );
};

export default Course; 