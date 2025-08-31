import type { Metadata } from "next";
import { Inter, Aladin } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const aladin = Aladin({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WordPop Puzzle Game",
  description: "Challenge your vocabulary with our engaging WordPop puzzle game. Guess the 5-letter word in 6 attempts!",
  keywords: "wordpop, puzzle, word game, vocabulary, brain games",
  authors: [{ name: "WordPop Game" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${aladin.className} font-sans`}>
        {children}
      </body>
    </html>
  );
}
