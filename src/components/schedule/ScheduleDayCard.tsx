
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, User, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ScheduleClass {
  time: string;
  subject: string;
  room: string;
  teacher: string;
  teacherId?: string;
  teacherAvatar?: string;
}

interface ScheduleDay {
  day: string;
  classes: ScheduleClass[];
}

interface ScheduleDayCardProps {
  schedule: ScheduleDay;
  gradientClass?: string;
}

export const ScheduleDayCard = ({ schedule, gradientClass = "from-purple-600 to-pink-600" }: ScheduleDayCardProps) => {
  const [expandedClass, setExpandedClass] = useState<number | null>(null);

  const handleTeacherClick = (teacherName: string, teacherId: string) => {
    toast({
      title: "Переход к профилю",
      description: `Открываем профиль преподавателя ${teacherName}`,
      duration: 2000,
    });
    // In a real app, we would navigate to the teacher profile
    console.log(`Navigate to teacher profile ${teacherId}`);
  };

  // Define class card background colors for vibrant appearance
  const cardBackgrounds = [
    "from-pink-500 to-orange-400",
    "from-purple-500 to-indigo-400",
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-yellow-400",
    "from-fuchsia-500 to-pink-400",
  ];

  return (
    <Card className={`p-6 backdrop-blur-lg border-0 bg-gradient-to-br ${gradientClass} shadow-xl shadow-purple-700/30`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-6 text-white drop-shadow-glow"
      >
        {schedule.day}
      </motion.h2>
      
      <div className="space-y-4">
        {schedule.classes.map((classItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Button
              variant="ghost"
              className="w-full p-0 h-auto hover:bg-transparent"
              onClick={() => setExpandedClass(expandedClass === index ? null : index)}
            >
              <Card 
                className={cn(
                  "w-full p-4 transition-all duration-500 transform",
                  "shadow-lg hover:shadow-xl border-0",
                  expandedClass === index ? "scale-[1.02]" : "",
                  `bg-gradient-to-r ${cardBackgrounds[index % cardBackgrounds.length]}`
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">
                      {classItem.time}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="font-semibold text-white drop-shadow-md mb-1 text-lg"
                      layout
                    >
                      {classItem.subject}
                    </motion.h3>
                    
                    <motion.div 
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: expandedClass === index ? 1 : 0,
                        height: expandedClass === index ? "auto" : 0
                      }}
                      className="space-y-3 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <MapPin className="w-4 h-4 text-white" />
                        Кабинет {classItem.room}
                      </div>
                      
                      {/* TikTok-style teacher profile link */}
                      {classItem.teacherId && (
                        <motion.div 
                          className="flex items-center mt-3 p-2 rounded-lg bg-white/10 backdrop-blur-sm 
                                     hover:bg-white/20 transition-all cursor-pointer"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTeacherClick(classItem.teacher, classItem.teacherId || "");
                          }}
                        >
                          <Avatar className="h-8 w-8 border-2 border-white/60">
                            <AvatarImage src={classItem.teacherAvatar} alt={classItem.teacher} />
                            <AvatarFallback className="bg-pink-500 text-white">
                              {classItem.teacher.split(" ").map(name => name[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-2 flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-white/80">Преподаватель</span>
                              <ExternalLink className="w-3 h-3 text-white/60" />
                            </div>
                            <div className="text-sm font-medium text-white">
                              {classItem.teacher}
                            </div>
                          </div>
                          <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            Профиль
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      layout
                      className="flex justify-end mt-2"
                    >
                      <ChevronDown 
                        className={cn(
                          "w-4 h-4 text-white transition-transform duration-300",
                          expandedClass === index && "transform rotate-180"
                        )}
                      />
                    </motion.div>
                  </div>
                </div>
              </Card>
            </Button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
