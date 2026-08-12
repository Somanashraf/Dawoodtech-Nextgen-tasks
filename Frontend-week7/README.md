# Tailwind UI Dashboard Redesign

A modern, highly responsive, and accessible React application styled using **Tailwind CSS**. Built for **Week 7: Tailwind CSS & Modern UI/UX Design Systems**.

![Dashboard Preview](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![React](https://img.shields.io/badge/React-v19-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-v8-646cff?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Completed-emerald?style=for-the-badge)

---

## 🚀 Overview & Key Features

This project is a complete refactor and redesign of a modern React dashboard using Tailwind CSS utility classes and design system principles.

### Key Highlights
- 🌓 **Interactive Dark Mode**: Full light/dark mode theme switcher with system preference detection and `localStorage` state persistence.
- 📱 **Responsive Grid Layouts**: Adaptive 1-column, 2-column, and 4-column responsive grid structures (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- ♿ **Accessible UI Components**:
  - **Accessible Modal (`CreateProjectModal`)**: Includes WAI-ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), focus management, backdrop overlay blur, and `Escape` key trigger to close.
  - **Accessible Dropdowns (`Navbar`, `UserDropdown`)**: Feature keyboard navigation, `aria-expanded`, and click-outside dismissal handlers.
- 📊 **Metric Cards & Sparklines**: Reusable KPI stat cards featuring custom gradient backgrounds, percentage trend badges (+/- indicators), and SVG sparklines.
- 📈 **Interactive Analytics & Activity Widgets**: Real-time traffic breakdown charts, timeframe selector pills (7D, 30D, 1Y), and team activity feeds.
- 🔍 **Dynamic Search & Filtering**: Real-time search filter across project cards and status pills (All, In Progress, Completed, On Hold).
- ✨ **Micro-interactions & Glassmorphism**: Glass-panel backdrop blurs, smooth hover transformations, glowing active indicators, and toast notifications.

---

## 🛠️ Setup & Installation Commands

Follow these steps to run the application locally on your machine:

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Install Dependencies
Run the following command in the project root directory to install all required dependencies:

```bash
npm install
```

### 2. Start Development Server
To launch the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

After running the command, open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
To generate an optimized production bundle:

```bash
npm run build
```

The output will be placed inside the `dist/` directory.

### 4. Preview Production Build
To preview the production build locally before deployment:

```bash
npm run preview
```

---

## 📁 Directory & Codebase Structure

```
Frontend-week7/
├── index.html                  # HTML template with Google Fonts (Inter & Outfit)
├── vite.config.js              # Vite configuration with @tailwindcss/vite plugin
├── package.json                # Project dependencies and build scripts
├── README.md                   # Detailed setup and project documentation
└── src/
    ├── main.jsx                # Application root entry point
    ├── index.css               # Tailwind CSS v4 directives, glassmorphism & keyframe animations
    ├── App.jsx                 # Main layout orchestrator & state manager
    ├── context/
    │   └── ThemeContext.jsx    # Dark mode theme state provider & localStorage handler
    └── components/
        ├── Navbar.jsx          # Top header with search, dark mode toggle & profile dropdown
        ├── Sidebar.jsx         # Responsive collapsible drawer navigation
        ├── StatCard.jsx        # Reusable metric card with sparklines & color themes
        ├── AnalyticsChartCard.jsx # Revenue overview graph & device breakdown widget
        ├── RecentActivityCard.jsx   # Team activity timeline feed
        ├── ProjectTable.jsx    # Responsive project grid/table with filter pills
        ├── Modal.jsx           # Generic accessible modal wrapper
        └── CreateProjectModal.jsx # Interactive project creation form dialog
```

---

## 🎨 Design System & Accessibility Implementation

- **Typography**: Uses `Inter` for crisp body copy and `Outfit` for display headings.
- **Color Palette**: High-contrast, harmonious slate background (`slate-50` / `slate-950`), indigo/violet primary accents (`indigo-600`), emerald success indicators, and amber alert badges.
- **Accessibility (a11y)**:
  - Accessible keyboard shortcuts (`Esc` key closes modals & dropdowns).
  - Explicit `aria-label`, `aria-expanded`, and `aria-haspopup` attributes on interactive triggers.
  - High color contrast compliant in both light and dark themes.

---

## 🎯 Learning Outcomes Achieved
- Mastered Tailwind CSS utility-first framework workflows for rapid styling.
- Implemented robust responsive grids across mobile, tablet, and desktop viewports.
- Built accessible UI components following WAI-ARIA standard guidelines.
- Integrated seamless dark mode toggling into React state context.
