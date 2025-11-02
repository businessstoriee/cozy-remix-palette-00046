// src/ErrorBoundary.tsx
import { Component, ReactNode, MouseEvent, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return <ErrorUI error={this.state.error} />;
  }
}

// ✅ Extracted as functional component to use Framer Motion
const ErrorUI = ({ error }: { error?: Error }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt motion values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 100, damping: 10 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen flex items-center justify-center relative overflow-hidden
        bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100
        dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]
      "
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,0,150,0.15), transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(0,200,255,0.15), transparent 40%)
          `,
          backgroundSize: "200% 200%",
          zIndex: 0,
        }}
      />

      {/* Floating planet */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-28 h-28 opacity-30 dark:opacity-40"
      >
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" className="fill-pink-300 dark:fill-purple-500" />
          <path
            d="M10 50C10 30 90 30 90 50C90 70 10 70 10 50Z"
            className="fill-blue-400/60 dark:fill-fuchsia-300/40"
          />
        </svg>
      </motion.div>

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="
          relative z-10 max-w-md w-full p-10 text-center rounded-3xl
          bg-white/80 dark:bg-black/40 backdrop-blur-2xl shadow-2xl
          border border-white/30 dark:border-fuchsia-500/20 overflow-hidden
        "
      >
 
 {/* Glowing rotating bg */}
<motion.div
  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-40 blur-3xl"
  animate={{ rotate: [0, 360] }}
  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
  style={{ pointerEvents: "none" }} // ✅ Prevents it from blocking clicks
/>

<motion.h2
  style={{ transform: "translateZ(70px)" }}
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
  className="
    text-5xl md:text-6xl font-extrabold mb-4
    bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent
    drop-shadow-[0_0_25px_rgba(217,70,239,0.4)]
  "
>
  ⚠ Error
</motion.h2>

<motion.p
  style={{ transform: "translateZ(40px)" }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="text-lg font-medium mb-6 text-gray-600 dark:text-gray-300"
>
  Something unexpected happened in the app 🚧
</motion.p>

{/* Buttons */}
<div className="flex flex-col gap-3 z-20 relative">
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.location.reload()}
    className="
      px-8 py-3 rounded-full font-semibold text-lg
      bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg
    "
  >
    🔄 Reload Page
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => (window.location.href = "/")}
    className="
      px-8 py-3 rounded-full font-semibold text-lg
      bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg
    "
  >
    🏠 Go Home
  </motion.button>
</div>

{/* ✅ FIXED: Error details now clickable */}
{error && (
  <motion.details
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="
      mt-6 text-left p-4 rounded-lg bg-black/20 dark:bg-white/10
      border border-white/20 text-sm text-gray-800 dark:text-gray-200
      relative z-20
    "
  >
    <summary className="cursor-pointer text-sm font-medium">
      View Error Details
    </summary>
    <code className="text-xs break-all block mt-2 opacity-80">
      {error.message}
    </code>
  </motion.details>
)}


     
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/30 dark:bg-fuchsia-400/30"
          style={{
            width: `${Math.random() * 10 + 6}px`,
            height: `${Math.random() * 10 + 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}


       {/* Floating particles background */}
    <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    {/* </div> */}

    

    {/* 🌟 Floating Glowing Particles */}
{/* <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none"> */}
  {[...Array(25)].map((_, i) => (
    <div
      key={i}
      className="absolute rounded-full blur-xl opacity-60 animate-float-slow"
      style={{
        width: `${Math.random() * 12 + 8}px`,
        height: `${Math.random() * 12 + 8}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: [
          "rgba(244,114,182,0.6)", // pink
          "rgba(192,132,252,0.6)", // purple
          "rgba(99,102,241,0.6)",  // indigo
          "rgba(56,189,248,0.6)",  // cyan
        ][Math.floor(Math.random() * 4)],
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${20 + Math.random() * 20}s`,
      }}
    />
  ))}
</div>
    </motion.div>
  );
};
