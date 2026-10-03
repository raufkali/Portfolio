import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { Poppins } from "next/font/google";

const SITE_URL = "https://raufahmad.is-a.dev";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

/* ============================================================
   SITE IDENTITY & SEO CONSTANTS
   ============================================================ */

const SITE_NAME = "Rauf Ahmad | Software Engineer & Full-Stack Developer";
const AUTHOR_NAME = "Rauf Ahmad";

const SITE_DESCRIPTION =
  "Official portfolio of Rauf Ahmad, a Software Engineer and Full-Stack Developer specializing in React, Next.js, Node.js, MongoDB, Firebase, Electron, and AI automation. Discover high-performance web applications, desktop software, and scalable engineering projects.";

const PROFILE_IMAGE = `${SITE_URL}/images/profile.jpg`;

/* ============================================================
   ENHANCED METADATA
   ============================================================ */

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Rauf Ahmad | Software Engineer & Full-Stack Developer",
    template: "%s | Rauf Ahmad",
  },

  description: SITE_DESCRIPTION,

  applicationName: "Rauf Ahmad Portfolio",
  generator: "Next.js",
  category: "technology",
  referrer: "origin-when-cross-origin",

  authors: [
    {
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
  ],

  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,

  keywords: [
    "Rauf Ahmad",
    "Rauf Ahmad Software Engineer",
    "Rauf Ahmad Full Stack Developer",
    "Rauf Ahmad Web Developer",
    "Rauf Ahmad Portfolio",
    "Full Stack MERN Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Software Engineer Pakistan",
    "Full Stack Developer Pakistan",
    "Web Developer Pakistan",
    "MERN Stack Developer Pakistan",
    "Desktop Application Developer",
    "Electron.js Developer",
    "AI Automation Engineer",
    "Python Automation",
    "RESTful API Development",
    "MongoDB Database Architect",
    "Firebase Developer",
    "Modern Web Applications",
    "Rauf Ahmad KPK",
    "Rauf Ahmad Dir Lower",
    "raufkali",
    "Rufi Boy",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "profile",
    firstName: "Rauf",
    lastName: "Ahmad",
    username: "raufkali",
    gender: "male",
    title: "Rauf Ahmad | Software Engineer & Full-Stack Developer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Rauf Ahmad Portfolio",
    locale: "en_US",
    images: [
      {
        url: PROFILE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Rauf Ahmad - Software Engineer & Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rauf Ahmad | Software Engineer & Full-Stack Developer",
    description:
      "Software Engineer & Full-Stack Developer building scalable web and desktop applications with React, Next.js, Node.js, and MongoDB.",
    images: [PROFILE_IMAGE],
    creator: "@raufkali",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/profile.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/images/profile.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },

  themeColor: "#0A192F",

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="classic" className={poppins.variable}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Plus Jakarta Sans & Fira Code */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data: ProfilePage & Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "@id": `${SITE_URL}/#profile`,
              url: SITE_URL,
              name: "Rauf Ahmad - Software Engineer & Full-Stack Developer",
              description: SITE_DESCRIPTION,
              mainEntity: {
                "@type": "Person",
                "@id": `${SITE_URL}/#rauf-ahmad`,
                name: "Rauf Ahmad",
                alternateName: [
                  "Ahmad Rauf",
                  "Rauf Badwan",
                  "raufkali",
                  "Rufi Boy",
                  "Rufiii",
                ],
                url: SITE_URL,
                image: PROFILE_IMAGE,
                jobTitle: "Software Engineer & Full-Stack Developer",
                description:
                  "Software Engineer and Full-Stack Developer specializing in building modern web platforms, RESTful APIs, desktop software, and AI-driven automation using React, Next.js, Node.js, MongoDB, and Electron.",
                email: "ahmadraufbd@gmail.com",
                telephone: "+92 3469258704",
                nationality: {
                  "@type": "Country",
                  name: "Pakistan",
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Badwan Bala",
                  addressRegion: "Khyber Pakhtunkhwa",
                  addressCountry: "PK",
                },
                knowsAbout: [
                  "Software Engineering",
                  "Full Stack Web Development",
                  "MERN Stack Development",
                  "Next.js",
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Electron.js",
                  "Desktop Application Development",
                  "Python Automation",
                  "RESTful APIs",
                  "AI Integration & LLM APIs",
                  "Firebase",
                  "DevOps & GitHub Actions",
                  "Cybersecurity Fundamentals",
                ],
                alumniOf: {
                  "@type": "EducationalOrganization",
                  name: "Government Degree College Gulabad",
                },
                sameAs: [
                  "https://github.com/raufkali",
                  "https://www.linkedin.com/in/rufiii",
                ],
              },
            }),
          }}
        />

        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Rauf Ahmad Portfolio",
              description:
                "Official portfolio and professional software engineering showcase of Rauf Ahmad.",
              publisher: {
                "@type": "Person",
                "@id": `${SITE_URL}/#rauf-ahmad`,
              },
              inLanguage: "en-US",
            }),
          }}
        />

        {/* Structured Data: ItemList of Featured Projects */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Featured Software Projects by Rauf Ahmad",
              description:
                "A curated list of web applications, desktop software, and automation systems developed by Rauf Ahmad.",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Smart E-Commerce Marketplace",
                    description:
                      "Multi-vendor marketplace platform with real-time chat, payment gateway integration, and dispute management.",
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "GDC Gulabad Website Portal",
                    description:
                      "Fully dynamic educational institution portal with Firebase CMS and administrative management.",
                    applicationCategory: "EducationalApplication",
                    operatingSystem: "Web",
                    url: "https://gdc-portal.vercel.app/",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Reshine Cosmetics E-Commerce Store",
                    description:
                      "Cosmetics e-commerce platform with inventory management, shopping cart, and admin dashboard.",
                    applicationCategory: "ShoppingApplication",
                    operatingSystem: "Web",
                    url: "https://reshinecosmetics.top/",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Finance Management Desktop App",
                    description:
                      "Desktop financial tracking application built with Electron.js, Node.js, and React.",
                    applicationCategory: "FinanceApplication",
                    operatingSystem: "Windows, macOS, Linux",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "LinkedIn Auto Posting Bot",
                    description:
                      "Automated content generation and publishing bot using LinkedIn API, Groq AI, and GitHub Actions.",
                    applicationCategory: "DeveloperApplication",
                    operatingSystem: "Cloud / Node.js",
                  },
                },
              ],
            }),
          }}
        />

        {/* Single Classic Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.setAttribute('data-theme', 'classic');
                  localStorage.setItem('portfolio-theme', 'classic');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>

      <body className={poppins.className}>
        <ThemeProvider>
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
