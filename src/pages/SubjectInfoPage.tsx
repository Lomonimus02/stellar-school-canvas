
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChartBar, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getSubjectById,
  getSubgroupById,
  getStudentById,
  getClassById,
  Student,
  StudentSubject,
} from "@/data/mockData";
import MainSidebar from "@/components/MainSidebar";
import StudentDialog from "@/components/StudentDialog";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const SubjectInfoPage: React.FC = () => {
  const { subjectId, subgroupId, classId } = useParams<{
    subjectId: string;
    subgroupId: string;
    classId: string;
  }>();
  const navigate = useNavigate();

  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [color, setColor] = useState("#4361EE");
  const [students, setStudents] = useState<Array<{ student: Student; data: StudentSubject }>>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudentData, setSelectedStudentData] = useState<StudentSubject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!subjectId || !classId) {
        navigate("/subjects");
        return;
      }

      const subject = getSubjectById(subjectId);
      const cls = getClassById(classId);

      if (!subject || !cls) {
        navigate("/subjects");
        return;
      }

      let name, clsData, colorValue;

      if (subgroupId) {
        const subgroup = getSubgroupById(subjectId, subgroupId);
        if (!subgroup) {
          navigate(`/subjects/${subjectId}/classes`);
          return;
        }
        name = `${subject.name}: ${subgroup.name}`;
        colorValue = subgroup.color;
        clsData = subgroup.classes.find((c) => c.id === classId);
      } else {
        name = subject.name;
        colorValue = subject.color;
        clsData = subject.classes.find((c) => c.id === classId);
      }

      if (!clsData) {
        navigate(`/subjects/${subjectId}/classes`);
        return;
      }

      const studentsData = clsData.students.map((studentSubject) => {
        const student = getStudentById(studentSubject.studentId);
        return {
          student: student!,
          data: studentSubject,
        };
      });

      setSubjectName(name);
      setClassName(cls.name);
      setColor(colorValue);
      setStudents(studentsData);

      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    loadData();
  }, [subjectId, subgroupId, classId, navigate]);

  const handleGoBack = () => {
    if (subgroupId) {
      navigate(`/subjects/${subjectId}/subgroups/${subgroupId}/classes`);
    } else {
      navigate(`/subjects/${subjectId}/classes`);
    }
  };

  const handleStudentClick = (student: Student, data: StudentSubject) => {
    setSelectedStudent(student);
    setSelectedStudentData(data);
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
    setSelectedStudentData(null);
  };

  // Calculate average grades by quarter
  const calculateQuarterlyAverages = () => {
    const quarterData = [1, 2, 3, 4].map((quarter) => {
      const averages = students.map((student) => {
        const quarterGrades = student.data.grades.filter((g) => g.quarter === quarter);
        if (quarterGrades.length === 0) return 0;
        return quarterGrades.reduce((sum, g) => sum + g.value, 0) / quarterGrades.length;
      });
      
      const total = averages.reduce((sum, avg) => sum + avg, 0);
      const average = averages.length > 0 ? total / averages.length : 0;
      
      return {
        quarter: `Четверть ${quarter}`,
        average: parseFloat(average.toFixed(2)),
      };
    });
    
    return quarterData;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
        <MainSidebar />
        <main className="flex-1 p-8 md:ml-64 flex justify-center items-center">
          <div className="animate-spin-slow text-education-primary">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <MainSidebar />

      <main className="flex-1 p-8 md:ml-64 animate-fade-in">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-6 text-gray-600 dark:text-gray-300 hover:text-education-primary dark:hover:text-education-accent animate-slide-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад к классам
          </Button>

          <header className="mb-10">
            <h1
              className="text-3xl font-bold mb-2 animate-slide-in"
              style={{ color }}
            >
              {subjectName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 animate-fade-in">
              Класс {className} • {students.length} учеников
            </p>
          </header>

          <Tabs defaultValue="students" className="mb-10 animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="students" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Ученики
              </TabsTrigger>
              <TabsTrigger value="quarterly-grades" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Оценки по четвертям
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" /> Аналитика
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students">
              <Card className="animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Ученик
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Средний балл
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          Процент
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(({ student, data }, index) => (
                        <tr
                          key={student.id}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors duration-300"
                          style={{ animationDelay: `${index * 0.05}s` }}
                          onClick={() => handleStudentClick(student, data)}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                <img
                                  src={student.avatar}
                                  alt={student.name}
                                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {student.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {data.averageGrade.toFixed(1)}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: `${color}25`,
                                color: color
                              }}
                            >
                              {data.averagePercentage.toFixed(1)}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="quarterly-grades">
              <Card className="p-6 animate-fade-in">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Средний балл по четвертям
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={calculateQuarterlyAverages()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="quarter" stroke="#888" />
                      <YAxis domain={[0, 5]} stroke="#888" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="average"
                        name="Средний балл"
                        stroke={color}
                        strokeWidth={2}
                        dot={{ r: 6, strokeWidth: 2 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Распределение средних баллов
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { grade: "5", count: students.filter(s => s.data.averageGrade >= 4.5).length },
                          { grade: "4", count: students.filter(s => s.data.averageGrade >= 3.5 && s.data.averageGrade < 4.5).length },
                          { grade: "3", count: students.filter(s => s.data.averageGrade >= 2.5 && s.data.averageGrade < 3.5).length },
                          { grade: "2", count: students.filter(s => s.data.averageGrade < 2.5).length },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Количество учеников" fill={color} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Успеваемость класса
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full animate-pulse-soft transition-all duration-1000 ease-in-out"
                        style={{ 
                          width: `${
                            (students.filter(s => s.data.averageGrade >= 4.5).length / students.length) * 100
                          }%`,
                          backgroundColor: "#4ade80" // Green
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Отличники</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {((students.filter(s => s.data.averageGrade >= 4.5).length / students.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full animate-pulse-soft transition-all duration-1000 ease-in-out"
                        style={{ 
                          width: `${
                            (students.filter(s => s.data.averageGrade >= 3.5 && s.data.averageGrade < 4.5).length / students.length) * 100
                          }%`,
                          backgroundColor: "#60a5fa" // Blue
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Хорошисты</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {((students.filter(s => s.data.averageGrade >= 3.5 && s.data.averageGrade < 4.5).length / students.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full animate-pulse-soft transition-all duration-1000 ease-in-out"
                        style={{ 
                          width: `${
                            (students.filter(s => s.data.averageGrade >= 2.5 && s.data.averageGrade < 3.5).length / students.length) * 100
                          }%`,
                          backgroundColor: "#fbbf24" // Yellow
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Троечники</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {((students.filter(s => s.data.averageGrade >= 2.5 && s.data.averageGrade < 3.5).length / students.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full animate-pulse-soft transition-all duration-1000 ease-in-out"
                        style={{ 
                          width: `${
                            (students.filter(s => s.data.averageGrade < 2.5).length / students.length) * 100
                          }%`,
                          backgroundColor: "#f87171" // Red
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Неуспевающие</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {((students.filter(s => s.data.averageGrade < 2.5).length / students.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {selectedStudent && selectedStudentData && (
        <StudentDialog 
          student={selectedStudent} 
          subjectData={selectedStudentData}
          subjectName={subjectName}
          subjectColor={color}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default SubjectInfoPage;
