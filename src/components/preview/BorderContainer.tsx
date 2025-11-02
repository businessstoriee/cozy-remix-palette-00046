import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GreetingFormData, EventType } from '@/types/greeting';
import { BorderSettings, BorderElement, makeCompatibleForLegacy } from '@/types/background';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  greetingData: GreetingFormData;
  selectedEvent: EventType | null;
  children: React.ReactNode;
}

const DEFAULT_SIZE = { width: 0, height: 0 };

// Fixed: Use the same perimeter calculation as BorderPreview
const computePerimeterPos = (
  posPercent: number,
  elSize: number,
  borderWidth: number,
  containerSize: { width: number; height: number }
) => {
  // centerline inset = half stroke - EXACTLY like BorderPreview
  const inset = borderWidth / 2;
  const innerX = inset;
  const innerY = inset;
  const innerW = Math.max(0, containerSize.width - inset * 2);
  const innerH = Math.max(0, containerSize.height - inset * 2);
  const perim = 2 * (innerW + innerH);
  const normalized = ((posPercent % 100) + 100) % 100;
  const dist = (normalized / 100) * perim;

  let x = innerX;
  let y = innerY;

  if (dist <= innerW) {
    // top edge left->right
    x = innerX + dist;
    y = innerY;
  } else if (dist <= innerW + innerH) {
    // right edge top->bottom
    const d = dist - innerW;
    x = innerX + innerW;
    y = innerY + d;
  } else if (dist <= innerW + innerH + innerW) {
    // bottom edge right->left
    const d = dist - (innerW + innerH);
    x = innerX + innerW - d;
    y = innerY + innerH;
  } else {
    // left edge bottom->top
    const d = dist - (innerW + innerH + innerW);
    x = innerX;
    y = innerY + innerH - d;
  }

  // center element over the centerline - EXACTLY like BorderPreview
  return { left: Math.round(x - elSize / 2), top: Math.round(y - elSize / 2) };
};

// Get animation duration with proper speed control
const getAnimationDuration = (element: BorderElement, animationType: string): number => {
  const speed = element.rotateSpeed;
  
  switch (animationType) {
    case 'travel':
      return Math.max(2, speed || 6); // Default 6 seconds like BorderPreview
    case 'revolve':
      return Math.max(3, speed || 6);
    case 'rotate-cw':
    case 'rotate-ccw':
    case 'spin':
      return Math.max(1, speed || 4);
    case 'float':
      return Math.max(1, speed || 3);
    case 'blink':
      return Math.max(0.5, speed || 2);
    case 'pulse':
      return Math.max(0.8, speed || 1.5);
    case 'bounce':
      return Math.max(1, speed || 2);
    case 'shake':
      return Math.max(0.3, speed || 0.5);
    case 'pop':
      return Math.max(0.5, speed || 1.2);
    default:
      return Math.max(1, speed || 3);
  }
};

// Get stroke dasharray for style - EXACTLY like BorderPreview
const getStrokeDasharray = (style: string, width: number) => {
  switch (style) {
    case 'dashed': return `${Math.max(4, width * 3)} ${Math.max(2, width * 1.5)}`;
    case 'dotted': return `${Math.max(1, width)} ${Math.max(4, width)}`;
    default: return ''; // solid (no dasharray)
  }
};

const BorderContainer: React.FC<Props> = ({ greetingData, selectedEvent, children }) => {
  const borderRef = useRef<HTMLDivElement | null>(null);
  const rawBorder = greetingData?.borderSettings || ({} as Partial<BorderSettings>);
  const borderSettings = useMemo(() => makeCompatibleForLegacy(rawBorder), [rawBorder]);
  const [borderSize, setBorderSize] = useState<{ width: number; height: number }>(DEFAULT_SIZE);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
  const animationStartTimeRef = useRef<Record<string, number>>({});

  const decorativeElements = useMemo(() => 
    (borderSettings.decorativeElements || []).map(el => ({ ...el })), 
    [borderSettings]
  );

  // Enhanced resize observer
  useEffect(() => {
    const el = borderRef.current;
    if (!el) return;

    let timeoutId: NodeJS.Timeout;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setBorderSize({ 
        width: Math.max(0, Math.round(rect.width)), 
        height: Math.max(0, Math.round(rect.height)) 
      });
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 50);
    };

    update();
    const ro = new ResizeObserver(debouncedUpdate);
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Enhanced unified animation system with COMPLETE travel animation support
  const animationRef = useRef<number | null>(null);
  const [elementPositions, setElementPositions] = useState<Record<string, { left: number; top: number }>>({});
  const [elementScales, setElementScales] = useState<Record<string, number>>({});
  const [elementRotations, setElementRotations] = useState<Record<string, number>>({});

  useEffect(() => {
    if (decorativeElements.length === 0) {
      setElementPositions({});
      setElementScales({});
      setElementRotations({});
      animationStartTimeRef.current = {};
      return;
    }

    const startTime = performance.now();

    // Initialize start times for new elements
    decorativeElements.forEach(el => {
      if (animationStartTimeRef.current[el.id] === undefined) {
        animationStartTimeRef.current[el.id] = startTime;
      }
    });

    const animate = (currentTime: number) => {
      const newPositions: Record<string, { left: number; top: number }> = {};
      const newScales: Record<string, number> = {};
      const newRotations: Record<string, number> = {};

      decorativeElements.forEach(el => {
        const borderWidth = borderSettings.width || 1;
        const elSize = el.size || 24;
        
        let positionPercent = el.position ?? 0;
        let rotation = 0;

        // Handle travel animation with ALL variations - EXACTLY like BorderPreview
        if (el.animation === 'travel') {
          const duration = getAnimationDuration(el, el.animation);
          const elementStartTime = animationStartTimeRef.current[el.id] || startTime;
          const elapsed = (currentTime - elementStartTime) / 1000;
          
          // Calculate progress - EXACTLY like BorderPreview
          let progress = (elapsed / duration) % 1;
          const direction = el.flowDirection || 'top-down';
          const borderSide = el.borderSide || 'all';
          const startOffset = ((el.position ?? 0) % 100) / 100;
          
          // If traveling on a specific border side only - EXACTLY like BorderPreview
          if (borderSide !== 'all') {
            const inset = borderWidth / 2;
            const innerW = Math.max(0, borderSize.width - inset * 2);
            const innerH = Math.max(0, borderSize.height - inset * 2);
            
            let pos = { left: 0, top: 0 };
            
            switch (borderSide) {
              case 'top': {
                // Travel along top border only
                const isForward = direction === 'left-right';
                const effectiveProgress = isForward ? progress : (1 - progress);
                const x = inset + (startOffset + effectiveProgress) % 1 * innerW;
                pos = { left: Math.round(x - elSize / 2), top: Math.round(inset - elSize / 2) };
                break;
              }
              case 'right': {
                // Travel along right border only
                const isForward = direction === 'top-down';
                const effectiveProgress = isForward ? progress : (1 - progress);
                const y = inset + (startOffset + effectiveProgress) % 1 * innerH;
                pos = { left: Math.round(inset + innerW - elSize / 2), top: Math.round(y - elSize / 2) };
                break;
              }
              case 'bottom': {
                // Travel along bottom border only
                const isForward = direction === 'right-left';
                const effectiveProgress = isForward ? progress : (1 - progress);
                const x = inset + innerW - (startOffset + effectiveProgress) % 1 * innerW;
                pos = { left: Math.round(x - elSize / 2), top: Math.round(inset + innerH - elSize / 2) };
                break;
              }
              case 'left': {
                // Travel along left border only
                const isForward = direction === 'down-top';
                const effectiveProgress = isForward ? progress : (1 - progress);
                const y = inset + innerH - (startOffset + effectiveProgress) % 1 * innerH;
                pos = { left: Math.round(inset - elSize / 2), top: Math.round(y - elSize / 2) };
                break;
              }
            }
            
            newPositions[el.id] = pos;
          } else {
            // Travel around entire perimeter - EXACTLY like BorderPreview
            let percent = 0;
            switch (direction) {
              case 'top-down':
                percent = ((startOffset + progress) % 1) * 100;
                break;
              case 'down-top':
                percent = ((startOffset + (1 - progress)) % 1) * 100;
                break;
              case 'left-right':
                percent = ((startOffset + 0.25 + progress) % 1) * 100;
                break;
              case 'right-left':
                percent = ((startOffset + 0.75 + (1 - progress)) % 1) * 100;
                break;
              default:
                percent = ((startOffset + progress) % 1) * 100;
            }
            
            newPositions[el.id] = computePerimeterPos(percent, elSize, borderWidth, borderSize);
          }
          
          // Add rotation during travel for better visual effect
          rotation = elapsed * 60;
        } else {
          // For non-travel elements, use static position
          newPositions[el.id] = computePerimeterPos(positionPercent, elSize, borderWidth, borderSize);
        }

        // Enhanced scale effects based on animation and hover with proper speed
        let scale = 1;
        const elementElapsed = (currentTime - (animationStartTimeRef.current[el.id] || startTime)) / 1000;
        
        if (hoveredElement === el.id) {
          scale = 1.4;
        } else {
          const animationDuration = getAnimationDuration(el, el.animation || '');
          const animationProgress = (elementElapsed / animationDuration) * Math.PI * 2;
          
          switch (el.animation) {
            case 'pulse':
              scale = 1 + 0.15 * Math.sin(animationProgress * 2);
              break;
            case 'bounce':
              scale = 1 + 0.2 * Math.abs(Math.sin(animationProgress * 4));
              break;
            case 'float':
              scale = 1 + 0.08 * Math.sin(animationProgress);
              break;
            case 'blink':
              scale = 0.8 + 0.4 * Math.sin(animationProgress * 8);
              break;
            case 'pop':
              scale = 0.9 + 0.3 * Math.abs(Math.sin(animationProgress * 6));
              break;
            default:
              scale = 1;
          }
        }
        newScales[el.id] = scale;
        newRotations[el.id] = rotation;
      });

      setElementPositions(newPositions);
      setElementScales(newScales);
      setElementRotations(newRotations);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [decorativeElements, borderSize, borderSettings.width, hoveredElement]);

  // Reset animation progress when elements change
  useEffect(() => {
    animationStartTimeRef.current = {};
  }, [decorativeElements]);

  const hasGradient = !!(
    borderSettings.secondaryColor && 
    borderSettings.primaryColor && 
    borderSettings.primaryColor !== borderSettings.secondaryColor
  );

  const borderWidth = borderSettings.enabled ? (borderSettings.width ?? 0) : 0;
  const borderRadius = borderSettings.radius || 0;
  const borderStyle = borderSettings.style || 'solid';

  // Enhanced decorative element renderer with proper animation speed
  const renderDecorative = (el: BorderElement) => {
    const position = elementPositions[el.id];
    const scale = elementScales[el.id] || 1;
    const rotation = elementRotations[el.id] || 0;
    
    if (!position) return null;

    const size = el.size || 24;
    const isInteractive = true;
    
    // Enhanced animation classes with dynamic duration
    const getAnimationStyle = () => {
      if (el.animation === 'travel') {
        return {}; // Handled by RAF
      }
      
      const duration = getAnimationDuration(el, el.animation || '');
      
      switch (el.animation) {
        case 'float': 
          return { animation: `floatY ${duration}s ease-in-out infinite` };
        case 'blink':
          return { animation: `blink ${Math.max(1, duration)}s ease-in-out infinite` };
        case 'pulse':
          return { animation: `pulse ${duration}s ease-in-out infinite` };
        case 'bounce':
          return { animation: `bounce ${duration}s ease-in-out infinite` };
        case 'shake':
          return { animation: `shake ${duration}s ease-in-out infinite` };
        case 'spin':
          return { animation: `spin ${duration}s linear infinite` };
        case 'spin-ccw':
          return { animation: `spinCCW ${duration}s linear infinite` };
        case 'rotate-cw':
          return { animation: `rotateCW ${duration}s linear infinite` };
        case 'rotate-ccw':
          return { animation: `rotateCCW ${duration}s linear infinite` };
        case 'pop':
          return { animation: `pop ${Math.max(0.8, duration)}s ease-in-out infinite` };
        default:
          return {};
      }
    };

    const style: React.CSSProperties = {
      position: 'absolute',
      left: position.left,
      top: position.top,
      width: size,
      height: size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: isInteractive ? 'auto' : 'none',
      fontSize: Math.max(10, size * 0.6),
      zIndex: 40,
      transform: `translateZ(0) scale(${scale}) rotate(${rotation}deg)`,
      willChange: 'transform',
      filter: hoveredElement === el.id ? 
        'brightness(1.4) drop-shadow(0 0 6px rgba(255,255,255,0.6))' : 
        'brightness(1)',
      transition: 'filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: isInteractive ? 'pointer' : 'default',
      ...getAnimationStyle()
    };

    return (
      <motion.div
        key={el.id}
        style={style}
        className="decorative-element"
        aria-hidden="true"
        onMouseEnter={() => isInteractive && setHoveredElement(el.id)}
        onMouseLeave={() => isInteractive && setHoveredElement(null)}
        whileHover={isInteractive ? { 
          scale: 1.5,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        } : {}}
        whileTap={isInteractive ? { 
          scale: 1.3,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        } : {}}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0, opacity: 0, rotate: 180 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.6
        }}
      >
        <div className={`
          w-full h-full flex items-center justify-center rounded-2xl
          ${hoveredElement === el.id ? 
            'bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border border-white/40' : 
            'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20'
          }
          transition-all duration-300 ease-out
        `}>
          {el.type === 'emoji' ? (
            <span className="select-none transition-transform duration-300 hover:scale-110">
              {el.content}
            </span>
          ) : (
            <img 
              src={el.content} 
              alt="decoration" 
              className="w-full h-full object-cover rounded-2xl transition-all duration-300 hover:scale-105"
              onError={(e) => { 
                e.currentTarget.style.display = 'none'; 
              }}
            />
          )}
        </div>
      </motion.div>
    );
  };

  // Enhanced border effects
  const borderEffectsStyle = borderSettings.enabled ? {
    boxShadow: `
      0 0 0 ${borderWidth}px ${hasGradient ? 'transparent' : borderSettings.primaryColor},
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
  } : {};

  // FIXED: SVG helpers for double border - EXACTLY like BorderPreview
  const svgWidth = Math.max(1, borderSize.width);
  const svgHeight = Math.max(1, borderSize.height);
  const rectX = borderWidth / 2;
  const rectY = borderWidth / 2;
  const rectW = Math.max(0, svgWidth - borderWidth);
  const rectH = Math.max(0, svgHeight - borderWidth);
  const rx = Math.max(0, borderRadius - borderWidth / 2); // adjust radius to stroke centerline

  return (
    <motion.div
      ref={borderRef}
      className="relative overflow-visible bg-white/80 backdrop-blur-sm"
      style={{
        border: 'none', // Using SVG for all borders now
        borderRadius: `${borderRadius}px`,
        overflow: 'visible',
        position: 'relative',
        boxSizing: 'border-box',
        ...borderEffectsStyle
      }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.005,
        transition: { duration: 0.3 }
      }}
    >
      {/* Enhanced Border SVG with double border support - EXACTLY like BorderPreview */}
      {borderSettings.enabled && borderSize.width > 0 && borderSize.height > 0 && (
        <motion.svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            pointerEvents: 'none', 
            zIndex: 5,
            overflow: 'visible'
          }}
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <defs>
            {hasGradient ? (
              <linearGradient id="border-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor={borderSettings.primaryColor} />
                <stop offset="100%" stopColor={borderSettings.secondaryColor} />
              </linearGradient>
            ) : null}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* FIXED: Double border support - EXACTLY like BorderPreview */}
          {borderStyle === 'double' ? (
            <>
              {/* outer stroke */}
              <rect
                x={rectX}
                y={rectY}
                width={rectW}
                height={rectH}
                rx={rx}
                ry={rx}
                fill="none"
                stroke={hasGradient ? `url(#border-gradient)` : borderSettings.primaryColor}
                strokeWidth={Math.max(1, borderWidth * 0.55)}
                strokeLinecap="butt"
                strokeDasharray={getStrokeDasharray('solid', borderWidth) || undefined}
                filter="url(#glow)"
              />
              {/* inner stroke (offset shrink) */}
              <rect
                x={rectX + borderWidth * 0.6}
                y={rectY + borderWidth * 0.6}
                width={Math.max(0, rectW - borderWidth * 1.2)}
                height={Math.max(0, rectH - borderWidth * 1.2)}
                rx={Math.max(0, rx - borderWidth * 0.6)}
                ry={Math.max(0, rx - borderWidth * 0.6)}
                fill="none"
                stroke={hasGradient ? `url(#border-gradient)` : borderSettings.primaryColor}
                strokeWidth={Math.max(1, borderWidth * 0.35)}
                strokeLinecap="butt"
                strokeDasharray={getStrokeDasharray('solid', borderWidth) || undefined}
                filter="url(#glow)"
              />
            </>
          ) : (
            <rect
              x={rectX}
              y={rectY}
              width={rectW}
              height={rectH}
              rx={rx}
              ry={rx}
              fill="none"
              stroke={hasGradient ? `url(#border-gradient)` : borderSettings.primaryColor}
              strokeWidth={borderWidth}
              strokeLinecap="butt"
              strokeDasharray={getStrokeDasharray(borderStyle, borderWidth) || undefined}
              filter="url(#glow)"
            />
          )}
        </motion.svg>
      )}

      {/* Content Area with enhanced padding */}
      <motion.div 
        className="relative z-10" 
        style={{ 
          padding: Math.max(16, borderWidth + 16),
          minHeight: '120px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Enhanced Decorative Elements */}
      <AnimatePresence mode="wait">
        {borderSettings.enabled && decorativeElements.map(renderDecorative)}
      </AnimatePresence>

      {/* Enhanced Animation Styles */}
      <style>
        {`
          .decorative-element {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          @keyframes floatY { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
          @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } }
          @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.5); } 100% { transform: scale(1); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
          @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } 100% { transform: translateX(0); } }
          @keyframes pop { 0% { transform: scale(0.6); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
          @keyframes spin {
            from { transform: translate(0,0) rotate(0deg); }
            to { transform: translate(0,0) rotate(360deg); }
          }
          @keyframes spinCCW {
            from { transform: translate(0,0) rotate(0deg); }
            to { transform: translate(0,0) rotate(-360deg); }
          }
          @keyframes rotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes rotateCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

          /* Smooth hover transitions */
          .decorative-element {
            transition: filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Performance optimizations */
          @media (prefers-reduced-motion: reduce) {
            .decorative-element {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default BorderContainer;