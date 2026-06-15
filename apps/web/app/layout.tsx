import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "zenith-ui-kit/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenith UI — a React component library",
  description:
    "12 accessible, themeable React components. Browse them, copy the code, install the package. Built from the Zenith UI Figma kit.",
  openGraph: {
    title: "Zenith UI",
    description: "A themeable, accessible React component library.",
    type: "website",
  },
};

// Set the theme before paint to avoid a flash of the wrong theme. Defaults to light.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('zenith-theme');
    document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
