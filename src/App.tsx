import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Create from "./pages/Create";
import ViewGreeting from "./pages/ViewGreeting";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/HelpAndInformationPages/aboutus/AboutUs";
import PrivacyPolicy from "./pages/HelpAndInformationPages/faqs/PrivacyPolicy";
import FAQ from "./pages/HelpAndInformationPages/faqs/FAQ";
import Support from "./pages/HelpAndInformationPages/support/Support";
import Templates from "./pages/HelpAndInformationPages/Templates/Templates";
import Blog from "./pages/HelpAndInformationPages/blog/Blog";
import BlogPost from "./pages/HelpAndInformationPages/blog/BlogPost";
import Help from "./pages/HelpAndInformationPages/help/Help";
import PageTransition from "./components/common/PageTransition";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  useKeyboardShortcuts();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/create" element={<PageTransition><Create /></PageTransition>} />
        <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/help" element={<PageTransition><Help /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
        <Route path="/:slug" element={<PageTransition><ViewGreeting /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
