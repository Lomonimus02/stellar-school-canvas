
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ScheduleClass {
  time: string;
  subject: string;
  room: string;
  teacher: string;
}

interface ScheduleDay {
  day: string;
  classes: ScheduleClass[];
}

interface ScheduleDayCardProps {
  schedule: ScheduleDay;
}

export const ScheduleDayCard = ({ schedule }: ScheduleDayCardProps) => {
  const [expandedClass, setExpandedClass] = useState<number | null>(null);

  return (
    <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-purple-200 dark:border-purple-900">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
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
                  "w-full p-4 bg-white/60 dark:bg-slate-700/60 transition-all duration-500 transform",
                  "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-lg",
                  "border border-purple-100 dark:border-purple-800",
                  expandedClass === index && "bg-purple-50 dark:bg-purple-900/30"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      {classItem.time}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="font-semibold text-gray-900 dark:text-gray-100 mb-1"
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
                      className="space-y-2 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        Кабинет {classItem.room}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4 text-purple-500" />
                        {classItem.teacher}
                      </div>
                    </motion.div>

                    <motion.div
                      layout
                      className="flex justify-end mt-2"
                    >
                      <ChevronDown 
                        className={cn(
                          "w-4 h-4 text-purple-500 transition-transform duration-300",
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
