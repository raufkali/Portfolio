import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";
import { Poppins } from "next/font/google";

// fonts
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata = {
  title: "Rauf Ahmad Portfolio",
  description: "My personal portfolio made with Next.js + Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
        </style>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
