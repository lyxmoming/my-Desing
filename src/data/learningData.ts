import { LearningModule, QuizQuestion } from '../types';

export const learningModules: LearningModule[] = [
  {
    id: 'html-css',
    name: 'HTML & CSS 基础',
    description: '学习Web开发的基石，掌握网页结构和样式设计',
    topics: [
      {
        id: 'html-intro',
        name: 'HTML 基础语法',
        content: 'HTML（HyperText Markup Language）是构建网页的标准标记语言。它使用标签来描述网页的结构。',
        examples: ['<div>这是一个div标签</div>', '<p>这是一个段落</p>', '<h1>这是一个标题</h1>']
      },
      {
        id: 'css-selectors',
        name: 'CSS 选择器',
        content: 'CSS选择器用于选择要样式化的HTML元素。常见的选择器有元素选择器、类选择器和ID选择器。',
        examples: ['p { color: blue; }', '.my-class { font-size: 16px; }', '#my-id { margin: 10px; }']
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript 基础',
    description: '学习编程的核心语言，掌握Web交互开发',
    topics: [
      {
        id: 'js-variables',
        name: '变量与数据类型',
        content: 'JavaScript有多种数据类型，包括字符串、数字、布尔值、数组和对象。使用let和const声明变量。',
        examples: ['let name = "张三";', 'const age = 25;', 'let isStudent = true;']
      },
      {
        id: 'js-functions',
        name: '函数',
        content: '函数是可重复使用的代码块。可以接受参数并返回值。',
        examples: ['function greet(name) { return "你好, " + name; }', 'const add = (a, b) => a + b;']
      }
    ]
  },
  {
    id: 'react',
    name: 'React 框架',
    description: '学习现代前端框架，构建高效的用户界面',
    topics: [
      {
        id: 'react-components',
        name: '组件基础',
        content: 'React应用由组件构成。组件是独立的、可复用的代码块。',
        examples: ['function Welcome() { return <h1>Hello</h1>; }', 'const Button = () => <button>Click</button>;']
      },
      {
        id: 'react-state',
        name: '状态管理',
        content: 'useState是React Hook，用于在函数组件中添加状态。',
        examples: ['const [count, setCount] = useState(0);', 'const [name, setName] = useState("");']
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    module: 'html-css',
    question: 'HTML的全称是什么？',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'],
    correctAnswer: 'Hyper Text Markup Language',
    explanation: 'HTML代表超文本标记语言，是构建网页的标准语言。'
  },
  {
    id: 'q2',
    module: 'html-css',
    question: 'CSS中类选择器使用什么符号开头？',
    options: ['#', '.', ':'],
    correctAnswer: '.',
    explanation: '类选择器使用点号(.)开头，ID选择器使用井号(#)开头。'
  },
  {
    id: 'q3',
    module: 'javascript',
    question: '以下哪个不是JavaScript的数据类型？',
    options: ['String', 'Integer', 'Boolean'],
    correctAnswer: 'Integer',
    explanation: 'JavaScript中只有Number类型，没有单独的Integer类型。'
  },
  {
    id: 'q4',
    module: 'javascript',
    question: '在ES6中，用于声明常量的关键字是？',
    options: ['var', 'let', 'const'],
    correctAnswer: 'const',
    explanation: 'const用于声明常量，let用于声明变量，var是旧语法。'
  },
  {
    id: 'q5',
    module: 'react',
    question: 'React中用于管理组件状态的Hook是？',
    options: ['useEffect', 'useState', 'useContext'],
    correctAnswer: 'useState',
    explanation: 'useState用于添加和管理组件状态，useEffect用于处理副作用。'
  }
];
