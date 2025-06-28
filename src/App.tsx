
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Families from "./pages/Families";
import Students from "./pages/Students";
import WomenEmpowerment from "./pages/WomenEmpowerment";
import Tutors from "./pages/Tutors";
import Volunteers from "./pages/Volunteers";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-16 bg-white border-b flex items-center px-6 shadow-sm">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Kalam Foundation</h1>
                    <p className="text-sm text-gray-500">Admin Dashboard</p>
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/families" element={<Families />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/women-empowerment" element={<WomenEmpowerment />} />
                  <Route path="/tutors" element={<Tutors />} />
                  <Route path="/volunteers" element={<Volunteers />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
