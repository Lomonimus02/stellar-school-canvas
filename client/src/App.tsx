import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Schools from "@/pages/schools";
import Users from "@/pages/users";
import UserRoles from "@/pages/user-roles";
import SchedulePage from "@/pages/schedule";
import ClassSchedulePage from "@/pages/schedule-class";
import OverallSchedulePage from "@/pages/schedule-overall";
import StudentSchedulePage from "@/pages/student-schedule";
import ClassGradeDetailsPage from "@/pages/class-grade-details";
import ClassTimeSlotsPage from "@/pages/class-time-slots";
import Grades from "@/pages/grades";
import GradingSystems from "@/pages/grading-systems";
import Homework from "@/pages/homework";
import Messages from "@/pages/messages";
import Documents from "@/pages/documents";
import Analytics from "@/pages/analytics";
import Settings from "@/pages/settings";
import Support from "./pages/support-page";
import Notifications from "./pages/notifications";
import SystemLogs from "./pages/system-logs";
import StudentClassAssignments from "./pages/student-class-assignments";
import ParentStudentConnections from "./pages/parent-student-connections";
import ClassTeacherDashboard from "./pages/class-teacher-dashboard";
import ClassTeacherGradesPage from "./pages/class-teacher-grades";
import TeacherClasses from "./pages/teacher-classes";
import Subgroups from "./pages/subgroups";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import SubjectsManagementPage from "./pages/subjects-management";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" element={<Dashboard />} />
      <ProtectedRoute path="/schools" element={<Schools />} />
      <ProtectedRoute path="/users" element={<Users />} />
      <ProtectedRoute path="/user-roles" element={<UserRoles />} />
      <ProtectedRoute path="/subjects-management" element={<SubjectsManagementPage />} />
      <ProtectedRoute path="/schedule" element={<SchedulePage />} />
      <ProtectedRoute path="/schedule-class/:classId" element={<ClassSchedulePage />} />
      <ProtectedRoute path="/schedule-class/:classId/time-slots" element={<ClassTimeSlotsPage />} />
      <ProtectedRoute path="/schedule-overall" element={<OverallSchedulePage />} />
      <ProtectedRoute path="/student-schedule/:studentId" element={<StudentSchedulePage />} />
      <ProtectedRoute path="/class-grade-details/:classId/:subjectId/:subgroupId?" element={<ClassGradeDetailsPage />} />
      <ProtectedRoute path="/grades" element={<Grades />} />
      <ProtectedRoute path="/grading-systems" element={<GradingSystems />} />
      <ProtectedRoute path="/homework" element={<Homework />} />
      <ProtectedRoute path="/messages" element={<Messages />} />
      <ProtectedRoute path="/documents" element={<Documents />} />
      <ProtectedRoute path="/analytics" element={<Analytics />} />
      <ProtectedRoute path="/settings" element={<Settings />} />
      <ProtectedRoute path="/support" element={<Support />} />
      <ProtectedRoute path="/notifications" element={<Notifications />} />
      <ProtectedRoute path="/system-logs" element={<SystemLogs />} />
      <ProtectedRoute path="/student-class-assignments" element={<StudentClassAssignments />} />
      <ProtectedRoute path="/parent-student-connections" element={<ParentStudentConnections />} />
      <ProtectedRoute path="/class-teacher-dashboard" element={<ClassTeacherDashboard />} />
      <ProtectedRoute path="/class-teacher-grades" element={<ClassTeacherGradesPage />} />
      <ProtectedRoute path="/teacher-classes" element={<TeacherClasses />} />
      <ProtectedRoute path="/subgroups" element={<Subgroups />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
