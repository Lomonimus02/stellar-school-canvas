
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { subjects } from "@/data/mockData";
import MainSidebar from "@/components/MainSidebar";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [isAddingSubgroup, setIsAddingSubgroup] = useState(false);

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subjects/${subjectId}/classes`);
  };

  const handleSubgroupClick = (subjectId: string, subgroupId: string) => {
    navigate(`/subjects/${subjectId}/subgroups/${subgroupId}/classes`);
  };

  const handleAddSubject = () => {
    setIsAddingSubject(false);
    toast.success("Новый предмет добавлен!");
  };

  const handleAddSubgroup = () => {
    setIsAddingSubgroup(false);
    toast.success("Новая подгруппа добавлена!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <MainSidebar />
      
      <main className="flex-1 p-8 md:ml-64 animate-fade-in">
        <div className="container mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 animate-slide-in">
              Предметы
            </h1>
            <p className="text-gray-500 dark:text-gray-400 animate-fade-in">
              Управление школьными предметами и подгруппами
            </p>
          </header>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 animate-slide-in">
              Все предметы
            </h2>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsAddingSubgroup(true)}
                variant="outline"
                className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 animate-zoom-in"
              >
                <Plus className="mr-2 h-4 w-4" /> Добавить подгруппу
              </Button>
              <Button
                onClick={() => setIsAddingSubject(true)}
                className="transition-all duration-300 bg-gradient-to-r from-education-primary to-education-secondary animate-zoom-in"
              >
                <Plus className="mr-2 h-4 w-4" /> Добавить предмет
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="subject-card group cursor-pointer"
                onClick={() => handleSubjectClick(subject.id)}
              >
                <div 
                  className="h-24 flex items-center justify-center text-4xl" 
                  style={{ backgroundColor: subject.color }}
                >
                  <span className="transform transition-transform duration-300 group-hover:scale-125">{subject.icon}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-education-primary transition-colors duration-300">
                    {subject.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {subject.classes.length} классов
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {subject.subgroups.length > 0 ? `${subject.subgroups.length} подгр.` : ""}
                    </span>
                  </div>

                  {subject.subgroups.length > 0 && (
                    <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Подгруппы:</p>
                      <div className="space-y-2">
                        {subject.subgroups.map((subgroup) => (
                          <div
                            key={subgroup.id}
                            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 flex items-center transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubgroupClick(subject.id, subgroup.id);
                            }}
                          >
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: subgroup.color }}
                            ></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {subgroup.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAddingSubject && (
              <div className="subject-card animate-slide-in bg-gray-50 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-8">
                <div className="h-16 w-16 bg-education-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-education-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Новый предмет
                </h3>
                <Button 
                  onClick={handleAddSubject} 
                  className="bg-education-primary hover:bg-education-secondary transition-all duration-300"
                >
                  Создать
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectsPage;
