'use client';

import { createContext, useContext, useState } from 'react';
import { Content } from '@/types/content';

interface ContentContextType {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({
  children,
  content: initialContent,
}: {
  children: React.ReactNode;
  content: Content;
}) {
  const [content, setContent] = useState(initialContent);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContent must be used inside ContentProvider");
  }

  return context;
}