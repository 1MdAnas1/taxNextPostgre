'use client';
import Counter from '../common/Counter';
import { Content } from '@/types/content';

import { useEffect, useRef } from 'react';

interface AboutProps {
  content: Content;
}

export default function About({ content }: AboutProps) {
  const title = content?.aboutTitle;
  const description = content?.aboutDescription;
  const bullets = Array.isArray(content?.aboutBullets) ? content.aboutBullets : [];
  const image = content?.aboutImage  ;
  const years = parseInt(String(content?.yearsOfExperience)) || 11;
  const clients = parseInt(String(content?.clientsServed)) || 1500;
  const projects = parseInt(String(content?.projectsCompleted)) || 700;

  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        imageRef.current?.classList.add('visible');
      }
    },
    { threshold: 0.2 }
  );

  if (imageRef.current) observer.observe(imageRef.current);
  return () => observer.disconnect();
}, []);

  return (
    <section id="about" className="section section-white">
      <div className="container">
        <div className="about-grid">
          <div className="content">
            <span className="badge">About Us</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <ul>
              {bullets.map((bullet, idx) => <li key={idx}>{bullet}</li>)}
            </ul>
            <div className="stats-grid">
              <Counter target={years} label="Years of Experience" />
              <Counter target={clients} label="Clients Served" />
              <Counter target={projects} label="Projects Completed" />
            </div>
          </div>
          <div className="image" ref={imageRef}>
            <img src={image} alt="About us" />
          </div>
        </div>
      </div>
    </section>
  );
}