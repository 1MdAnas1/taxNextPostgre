'use client';

import Contact from '@/components/sections/Contact';
import { useContent } from '@/context/ContentContext';

export default function ContactPage() {
  
  const {content} = useContent();

  return <Contact content={content} />;
}