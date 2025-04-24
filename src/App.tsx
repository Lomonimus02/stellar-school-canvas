
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubjectsPage from "./pages/SubjectsPage";
import ClassesPage from "./pages/ClassesPage";
import SubjectInfoPage from "./pages/SubjectInfoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:subjectId/classes" element={<ClassesPage />} />
          <Route path="/subjects/:subjectId/classes/:classId" element={<SubjectInfoPage />} />
          <Route path="/subjects/:subjectId/subgroups/:subgroupId/classes" element={<ClassesPage />} />
          <Route path="/subjects/:subjectId/subgroups/:subgroupId/classes/:classId" element={<SubjectInfoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
