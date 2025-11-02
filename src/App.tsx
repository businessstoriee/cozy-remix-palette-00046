import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<Create />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/:slug" element={<ViewGreeting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
