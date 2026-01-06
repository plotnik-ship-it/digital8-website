# Project Blueprint: Digital8 Technical Boutique Agency

## 1. Overview & Strategy

This document outlines the architecture and strategic direction for the Digital8 website. The project is positioned as a **technical boutique agency** that specializes in building high-performance, scalable web solutions using modern technologies like Astro, Firebase, and Tailwind CSS.

**Core Strategy:** Attract high-value clients who need premium corporate websites while simultaneously demonstrating the deep engineering capability to build complex web applications and custom business tools. The approach is to present a tiered service offering that guides clients from high-performance web design to full-fledged web applications.

## 2. Project Outline & Features (Current State)

### Design & Style
*   **Theme:** Dark mode, modern, premium, and minimalist.
*   **Primary Accent Color:** "Electric Yellow" (`#e1fe3f`).
*   **Typography:** "Clash Display" for headings, standard system fonts for body text.
*   **Layout:** Single-page feel with smooth scrolling, but with dedicated detail pages for projects and insights.
*   **Interactivity:** Uses GSAP for smooth scrolling, magnetic buttons, and subtle animations to enhance the user experience.

### Content & Sections
*   **Hero Section:** Features a bold, animated headline introducing the agency.
*   **Core Services Section:** Three distinct service offerings presented in clear, concise cards.
*   **Proof of Capability Section:** A grid showcasing three detailed project case studies. Each card links to a dedicated project page.
    *   Project 1: SaaS for Dental Clinics
    *   Project 2: Platform for Local Trades
    *   Project 3: Real Estate Search Engine
*   **Insights & Articles Section:** A space for sharing articles and blog posts.
*   **Contact Section:** A simple, elegant contact form.

### Technical Implementation
*   **Framework:** Astro.js for static site generation and island architecture.
*   **Styling:** Tailwind CSS for utility-first styling.
*   **Interactivity:** Client-side scripts managed via Astro's `is:inline` and external files in `src/scripts`.
*   **Content Management:** Project and insight data is centralized in `src/content.js`.
*   **Hosting:** Deployed on Firebase Hosting.

## 3. Current Task: Add Fourth Case Study

### Plan
1.  **Update Content File:** Add the "Smart Logistics Dashboard" project to the `caseStudies` array in `src/content.js`. Use a relevant vertical image from Unsplash for the project card.
2.  **Create Detail Page:** Create a new file: `src/pages/projects/smart-logistics-dashboard.astro`.
3.  **Populate Detail Page:**
    *   Use the existing project page layout (`BaseLayout`).
    *   Add the main title, subtitle, and a relevant horizontal image from Unsplash.
    *   Populate the "Problem" and "Solution" sections with the provided text.
    *   List the three key features provided.
    *   Ensure the design is consistent with the other project pages (dark theme, electric yellow accents, etc.).
4.  **Verify Layout:** Ensure the "Proof of Capability" section on the homepage now displays a 2x2 grid on desktop views as intended.
