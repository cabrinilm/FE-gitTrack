# 🚀 GitTrack

**Build consistency. Visualize progress. Form lasting habits.**

GitTrack is a modern habit-tracking web application that helps you stay consistent through structured challenges and beautiful GitHub-style heatmaps.

Instead of simple todo lists, GitTrack turns your daily actions into visual streaks and long-term progress patterns.


## 🌐 Live Demo

**[Try GitTrack Now →](https://fe-git-track.vercel.app)**

## 🖼️ Preview

### 🌐 Landing Page
![Landing Page](src/screenshots/landingpage.png)

### 🏠 Dashboard
![Dashboard](src/screenshots/homepage.png)

### 🔥 Heatmap View
![Heatmap](src/screenshots/heatmap.png)

## Why GitTrack?

Most habit trackers focus on **task completion**.  
GitTrack focuses on **consistency over time**.

It turns daily actions into visual progress through structured challenges, activity tracking, and heatmap-based feedback.

## ✨ Key Features

- **Challenges System** — Create multiple challenges. Only one can be active at a time.
- **Activity Tracking** — Up to 4 daily activities per challenge.
- **GitHub-style Heatmaps** — Beautiful per-activity heatmaps showing long-term consistency.
- **Streak System** — Motivates daily engagement (resets only if you miss a full day).
- **Visual Progress** — Transform daily effort into satisfying visual patterns.
- **Secure & Private** — Full authentication and data isolation with Supabase.

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** + **Tailwind CSS 4**
- **shadcn/ui** + **Radix UI**
- **React Router DOM v7**

### Backend & Services
- **Supabase** (Auth + Database)
- **Axios** for API communication

### Others
- Custom Hooks architecture
- Lucide React + React Hot Toast
- Deployed on Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js (LTS version)
- npm or yarn

```bash
# Clone the repository
git clone https://github.com/cabrinilm/FE-gitTrack
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Then edit .env with your credentials:
# VITE_API_URL=your_backend_url
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run the development server
npm run dev
```
The app will be available at http://localhost:5173 


## 🧠 Architecture

GitTrack is built using a **scalable hooks-based architecture** with a strong separation between UI, logic, and data layers.

### ⚙️ Core Principles

- **Hooks-first logic** — All business logic is encapsulated in custom hooks
- **Feature-based structure** — Components are grouped by domain (auth, challenges, heatmap, etc.)
- **Reusable UI system** — Shared UI components ensure consistency across the app
- **Service abstraction** — API and external services are isolated in the `lib/` layer

### 🔄 Data Flow

UI → Custom Hooks → API Layer (Axios) → Backend/Supabase → UI Update

This ensures:
- predictable state flow
- clean separation of concerns
- easy scalability for new features

## 📁 Folder Structure

```bash
src/
├── components/     # Feature folders + ui/
├── hooks/          # Business logic
├── context/        # Global state
├── pages/          # Route pages
├── lib/            # API & Supabase
├── utils/          # Helpers
├── App.tsx
└── main.tsx

```

## 🚀 Deployment

- **Frontend**: Vercel
- **Backend**: Render
- **Auth & Database**: Supabase

## 🧠 Learnings & Final Thoughts

GitTrack was built as both a productivity tool and a deep dive into modern frontend architecture.

### What I Learned

- Designing and implementing a scalable hooks-based architecture
- Building clean separation between UI, business logic, and data layers
- Creating maintainable feature-based folder structures
- Integrating Supabase authentication effectively
- Translating product concepts (challenges, activities, streaks, heatmaps) into robust systems

### Final Thoughts

GitTrack is more than just another habit tracker — it's a system designed to make consistency visible and rewarding. Every feature was built with one core goal in mind:

> **Turn daily effort into long-term, visible progress.**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for those who want to build better habits. 