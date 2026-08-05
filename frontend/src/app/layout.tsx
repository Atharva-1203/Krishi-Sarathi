import type { Metadata } from "next";
import "./globals.css";
import ThemeInitializer from "@/components/ThemeInitializer";

export const metadata: Metadata = {
  title: "Krishi Sarathi - Sustainable Farming & Crop Analytics Engine",
  description: "AI-powered crop recommendation engine using tree-based classifiers and SHAP values.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen text-[var(--text-main)] bg-[var(--bg-app)]">
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
