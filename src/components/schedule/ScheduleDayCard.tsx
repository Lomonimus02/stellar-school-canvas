
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

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
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <Card className="p-4 bg-white/60 dark:bg-slate-700/60 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 min-w-[80px]">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {classItem.time}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {classItem.subject}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Кабинет {classItem.room}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {classItem.teacher}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
