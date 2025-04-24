
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book, User, Calendar, ChartBar } from "lucide-react";

const MainSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      icon: Book, 
      label: "Предметы", 
      path: "/subjects", 
      active: location.pathname.includes("/subjects")
    },
    { 
      icon: User, 
      label: "Ученики", 
      path: "/students",
      active: location.pathname.includes("/students")
    },
    { 
      icon: Calendar, 
      label: "Расписание", 
      path: "/schedule",
      active: location.pathname.includes("/schedule")
    },
    { 
      icon: ChartBar, 
      label: "Аналитика", 
      path: "/analytics",
      active: location.pathname.includes("/analytics")
    }
  ];

  return (
    <aside className="w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out md:z-10 fixed inset-y-0 left-0 md:relative animate-slide-in bg-sidebar dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-education-primary dark:text-white animate-fade-in">Дневник</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in">Электронный школьный журнал</p>
      </div>
      
      <div className="mt-6">
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 py-3 px-6 transition-all duration-300 ease-in-out group",
                {
                  "bg-primary/10 text-primary border-r-4 border-primary font-medium": item.active,
                  "text-gray-600 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10": !item.active
                }
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                item.active ? "text-primary" : "text-gray-500 dark:text-gray-400"
              )} />
              <span className="animate-fade-in">{item.label}</span>
              {item.active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-muted/50 dark:bg-slate-700/50 rounded-lg p-4 animate-fade-in">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Школьный Дневник
          </p>
        </div>
      </div>
    </aside>
  );
};

export default MainSidebar;
