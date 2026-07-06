'use client';

import Services from '@/components/sections/Services';
import { useContent } from '@/context/ContentContext';


export default function ServicesPage() {
  const {content} = useContent();

  return <Services content={content} />;
}