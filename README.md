# Rauf Ahmad — Portfolio

A modern, responsive personal portfolio built with **Next.js** and **Bootstrap 5**. The portfolio is designed to be highly customizable, with all personal information, projects, skills, experience, education, and other content managed from a single data file.

> **Live Portfolio:** https://raufahmad.is-a.dev
> **GitHub:** https://github.com/raufkali

---

## ✨ Features

* 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
* 🗂️ **Single-Source Data** — Manage portfolio content from `lib/portfolioData.js`
* 🌙 **Dark / Light Theme** — Switch themes with one click
* ⚡ **Fast Performance** — Powered by Next.js App Router
* 🎨 **Cyberpunk-Inspired UI** — Modern, edgy, and professional design
* 🔍 **SEO Optimized** — Includes dynamic metadata, `robots.js`, and `sitemap.js`
* 🧩 **Reusable Components** — Modular React component architecture
* 🛠️ **Easy Customization** — Update content without modifying every component
* 📂 **No Database Required** — Static data-driven portfolio
* 🚀 **Deployment Ready** — Works with Vercel, Netlify, Render, and other Next.js hosting platforms

---

## 🛠️ Tech Stack

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| **Next.js 14**   | React framework with App Router     |
| **React.js**     | Component-based UI                  |
| **Bootstrap 5**  | Responsive layout and UI components |
| **CSS3**         | Custom styling and Cyberpunk theme  |
| **Font Awesome** | Icons                               |
| **Geist Font**   | Typography                          |
| **JavaScript**   | Application logic                   |

---

## 📁 Project Structure

```text
portfolio/
├── lib/
│   └── portfolioData.js       # All portfolio content
│
├── public/
│   ├── images/                # Portfolio images
│   ├── favicon.ico
│   └── ...                    # Other static assets
│
├── src/
│   └── app/
│       ├── components/        # Reusable components
│       ├── layout.jsx         # Root layout and SEO metadata
│       ├── page.jsx           # Homepage
│       ├── robots.js          # robots.txt configuration
│       └── sitemap.js         # Dynamic sitemap
│
├── next.config.js
├── package.json
├── README.md
└── LICENSE.txt
```

---

# 📦 Portfolio Data

The portfolio follows a **single-source data architecture**.

Almost all portfolio information is stored inside:

```text
lib/portfolioData.js
```

Instead of editing individual components, you can update this file and the changes will automatically appear throughout the portfolio.

The main data object contains the following sections:

---

## 1. Personal Information

```javascript
personal: {
  name: "Your Name",
  title: "Your Title | Skills",
  tagline: "Short catchy tagline",
  description: "About you – 2-3 sentences",
  location: "City, Country",
  email: "your@email.com",
  phone: "+1234567890",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  whatsapp: "+1234567890",
}
```

This section controls your main personal information, contact details, social profiles, hero section, and other personal references.

---

## 2. Statistics

```javascript
stats: [
  {
    number: "10+",
    label: "Projects Completed"
  },
  {
    number: "3+",
    label: "Years Experience"
  },
  {
    number: "15+",
    label: "Technologies"
  },
]
```

Use this section to display important career or portfolio statistics.

---

## 3. About Details

```javascript
aboutDetails: [
  {
    label: "Status",
    value: "Available"
  },
  {
    label: "Experience",
    value: "3+ Years"
  },
  {
    label: "Location",
    value: "Remote / Global"
  },
  {
    label: "Languages",
    value: "English, Urdu, German"
  },
]
```

These details are displayed in the About section.

---

## 4. Experience

```javascript
experience: [
  {
    id: 1,
    position: "Front-End Developer Intern",
    company: "Company Name",
    duration: "July 2025 - October 2025",
    type: "Internship",
    description: "Brief overview of your experience.",
    responsibilities: [
      "Responsibility 1",
      "Responsibility 2",
      "Responsibility 3",
    ],
  },
]
```

Add your internships, jobs, freelance work, or other professional experience here.

---

## 5. Projects

```javascript
projects: [
  {
    id: 1,
    title: "Project Name",
    description: "What does the project do?",
    technologies: [
      "Next.js",
      "React",
      "Node.js"
    ],
    startDate: "Nov 2025",
    endDate: "Aug 2026",
    status: "Completed",
    role: "Full Stack Developer",
    githubLink: "https://github.com/username/project",
    liveDemo: "https://project.com",
    highlights: [
      "Key feature 1",
      "Key feature 2",
      "Key feature 3",
    ],
  },
]
```

Each project can include:

* Project title
* Description
* Technologies
* Development dates
* Current status
* Your role
* GitHub repository
* Live demo
* Key project highlights

---

## 6. Education

```javascript
education: [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University Name",
    year: "In Progress - 8th Semester",
    cgpa: "3.87 / 4.00",
    status: "Currently Enrolled",
  },
]
```

Add your academic qualifications here.

---

## 7. Skills

```javascript
skills: [
  {
    category: "MERN Stack Development",
    icon: "fas fa-layer-group",
    items: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Next.js"
    ],
  },
]
```

Skills can be grouped into categories such as:

* Full Stack Development
* Frontend Development
* Backend Development
* Databases
* DevOps
* Programming Languages
* Tools & Technologies

---

## 8. Certifications

```javascript
certifications: [
  {
    id: 1,
    category: "Programming & Development",
    items: [
      "Certification 1",
      "Certification 2",
    ],
  },
]
```

Organize certifications into categories to keep the section clean and easy to maintain.

---

## 9. Hobbies

```javascript
hobbies: [
  {
    icon: "fas fa-chess",
    label: "Chess"
  },
  {
    icon: "fas fa-code",
    label: "Programming"
  },
]
```

Add your personal interests and hobbies here.

---

## 10. Languages

```javascript
languages: [
  {
    language: "English",
    level: "Professional Working Proficiency"
  },
  {
    language: "Urdu",
    level: "Native/Fluent"
  },
]
```

Add the languages you speak and your proficiency level.

---

# 🚀 Installation & Setup

## Prerequisites

Make sure you have the following installed:

* **Node.js 18 or higher**
* **npm**, **Yarn**, or **pnpm**
* **Git**

You can check your Node.js version with:

```bash
node --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/raufkali/portfolio.git
```

Navigate into the project:

```bash
cd portfolio
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Or Yarn:

```bash
yarn install
```

Or pnpm:

```bash
pnpm install
```

---

## 3. Start the Development Server

Using npm:

```bash
npm run dev
```

Or Yarn:

```bash
yarn dev
```

Or pnpm:

```bash
pnpm dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# ✏️ Customization

## Update Portfolio Content

The easiest way to customize the portfolio is to edit:

```text
lib/portfolioData.js
```

You can change:

* Name
* Job title
* Description
* Contact information
* Social links
* Statistics
* Experience
* Projects
* Education
* Skills
* Certifications
* Hobbies
* Languages

The components automatically consume the updated data.

---

## 🎨 Change Colors and Theme

The portfolio uses custom CSS variables and Bootstrap styling.

Depending on the implementation, theme-related styles can be found in:

```text
src/app/layout.jsx
```

and the relevant component styles.

Modify the CSS variables or Bootstrap overrides to create your own color scheme.

---

## ➕ Add a New Section

Portfolio sections are organized into reusable components:

```text
src/app/components/
```

To add a new section:

1. Create a new component.
2. Add the required data to `portfolioData.js`.
3. Import the component into `page.jsx`.
4. Add the component where you want it displayed.

For example:

```text
src/app/components/Blog.jsx
```

Then import it into:

```text
src/app/page.jsx
```

---

## ➖ Remove a Section

To remove an existing section, simply remove its component from:

```text
src/app/page.jsx
```

You can also remove its corresponding data from:

```text
lib/portfolioData.js
```

if it is no longer required.

---

# 🔎 SEO Configuration

SEO metadata is configured in:

```text
src/app/layout.jsx
```

Example:

```javascript
export const metadata = {
  title: "Your Name - Portfolio",
  description: "Your personal portfolio website.",
};
```

Update the title and description to match your personal brand.

---

## 🤖 Robots.txt

The robots configuration is located at:

```text
src/app/robots.js
```

This controls how search engine crawlers interact with your website.

---

## 🗺️ Sitemap

The sitemap configuration is located at:

```text
src/app/sitemap.js
```

The sitemap helps search engines discover your website pages.

---

# 🖼️ Adding Images

Place static images inside the:

```text
public/
```

directory.

For example:

```text
public/images/profile.png
```

You can reference the image from a component using:

```jsx
<img
  src="/images/profile.png"
  alt="Profile"
/>
```

For production applications, consider using Next.js's optimized `Image` component where appropriate.

---

# 🧪 Production Build

Before deploying, test the production build locally:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

---

# ☁️ Deployment

## Vercel — Recommended

The easiest deployment option for this Next.js portfolio is **Vercel**.

### Steps

1. Push the project to GitHub.
2. Open Vercel.
3. Import your GitHub repository.
4. Configure the project if necessary.
5. Click **Deploy**.

No database is required for the basic portfolio.

---

## Netlify

Build the project:

```bash
npm run build
```

For a standard Next.js application, use Netlify's Next.js deployment support rather than treating the project as a generic static `out` directory unless you have explicitly configured a static export.

---

## Render

You can also deploy the portfolio using Render.

Typical configuration:

**Build Command**

```bash
npm install && npm run build
```

**Start Command**

```bash
npm start
```

Connect your GitHub repository and deploy.

---

# 🔐 Environment Variables

The basic portfolio does not require a database or external backend.

If you later add APIs, analytics, contact forms, or other services, environment variables can be configured using:

```text
.env.local
```

Never commit private API keys or secrets to GitHub.

---

# 📌 Why This Architecture?

This portfolio intentionally avoids unnecessary complexity.

Instead of using:

```text
Frontend → API → Backend → Database → CMS
```

the portfolio uses:

```text
portfolioData.js
       ↓
React Components
       ↓
Next.js
       ↓
Website
```

This makes it:

* Easier to maintain
* Faster to update
* Easier to deploy
* Cheaper to host
* Suitable for a personal portfolio
* Simple for developers who want to customize it

---

# 📄 License

This project is licensed under the **MIT License**.

See [`LICENSE.txt`](LICENSE.txt) for more information.

---

# 👨‍💻 About

**Rauf Ahmad** is a Computer Science student and Full Stack Web Developer focused on building modern web applications and practical software solutions.

### Portfolio

https://raufahmad.is-a.dev

### GitHub

https://github.com/raufkali

### LinkedIn

https://linkedin.com/in/rufiii

### Email

[ahmadraufbd@gmail.com](mailto:ahmadraufbd@gmail.com)

### WhatsApp

+92 3469258704

---

# ⭐ Support

If you find this portfolio useful or use it as inspiration for your own website, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ using Next.js, React, Bootstrap, and JavaScript.**
