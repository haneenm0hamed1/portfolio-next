import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haneen Mohamed — Frontend Developer",
  description:
    "Frontend developer with four+ years building with React, Next.js and purposeful animation. Specialising in Salla & Zid theme development, full product builds, and interaction design.",
  openGraph: {
    title: "Haneen Mohamed — Frontend Developer",
    description:
      "Frontend developer with four+ years building with React, Next.js and purposeful animation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* Suppress THREE.Clock deprecation warning from R3F/drei internals.
            This is a library-level issue (three.js r169 deprecated THREE.Clock
            in favour of THREE.Timer) — not an app bug.
            Remove once @react-three/fiber updates its renderer loop. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var _warn = console.warn.bind(console);
  console.warn = function() {
    var msg = arguments[0];
    if (typeof msg === 'string' && msg.indexOf('THREE.Clock') !== -1) return;
    _warn.apply(console, arguments);
  };
})();`,
          }}
        />
      </head>
      <body
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        className="bg-[#0a0a0c] text-[#f2f1ee] overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
