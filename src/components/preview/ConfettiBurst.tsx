import React, { useEffect, useRef } from 'react';

interface ConfettiBurstProps {
  colors?: string[];
  density?: number;
  duration?: number;
  mode?: 'once' | 'continuous';
  enabled?: boolean;
}

const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
  density = 150,
  duration = 3,
  mode = 'once',
  enabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const confettiPiecesRef = useRef<any[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Set canvas size
    const updateCanvasSize = () => {
      const width = Math.min(window.innerWidth, document.documentElement.clientWidth);
      const height = Math.min(window.innerHeight, document.documentElement.clientHeight);
      canvas.width = width;
      canvas.height = height;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create confetti pieces
    const createConfetti = () => {
      confettiPiecesRef.current = [];
      for (let i = 0; i < density; i++) {
        confettiPiecesRef.current.push({
          x: Math.random() * canvas.width,
          y: mode === 'continuous' ? Math.random() * canvas.height : -10 - Math.random() * 50,
          w: Math.random() * 10 + 5,
          h: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 3 + 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    createConfetti();
    startTimeRef.current = Date.now();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      // Stop animation after duration (only for 'once' mode)
      if (mode === 'once' && elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.removeEventListener('resize', updateCanvasSize);
        return;
      }

      confettiPiecesRef.current.forEach((piece, index) => {
        // Update position
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotationSpeed;
        piece.vy += 0.1; // Gravity

        // Reset piece if it goes off screen (for continuous mode)
        if (mode === 'continuous') {
          if (piece.y > canvas.height) {
            piece.y = -10;
            piece.x = Math.random() * canvas.width;
            piece.vy = Math.random() * 3 + 2;
          }
          if (piece.x < -10 || piece.x > canvas.width + 10) {
            piece.x = Math.random() * canvas.width;
          }
        }

        // Draw confetti
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [enabled, colors, density, duration, mode]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default ConfettiBurst;
