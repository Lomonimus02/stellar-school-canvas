
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to subjects page
    navigate("/subjects");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="text-center animate-pulse-soft">
        <div className="inline-block w-12 h-12 border-4 border-education-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-600 dark:text-gray-400">Загрузка...</p>
      </div>
    </div>
  );
};

export default Index;
