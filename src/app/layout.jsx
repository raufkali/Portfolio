import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Added for better font loading performance
});

export const metadata = {
  metadataBase: new URL("https://raufahmad.is-a.dev"),
  title: {
    default: "Rauf Ahmad - Full Stack MERN Developer | Portfolio",
    template: "%s | Rauf Ahmad",
  },
  description:
    "Rauf Ahmad is a Full Stack MERN Developer from Pakistan specializing in React, Next.js, Node.js, MongoDB and modern web applications. Visit Rauf Ahmad's portfolio...",

  keywords: [
    "Rauf Ahmad",
    "Rauf Ahmad Mern Stack",
    "Rauf Ahmad Badwan",
    "Rauf Ahmad Programmer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer Pakistan",
    "Software Engineer",
    "Desktop Application Developer",
    "Freelance Developer",
    "MongoDB Developer",
    "JavaScript Developer",
    "Rauf Badwan",
    "ahmad rauf",
    "mr rauf",
    "raufkali",
    "rufi boy",
    "Mr Rufi Boy",
    "rufi Boi",
    "its rufi boy",
    "rufiii",
    "rauf ahmad khan",
    "rauf khan",
    "rauf ahmad gulabad",
    "gulabad college",
    "gulabad college student",
    "gdc gulabad",
    "gdc gulabad student",
    "university of malakand",
    "uom student",
    "malakand university",
    "malakand university student",
    "badwan bala",
    "badwan bala dir lower",
    "dir lower",
    "khyber pakhtunkhwa",
    "pakistan",
  ],

  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23667eea' d='M256 0c-70.7 0-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128S326.7 0 256 0zm0 352c-69.4 0-208 34.8-208 104v40c0 17.7 14.3 32 32 32h352c17.7 0 32-14.3 32-32v-40c0-69.2-138.6-104-208-104z'/%3E%3C/svg%3E",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Rauf Ahmad - Full Stack MERN Developer",
    description:
      "Professional portfolio of Rauf Ahmad - Full Stack MERN Developer, Next.js Expert, and Desktop Application Developer.",
    url: "https://raufahmad.is-a.dev",
    siteName: "Rauf Ahmad Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rauf Ahmad - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://raufahmad.is-a.dev",
  },

  authors: [{ name: "Rauf Ahmad" }],
  creator: "Rauf Ahmad",
  publisher: "Rauf Ahmad",

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster Google Fonts loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome CDN (in case the npm package fails) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* Enhanced Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rauf Ahmad",
              url: "https://raufahmad.is-a.dev",
              jobTitle: "Full Stack MERN Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Badwan Bala, Dir Lower",
                addressRegion: "KPK",
                addressCountry: "Pakistan",
              },
              email: "ahmadraufbd@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/rufiii",
                "https://github.com/raufkali",
              ],
              knowsAbout: [
                "MERN Stack",
                "Next.js",
                "React.js",
                "Node.js",
                "MongoDB",
                "JavaScript",
                "Python",
                "Desktop Application Development",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "GDC Gulabad",
              },
              hasCredential: {
                "@type": "EducationalAudience",
                educationalRole: "BSCS Student",
              },
            }),
          }}
        />
      </head>
      <body className={poppins.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
