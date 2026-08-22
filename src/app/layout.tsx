import type { Metadata, Viewport } from "next";
import { Inter, Aladin } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const aladin = Aladin({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-aladin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WordPop — Fast, Tactile Word Puzzle Game",
  description: "Challenge your vocabulary with WordPop. Guess the secret 5-letter word in 6 attempts with real-time feedback!",
  keywords: "wordpop, puzzle, word game, vocabulary, brain games, daily wordle",
  authors: [{ name: "WordPop Game" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0b0f19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${aladin.variable} h-full antialiased`}>
      <body className="h-full w-full bg-[#090d16] text-slate-100 font-sans select-none overflow-hidden touch-manipulation">
        {children}
      </body>
    </html>
  );
}

