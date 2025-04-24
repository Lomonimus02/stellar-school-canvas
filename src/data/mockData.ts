
// Mock data for the school diary application

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  socialMedia: {
    instagram?: string;
    vk?: string;
    telegram?: string;
  };
}

export interface Grade {
  id: string;
  value: number;
  date: string;
  quarter: 1 | 2 | 3 | 4;
}

export interface StudentSubject {
  studentId: string;
  grades: Grade[];
  averageGrade: number;
  averagePercentage: number;
}

export interface SubjectClass {
  id: string;
  name: string;
  students: StudentSubject[];
}

export interface Subgroup {
  id: string;
  name: string;
  classes: SubjectClass[];
  color: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  classes: SubjectClass[];
  subgroups: Subgroup[];
}

// Mock data

const generateRandomGrades = (count: number): Grade[] => {
  const grades: Grade[] = [];
  const quarters = [1, 2, 3, 4] as const;
  
  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * 5) + 1; // Random grade between 1 and 5
    const date = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const quarter = quarters[Math.floor(date.getMonth() / 3)];
    
    grades.push({
      id: `grade-${i}`,
      value,
      date: date.toISOString(),
      quarter
    });
  }
  
  return grades;
};

const calculateAverage = (grades: Grade[]): { average: number, percentage: number } => {
  if (grades.length === 0) return { average: 0, percentage: 0 };
  
  const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
  const average = sum / grades.length;
  const percentage = (average / 5) * 100;
  
  return { average, percentage };
};

export const students: Student[] = [
  {
    id: "student-1",
    name: "Иванов Иван",
    email: "ivanov@school.ru",
    password: "pass123",
    avatar: "https://i.pravatar.cc/150?img=1",
    socialMedia: {
      instagram: "@ivanov",
      vk: "vk.com/ivanov",
      telegram: "@ivanov"
    }
  },
  {
    id: "student-2",
    name: "Петрова Мария",
    email: "petrova@school.ru",
    password: "pass456",
    avatar: "https://i.pravatar.cc/150?img=5",
    socialMedia: {
      instagram: "@petrova",
      telegram: "@petrova"
    }
  },
  {
    id: "student-3",
    name: "Сидоров Алексей",
    email: "sidorov@school.ru",
    password: "pass789",
    avatar: "https://i.pravatar.cc/150?img=3",
    socialMedia: {
      vk: "vk.com/sidorov"
    }
  },
  {
    id: "student-4",
    name: "Козлова Екатерина",
    email: "kozlova@school.ru",
    password: "pass101",
    avatar: "https://i.pravatar.cc/150?img=10",
    socialMedia: {
      instagram: "@kozlova",
      vk: "vk.com/kozlova",
      telegram: "@kozlova"
    }
  },
  {
    id: "student-5",
    name: "Смирнов Дмитрий",
    email: "smirnov@school.ru",
    password: "pass202",
    avatar: "https://i.pravatar.cc/150?img=11",
    socialMedia: {
      vk: "vk.com/smirnov",
      telegram: "@smirnov"
    }
  }
];

// Generate student subjects with grades
const generateStudentSubjects = (): StudentSubject[] => {
  return students.map(student => {
    const grades = generateRandomGrades(Math.floor(Math.random() * 15) + 5);
    const { average, percentage } = calculateAverage(grades);
    
    return {
      studentId: student.id,
      grades,
      averageGrade: average,
      averagePercentage: percentage
    };
  });
};

// Create classes
const classes: SubjectClass[] = [
  {
    id: "class-9a",
    name: "9A",
    students: generateStudentSubjects()
  },
  {
    id: "class-9b",
    name: "9Б",
    students: generateStudentSubjects()
  },
  {
    id: "class-10a",
    name: "10A",
    students: generateStudentSubjects()
  },
  {
    id: "class-10b",
    name: "10Б",
    students: generateStudentSubjects()
  },
  {
    id: "class-11a",
    name: "11A",
    students: generateStudentSubjects()
  }
];

// Create subjects
export const subjects: Subject[] = [
  {
    id: "subject-1",
    name: "Математика",
    icon: "📊",
    color: "#4361EE",
    classes: classes.slice(0, 4),
    subgroups: [
      {
        id: "subgroup-1-1",
        name: "Математика база",
        classes: classes.slice(0, 2),
        color: "#3A0CA3"
      },
      {
        id: "subgroup-1-2",
        name: "Математика профиль",
        classes: classes.slice(2, 4),
        color: "#4361EE"
      }
    ]
  },
  {
    id: "subject-2",
    name: "Физика",
    icon: "⚛️",
    color: "#F72585",
    classes: classes.slice(1, 5),
    subgroups: [
      {
        id: "subgroup-2-1",
        name: "Физика база",
        classes: classes.slice(1, 3),
        color: "#7209B7"
      },
      {
        id: "subgroup-2-2",
        name: "Физика профиль",
        classes: classes.slice(3, 5),
        color: "#F72585"
      }
    ]
  },
  {
    id: "subject-3",
    name: "Русский язык",
    icon: "📝",
    color: "#4CC9F0",
    classes: classes,
    subgroups: []
  },
  {
    id: "subject-4",
    name: "История",
    icon: "🏛️",
    color: "#FF9E00",
    classes: classes.slice(0, 3),
    subgroups: []
  },
  {
    id: "subject-5",
    name: "Информатика",
    icon: "💻",
    color: "#4DDBFF",
    classes: classes.slice(2, 5),
    subgroups: [
      {
        id: "subgroup-5-1",
        name: "Информатика база",
        classes: classes.slice(2, 3),
        color: "#3A86FF"
      },
      {
        id: "subgroup-5-2",
        name: "Информатика профиль",
        classes: classes.slice(3, 5),
        color: "#4DDBFF"
      }
    ]
  },
  {
    id: "subject-6",
    name: "Английский язык",
    icon: "🌍",
    color: "#38B000",
    classes: classes,
    subgroups: []
  }
];

// Helper function to get a student by ID
export const getStudentById = (id: string): Student | undefined => {
  return students.find(student => student.id === id);
};

// Helper function to get a subject by ID
export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};

// Helper function to get a subgroup by ID
export const getSubgroupById = (subjectId: string, subgroupId: string): Subgroup | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.subgroups.find(subgroup => subgroup.id === subgroupId);
};

// Helper function to get a class by ID
export const getClassById = (id: string): SubjectClass | undefined => {
  return classes.find(cls => cls.id === id);
};
