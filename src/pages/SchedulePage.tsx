
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ScheduleDayCard } from "@/components/schedule/ScheduleDayCard"
import { motion } from "framer-motion"
import { Calendar, ChevronUp, ChevronDown, Clock, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import MainSidebar from "@/components/MainSidebar"

const mockSchedule = [
  {
    day: "Понедельник",
    classes: [
      { time: "8:30", subject: "Математика", room: "301", teacher: "Иванова А.П." },
      { time: "9:25", subject: "Физика", room: "201", teacher: "Петров В.С." },
      { time: "10:20", subject: "История", room: "401", teacher: "Сидорова Е.В." },
      { time: "11:30", subject: "Литература", room: "302", teacher: "Козлова М.И." }
    ]
  },
  {
    day: "Вторник",
    classes: [
      { time: "8:30", subject: "Химия", room: "205", teacher: "Морозова О.Н." },
      { time: "9:25", subject: "Биология", room: "208", teacher: "Волков Д.А." },
      { time: "10:20", subject: "Английский", room: "305", teacher: "Соколова А.В." },
      { time: "11:30", subject: "География", room: "303", teacher: "Лебедев П.М." }
    ]
  },
  {
    day: "Среда",
    classes: [
      { time: "8:30", subject: "Информатика", room: "404", teacher: "Королев И.С." },
      { time: "9:25", subject: "Физкультура", room: "Спортзал", teacher: "Медведев А.А." },
      { time: "10:20", subject: "Русский язык", room: "306", teacher: "Захарова Т.П." },
      { time: "11:30", subject: "Обществознание", room: "308", teacher: "Николаева Е.В." }
    ]
  },
  {
    day: "Четверг",
    classes: [
      { time: "8:30", subject: "Алгебра", room: "301", teacher: "Иванова А.П." },
      { time: "9:25", subject: "Геометрия", room: "301", teacher: "Иванова А.П." },
      { time: "10:20", subject: "Физика", room: "201", teacher: "Петров В.С." },
      { time: "11:30", subject: "Химия", room: "205", teacher: "Морозова О.Н." }
    ]
  },
  {
    day: "Пятница",
    classes: [
      { time: "8:30", subject: "История", room: "401", teacher: "Сидорова Е.В." },
      { time: "9:25", subject: "Литература", room: "302", teacher: "Козлова М.И." },
      { time: "10:20", subject: "Английский", room: "305", teacher: "Соколова А.В." },
      { time: "11:30", subject: "Биология", room: "208", teacher: "Волков Д.А." }
    ]
  }
];

const SchedulePage = () => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev + 1) % mockSchedule.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  const nextDay = () => {
    setCurrentDay((prev) => (prev + 1) % mockSchedule.length);
  };

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + mockSchedule.length) % mockSchedule.length);
  };

  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      <div className="flex-1 bg-gradient dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 from-blue-50 via-purple-50 to-blue-50 animate-gradient-xy">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Расписание
              </motion.h1>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAutoScroll(!autoScroll)}
                  className="ml-4"
                >
                  {autoScroll ? (
                    <Pause className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Play className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </Button>
              </motion.div>
            </div>

            <div className="w-full max-w-2xl relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={prevDay}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                >
                  <ChevronUp className="h-8 w-8" />
                </Button>
              </motion.div>

              <ScrollArea className="h-[70vh] w-full px-12 overflow-hidden">
                <motion.div
                  key={currentDay}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.5 
                  }}
                >
                  <ScheduleDayCard schedule={mockSchedule[currentDay]} />
                </motion.div>
              </ScrollArea>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={nextDay}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                >
                  <ChevronDown className="h-8 w-8" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
