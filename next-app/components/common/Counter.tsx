'use client';

import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  label: string;
}

export default function Counter({ target, duration = 2000, label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = target;
    const stepTime = Math.max(10, Math.floor(duration / 60));
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <div ref={ref} className="counter-item glass rounded-2xl p-5 text-center shadow-card">
      <div className="text-gradient text-3xl font-bold">{count}+</div>
      <div className="mt-1 text-xs text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}