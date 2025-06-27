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
    Chip,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Confetti from 'react-confetti';
import QuizResult from '../components/QuizResult';

const PuzzleSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0a2342 0%, #3a0ca3 50%, #00b4d8 100%)',
    boxShadow: '0 4px 16px rgba(58,12,163,0.10)',
}));

const QuestionCard = styled(motion(Card))(({ theme }) => ({
    background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(58,12,163,0.10)',
    border: '2px solid rgba(0,180,216,0.15)',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    '&:hover': {
        transform: 'translateY(-6px) scale(1.02)',
        boxShadow: '0 16px 48px rgba(58,12,163,0.18)',
    },
}));

const ProgressCard = styled(motion(Paper))(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 20,
    background: 'linear-gradient(135deg, #ffd60a, #ffc300)',
    color: '#0a2342',
    boxShadow: '0 4px 24px rgba(0,180,216,0.10)',
}));

const OptionButton = styled(motion(Button))(({ theme, selected, correct, answered }) => ({
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 14,
    textAlign: 'left',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: '1.1rem',
    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
    background: selected
        ? (correct ? 'linear-gradient(90deg, #00b4d8, #3a0ca3)' : 'linear-gradient(90deg, #f44336, #720026)')
        : 'linear-gradient(90deg, #fff, #e0e7ff)',
    color: selected ? '#fff' : '#0a2342',
    border: selected ? 'none' : '2px solid #bdbdbd',
    boxShadow: selected ? '0 2px 12px rgba(58,12,163,0.10)' : 'none',
    '&:hover': {
        transform: selected ? 'scale(1.01)' : 'translateY(-2px) scale(1.03)',
        boxShadow: selected ? '0 4px 16px rgba(0,180,216,0.12)' : '0 4px 16px rgba(58,12,163,0.10)',
    },
}));

const QuizHeaderBox = styled(Box)(({ theme }) => ({
    width: '100%',
    background: 'linear-gradient(90deg, #FFD54F 0%, #FFFDE4 100%)',
    borderRadius: 14,
    padding: theme.spacing(2, 3),
    marginBottom: theme.spacing(3),
    boxShadow: '0 2px 12px rgba(255,213,79,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2, 1.5),
    },
}));

const QuizMainRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: theme.spacing(3),
    },
}));

const LeftColumn = styled(Box)(({ theme }) => ({
    flex: 3,
    marginLeft: 0,
    [theme.breakpoints.down('md')]: {
        flex: 'unset',
    },
}));

const RightColumn = styled(Box)(({ theme }) => ({
    flex: 1,
    marginRight: 0,
    [theme.breakpoints.down('md')]: {
        flex: 'unset',
    },
}));

const quizTopics = [
    {
        key: 'helloWorld',
        label: 'Hello World',
        questions: [
            {
                question: 'What does the main method do in a Java program?',
                options: [
                    'It is the entry point of the program',
                    'It prints output',
                    'It declares variables',
                    'It creates a class'
                ],
                correct: 0,
                explanation: 'The main method is the entry point of every Java application.'
            },
            {
                question: 'What is the correct output of System.out.println("Hello, World!");?',
                options: [
                    'Hello World',
                    'Hello, World!',
                    'System.out.println("Hello, World!");',
                    'Error'
                ],
                correct: 1,
                explanation: 'System.out.println prints the string exactly as given.'
            }
        ]
    },
    {
        key: 'variables',
        label: 'Variables',
        questions: [
            {
                question: 'Which is a valid variable declaration in Java?',
                options: [
                    'int 1num = 5;',
                    'int num = 5;',
                    'num int = 5;',
                    'int = 5 num;'
                ],
                correct: 1,
                explanation: 'Variable names cannot start with a digit and must follow Java naming rules.'
            },
            {
                question: 'What is the value of sum after: int a = 2; int b = 3; int sum = a + b;?',
                options: ['2', '3', '5', '6'],
                correct: 2,
                explanation: '2 + 3 = 5.'
            },
            {
                question: 'Which of the following is NOT a valid variable name in Java?',
                options: ['_myVar', '2ndValue', 'totalAmount', 'userName'],
                correct: 1,
                explanation: 'Variable names cannot start with a digit.'
            },
            {
                question: 'What is the default value of an int variable in a Java class (not local)?',
                options: ['0', 'null', 'undefined', '1'],
                correct: 0,
                explanation: 'int fields in a class default to 0.'
            },
            {
                question: 'Which data type is used to store a single character?',
                options: ['String', 'char', 'character', 'byte'],
                correct: 1,
                explanation: 'char is used for single characters.'
            },
            {
                question: 'What will be the output? int x = 7; System.out.println(x);',
                options: ['x', '7', 'int x', 'Error'],
                correct: 1,
                explanation: 'The value of x (7) is printed.'
            },
            {
                question: 'Which keyword is used to declare a constant variable in Java?',
                options: ['const', 'final', 'static', 'constant'],
                correct: 1,
                explanation: 'final makes a variable constant (cannot be changed).'
            },
            {
                question: 'What is the scope of a variable declared inside a method?',
                options: ['Global', 'Class', 'Method/Local', 'Package'],
                correct: 2,
                explanation: 'Variables declared inside a method are local to that method.'
            },
            {
                question: 'Which of the following is a correct way to assign a value to a variable?',
                options: ['int a; a = 10;', 'int a = 10;', 'Both A and B', 'None'],
                correct: 2,
                explanation: 'Both declaration then assignment, and declaration with assignment, are valid.'
            },
            {
                question: 'What happens if you try to use a local variable before initializing it?',
                options: ['It defaults to 0', 'It causes a compile error', 'It is set to null', 'It prints nothing'],
                correct: 1,
                explanation: 'Local variables must be initialized before use.'
            },
            {
                question: 'Which of the following is a primitive data type?',
                options: ['String', 'int', 'Integer', 'ArrayList'],
                correct: 1,
                explanation: 'int is a primitive; String and Integer are objects.'
            },
            {
                question: 'What is the result of: double d = 5 / 2;',
                options: ['2.5', '2', '2.0', 'Error'],
                correct: 1,
                explanation: '5/2 is integer division (2); assign to double gives 2.0.'
            },
            {
                question: 'Which statement is true about variable naming in Java?',
                options: [
                    'Variable names are case-insensitive',
                    'Variable names can contain spaces',
                    'Variable names can use $ and _',
                    'Variable names can start with a number'
                ],
                correct: 2,
                explanation: 'Java variable names can use $ and _, but not spaces or start with a number.'
            }
        ]
    },
    {
        key: 'ifelse',
        label: 'If/Else',
        questions: [
            {
                question: 'What will this code print? int x = 10; if (x > 5) { System.out.println("A"); } else { System.out.println("B"); }',
                options: ['A', 'B', 'Nothing', 'Error'],
                correct: 0,
                explanation: '10 > 5 is true, so "A" is printed.'
            },
            {
                question: 'Which is the correct syntax for an if-else statement?',
                options: [
                    'if x > 5: ... else: ...',
                    'if (x > 5) { ... } else { ... }',
                    'if x > 5 then ... else ...',
                    'if (x > 5) then { ... } else { ... }'
                ],
                correct: 1,
                explanation: 'Java uses parentheses and curly braces for if-else.'
            },
            {
                question: 'What is the output? int y = 3; if (y == 3) { System.out.print("Yes"); } else { System.out.print("No"); }',
                options: ['Yes', 'No', 'Error', 'Nothing'],
                correct: 0,
                explanation: 'y == 3 is true, so "Yes" is printed.'
            },
            {
                question: 'Which of the following is a valid boolean expression for an if statement?',
                options: ['x = 5', 'x == 5', 'x === 5', 'x => 5'],
                correct: 1,
                explanation: 'x == 5 checks equality in Java.'
            },
            {
                question: 'What is the output? int a = 2; if (a > 5) { System.out.print("Big"); } else { System.out.print("Small"); }',
                options: ['Big', 'Small', 'Error', 'Nothing'],
                correct: 1,
                explanation: '2 > 5 is false, so "Small" is printed.'
            },
            {
                question: 'Which keyword is used for multiple conditions in sequence?',
                options: ['elseif', 'else if', 'elif', 'otherwise'],
                correct: 1,
                explanation: 'Java uses else if (with a space).'
            },
            {
                question: 'What is the output? int n = 7; if (n % 2 == 0) { System.out.print("Even"); } else { System.out.print("Odd"); }',
                options: ['Even', 'Odd', 'Error', '7'],
                correct: 1,
                explanation: '7 % 2 == 1, so "Odd" is printed.'
            },
            {
                question: 'Which of the following is true about if-else statements?',
                options: [
                    'The else block is always required',
                    'You can have multiple else if blocks',
                    'You cannot nest if statements',
                    'if-else must end with a semicolon'
                ],
                correct: 1,
                explanation: 'You can have multiple else if blocks.'
            },
            {
                question: 'What is the output? int z = 4; if (z > 2) if (z < 10) System.out.print("Yes"); else System.out.print("No");',
                options: ['Yes', 'No', 'Error', 'Nothing'],
                correct: 0,
                explanation: 'Both conditions are true, so "Yes" is printed.'
            },
            {
                question: 'Which of the following is a common mistake with if-else?',
                options: [
                    'Using = instead of == in conditions',
                    'Forgetting curly braces for multiple statements',
                    'Not initializing variables',
                    'All of the above'
                ],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'What is the output? int x = 5; if (x > 10) System.out.print("A"); System.out.print("B");',
                options: ['A', 'B', 'AB', 'Nothing'],
                correct: 1,
                explanation: 'Only "B" is printed because the second print is outside the if.'
            },
            {
                question: 'How do you check if a boolean variable flag is true?',
                options: ['if (flag = true)', 'if (flag == true)', 'if (flag)', 'Both B and C'],
                correct: 3,
                explanation: 'if (flag) and if (flag == true) are both valid.'
            },
            {
                question: 'What is the output? int a = 1; if (a > 0) { if (a < 5) { System.out.print("X"); } }',
                options: ['X', 'Nothing', 'Error', '0'],
                correct: 0,
                explanation: 'Both conditions are true, so "X" is printed.'
            },
            {
                question: 'Which of the following is NOT allowed in an if condition?',
                options: ['Comparison', 'Assignment', 'Logical AND', 'Logical OR'],
                correct: 1,
                explanation: 'Assignment (=) is not a valid condition.'
            },
            {
                question: 'What is the output? int b = 0; if (b) { System.out.print("Yes"); } else { System.out.print("No"); }',
                options: ['Yes', 'No', 'Error', 'Nothing'],
                correct: 2,
                explanation: 'if (b) is not valid in Java; must be boolean.'
            },
            {
                question: 'Which statement is true about nested if statements?',
                options: [
                    'They are not allowed',
                    'They must have an else',
                    'They can be used for multiple conditions',
                    'They are only for loops'
                ],
                correct: 2,
                explanation: 'Nested ifs are used for multiple conditions.'
            }
        ]
    },
    {
        key: 'loops',
        label: 'Loops',
        questions: [
            {
                question: 'How many times will this loop run? for (int i = 0; i < 3; i++) { ... }',
                options: ['2', '3', '4', '0'],
                correct: 1,
                explanation: 'i = 0, 1, 2 (three times).'
            },
            {
                question: 'Which loop is guaranteed to run at least once?',
                options: ['for', 'while', 'do-while', 'foreach'],
                correct: 2,
                explanation: 'do-while always runs at least once.'
            },
            {
                question: 'What is the output? for (int i = 1; i <= 3; i++) { System.out.print(i); }',
                options: ['123', '321', '1 2 3', 'Error'],
                correct: 0,
                explanation: 'Prints 1, 2, 3 in order.'
            },
            {
                question: 'Which of the following is NOT a valid loop in Java?',
                options: ['for', 'while', 'repeat', 'do-while'],
                correct: 2,
                explanation: 'Java does not have a repeat loop.'
            },
            {
                question: 'What is the output? int i = 0; while (i < 2) { System.out.print(i); i++; }',
                options: ['0', '01', '10', '1'],
                correct: 1,
                explanation: 'Prints 0 then 1.'
            },
            {
                question: 'Which statement is true about the enhanced for loop?',
                options: [
                    'It is used for arrays and collections',
                    'It requires an index variable',
                    'It cannot be used with arrays',
                    'It is only for integers'
                ],
                correct: 0,
                explanation: 'Enhanced for is for arrays/collections.'
            },
            {
                question: 'What is the output? int[] arr = {1,2,3}; for (int n : arr) { System.out.print(n); }',
                options: ['123', '321', '1 2 3', 'Error'],
                correct: 0,
                explanation: 'Prints 1, 2, 3 in order.'
            },
            {
                question: 'Which keyword is used to exit a loop early?',
                options: ['exit', 'break', 'continue', 'stop'],
                correct: 1,
                explanation: 'break exits a loop.'
            },
            {
                question: 'What is the output? for (int i = 0; i < 5; i++) { if (i == 3) break; System.out.print(i); }',
                options: ['0123', '012', '1234', '01234'],
                correct: 1,
                explanation: 'Loop breaks at i==3, so prints 0,1,2.'
            },
            {
                question: 'Which keyword skips the current iteration and continues the loop?',
                options: ['break', 'continue', 'skip', 'next'],
                correct: 1,
                explanation: 'continue skips to the next iteration.'
            },
            {
                question: 'What is the output? int i = 1; do { System.out.print(i); i++; } while (i < 3);',
                options: ['1', '12', '23', 'Error'],
                correct: 1,
                explanation: 'Prints 1 then 2.'
            },
            {
                question: 'Which of the following is a common mistake with loops?',
                options: [
                    'Forgetting to update the loop variable',
                    'Infinite loops',
                    'Off-by-one errors',
                    'All of the above'
                ],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'What is the output? for (int i = 0; i < 0; i++) { System.out.print(i); }',
                options: ['0', 'Nothing', 'Error', '1'],
                correct: 1,
                explanation: 'Loop never runs.'
            },
            {
                question: 'Which loop is best for iterating over an array?',
                options: ['for', 'while', 'do-while', 'All can be used'],
                correct: 3,
                explanation: 'All can be used, but enhanced for is most convenient.'
            },
            {
                question: 'What is the output? int i = 0; while (i < 3) { i++; } System.out.print(i);',
                options: ['0', '1', '2', '3'],
                correct: 3,
                explanation: 'i increments to 3.'
            },
            {
                question: 'Which statement is true about nested loops?',
                options: [
                    'They are not allowed',
                    'They must be of the same type',
                    'They can be used for multidimensional arrays',
                    'They are only for while loops'
                ],
                correct: 2,
                explanation: 'Nested loops are used for multidimensional arrays.'
            }
        ]
    },
    {
        key: 'arrays',
        label: 'Arrays',
        questions: [
            {
                question: 'How do you declare an array of integers in Java?',
                options: ['int arr[];', 'int[] arr;', 'Both A and B', 'array int arr;'],
                correct: 2,
                explanation: 'Both int arr[] and int[] arr are valid.'
            },
            {
                question: 'What is the default value of an int array element?',
                options: ['0', 'null', 'undefined', '1'],
                correct: 0,
                explanation: 'int arrays are initialized to 0.'
            },
            {
                question: 'How do you get the length of an array arr?',
                options: ['arr.length()', 'arr.size()', 'arr.length', 'length(arr)'],
                correct: 2,
                explanation: 'Use arr.length (no parentheses).'
            },
            {
                question: 'What is the output? int[] a = {1,2,3}; System.out.print(a[1]);',
                options: ['1', '2', '3', 'Error'],
                correct: 1,
                explanation: 'a[1] is 2.'
            },
            {
                question: 'Which of the following creates an array of 5 doubles?',
                options: ['double[] d = new double[5];', 'double d = new double[5];', 'double[5] d;', 'double d[] = 5;'],
                correct: 0,
                explanation: 'Correct syntax: new double[5].'
            },
            {
                question: 'What happens if you access arr[10] in an array of length 5?',
                options: ['Returns 0', 'Returns null', 'ArrayIndexOutOfBoundsException', 'Compiles but does nothing'],
                correct: 2,
                explanation: 'Throws ArrayIndexOutOfBoundsException.'
            },
            {
                question: 'How do you iterate over all elements in an array?',
                options: ['for', 'while', 'enhanced for', 'All of the above'],
                correct: 3,
                explanation: 'All can be used.'
            },
            {
                question: 'What is the output? int[] arr = new int[3]; System.out.print(arr[2]);',
                options: ['0', 'null', 'Error', '3'],
                correct: 0,
                explanation: 'Default value is 0.'
            },
            {
                question: 'How do you declare a 2D array of ints?',
                options: ['int[][] arr;', 'int arr[][];', 'Both A and B', 'int[2][2] arr;'],
                correct: 2,
                explanation: 'Both int[][] arr and int arr[][] are valid.'
            },
            {
                question: 'What is the output? int[][] a = {{1,2},{3,4}}; System.out.print(a[1][0]);',
                options: ['1', '2', '3', '4'],
                correct: 2,
                explanation: 'a[1][0] is 3.'
            },
            {
                question: 'Which is a common mistake with arrays?',
                options: ['Using length() instead of length', 'Accessing out of bounds', 'Forgetting to initialize', 'All of the above'],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'What is the output? int[] arr = {1,2,3}; for (int i : arr) { System.out.print(i); }',
                options: ['123', '321', '1 2 3', 'Error'],
                correct: 0,
                explanation: 'Prints 1, 2, 3 in order.'
            },
            {
                question: 'How do you copy an array?',
                options: ['System.arraycopy', 'Arrays.copyOf', 'Clone', 'All of the above'],
                correct: 3,
                explanation: 'All are valid ways.'
            },
            {
                question: 'What is the output? int[] arr = new int[2]; arr[0] = 5; System.out.print(arr[1]);',
                options: ['0', '5', 'null', 'Error'],
                correct: 0,
                explanation: 'arr[1] is still 0.'
            },
            {
                question: 'Which statement is true about arrays?',
                options: ['Arrays are fixed size', 'Arrays can grow dynamically', 'Arrays are always 1D', 'Arrays store only objects'],
                correct: 0,
                explanation: 'Arrays are fixed size.'
            },
            {
                question: 'What is the output? int[] arr = {1,2,3}; System.out.print(arr.length);',
                options: ['2', '3', '1', 'Error'],
                correct: 1,
                explanation: 'arr.length is 3.'
            }
        ]
    },
    {
        key: 'classes',
        label: 'Classes & Objects',
        questions: [
            {
                question: 'How do you declare a class in Java?',
                options: ['class MyClass {}', 'MyClass class {}', 'declare class MyClass {}', 'class: MyClass {}'],
                correct: 0,
                explanation: 'Use class MyClass { }.'
            },
            {
                question: 'What is the default access modifier for a class?',
                options: ['public', 'private', 'protected', 'package-private'],
                correct: 3,
                explanation: 'If no modifier, it is package-private.'
            },
            {
                question: 'Which keyword is used to create an object?',
                options: ['new', 'create', 'object', 'make'],
                correct: 0,
                explanation: 'Use new to instantiate objects.'
            },
            {
                question: 'What is a constructor?',
                options: ['A method to initialize objects', 'A static method', 'A field', 'A class variable'],
                correct: 0,
                explanation: 'Constructors initialize objects.'
            },
            {
                question: 'Which is a valid constructor for class Dog?',
                options: ['Dog()', 'void Dog()', 'Dog(void)', 'constructor Dog()'],
                correct: 0,
                explanation: 'Constructors have no return type.'
            },
            {
                question: 'What is encapsulation?',
                options: ['Hiding data', 'Inheritance', 'Polymorphism', 'Overloading'],
                correct: 0,
                explanation: 'Encapsulation is hiding data using private fields and public methods.'
            },
            {
                question: 'How do you access a public field x of object obj?',
                options: ['obj.x', 'x.obj', 'obj->x', 'obj:x'],
                correct: 0,
                explanation: 'Use obj.x.'
            },
            {
                question: 'Which keyword is used for inheritance?',
                options: ['extends', 'implements', 'inherits', 'super'],
                correct: 0,
                explanation: 'extends is for inheritance.'
            },
            {
                question: 'What is the output? class A { int x = 5; } A a = new A(); System.out.print(a.x);',
                options: ['0', '5', 'null', 'Error'],
                correct: 1,
                explanation: 'a.x is 5.'
            },
            {
                question: 'Which is a common mistake with classes?',
                options: ['Forgetting to initialize fields', 'Not using access modifiers', 'Not defining constructors', 'All of the above'],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'What is the output? class B { static int y = 2; } System.out.print(B.y);',
                options: ['0', '2', 'null', 'Error'],
                correct: 1,
                explanation: 'Static fields are accessed by class name.'
            },
            {
                question: 'Which statement is true about methods?',
                options: ['They must have a return type', 'They can be static', 'They can be overloaded', 'All of the above'],
                correct: 3,
                explanation: 'All are true.'
            },
            {
                question: 'What is the output? class C { void foo() { System.out.print("Hi"); } } new C().foo();',
                options: ['Hi', 'foo', 'Error', 'Nothing'],
                correct: 0,
                explanation: 'foo() prints Hi.'
            },
            {
                question: 'Which is NOT a valid access modifier for a class?',
                options: ['public', 'private', 'protected', 'package-private'],
                correct: 1,
                explanation: 'Classes cannot be private (except inner classes).'
            },
            {
                question: 'What is the output? class D { int z; } D d = new D(); System.out.print(d.z);',
                options: ['0', 'null', 'Error', 'undefined'],
                correct: 0,
                explanation: 'int fields default to 0.'
            },
            {
                question: 'Which keyword refers to the current object?',
                options: ['this', 'self', 'current', 'me'],
                correct: 0,
                explanation: 'this refers to the current object.'
            }
        ]
    },
    {
        key: 'oop',
        label: 'OOP',
        questions: [
            {
                question: 'Which is NOT a pillar of OOP?',
                options: ['Encapsulation', 'Polymorphism', 'Abstraction', 'Compilation'],
                correct: 3,
                explanation: 'Compilation is not an OOP pillar.'
            },
            {
                question: 'Which keyword is used for inheritance?',
                options: ['extends', 'implements', 'inherits', 'super'],
                correct: 0,
                explanation: 'extends is used for inheritance.'
            },
            {
                question: 'What is method overriding?',
                options: ['Redefining a method in a subclass', 'Defining multiple methods with same name', 'Using static methods', 'None of the above'],
                correct: 0,
                explanation: 'Overriding is redefining a method in a subclass.'
            },
            {
                question: 'What is method overloading?',
                options: ['Multiple methods with same name but different parameters', 'Redefining a method in subclass', 'Using static methods', 'None of the above'],
                correct: 0,
                explanation: 'Overloading is same name, different parameters.'
            },
            {
                question: 'Which is true about interfaces?',
                options: ['They can have default methods', 'They can have fields', 'They cannot be implemented', 'They are classes'],
                correct: 0,
                explanation: 'Interfaces can have default methods.'
            },
            {
                question: 'What is abstraction?',
                options: ['Hiding implementation details', 'Hiding data', 'Inheritance', 'Polymorphism'],
                correct: 0,
                explanation: 'Abstraction hides implementation details.'
            },
            {
                question: 'Which is an example of polymorphism?',
                options: ['Method overriding', 'Method overloading', 'Both A and B', 'None'],
                correct: 2,
                explanation: 'Both are forms of polymorphism.'
            },
            {
                question: 'Which keyword is used to prevent inheritance?',
                options: ['final', 'static', 'private', 'abstract'],
                correct: 0,
                explanation: 'final prevents inheritance.'
            },
            {
                question: 'What is the output? class A { void foo() { System.out.print("A"); } } class B extends A { void foo() { System.out.print("B"); } } new B().foo();',
                options: ['A', 'B', 'Error', 'Nothing'],
                correct: 1,
                explanation: 'B overrides foo(), so prints B.'
            },
            {
                question: 'Which is a common mistake in OOP?',
                options: ['Not using encapsulation', 'Not overriding methods', 'Not using interfaces', 'All of the above'],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'Which statement is true about abstract classes?',
                options: ['They can have abstract and concrete methods', 'They cannot be instantiated', 'They can have fields', 'All of the above'],
                correct: 3,
                explanation: 'All are true.'
            },
            {
                question: 'What is the output? interface I { void foo(); } class C implements I { public void foo() { System.out.print("X"); } } new C().foo();',
                options: ['X', 'foo', 'Error', 'Nothing'],
                correct: 0,
                explanation: 'foo() prints X.'
            },
            {
                question: 'Which is NOT allowed in an interface?',
                options: ['Default methods', 'Static methods', 'Private methods', 'Instance fields'],
                correct: 3,
                explanation: 'Interfaces cannot have instance fields.'
            },
            {
                question: 'What is the output? class A { void foo() { System.out.print("A"); } } class B extends A { } new B().foo();',
                options: ['A', 'B', 'Error', 'Nothing'],
                correct: 0,
                explanation: 'B inherits foo() from A.'
            },
            {
                question: 'Which keyword is used to define an abstract method?',
                options: ['abstract', 'final', 'static', 'void'],
                correct: 0,
                explanation: 'abstract is used for abstract methods.'
            },
            {
                question: 'Which is a benefit of encapsulation?',
                options: ['Data hiding', 'Code reusability', 'Faster execution', 'None'],
                correct: 0,
                explanation: 'Encapsulation hides data.'
            }
        ]
    },
    {
        key: 'exceptionHandling',
        label: 'Exception Handling',
        questions: [
            {
                question: 'Which block is always executed in a try-catch-finally statement?',
                options: ['try', 'catch', 'finally', 'None'],
                correct: 2,
                explanation: 'finally always executes.'
            },
            {
                question: 'Which of these is a checked exception?',
                options: ['NullPointerException', 'IOException', 'ArithmeticException', 'ArrayIndexOutOfBoundsException'],
                correct: 1,
                explanation: 'IOException is checked.'
            },
            {
                question: 'What is the output? try { int x = 1/0; } catch (Exception e) { System.out.print("E"); }',
                options: ['E', '0', 'Error', 'Nothing'],
                correct: 0,
                explanation: 'Division by zero throws ArithmeticException, caught by catch.'
            },
            {
                question: 'Which keyword is used to throw an exception?',
                options: ['throw', 'throws', 'catch', 'raise'],
                correct: 0,
                explanation: 'Use throw to throw an exception.'
            },
            {
                question: 'Which statement is true about catch blocks?',
                options: ['You can have multiple catch blocks', 'Only one catch block is allowed', 'catch is optional', 'catch must come before try'],
                correct: 0,
                explanation: 'You can have multiple catch blocks for different exceptions.'
            },
            {
                question: 'What is the superclass of all exceptions?',
                options: ['Throwable', 'Exception', 'Error', 'Object'],
                correct: 0,
                explanation: 'Throwable is the superclass.'
            },
            {
                question: 'Which of these is an unchecked exception?',
                options: ['IOException', 'FileNotFoundException', 'NullPointerException', 'SQLException'],
                correct: 2,
                explanation: 'NullPointerException is unchecked.'
            },
            {
                question: 'What is the output? try { return; } finally { System.out.print("F"); }',
                options: ['Nothing', 'F', 'Error', 'Return'],
                correct: 1,
                explanation: 'finally runs even after return.'
            },
            {
                question: 'How do you create a custom exception?',
                options: ['Extend Exception', 'Extend Throwable', 'Extend Error', 'Extend Runtime'],
                correct: 0,
                explanation: 'Custom exceptions extend Exception.'
            },
            {
                question: 'Which is a common mistake with exception handling?',
                options: ['Catching Exception instead of specific types', 'Empty catch blocks', 'Not closing resources', 'All of the above'],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'What is the output? try { int[] a = new int[2]; a[2] = 5; } catch (ArrayIndexOutOfBoundsException e) { System.out.print("A"); }',
                options: ['A', 'Error', 'Nothing', '5'],
                correct: 0,
                explanation: 'ArrayIndexOutOfBoundsException is caught.'
            },
            {
                question: 'Which statement is true about finally?',
                options: ['It always runs', 'It runs only if exception occurs', 'It is optional', 'Both A and C'],
                correct: 3,
                explanation: 'finally always runs and is optional.'
            },
            {
                question: 'Which keyword is used to declare that a method may throw an exception?',
                options: ['throw', 'throws', 'catch', 'try'],
                correct: 1,
                explanation: 'Use throws in method signature.'
            },
            {
                question: 'What is the output? try { throw new Exception(); } catch (Exception e) { System.out.print("C"); }',
                options: ['C', 'Error', 'Nothing', 'Exception'],
                correct: 0,
                explanation: 'Exception is caught and prints C.'
            },
            {
                question: 'Which is NOT a good practice?',
                options: ['Catching Throwable', 'Catching specific exceptions', 'Using finally to close resources', 'Logging exceptions'],
                correct: 0,
                explanation: 'Catching Throwable is not recommended.'
            },
            {
                question: 'What is the output? try { int x = 5/0; } catch (ArithmeticException e) { System.out.print("E"); } finally { System.out.print("F"); }',
                options: ['E', 'F', 'EF', 'Error'],
                correct: 2,
                explanation: 'Catches exception and runs finally.'
            }
        ]
    },
    {
        key: 'fileIO',
        label: 'File I/O',
        questions: [
            {
                question: 'Which class is used to read text from a file?',
                options: ['FileReader', 'FileWriter', 'Scanner', 'Both A and C'],
                correct: 3,
                explanation: 'FileReader and Scanner can read text files.'
            },
            {
                question: 'Which class is used to write text to a file?',
                options: ['FileWriter', 'FileReader', 'Scanner', 'FileInputStream'],
                correct: 0,
                explanation: 'FileWriter writes text files.'
            },
            {
                question: 'Which exception must be handled when working with files?',
                options: ['IOException', 'NullPointerException', 'ArithmeticException', 'ArrayIndexOutOfBoundsException'],
                correct: 0,
                explanation: 'IOException must be handled.'
            },
            {
                question: 'What is the output? File f = new File("test.txt"); System.out.print(f.exists());',
                options: ['true or false', 'true', 'false', 'Error'],
                correct: 0,
                explanation: 'Depends if file exists.'
            },
            {
                question: 'Which is a common mistake with file I/O?',
                options: ['Not closing streams', 'Forgetting to handle exceptions', 'Using wrong file path', 'All of the above'],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'Which class is used for binary file input?',
                options: ['FileInputStream', 'FileReader', 'Scanner', 'BufferedReader'],
                correct: 0,
                explanation: 'FileInputStream is for binary input.'
            },
            {
                question: 'How do you close a file in Java?',
                options: ['close()', 'end()', 'finish()', 'stop()'],
                correct: 0,
                explanation: 'Use close() method.'
            },
            {
                question: 'Which statement is true about BufferedReader?',
                options: ['It reads text efficiently', 'It is for binary files', 'It cannot read lines', 'It is deprecated'],
                correct: 0,
                explanation: 'BufferedReader is efficient for text.'
            },
            {
                question: 'What is the output? FileWriter fw = new FileWriter("a.txt"); fw.write("Hi"); fw.close();',
                options: ['Writes Hi to a.txt', 'Error', 'Nothing', 'Appends Hi'],
                correct: 0,
                explanation: 'Writes Hi to file.'
            },
            {
                question: 'Which is a best practice for file I/O?',
                options: ['Use try-with-resources', 'Ignore exceptions', 'Never close files', 'Use global variables'],
                correct: 0,
                explanation: 'try-with-resources ensures closing.'
            },
            {
                question: 'Which class is used to read a line from a file?',
                options: ['BufferedReader', 'FileInputStream', 'FileWriter', 'PrintWriter'],
                correct: 0,
                explanation: 'BufferedReader can read lines.'
            },
            {
                question: 'What is the output? Scanner sc = new Scanner(new File("a.txt")); System.out.print(sc.nextLine());',
                options: ['First line of a.txt', 'Error', 'Nothing', 'All lines'],
                correct: 0,
                explanation: 'Prints first line.'
            },
            {
                question: 'Which is NOT a file mode in Java?',
                options: ['read', 'write', 'append', 'execute'],
                correct: 3,
                explanation: 'execute is not a file mode.'
            },
            {
                question: 'Which class is used to append to a file?',
                options: ['FileWriter with append true', 'FileReader', 'Scanner', 'BufferedReader'],
                correct: 0,
                explanation: 'FileWriter can append if constructed with append=true.'
            },
            {
                question: 'What is the output? File f = new File("nofile.txt"); System.out.print(f.exists());',
                options: ['true', 'false', 'Error', 'Depends'],
                correct: 1,
                explanation: 'File does not exist.'
            },
            {
                question: 'Which is a benefit of using BufferedWriter?',
                options: ['Efficient writing', 'Binary writing', 'No need to close', 'None'],
                correct: 0,
                explanation: 'BufferedWriter is efficient for text.'
            }
        ]
    },
    {
        key: 'generics',
        label: 'Generics',
        questions: [
            {
                question: 'What is the main benefit of generics?',
                options: ['Type safety', 'Faster code', 'Less memory', 'No benefit'],
                correct: 0,
                explanation: 'Generics provide type safety.'
            },
            {
                question: 'How do you declare a generic class?',
                options: ['class Box<T> {}', 'class<T> Box {}', 'Box<T> class {}', 'class Box {}'],
                correct: 0,
                explanation: 'Use class Box<T> { }.'
            },
            {
                question: 'Which is a valid generic method?',
                options: ['<T> void foo(T t)', 'void <T> foo(T t)', 'void foo<T>(T t)', 'T foo(T t)'],
                correct: 0,
                explanation: 'Generic method: <T> void foo(T t).'
            },
            {
                question: 'What is the output? List<String> list = new ArrayList<>(); list.add("A"); System.out.print(list.get(0));',
                options: ['A', '0', 'Error', 'null'],
                correct: 0,
                explanation: 'list.get(0) is "A".'
            },
            {
                question: 'Which wildcard allows any type?',
                options: ['?', '? extends T', '? super T', 'T'],
                correct: 0,
                explanation: '? is the unbounded wildcard.'
            },
            {
                question: 'What is the output? List<?> list = new ArrayList<String>(); list.add(null); System.out.print(list.size());',
                options: ['0', '1', 'Error', 'null'],
                correct: 1,
                explanation: 'Only null can be added to List<?>.'
            },
            {
                question: 'Which is a bounded type parameter?',
                options: ['<T extends Number>', '<T>', '<T super Number>', '<T implements Number>'],
                correct: 0,
                explanation: 'Use <T extends Number> for bounded types.'
            },
            {
                question: 'Which is a common mistake with generics?',
                options: ['Using raw types', 'Type erasure confusion', 'Incorrect bounds', 'All of the above'],
                correct: 3,
                explanation: 'All are common mistakes.'
            },
            {
                question: 'What is type erasure?',
                options: ['Generics info removed at runtime', 'Compile-time error', 'Memory leak', 'Type casting'],
                correct: 0,
                explanation: 'Type erasure removes generic info at runtime.'
            },
            {
                question: 'Which is a valid use of wildcards?',
                options: ['List<? extends Number>', 'List<? super Integer>', 'List<?>', 'All of the above'],
                correct: 3,
                explanation: 'All are valid wildcard uses.'
            },
            {
                question: 'What is the output? List<Integer> l = new ArrayList<>(); l.add(1); l.add(2); System.out.print(l.size());',
                options: ['1', '2', '0', 'Error'],
                correct: 1,
                explanation: 'Two elements added.'
            },
            {
                question: 'Which is NOT allowed with generics?',
                options: ['new T[]', 'T t = new T()', 'T.class', 'All of the above'],
                correct: 3,
                explanation: 'Cannot create generic arrays or use T.class.'
            },
            {
                question: 'Which is a generic interface in Java?',
                options: ['List<T>', 'Runnable', 'Serializable', 'Cloneable'],
                correct: 0,
                explanation: 'List<T> is generic.'
            },
            {
                question: 'What is the output? List raw = new ArrayList(); raw.add("X"); System.out.print(raw.get(0));',
                options: ['X', 'Error', 'null', '0'],
                correct: 0,
                explanation: 'Raw types allow any object.'
            },
            {
                question: 'Which is a benefit of bounded wildcards?',
                options: ['Restrict types', 'Allow flexibility', 'Prevent errors', 'All of the above'],
                correct: 3,
                explanation: 'All are benefits.'
            },
            {
                question: 'Which is true about generic constructors?',
                options: ['They can have their own type parameters', 'They must match class type', 'They are not allowed', 'They must be static'],
                correct: 0,
                explanation: 'Generic constructors can have their own type parameters.'
            }
        ]
    }
];

const Puzzle = () => {
    const [selectedTopic, setSelectedTopic] = useState(quizTopics[0].key);
    const topicData = quizTopics.find(t => t.key === selectedTopic);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [difficulty, setDifficulty] = useState('beginner');
    const [showConfetti, setShowConfetti] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false);
    const scoreRef = useRef(null);
    const [displayScore, setDisplayScore] = useState(0);
    const energeticMessages = {
        correct: [
            "Awesome! Keep it up!",
            "Great job! You're on fire!",
            "Correct! You're crushing it!",
            "Fantastic! Keep going!",
            "Brilliant! Next one!"
        ],
        incorrect: [
            "Don't worry, try the next one!",
            "Keep going, you can do it!",
            "Almost there! Stay focused!",
            "Keep your spirits high!",
            "You'll get the next one!"
        ]
    };
    const [energeticMsg, setEnergeticMsg] = useState("");

    const currentQuestions = topicData.questions;
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    // Helper functions
    const getScorePercentage = () => {
        return (score / topicData.questions.length) * 100;
    };

    const getPerformanceMessage = () => {
        const percentage = getScorePercentage();
        if (percentage >= 90) return "Outstanding! You're a Java Virtuoso!";
        if (percentage >= 70) return "Excellent Work! You've got strong skills!";
        if (percentage >= 50) return 'Good Job! Keep practicing to master it!';
        return 'Great start! Review and try again!';
    };

    const getProgressPercentage = () => {
        return ((currentQuestion + 1) / topicData.questions.length) * 100;
    };

    const handleAnswerSelect = (answerIndex) => {
        if (!answered) {
            setSelectedAnswer(answerIndex);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setAnswered(true);
            let isCorrect = selectedAnswer === currentQuestions[currentQuestion].correct;
            if (isCorrect) {
                setScore(score + 1);
            }
            // Pick a random energetic message
            const msgArr = isCorrect ? energeticMessages.correct : energeticMessages.incorrect;
            setEnergeticMsg(msgArr[Math.floor(Math.random() * msgArr.length)]);

            // Auto-advance to the next question after a delay
            setTimeout(() => {
                handleNext();
            }, 1000); // 1-second delay
        }
    };

    const handleNext = () => {
        if (currentQuestion < currentQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setAnswered(false);
            setEnergeticMsg(""); // Reset energetic message
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    const handleNextTopic = () => {
        const currentTopicIndex = quizTopics.findIndex(t => t.key === selectedTopic);
        if (currentTopicIndex < quizTopics.length - 1) {
            const nextTopicKey = quizTopics[currentTopicIndex + 1].key;
            setSelectedTopic(nextTopicKey);
            handleRestart();
        }
    };

    useEffect(() => {
        if (showResult) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2500);
            setShowResultDialog(true);
        }
    }, [showResult]);

    useEffect(() => {
        if (showResult) {
            let start = 0;
            const end = score;
            if (start === end) return;
            let increment = end > 0 ? 1 : 0;
            let timer = setInterval(() => {
                start += increment;
                setDisplayScore(start);
                if (start === end) clearInterval(timer);
            }, 80);
            return () => clearInterval(timer);
        } else {
            setDisplayScore(0);
        }
    }, [showResult, score]);

    return (
        <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', p: 0, m: 0 }}>
            <PuzzleSection>
                <Container maxWidth="md">
                    <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                        {quizTopics.map(topic => (
                            <Button
                                key={topic.key}
                                variant={selectedTopic === topic.key ? 'contained' : 'outlined'}
                                color={selectedTopic === topic.key ? 'primary' : 'inherit'}
                                onClick={() => {
                                    setSelectedTopic(topic.key);
                                    setCurrentQuestion(0);
                                    setScore(0);
                                    setAnswered(false);
                                    setSelectedAnswer(null);
                                    setShowResult(false);
                                }}
                                sx={{
                                    fontWeight: 700,
                                    borderRadius: 8,
                                    fontSize: '1.08rem',
                                    px: 3,
                                    py: 1.2,
                                    letterSpacing: 0.5,
                                    color: selectedTopic === topic.key ? '#23235B' : '#FFD54F',
                                    background: selectedTopic === topic.key ? 'linear-gradient(90deg, #FFD54F, #FFC107)' : 'rgba(255,255,255,0.08)',
                                    border: selectedTopic === topic.key ? '2px solid #FFD54F' : '2px solid #FFD54F',
                                    boxShadow: selectedTopic === topic.key ? '0 2px 12px rgba(255,213,79,0.15)' : 'none',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #FFC107, #FFD54F)',
                                        color: '#23235B',
                                        borderColor: '#FFC107',
                                    },
                                }}
                            >
                                {topic.label}
                            </Button>
                        ))}
                    </Box>
                    <QuizHeaderBox>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#23235B', fontSize: { xs: '1.25rem', md: '1.7rem' }, mb: 0.5, letterSpacing: 0.5 }}>
                            Test Your Java Knowledge
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#3a0ca3', fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.18rem' }, letterSpacing: 0.2 }}>
                            Challenge yourself with adaptive puzzles based on your progress
                        </Typography>
                    </QuizHeaderBox>
                    <QuizMainRow>
                        <LeftColumn>
                            <AnimatePresence mode="wait">
                                <QuestionCard
                                    key={currentQuestion}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.4 }}
                                    sx={{ mb: 3 }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0a2342', fontSize: '1.35rem', mb: 2 }}>
                                            {topicData.questions[currentQuestion].question}
                                        </Typography>
                                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                                            <RadioGroup value={selectedAnswer} onChange={(e) => handleAnswerSelect(parseInt(e.target.value))}>
                                                {topicData.questions[currentQuestion].options.map((option, index) => (
                                                    <OptionButton
                                                        key={index}
                                                        selected={selectedAnswer === index}
                                                        correct={topicData.questions[currentQuestion].correct === index}
                                                        answered={answered}
                                                        whileTap={{ scale: 0.97 }}
                                                        whileHover={{ scale: 1.03, boxShadow: '0 4px 24px #00b4d833' }}
                                                        onClick={() => handleAnswerSelect(index)}
                                                        startIcon={
                                                            answered && (
                                                                selectedAnswer === index ? (
                                                                    topicData.questions[currentQuestion].correct === index ? (
                                                                        <CheckCircleIcon />
                                                                    ) : (
                                                                        <CancelIcon />
                                                                    )
                                                                ) : topicData.questions[currentQuestion].correct === index ? (
                                                                    <CheckCircleIcon />
                                                                ) : null
                                                            )
                                                        }
                                                    >
                                                        {option}
                                                    </OptionButton>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        {answered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Paper sx={{ p: 3, mt: 3, bgcolor: 'rgba(0,180,216,0.08)', border: '2px solid #00b4d8' }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#3a0ca3' }}>
                                                        {topicData.questions[currentQuestion].explanation}
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: '#ffd60a', textAlign: 'center' }}>
                                                        {energeticMsg}
                                                    </Typography>
                                                </Paper>
                                            </motion.div>
                                        )}
                                        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                            <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleSubmit}
                                                    disabled={selectedAnswer === null || answered}
                                                    sx={{
                                                        fontWeight: 700,
                                                        bgcolor: '#3a0ca3',
                                                        color: '#fff',
                                                        px: 4,
                                                        boxShadow: '0 2px 12px #3a0ca344',
                                                        '&:hover': { bgcolor: '#0a2342', color: '#ffd60a' },
                                                        '&:disabled': {
                                                            background: 'grey',
                                                            boxShadow: 'none',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    {currentQuestion < currentQuestions.length - 1 ? 'Submit Answer' : 'Finish & See Results'}
                                                </Button>
                                            </motion.div>
                                        </Box>
                                    </CardContent>
                                </QuestionCard>
                            </AnimatePresence>
                        </LeftColumn>
                        <RightColumn>
                            <Box sx={{ position: { md: 'sticky' }, top: { md: 32 }, zIndex: 2, minWidth: { md: 320 }, maxWidth: { md: 400 }, width: '100%', mx: 'auto' }}>
                                <ProgressCard
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                >
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#0a2342' }}>
                                        Your Progress
                                    </Typography>
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Progress</Typography>
                                            <Typography variant="body2">{Math.round(progress)}%</Typography>
                                        </Box>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.7 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <LinearProgress
                                                variant="determinate"
                                                value={progress}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 5,
                                                    bgcolor: 'rgba(255,255,255,0.3)',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: '#3a0ca3',
                                                    }
                                                }}
                                            />
                                        </motion.div>
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#3a0ca3' }}>
                                            Score: <motion.span
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                style={{ color: '#3a0ca3' }}
                                            >{showResult ? displayScore : score}</motion.span>
                                            <span style={{ color: '#3a0ca3' }}>/ {currentQuestions.length}</span>
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(26,26,26,0.7)' }}>
                                            Correct answers so far
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#0a2342' }}>
                                            Difficulty Level
                                        </Typography>
                                        <RadioGroup
                                            value={difficulty}
                                            onChange={(e) => {
                                                setDifficulty(e.target.value);
                                                handleRestart();
                                            }}
                                        >
                                            <FormControlLabel value="beginner" control={<Radio sx={{ color: '#00b4d8' }} />} label="Beginner" />
                                            <FormControlLabel value="intermediate" control={<Radio sx={{ color: '#3a0ca3' }} />} label="Intermediate" />
                                            <FormControlLabel value="advanced" control={<Radio sx={{ color: '#ffd60a' }} />} label="Advanced" />
                                        </RadioGroup>
                                    </FormControl>
                                    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={handleRestart}
                                            fullWidth
                                            sx={{
                                                borderColor: '#0a2342',
                                                color: '#0a2342',
                                                fontWeight: 700,
                                                '&:hover': {
                                                    borderColor: '#3a0ca3',
                                                    color: '#3a0ca3',
                                                    bgcolor: '#e0e7ff',
                                                }
                                            }}
                                        >
                                            Restart Quiz
                                        </Button>
                                    </motion.div>
                                </ProgressCard>
                            </Box>
                        </RightColumn>
                    </QuizMainRow>
                    <AnimatePresence>
                        {showResult && (
                            <QuizResult
                                score={score}
                                total={currentQuestions.length}
                                onRestart={handleRestart}
                                onNextTopic={
                                    quizTopics.findIndex(t => t.key === selectedTopic) < quizTopics.length - 1
                                        ? handleNextTopic
                                        : null
                                }
                            />
                        )}
                    </AnimatePresence>
                </Container>
            </PuzzleSection>
        </Box>
    );
};

export default Puzzle;