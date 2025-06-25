"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        // shimmerOffset is no longer used
      }, 30);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  // Split text into lines
  const lines = text.split('\n');
  const lineHeight = 60; // More generous spacing for large text
  const svgWidth = 1000; // Wider SVG to prevent edge clipping
  const svgHeight = 100 + (lines.length - 1) * lineHeight;
  const startY = svgHeight / 2 - ((lines.length - 1) * lineHeight) / 2;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
      style={{ maxWidth: '100%' }}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0" y1="0" x2={svgWidth} y2="0"
        >
          <stop offset="0%" stopColor="#00F260" />
          <stop offset="25%" stopColor="#0575E6" />
          <stop offset="50%" stopColor="#FF6A00" />
          <stop offset="75%" stopColor="#FF0080" />
          <stop offset="100%" stopColor="#7928CA" />
        </linearGradient>
        <linearGradient id="shimmerGradient" x1="0" y1="0" x2={svgWidth} y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      {/* First text layer: neutral stroke when not hovered, animated gradient fill when hovered */}
      {lines.map((line, i) => (
        <text
          key={i + '-base'}
          x={svgWidth / 2}
          y={startY + i * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="font-[helvetica] text-7xl font-bold"
          style={{
            fill: hovered ? 'url(#textGradient)' : 'none',
            stroke: hovered ? 'url(#textGradient)' : '#e5e7eb', // Tailwind gray-200
            opacity: 1,
            transition: 'fill 1.2s cubic-bezier(0.4,0,0.2,1), stroke 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {line}
        </text>
      ))}
      {/* Animated stroke layer (for outline effect) */}
      {lines.map((line, i) => (
        <motion.text
          key={i + '-motion'}
          x={svgWidth / 2}
          y={startY + i * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          {line}
        </motion.text>
      ))}
      {/* Gradient stroke layer (for mask effect) */}
      {lines.map((line, i) => (
        <text
          key={i + '-gradient'}
          x={svgWidth / 2}
          y={startY + i * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="0.3"
          mask="url(#textMask)"
          className="fill-transparent font-[helvetica] text-7xl font-bold"
        >
          {line}
        </text>
      ))}
    </svg>
  );
};
