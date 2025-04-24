
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Student, StudentSubject, Grade } from "@/data/mockData";
import { Calendar, User, ChartBar } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface StudentDialogProps {
  student: Student;
  subjectData: StudentSubject;
  subjectName: string;
  subjectColor: string;
  onClose: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const StudentDialog: React.FC<StudentDialogProps> = ({
  student,
  subjectData,
  subjectName,
  subjectColor,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Group grades by quarter
  const gradesByQuarter: Record<string, Grade[]> = {};
  subjectData.grades.forEach((grade) => {
    const quarterKey = `Четверть ${grade.quarter}`;
    if (!gradesByQuarter[quarterKey]) {
      gradesByQuarter[quarterKey] = [];
    }
    gradesByQuarter[quarterKey].push(grade);
  });

  // Calculate averages by quarter
  const quarterlyData = Object.entries(gradesByQuarter).map(([quarter, grades]) => {
    const total = grades.reduce((sum, grade) => sum + grade.value, 0);
    const average = total / grades.length;
    
    return {
      quarter,
      average: parseFloat(average.toFixed(2)),
    };
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto animate-zoom-in">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" /> Успеваемость
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Оценки
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Профиль
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Успеваемость: {subjectName}
                </h3>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${subjectColor}25`,
                    color: subjectColor
                  }}
                >
                  Средний балл: {subjectData.averageGrade.toFixed(1)}
                </div>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quarterlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="quarter" stroke="#888" />
                    <YAxis domain={[0, 5]} stroke="#888" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="average"
                      name="Средний балл"
                      stroke={subjectColor}
                      strokeWidth={2}
                      dot={{ r: 6, strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-white dark:bg-slate-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Всего оценок</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {subjectData.grades.length}
                  </div>
                </Card>
                
                <Card className="p-4 bg-white dark:bg-slate-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Процент успеваемости</div>
                  <div 
                    className="text-2xl font-bold mt-1"
                    style={{ color: subjectColor }}
                  >
                    {subjectData.averagePercentage.toFixed(1)}%
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="grades">
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Оценки по четвертям
              </h3>
              
              <div className="space-y-6">
                {Object.entries(gradesByQuarter).map(([quarter, grades]) => {
                  const averageGrade = grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length;
                  
                  return (
                    <Card key={quarter} className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{quarter}</h4>
                        <div 
                          className="px-2 py-0.5 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${subjectColor}25`,
                            color: subjectColor
                          }}
                        >
                          Средний балл: {averageGrade.toFixed(1)}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {grades.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((grade) => (
                          <div 
                            key={grade.id} 
                            className="group relative"
                            title={`${formatDate(grade.date)}`}
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md"
                              style={{ 
                                backgroundColor: grade.value >= 4 ? "#4ade80" : 
                                                grade.value >= 3 ? "#fbbf24" : "#f87171"
                              }}
                            >
                              {grade.value}
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-0.5 rounded transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                              {formatDate(grade.date)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="profile">
            <div className="space-y-6 animate-fade-in">
              <div 
                className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-r from-education-primary to-education-secondary"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${subjectColor}, #4CC9F0)`
                }}
              >
                <div className="absolute inset-0 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold animate-fade-in">{student.name}</h3>
                    <p className="text-white/80 animate-fade-in">Ученик</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative sm:w-1/3">
                  <div className="-mt-16 sm:-mt-20 rounded-xl overflow-hidden border-4 border-white dark:border-slate-800 w-32 h-32 sm:w-full sm:aspect-square bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 hover:scale-105">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="sm:w-2/3">
                  <Card className="p-4 mb-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                      Информация
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4 border-b border-gray-100 dark:border-slate-700 pb-2">
                        <div className="text-gray-500 dark:text-gray-400">ФИО</div>
                        <div className="text-gray-900 dark:text-white font-medium">{student.name}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-gray-100 dark:border-slate-700 pb-2">
                        <div className="text-gray-500 dark:text-gray-400">Email</div>
                        <div className="text-gray-900 dark:text-white font-medium">{student.email}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-gray-100 dark:border-slate-700 pb-2">
                        <div className="text-gray-500 dark:text-gray-400">Пароль</div>
                        <div className="text-gray-900 dark:text-white font-medium">{student.password}</div>
                      </div>
                    </div>
                  </Card>
                  
                  {(student.socialMedia.instagram || student.socialMedia.vk || student.socialMedia.telegram) && (
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                        Социальные сети
                      </h3>
                      <div className="space-y-4">
                        {student.socialMedia.instagram && (
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">Instagram</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{student.socialMedia.instagram}</div>
                            </div>
                          </div>
                        )}
                        
                        {student.socialMedia.vk && (
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm.4 15.44h-1.75c-.58 0-.85-.08-1.31-.61-.38-.41-.81-1.12-1.3-1.12-.19 0-.28.06-.28.52v.86c0 .22-.02.52-.59.52-1.6 0-3.34-.88-4.59-2.51-1.86-2.39-2.37-4.1-2.37-4.46 0-.24.07-.47.49-.47h1.75c.29 0 .53.06.66.47.17.47.76 1.78 1.38 2.69.38.59.66.82.88.82.16 0 .18-.06.18-.38V9.9c-.03-.65-.17-1.04-.54-1.19-.08-.03-.14-.07-.14-.15 0-.07.12-.19.3-.19h2.8c.28 0 .34.15.34.48v2.76c0 .28.12.34.2.34.16 0 .3-.06.6-.37.81-.9 1.4-2.28 1.4-2.33.03-.08.14-.35.37-.46.12-.07.28-.07.38-.07h1.75c.28 0 .44.15.36.42-.15.57-1.68 2.86-1.68 2.86-.13.22-.18.28 0 .47.07.1.29.3.44.46.52.52 1.27 1.08 1.58 1.5.14.2.13.45-.09.6-.22.14-.82.15-1.04.15z"></path>
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">VKontakte</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{student.socialMedia.vk}</div>
                            </div>
                          </div>
                        )}
                        
                        {student.socialMedia.telegram && (
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">Telegram</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{student.socialMedia.telegram}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
