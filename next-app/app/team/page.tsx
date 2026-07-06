'use client';

import Team from '@/components/sections/Team';
import { useContent } from '@/context/ContentContext';

export default function TeamPage() {
  
const {content} = useContent();
  return <Team content={content} />;
}