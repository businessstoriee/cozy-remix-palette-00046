import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "@/components/language/useLanguageTranslation.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { registerSW } from 'virtual:pwa-register';

// Register service worker for PWA with improved configuration
if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm('New content available! Reload to update?')) {
        updateSW(true).catch((err) => {
          console.error('Failed to update service worker:', err);
        });
      }
    },
    onOfflineReady() {
      console.log('✅ App ready to work offline');
    },
    immediate: true,
    onRegisteredSW(swUrl, r) {
      console.log('✅ Service Worker registered successfully:', swUrl);
      
      // Check for updates periodically
      if (r) {
        setInterval(() => {
          r.update().catch((err) => {
            console.error('Failed to check for updates:', err);
          });
        }, 60 * 60 * 1000); // Check every hour
      }
    },
    onRegisterError(error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeProvider defaultTheme="system" storageKey="greeting-theme">
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </ErrorBoundary>
);