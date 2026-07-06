'use client'
import About from "@/components/sections/About";
import { useContent } from "@/context/ContentContext";

export default function AboutPage() {
  
  const {content} = useContent();

  return <About content={content} />;
}