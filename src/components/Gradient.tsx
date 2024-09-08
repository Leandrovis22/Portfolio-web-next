"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface GradientProps {
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

interface GradientCircle {
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Gradient({
  firstColor = "120, 7, 7",
  secondColor = "10, 56, 18",
  thirdColor = "28, 54, 167",
  fourthColor = "113, 16, 145",
  fifthColor = "113, 56, 14",
  pointerColor = "140, 100, 255",
  size = "20%",
  blendingValue = "hard-light",
  children,
  className,
  containerClassName,
}: GradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const colorStyles = useMemo(() => ({
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  }), [firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let gradientCircles: GradientCircle[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGradientCircles();
    };

    const initGradientCircles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      gradientCircles = [
        { color: colorStyles.firstColor, x: centerX, y: centerY, vx: 9, vy: 3 },
        { color: colorStyles.secondColor, x: centerX - 400, y: centerY, vx: -6, vy: 6 },
        { color: colorStyles.thirdColor, x: centerX + 400, y: centerY, vx: 3, vy: -9 },
        { color: colorStyles.fourthColor, x: centerX - 200, y: centerY, vx: -9, vy: -3 },
        { color: colorStyles.fifthColor, x: centerX - 800, y: centerY + 800, vx: 6, vy: 6 },
        
      ];
    };

    const drawGradients = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxRadius = Math.max(canvas.width, canvas.height) * parseFloat(size) / 100;

      gradientCircles.forEach((circle) => {
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, maxRadius);
        gradient.addColorStop(0, `rgba(${circle.color}, 0.8)`);
        gradient.addColorStop(1, `rgba(${circle.color}, 0)`);

        ctx.globalCompositeOperation = blendingValue as GlobalCompositeOperation;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update position
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Bounce off edges
        if (circle.x < 0 || circle.x > canvas.width) circle.vx *= -1;
        if (circle.y < 0 || circle.y > canvas.height) circle.vy *= -1;
      });

      animationRef.current = requestAnimationFrame(drawGradients);
    };

    setCanvasSize();
    drawGradients();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colorStyles]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pt-[4rem] -mt-[4rem] lg:h-screen w-auto relative overflow-hidden top-0 left-0 bg-transparent",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full blur-2xl"
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}