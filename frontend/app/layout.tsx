import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalaryLens | Context over comparison",
  description: "An anonymous salary and career-context platform that helps you understand your true market value.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
