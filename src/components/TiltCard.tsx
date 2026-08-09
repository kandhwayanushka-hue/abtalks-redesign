"use client";

import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  intensity = 7,
  glare = true,
}: TiltCardProps) {
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = inner.current;
    if (!el) return;
    if (reduced.current === false) {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (reduced.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = inner.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="h-full [perspective:1000px]">
      <div
        ref={inner}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`tilt-card group h-full ${className}`}
        style={
          {
            "--rx": "0deg",
            "--ry": "0deg",
            "--mx": "50%",
            "--my": "50%",
          } as CSSProperties
        }
      >
        {glare && <span className="tilt-glare" aria-hidden />}
        {children}
      </div>
    </div>
  );
}
