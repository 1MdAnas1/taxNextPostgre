'use client';

import Gallery from '@/components/sections/Gallery';
import { useContent } from '@/context/ContentContext';

export default function GalleryPage() {
  
  const {content} = useContent();

  return <Gallery content={content} />;
}