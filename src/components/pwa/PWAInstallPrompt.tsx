import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Zap, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type TrackFn = (event: string, payload?: Record<string, any>) => void;

interface Props {
  /**
   * Optional analytics callback. The component will also try to send via
   * window.gtag / window.dataLayer automatically if available.
   */
  onTrack?: TrackFn;
  /**
   * Seconds delay before auto showing (default 30s)
   */
  delayMs?: number;
  /**
   * Don't show more than once within this period (ms). Default is 24h.
   */
  oncePerMs?: number;
  /**
   * Optional flag to force-show (for staging/testing)
   */
  forceShow?: boolean;
}

interface BeforeInstallPromptEventLike extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DEFAULT_DELAY = 30_000;
const DEFAULT_ONCE_MS = 24 * 60 * 60 * 1000;

function sendAnalyticsFallback(name: string, payload?: Record<string, any>) {
  // gtag
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", name, payload || {});
    } else if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: name, ...payload });
    }
  } catch {
    // swallow errors
  }
}

const isIOS = () => {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent || "";
  return /iphone|ipad|ipod/i.test(ua) && !("MSStream" in window);
};

const isStandaloneMode = () => {
  if (typeof window === "undefined") return false;
  try {
    // PWA standalone
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    // iOS homescreen
    if ((window.navigator as any).standalone === true) return true;
  } catch {
    // ignore
  }
  return false;
};

const metaHasSmartAppBanner = () => {
  if (typeof document === "undefined") return false;
  // Presence of apple-itunes-app meta usually causes Smart App Banner on iOS
  return !!document.querySelector('meta[name="apple-itunes-app"]');
};

const getLocal = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const setLocal = (key: string, val: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, val);
  } catch {}
};

export default function PWAInstallPrompt({
  onTrack,
  delayMs = DEFAULT_DELAY,
  oncePerMs = DEFAULT_ONCE_MS,
  forceShow = false,
}: Props) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEventLike | null>(null);
  const [visible, setVisible] = useState(false);
  const [platformIsIOS, setPlatformIsIOS] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [smartBannerPresent, setSmartBannerPresent] = useState(false);

  const timerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const interactionHappened = useRef(false);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // derived: whether allowed by once-per rule
  const lastShownRaw = getLocal("pwa-prompt-lastShown");
  const lastShown = lastShownRaw ? Number(lastShownRaw) : 0;
  const allowedByOnce = Date.now() - lastShown > oncePerMs;

  // analytics helper
  const track = useCallback(
    (name: string, payload?: Record<string, any>) => {
      // call optional callback
      try {
        onTrack?.(name, payload);
      } catch {}
      // fallback
      sendAnalyticsFallback(name, payload);
    },
    [onTrack]
  );

  // Detect platform + smart banner presence + standalone
  useEffect(() => {
    setPlatformIsIOS(isIOS());
    setStandalone(isStandaloneMode());
    setSmartBannerPresent(metaHasSmartAppBanner());
  }, []);

  // Setup beforeinstallprompt handler (Android / Chromium)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      console.log('🎯 beforeinstallprompt event received');
      try {
        e.preventDefault();
        console.log('✅ Default prevented on beforeinstallprompt');
      } catch (err) {
        console.error('❌ Failed to prevent default:', err);
      }
      // store event
      setDeferredPrompt(e as BeforeInstallPromptEventLike);
      console.log('💾 Deferred prompt stored');
      track("pwa:beforeinstallprompt_received");
      // schedule show using intelligent rules
      scheduleShow();
    };

    window.addEventListener("beforeinstallprompt", handler);
    console.log('👂 Listening for beforeinstallprompt event');
    
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformIsIOS, standalone, smartBannerPresent]);

  // Shows the modal if conditions satisfied (respects once-per-day)
  const scheduleShow = useCallback(() => {
    // clear existing
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    const shouldSchedule = () => {
      if (forceShow) return true;
      if (standalone) return false;
      if (platformIsIOS && smartBannerPresent) return false; // Option B
      if (!allowedByOnce) return false;
      return true;
    };

    if (!shouldSchedule()) {
      return;
    }

    // Trigger options:
    // 1) After delayMs
    timerRef.current = window.setTimeout(() => {
      if (!interactionHappened.current) {
        // If user never interacted, wait until they interact and then idle for 10s
        // to avoid annoying impressionless prompts
        // idle timer will set visible
        // set a short idle watch (10s)
        idleTimerRef.current = window.setTimeout(() => {
          setVisible(true);
          track("pwa:prompt_shown", { reason: "delay+idle" });
        }, 10_000);
      } else {
        setVisible(true);
        track("pwa:prompt_shown", { reason: "delay" });
      }
    }, delayMs);

    // 2) Show earlier if user scrolls > 50% of document
    const onScroll = () => {
      try {
        const scrolled = (window.scrollY || window.pageYOffset);
        const total = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        if (scrolled / total > 0.5) {
          // show immediately (if allowed)
          if (allowedByOnce && !standalone && !(platformIsIOS && smartBannerPresent)) {
            setVisible(true);
            track("pwa:prompt_shown", { reason: "scroll" });
            cleanup();
          }
        }
      } catch {}
    };

    // 3) Mark that user has interacted (click/keydown/touch)
    const onInteraction = () => {
      interactionHappened.current = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    // store cleanup on ref so we can call from other places
    (scheduleShow as any)._cleanup = cleanup;
  }, [allowedByOnce, delayMs, forceShow, platformIsIOS, smartBannerPresent, standalone, track]);

  // expose a manual show (for dev/use elsewhere) - not used here but could be wired to a CTA
  useEffect(() => {
    // schedule on mount if event already fired or forceShow true
    if (forceShow) {
      setVisible(true);
    } else {
      // If beforeinstallprompt already fired (some browsers might have fired before mounting)
      // we don't automatically show until event arrives — but we still want to respect once-per-day
      // scheduleShow may be called by the event handler; here we attempt to schedule if no event but platform is web
      // (no-op for iOS because it won't have event)
      scheduleShow();
    }
    // cleanup when unmount
    return () => {
      const c = (scheduleShow as any)._cleanup;
      if (typeof c === "function") c();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleShow]);

  // Accessibility: focus management & basic trap
  useEffect(() => {
    if (!visible) return;
    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    // focus primary button after mount
    requestAnimationFrame(() => {
      const primary = wrapperRef.current?.querySelector("[data-pwa-primary]") as HTMLElement | null;
      (primary || wrapperRef.current)?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      } else if (e.key === "Tab") {
        // Basic focus trap: keep focus within wrapper
        const focusable = wrapperRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      try {
        lastFocusedElement.current?.focus();
      } catch {}
    };
  }, [visible]);

  const handleInstall = useCallback(async () => {
    // Android/chrome pathway
    if (deferredPrompt) {
      try {
        console.log('🚀 Triggering PWA install prompt...');
        
        // Call prompt() - this must be called in response to a user gesture
        const promptResult = await deferredPrompt.prompt();
        console.log('📱 Prompt shown, result:', promptResult);
        
        // Wait for the user's choice
        const choice = await deferredPrompt.userChoice;
        console.log('✅ User choice:', choice);
        
        if (choice?.outcome === "accepted") {
          console.log('🎉 User accepted PWA installation');
          track("pwa:installed", { method: "browser-prompt" });
        } else {
          console.log('❌ User dismissed PWA installation');
          track("pwa:install_dismissed", { method: "browser-prompt" });
        }
      } catch (err) {
        console.error('❌ PWA install error:', err);
        track("pwa:install_error", { error: String(err) });
        
        // If there's an error, try to provide helpful feedback
        alert('Installation failed. Please try:\n1. Checking if the app is already installed\n2. Using Chrome or Edge browser\n3. Visiting via HTTPS');
      } finally {
        setVisible(false);
        setLocal("pwa-prompt-lastShown", String(Date.now()));
        setDeferredPrompt(null);
      }
    } else {
      console.warn('⚠️ No deferred prompt available');
      // For other cases, just close. (iOS uses instructive flow)
      setVisible(false);
      setLocal("pwa-prompt-lastShown", String(Date.now()));
    }
  }, [deferredPrompt, track]);

  const handleDismiss = useCallback(() => {
    track("pwa:dismissed");
    setVisible(false);
    setLocal("pwa-prompt-lastShown", String(Date.now()));

    // run cleanup if scheduled
    const c = (scheduleShow as any)?._cleanup;
    if (typeof c === "function") c();
  }, [track]);

  // For iOS, generate inline Share icon SVG to avoid external assets
  const ShareIconInline = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      className="inline -mt-0.5"
    >
      <path d="M12 3v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );

  // Visibility guard final: don't render the component at all if not allowed
  if (typeof window === "undefined") return null; // SSR guard
  if (standalone && !forceShow) return null; // don't show in stand-alone mode
  if (!visible && !forceShow) return null;

  // If platform is iOS and Smart App Banner present -> do not show (Option B)
  if (platformIsIOS && smartBannerPresent && !forceShow) {
    return null;
  }

  // Layout: responsive, center for large screens, bottom for small screens (nicely)
  // Use AnimatePresence + motion for transitions

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pwa-prompt-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
          aria-hidden={!visible}
        >
          <motion.div
            key="pwa-prompt"
            ref={wrapperRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-title"
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative bg-white dark:bg-slate-900 w-full sm:max-w-md rounded-2xl p-5 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-700"
            style={{ outline: "none" }}
            tabIndex={-1}
          >
            {/* Close */}
            <button
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-900 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-lg text-white">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 id="pwa-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Install Greeting Invite
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">Get faster access & offline support.</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="flex items-start gap-3">
                <div className="rounded p-2 bg-slate-50 dark:bg-slate-800">
                  <Zap className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Lightning-fast</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">Instantly open the app, even offline.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded p-2 bg-slate-50 dark:bg-slate-800">
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Works offline</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">Cache invites and content for offline use.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded p-2 bg-slate-50 dark:bg-slate-800">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">App-like</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">Home screen icon & immersive experience.</div>
                </div>
              </div>
            </div>

            {/* iOS instructions or Android install button */}
            <div className="mt-2 mb-2">
              {platformIsIOS ? (
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <p className="mb-2">Add to Home Screen on Safari:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>Tap the <span className="inline-block align-middle"><ShareIconInline /></span> Share button in Safari.</li>
                    <li>Scroll and tap <strong>“Add to Home Screen”</strong>.</li>
                    <li>Tap <strong>Add</strong>.</li>
                  </ol>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Install the app for the best experience.</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleInstall}
                      data-pwa-primary
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Install
                      </span>
                    </Button>
                    <Button variant="outline" onClick={handleDismiss} className="flex-1">
                      Not now
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">
              Free • No account required • We won't spam you
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
