
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
      { time: "8:30", subject: "Математика", room: "301", teacher: "Иванова А.П.", teacherId: "1", teacherAvatar: "https://i.pravatar.cc/150?img=32" },
      { time: "9:25", subject: "Физика", room: "201", teacher: "Петров В.С.", teacherId: "2", teacherAvatar: "https://i.pravatar.cc/150?img=53" },
      { time: "10:20", subject: "История", room: "401", teacher: "Сидорова Е.В.", teacherId: "3", teacherAvatar: "https://i.pravatar.cc/150?img=23" },
      { time: "11:30", subject: "Литература", room: "302", teacher: "Козлова М.И.", teacherId: "4", teacherAvatar: "https://i.pravatar.cc/150?img=44" }
    ]
  },
  {
    day: "Вторник",
    classes: [
      { time: "8:30", subject: "Химия", room: "205", teacher: "Морозова О.Н.", teacherId: "5", teacherAvatar: "https://i.pravatar.cc/150?img=12" },
      { time: "9:25", subject: "Биология", room: "208", teacher: "Волков Д.А.", teacherId: "6", teacherAvatar: "https://i.pravatar.cc/150?img=59" },
      { time: "10:20", subject: "Английский", room: "305", teacher: "Соколова А.В.", teacherId: "7", teacherAvatar: "https://i.pravatar.cc/150?img=33" },
      { time: "11:30", subject: "География", room: "303", teacher: "Лебедев П.М.", teacherId: "8", teacherAvatar: "https://i.pravatar.cc/150?img=68" }
    ]
  },
  {
    day: "Среда",
    classes: [
      { time: "8:30", subject: "Информатика", room: "404", teacher: "Королев И.С.", teacherId: "9", teacherAvatar: "https://i.pravatar.cc/150?img=11" },
      { time: "9:25", subject: "Физкультура", room: "Спортзал", teacher: "Медведев А.А.", teacherId: "10", teacherAvatar: "https://i.pravatar.cc/150?img=67" },
      { time: "10:20", subject: "Русский язык", room: "306", teacher: "Захарова Т.П.", teacherId: "11", teacherAvatar: "https://i.pravatar.cc/150?img=5" },
      { time: "11:30", subject: "Обществознание", room: "308", teacher: "Николаева Е.В.", teacherId: "12", teacherAvatar: "https://i.pravatar.cc/150?img=49" }
    ]
  },
  {
    day: "Четверг",
    classes: [
      { time: "8:30", subject: "Алгебра", room: "301", teacher: "Иванова А.П.", teacherId: "1", teacherAvatar: "https://i.pravatar.cc/150?img=32" },
      { time: "9:25", subject: "Геометрия", room: "301", teacher: "Иванова А.П.", teacherId: "1", teacherAvatar: "https://i.pravatar.cc/150?img=32" },
      { time: "10:20", subject: "Физика", room: "201", teacher: "Петров В.С.", teacherId: "2", teacherAvatar: "https://i.pravatar.cc/150?img=53" },
      { time: "11:30", subject: "Химия", room: "205", teacher: "Морозова О.Н.", teacherId: "5", teacherAvatar: "https://i.pravatar.cc/150?img=12" }
    ]
  },
  {
    day: "Пятница",
    classes: [
      { time: "8:30", subject: "История", room: "401", teacher: "Сидорова Е.В.", teacherId: "3", teacherAvatar: "https://i.pravatar.cc/150?img=23" },
      { time: "9:25", subject: "Литература", room: "302", teacher: "Козлова М.И.", teacherId: "4", teacherAvatar: "https://i.pravatar.cc/150?img=44" },
      { time: "10:20", subject: "Английский", room: "305", teacher: "Соколова А.В.", teacherId: "7", teacherAvatar: "https://i.pravatar.cc/150?img=33" },
      { time: "11:30", subject: "Биология", room: "208", teacher: "Волков Д.А.", teacherId: "6", teacherAvatar: "https://i.pravatar.cc/150?img=59" }
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
    setAutoScroll(false);
    setCurrentDay((prev) => (prev + 1) % mockSchedule.length);
  };

  const prevDay = () => {
    setAutoScroll(false);
    setCurrentDay((prev) => (prev - 1 + mockSchedule.length) % mockSchedule.length);
  };

  const cardGradients = [
    "from-purple-600 via-pink-600 to-blue-500",
    "from-pink-500 via-red-500 to-yellow-500",
    "from-green-400 via-blue-500 to-purple-600",
    "from-yellow-400 via-orange-500 to-red-500",
    "from-blue-500 via-teal-400 to-green-500"
  ];

  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      <div className="flex-1 bg-gradient-to-br from-fuchsia-600 via-violet-800 to-indigo-900 animate-gradient-xy overflow-hidden">
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
                <Calendar className="w-8 h-8 text-pink-300" />
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300"
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
                  className="ml-4 bg-pink-500/20 hover:bg-pink-500/30 text-pink-200"
                >
                  {autoScroll ? (
                    <Pause className="w-5 h-5 text-pink-200" />
                  ) : (
                    <Play className="w-5 h-5 text-pink-200" />
                  )}
                </Button>
              </motion.div>
            </div>

            <div className="w-full max-w-2xl relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  onClick={prevDay}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-500/30"
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
                  className="pb-12"
                >
                  <ScheduleDayCard schedule={mockSchedule[currentDay]} gradientClass={cardGradients[currentDay % cardGradients.length]} />
                </motion.div>
              </ScrollArea>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  onClick={nextDay}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
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
