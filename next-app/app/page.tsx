'use client';

import { useEffect, useState } from 'react';
import api from '@/utils/api';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Team from '@/components/sections/Team';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';
import { Content } from '@/types/content';

export default function HomePage() {
  const [content, setContent] = useState<Content>({});

  useEffect(() => {
    api.get('/content')
      .then(res => {
        const data: Content = {};
        res.data.forEach((item: { sectionKey: string; value: any }) => {
          data[item.sectionKey as keyof Content] = item.value;
        });
        setContent(data);
      })
      .catch(err => console.error('Error fetching content:', err));
  }, []);

  return (
    <>
      <Hero content={content} />
      <About content={content} />
      <Services content={content} />
      <Team content={content} />
      <Gallery content={content} />
      <Contact content={content} />
    </>
  );
}