import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Content } from "@/types/content";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "MyTaxSite - Accouning Solutions",
  // description: "Smart Tax. Simple Life.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content`,
    {
      cache: "no-store",
    }
  );
// 
  // const res = await fetch("http://localhost:5000/api/content", { cache: "no-store", });
  const items = await res.json();

  const content: Content = {};

  items.forEach((item: any) => {
    content[item.sectionKey as keyof Content] = item.value;
  });

  return (
    <html lang="en" className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body>
        <AuthProvider>
          <ContentProvider content={content}>
            {/* <div className="app">
              <TopBar content={content}  />
              <Navbar />
              <main>{children}</main>
              <Footer content={content} />
            </div> */}
            <LayoutWrapper>{children}</LayoutWrapper>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}