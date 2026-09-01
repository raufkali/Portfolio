import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";
import { ThemeProvider } from "../context/ThemeContext";

import { Poppins } from "next/font/google";

const SITE_URL = "https://raufahmad.is-a.dev";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ============================================================
   SITE IDENTITY
   ============================================================ */

const SITE_NAME = "Rauf Ahmad";

const SITE_DESCRIPTION =
  "Rauf Ahmad is a Full Stack MERN Developer and Computer Science student from Badwan Bala, Dir Lower, Khyber Pakhtunkhwa, Pakistan. He builds modern web applications, software projects and desktop applications using React, Next.js, Node.js, MongoDB and JavaScript.";

const PROFILE_IMAGE = `${SITE_URL}/images/profile.jpg`;

/* ============================================================
   METADATA
   ============================================================ */

export const metadata = {
  metadataBase: new URL(SITE_URL),

  /* ------------------------------------------------------------
     TITLE
     ------------------------------------------------------------ */

  title: {
    default:
      "Rauf Ahmad | Full Stack MERN Developer & Computer Science Student",

    template: "%s | Rauf Ahmad",
  },

  /* ------------------------------------------------------------
     DESCRIPTION
     ------------------------------------------------------------ */

  description: SITE_DESCRIPTION,

  /* ------------------------------------------------------------
     APPLICATION
     ------------------------------------------------------------ */

  applicationName: "Rauf Ahmad Portfolio",

  generator: "Next.js",

  category: "technology",

  referrer: "origin-when-cross-origin",

  /* ------------------------------------------------------------
     AUTHORS
     ------------------------------------------------------------ */

  authors: [
    {
      name: "Rauf Ahmad",
      url: SITE_URL,
    },
  ],

  creator: "Rauf Ahmad",

  publisher: "Rauf Ahmad",

  /* ------------------------------------------------------------
     KEYWORDS
     ------------------------------------------------------------ */

  keywords: [
    /* ========================
       PRIMARY IDENTITY
       ======================== */

    "Rauf Ahmad",
    "Ahmad Rauf",
    "Rauf Ahmad Pakistan",
    "Rauf Ahmad KPK",
    "Rauf Ahmad Khyber Pakhtunkhwa",

    /* ========================
       NAME VARIATIONS
       ======================== */

    "Rauf Badwan",
    "Badwan Rauf",
    "Badwan Rauf Ahmad",
    "Rauf Ahmad Badwan",
    "Rauf Ahmad Badwan Bala",
    "Rauf Badwan Bala",
    "Rauf Ahmad Gulabad",
    "Rauf Ahmad Dir Lower",
    "Rauf Ahmad Dir",

    /* ========================
       PUBLIC HANDLES
       ======================== */

    "raufkali",
    "Rufi Boy",
    "Rufi Boi",
    "Rufiii",

    /* ========================
       PROFESSIONAL
       ======================== */

    "Rauf Ahmad Developer",
    "Rauf Ahmad Programmer",
    "Rauf Ahmad Software Engineer",
    "Rauf Ahmad Web Developer",
    "Rauf Ahmad Full Stack Developer",
    "Rauf Ahmad MERN Developer",
    "Rauf Ahmad MERN Stack Developer",

    /* ========================
       MERN / WEB DEVELOPMENT
       ======================== */

    "Full Stack MERN Developer",
    "MERN Stack Developer",
    "MERN Stack Developer Pakistan",
    "Full Stack Developer Pakistan",
    "Web Developer Pakistan",
    "Software Engineer Pakistan",
    "Software Developer Pakistan",
    "JavaScript Developer Pakistan",
    "React Developer Pakistan",
    "Next.js Developer Pakistan",
    "Node.js Developer Pakistan",
    "MongoDB Developer Pakistan",

    /* ========================
       KPK
       ======================== */

    "Software Engineer KPK",
    "Software Developer KPK",
    "Web Developer KPK",
    "MERN Developer KPK",
    "Full Stack Developer KPK",
    "Software Engineer Khyber Pakhtunkhwa",
    "Software Developer Khyber Pakhtunkhwa",
    "Web Developer Khyber Pakhtunkhwa",

    /* ========================
       DIR LOWER
       ======================== */

    "Rauf Ahmad Dir Lower",
    "Rauf Badwan Dir Lower",
    "Rauf Ahmad Lower Dir",
    "Software Developer Dir Lower",
    "Software Engineer Dir Lower",
    "Web Developer Dir Lower",
    "MERN Developer Dir Lower",
    "Programmer Dir Lower",

    /* ========================
       BADWAN
       ======================== */

    "Rauf Ahmad Badwan",
    "Rauf Badwan",
    "Rauf Ahmad Badwan Bala",
    "Developer Badwan Bala",
    "Programmer Badwan Bala",
    "Software Developer Badwan",
    "Software Engineer Badwan",
    "Web Developer Badwan",
    "Computer Science student Badwan",

    /* ========================
       GULABAD
       ======================== */

    "Rauf Ahmad GDC Gulabad",
    "Rauf Ahmad Gulabad",
    "GDC Gulabad student",
    "GDC Gulabad Computer Science",
    "GDC Gulabad developer",
    "GDC Gulabad programmer",
    "Gulabad Computer Science student",

    /* ========================
       UNIVERSITY OF MALAKAND
       ======================== */

    "Rauf Ahmad University of Malakand",
    "Rauf Ahmad Malakand",
    "University of Malakand student",
    "University of Malakand Computer Science",
    "Malakand University student",
    "Malakand University Computer Science",
    "University of Malakand developer",

    /* ========================
       GENERAL TECHNOLOGY
       ======================== */

    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JavaScript",
    "REST API",
    "JWT Authentication",
    "Tailwind CSS",
    "Bootstrap",
    "Firebase",
    "Cloudinary",
    "Electron",
    "Desktop Application Development",
    "Web Application Development",
    "Software Engineering",
    "Computer Science",
  ],

  /* ------------------------------------------------------------
     CANONICAL
     ------------------------------------------------------------ */

  alternates: {
    canonical: SITE_URL,
  },

  /* ------------------------------------------------------------
     ROBOTS
     ------------------------------------------------------------ */

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

  /* ------------------------------------------------------------
     OPEN GRAPH
     ------------------------------------------------------------ */

  openGraph: {
    type: "website",

    title: "Rauf Ahmad | Full Stack MERN Developer & Computer Science Student",

    description:
      "Official portfolio of Rauf Ahmad — Full Stack MERN Developer and Computer Science student from Badwan Bala, Dir Lower, Khyber Pakhtunkhwa, Pakistan.",

    url: SITE_URL,

    siteName: SITE_NAME,

    locale: "en_US",

    images: [
      {
        url: "/images/profile.jpg",

        width: 1200,

        height: 630,

        alt: "Rauf Ahmad - Full Stack MERN Developer and Computer Science Student",
      },
    ],
  },

  /* ------------------------------------------------------------
     TWITTER / X
     ------------------------------------------------------------ */

  twitter: {
    card: "summary_large_image",

    title: "Rauf Ahmad | Full Stack MERN Developer",

    description:
      "Rauf Ahmad — Full Stack MERN Developer and Computer Science student from Pakistan.",

    images: ["/images/profile.jpg"],
  },

  /* ------------------------------------------------------------
     ICONS
     ------------------------------------------------------------ */

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

  /* ------------------------------------------------------------
     FORMAT DETECTION
     ------------------------------------------------------------ */

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
    <html lang="en">
      <head>
        {/* ======================================================
            FONT PRECONNECT
            ====================================================== */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ======================================================
            OSWALD
            ====================================================== */}

        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />

        {/* ======================================================
            FONT AWESOME
            ====================================================== */}

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* ======================================================
            PERSON / PROFILE STRUCTURED DATA

            This tells search engines what the site is about:
            one identifiable person.

            IMPORTANT:
            Every property here should correspond to truthful
            information represented on the actual website.
            ====================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "ProfilePage",

              "@id": `${SITE_URL}/#profile`,

              url: SITE_URL,

              name: "Rauf Ahmad - Full Stack MERN Developer",

              description: SITE_DESCRIPTION,

              mainEntity: {
                "@type": "Person",

                "@id": `${SITE_URL}/#rauf-ahmad`,

                name: "Rauf Ahmad",

                alternateName: [
                  "Ahmad Rauf",
                  "Rauf Badwan",
                  "Badwan Rauf",
                  "Rauf Ahmad Badwan",
                  "Rauf Ahmad Badwan Bala",
                  "Rauf Ahmad Gulabad",
                  "Rauf Ahmad Dir Lower",
                  "Rauf Ahmad KPK",
                  "Rauf Ahmad Pakistan",
                  "raufkali",
                  "Rufi Boy",
                  "Rufi Boi",
                  "Rufiii",
                ],

                url: SITE_URL,

                image: PROFILE_IMAGE,

                jobTitle: "Full Stack MERN Developer",

                description:
                  "Rauf Ahmad is a Full Stack MERN Developer and Computer Science student from Badwan Bala, Dir Lower, Khyber Pakhtunkhwa, Pakistan. He develops modern web applications using React, Next.js, Node.js, Express.js, MongoDB and JavaScript, as well as desktop applications.",

                email: "ahmadraufbd@gmail.com",

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
                  "Computer Science",
                  "Software Engineering",
                  "Full Stack Development",
                  "MERN Stack",
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Mongoose",
                  "JavaScript",
                  "REST APIs",
                  "JWT Authentication",
                  "Firebase",
                  "Cloudinary",
                  "Tailwind CSS",
                  "Bootstrap",
                  "Electron",
                  "Desktop Application Development",
                  "Web Application Development",
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

        {/* ======================================================
            WEBSITE STRUCTURED DATA
            ====================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "WebSite",

              "@id": `${SITE_URL}/#website`,

              url: SITE_URL,

              name: SITE_NAME,

              description:
                "Official portfolio and professional website of Rauf Ahmad.",

              publisher: {
                "@type": "Person",

                "@id": `${SITE_URL}/#rauf-ahmad`,
              },

              inLanguage: "en-US",
            }),
          }}
        />

        {/* ======================================================
            BREADCRUMB-LIKE WEBSITE RELATIONSHIP

            Helps establish the relationship between the site
            and the person it represents.
            ====================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "WebPage",

              "@id": `${SITE_URL}/#webpage`,

              url: SITE_URL,

              name: "Rauf Ahmad | Full Stack MERN Developer",

              description: SITE_DESCRIPTION,

              isPartOf: {
                "@id": `${SITE_URL}/#website`,
              },

              about: {
                "@id": `${SITE_URL}/#rauf-ahmad`,
              },

              primaryImageOfPage: {
                "@type": "ImageObject",

                url: PROFILE_IMAGE,

                width: 1200,

                height: 630,
              },

              inLanguage: "en-US",
            }),
          }}
        />
        {/* Anti-FOUC script for Theme initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('portfolio-theme');
                  var theme = (savedTheme === 'minimalism' || savedTheme === 'cyberpunk' || savedTheme === 'neoextremism') ? savedTheme : 'neoextremism';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>

      {/* ========================================================
          BODY
          ======================================================== */}

      <body className={poppins.className}>
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
