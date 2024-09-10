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

const hexToRgb = (hex: string) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `${r}, ${g}, ${b}`;
};

export default function Gradient({
  firstColor = "#470404",
  secondColor = "#0a3812",
  thirdColor = "#142677",
  fourthColor = "#340a43",
  fifthColor = "#43220a",
  pointerColor = "#ffffff",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  containerClassName,
}: GradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const colorStyles = useMemo(() => ({
    firstColor: firstColor.startsWith("#") ? hexToRgb(firstColor) : firstColor,
    secondColor: secondColor.startsWith("#") ? hexToRgb(secondColor) : secondColor,
    thirdColor: thirdColor.startsWith("#") ? hexToRgb(thirdColor) : thirdColor,
    fourthColor: fourthColor.startsWith("#") ? hexToRgb(fourthColor) : fourthColor,
    fifthColor: fifthColor.startsWith("#") ? hexToRgb(fifthColor) : fifthColor,
    pointerColor: pointerColor.startsWith("#") ? hexToRgb(pointerColor) : pointerColor,
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
        { color: colorStyles.firstColor, x: centerX, y: centerY, vx: 1.5, vy: 0.5 },
        { color: colorStyles.secondColor, x: centerX - 400, y: centerY, vx: -1.0, vy: 1.0 },
        { color: colorStyles.thirdColor, x: centerX + 400, y: centerY, vx: 0.5, vy: -1.5 },
        { color: colorStyles.fourthColor, x: centerX - 200, y: centerY, vx: -1.5, vy: -0.5 },
        { color: colorStyles.fifthColor, x: centerX - 800, y: centerY + 800, vx: 1.0, vy: 1.0 },        
      ];
    };

    const drawGradients = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Usar promedio del ancho y alto para un tamaño más equilibrado
      const avgRadius = (canvas.width + canvas.height) / 4 * parseFloat(size) / 100;

      gradientCircles.forEach((circle) => {
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, avgRadius);
        gradient.addColorStop(0, `rgba(${circle.color}, 0.8)`);
        gradient.addColorStop(1, `rgba(${circle.color}, 0)`);

        ctx.globalCompositeOperation = blendingValue as GlobalCompositeOperation;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Actualizar posición
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Rebote en los bordes
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
        className="hidden dark:block absolute top-0 left-0 w-full h-full blur-2xl"
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
