# Website Details & Content Documentation

This document provides a comprehensive overview of the website, its identity, functionalities, core purpose, and technical architecture.

---

## 1. 🌐 Website Identity
This is a **Premium, High-Contrast Developer Portfolio & Admin Dashboard Application** built specifically for **Ayush Ghosh**, a CTO & AI Architect based in West Bengal, India. 

*   **Owner:** Ayush Ghosh
*   **Role/Specialty:** CTO & AI Architect


---

## 2. 🎯 Core Purpose
The primary purposes of this website are:
1.  **Professional Branding & Storefront:** To serve as a high-performance personal brand and business storefront that showcases Ayush's professional expertise in Full Stack Engineering and Agentic AI workflow automation.
2.  **Portfolio Showcase:** To host a verified list of past projects and accomplishments (including source code and live links) for clients and employers.
3.  **Thought Leadership (Blog):** To share knowledge, tutorials, or updates through dynamic blog publications, establishing authority in AI engineering and system design.
4.  **Dynamic Content Management:** To enable the owner to add, modify, or delete projects and blog posts dynamically via a secure Admin Panel (`/admin`) without needing to rebuild or redeploy the frontend code.
5.  **Lead Generation & Contact:** To provide direct communication routes (Email, LinkedIn, GitHub, Twitter) for potential clients and collaborators.

---

## 3. ⚙️ What the Website Does (Main Features)

The application consists of a public-facing multi-section single page (with dedicated sub-routes) and an administrative control panel:

### A. Public Pages & Sections
*   **Hero Section (`/` - Home):** A bold, typography-centric landing section introducing Ayush's title and value proposition: *"Building resilient web ecosystems and autonomous Agentic workflows that scale."*
*   **About Section (`/about` / Home Component):** Includes Ayush's personal journey, location, and highlights core focus areas:
    *   *Agentic AI Engineering* (LangGraph, OpenAI, Vector DBs, ChromaDB, RAG)
    *   *Production Full Stack Development* (Next.js, NestJS, PostgreSQL, React, RabbitMQ, Redis, TS)
*   **Services Offered (`/services` / Home Component):** Outlines client-oriented packages:
    *   *Autonomous AI Agents*
    *   *Enterprise Full Stack Web Apps*
    *   *Automation Pipelines*
    *   *Intelligent Data RAG Systems*
*   **Experience & Skills (`/skills` / Home Component):** Highlights technical skills, timeline of roles, and showcases a GitHub-like contribution calendar.
*   **Projects Gallery (`/projects` / Home Component):** Displays database-driven portfolio items complete with tech tags, descriptions, GitHub repository links, and live URLs.
*   **Blog Publication (`/blog` / Home Component):** A rich article wall supporting category filters, text-based search, read times, and links to external reading platforms or video URLs.
*   **Contact Section (`/contact` / Home Component):** Facilitates direct contact via structured links.

### B. Administrative Capabilities
*   **Admin Dashboard (`/admin`):** A custom control center where the owner can manage database entries:
    *   Create, Read, Update, and Delete (CRUD) projects.
    *   Create, Read, Update, and Delete (CRUD) blog posts.
    *   Upload images directly to **Cloudinary** using an upload endpoint.
*   **Dynamic APIs:** Next.js Route Handlers (`/api/projects` and `/api/blogs`) handle connections to MongoDB and manage requests using standard REST methodologies, restricted using bearer token authorization headers for write operations.

---

## 4. 🛠️ Tech Stack & Architecture

The site uses a modern stack designed for speed, flexibility, and dynamic content delivery:

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Multi-page routing, server-side rendering, and API handler backend. |
| **Language** | TypeScript | Strong typing for clean, readable, and type-safe code. |
| **Database** | MongoDB & Mongoose | Document database to store projects, blogs, and administrative metadata. |
| **Hosting (Media)** | Cloudinary | API-driven hosting for dynamic project screenshots and blog header images. |
| **Styling** | Tailwind CSS v4 & custom variables | High-contrast theme styling, custom layout positioning, and custom fonts. |
| **Animations** | Framer Motion | Smooth, premium exit/entrance transitions, hover cards, and micro-interactions. |
| **Theme Management** | Next Themes | Seamless toggle/support for custom dark-themed elements. |

---

## 5. 📁 Directory Structure Overview

```text
src/
├── app/               # Next.js App Router (Pages & API endpoints)
│   ├── about/         # Dedicated About route
│   ├── admin/         # Control center page for managing content
│   ├── api/           # Backend API Handlers
│   │   ├── blogs/     # Blog CRUD routes
│   │   └── projects/  # Project CRUD and file upload routes
│   ├── blog/          # Dedicated Blog index/reading route
│   ├── contact/       # Contact details route
│   ├── projects/      # Standalone projects page
│   ├── skills/        # Dedicated skills route
│   ├── globals.css    # Tailwind CSS imports & custom variables
│   └── layout.tsx     # Site wrap-around layout (Navbar, Footer, Providers)
├── components/        # Reusable visual components (Hero, About, Contact, etc.)
├── lib/               # Utility configurations (Cloudinary, Mongoose DB connection)
└── models/            # Mongoose Schemas (Blog, Project documents)
```
