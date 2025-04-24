
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubjectById, getSubgroupById, Subject, Subgroup } from "@/data/mockData";
import MainSidebar from "@/components/MainSidebar";

const ClassesPage: React.FC = () => {
  const { subjectId, subgroupId } = useParams<{ subjectId: string; subgroupId: string }>();
  const navigate = useNavigate();
  
  const [data, setData] = useState<{ 
    name: string; 
    classes: any[]; 
    color: string;
    isSubgroup: boolean;
  } | null>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subjectId) {
      const subject = getSubjectById(subjectId);
      
      if (!subject) {
        navigate("/subjects");
        return;
      }
      
      if (subgroupId) {
        const subgroup = getSubgroupById(subjectId, subgroupId);
        
        if (subgroup) {
          setData({
            name: `${subject.name}: ${subgroup.name}`,
            classes: subgroup.classes,
            color: subgroup.color,
            isSubgroup: true
          });
        } else {
          navigate(`/subjects/${subjectId}/classes`);
        }
      } else {
        setData({
          name: subject.name,
          classes: subject.classes,
          color: subject.color,
          isSubgroup: false
        });
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [subjectId, subgroupId, navigate]);

  const handleGoBack = () => {
    navigate("/subjects");
  };

  const handleClassClick = (classId: string) => {
    if (subgroupId) {
      navigate(`/subjects/${subjectId}/subgroups/${subgroupId}/classes/${classId}`);
    } else {
      navigate(`/subjects/${subjectId}/classes/${classId}`);
    }
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
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад к предметам
          </Button>
          
          <header className="mb-10">
            <h1 
              className="text-3xl font-bold mb-2 animate-slide-in" 
              style={{ color: data?.color || 'inherit' }}
            >
              {data?.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 animate-fade-in">
              Выберите класс для просмотра информации
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.classes.map((cls, index) => (
              <div
                key={cls.id}
                className="class-card cursor-pointer animate-zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleClassClick(cls.id)}
              >
                <div 
                  className="h-20 flex items-center justify-center" 
                  style={{ 
                    background: `linear-gradient(135deg, ${data.color}, ${data.isSubgroup ? data.color : '#4CC9F0'})` 
                  }}
                >
                  <span className="text-3xl font-bold text-white animate-float">{cls.name}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    Класс {cls.name}
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {cls.students.length} учеников
                    </span>
                    <span className="text-sm font-medium" style={{ color: data.color }}>
                      Перейти →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassesPage;
