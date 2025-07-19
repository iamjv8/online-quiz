const quizData = {
  categories: [
    {
      id: "js_basics",
      name: "JavaScript Basics",
      questions: [
        {
          id: "q1",
          question:
            "Which method can be used to round a number to the nearest integer in JavaScript?",
          options: [
            "Math.round()",
            "Math.floor()",
            "Math.ceil()",
            "Math.random()",
          ],
          correctAnswer: "Math.round()",
          timeLimit: 10,
        },
        {
          id: "q2",
          question:
            "How do you call a function named 'myFunction' in JavaScript?",
          options: [
            "call myFunction();",
            "myFunction();",
            "call function myFunction();",
            "execute myFunction();",
          ],
          correctAnswer: "myFunction();",
          timeLimit: 10,
        },
        {
          id: "q3",
          question:
            "What is the correct syntax for referring to an external script called 'script.js'?",
          options: [
            "<script name='script.js'>",
            "<script href='script.js'>",
            "<script src='script.js'>",
            "<script file='script.js'>",
          ],
          correctAnswer: "<script src='script.js'>",
          timeLimit: 10,
        },
        {
          id: "q4",
          question: "Which company developed JavaScript?",
          options: ["Microsoft", "Netscape", "Google", "Mozilla"],
          correctAnswer: "Netscape",
          timeLimit: 10,
        },
        {
          id: "q5",
          question: "What does 'typeof null' return in JavaScript?",
          options: ["null", "undefined", "object", "string"],
          correctAnswer: "object",
          timeLimit: 10,
        },
        {
          id: "q6",
          question: "Which operator is used to assign a value to a variable?",
          options: ["=", "==", "===", "!="],
          correctAnswer: "=",
          timeLimit: 10,
        },
        {
          id: "q7",
          question: "How do you create a function in JavaScript?",
          options: [
            "function = myFunction() {}",
            "function myFunction() {}",
            "create myFunction() {}",
            "def myFunction() {}",
          ],
          correctAnswer: "function myFunction() {}",
          timeLimit: 10,
        },
        {
          id: "q8",
          question: "What is the correct way to write a JavaScript array?",
          options: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
          ],
          correctAnswer: "var colors = ['red', 'green', 'blue']",
          timeLimit: 10,
        },
        {
          id: "q9",
          question: "How do you write 'Hello World' in an alert box?",
          options: [
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');",
          ],
          correctAnswer: "alert('Hello World');",
          timeLimit: 10,
        },
        {
          id: "q10",
          question:
            "Which event occurs when the user clicks on an HTML element?",
          options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
          correctAnswer: "onclick",
          timeLimit: 10,
        },
      ],
    },
    {
      id: "angular_basics",
      name: "Angular Basic",
      questions: [
        {
          id: "a1",
          question: "What is Angular?",
          options: [
            "A JavaScript library",
            "A TypeScript framework",
            "A CSS framework",
            "A database",
          ],
          correctAnswer: "A TypeScript framework",
          timeLimit: 10,
        },
        {
          id: "a2",
          question: "What is the Angular CLI command to create a new project?",
          options: [
            "ng create project-name",
            "ng new project-name",
            "ng init project-name",
            "ng start project-name",
          ],
          correctAnswer: "ng new project-name",
          timeLimit: 10,
        },
        {
          id: "a3",
          question: "What is a component in Angular?",
          options: [
            "A service",
            "A module",
            "A class with template and styles",
            "A pipe",
          ],
          correctAnswer: "A class with template and styles",
          timeLimit: 10,
        },
        {
          id: "a4",
          question: "Which decorator is used to define an Angular component?",
          options: ["@Injectable", "@Component", "@NgModule", "@Directive"],
          correctAnswer: "@Component",
          timeLimit: 10,
        },
        {
          id: "a5",
          question: "What is the purpose of Angular services?",
          options: [
            "To create components",
            "To handle business logic and data",
            "To style components",
            "To route between pages",
          ],
          correctAnswer: "To handle business logic and data",
          timeLimit: 10,
        },
      ],
    },
    {
      id: "react_advance",
      name: "React.js Advance",
      questions: [
        {
          id: "r1",
          question: "What is the purpose of useEffect hook?",
          options: [
            "To manage state",
            "To handle side effects",
            "To create components",
            "To handle events",
          ],
          correctAnswer: "To handle side effects",
          timeLimit: 10,
        },
        {
          id: "r2",
          question: "What is React Context used for?",
          options: [
            "State management across components",
            "Routing",
            "Styling",
            "API calls",
          ],
          correctAnswer: "State management across components",
          timeLimit: 10,
        },
        {
          id: "r3",
          question: "What is the purpose of useMemo hook?",
          options: [
            "To memoize expensive calculations",
            "To manage state",
            "To handle effects",
            "To create refs",
          ],
          correctAnswer: "To memoize expensive calculations",
          timeLimit: 10,
        },
        {
          id: "r4",
          question: "What is a Higher Order Component (HOC)?",
          options: [
            "A component that renders other components",
            "A function that takes a component and returns a new component",
            "A component with higher priority",
            "A component that uses hooks",
          ],
          correctAnswer:
            "A function that takes a component and returns a new component",
          timeLimit: 10,
        },
        {
          id: "r5",
          question: "What is the purpose of useCallback hook?",
          options: [
            "To memoize functions",
            "To manage state",
            "To handle effects",
            "To create callbacks",
          ],
          correctAnswer: "To memoize functions",
          timeLimit: 10,
        },
      ],
    },
    {
      id: "flutter",
      name: "Flutter",
      questions: [
        {
          id: "f1",
          question: "What programming language is Flutter based on?",
          options: ["Java", "Dart", "JavaScript", "Swift"],
          correctAnswer: "Dart",
          timeLimit: 10,
        },
        {
          id: "f2",
          question: "What is a Widget in Flutter?",
          options: ["A function", "A class", "A UI element", "A variable"],
          correctAnswer: "A UI element",
          timeLimit: 10,
        },
        {
          id: "f3",
          question:
            "Which widget is used for creating scrollable lists in Flutter?",
          options: ["Container", "ListView", "Column", "Row"],
          correctAnswer: "ListView",
          timeLimit: 10,
        },
        {
          id: "f4",
          question: "What is the main function of StatefulWidget?",
          options: [
            "To display static content",
            "To manage changing state",
            "To handle navigation",
            "To make API calls",
          ],
          correctAnswer: "To manage changing state",
          timeLimit: 10,
        },
        {
          id: "f5",
          question: "Which command is used to run a Flutter app?",
          options: [
            "flutter start",
            "flutter run",
            "flutter launch",
            "flutter build",
          ],
          correctAnswer: "flutter run",
          timeLimit: 10,
        },
      ],
    },
  ],
};
export default quizData;
