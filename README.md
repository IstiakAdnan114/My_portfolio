# Md. Istiak Adnan — Professional Portfolio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A professional, high-performance portfolio website for **Md. Istiak Adnan**, a final-year Industrial and Production Engineering student at BUET. This application showcases my professional journey, technical expertise in IPE, research publications, and various industrial projects.

---

## 🚀 Key Features

- **Categorized Experience**
- **Categorical Skills**
- **Industrial Journal (Blog)**
- **Research & Publications**
- **Dynamic Projects**
- **Responsive Design**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | [React 18+](https://reactjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Motion (Framer Motion)](https://motion.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |

---

## 📂 Project Structure

```text
├── public/                 # Static assets (images, CV)
├── src/
│   ├── components/         # Reusable UI components (Layout, Card, etc.)
│   ├── pages/              # Individual page layouts
│   ├── data.ts             # Central source of truth for all content
│   ├── App.tsx             # Main application & routing
│   └── main.tsx            # Entry point
├── tailwind.config.js      # Custom theme configurations
└── package.json            # Project dependencies and scripts
```

---

## ⚙️ How to Customize

All content is managed through a single file: `src/data.ts`.

1. **Update Profile** — Modify the `portfolioData` object to change your name, contact info, and About text.
2. **Add Experience** — Add objects to the `experience` array. The app automatically categorizes roles based on company name or role type.
3. **Manage Skills** — Follow the categorical structure in the `skills` object to update technical or language proficiency.
4. **Blog Posts** — Add Markdown-formatted content to the `blogPosts` array to create new industrial journey entries.

---

## 🏗️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0 or higher
- npm (installed automatically with Node)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IstiakAdnan114/mdistiak_adnan.git
```

2. Navigate to the project folder:
```bash
cd mdistiak_adnan
```

3. Install dependencies:
```bash
npm install
```

### Development

Start the local development server:
```bash
npm run dev
```

### Build

Generate a production-ready build in the `dist/` folder:
```bash
npm run build
```

---

## 🌐 Deployment

This portfolio is optimized for deployment on [Vercel](https://vercel.com).

> **Note:** Ensure all image paths in `src/data.ts` match the file names in your `/public/images` folder exactly, including case sensitivity.

---

## 📬 Contact

- **Email** — adnanistiak111@gmail.com
- **LinkedIn** — [linkedin.com/in/istiak-adnan](https://linkedin.com/in/istiak-adnan)

---

<p align="center">Designed & built by Md. Istiak Adnan © 2025</p>
