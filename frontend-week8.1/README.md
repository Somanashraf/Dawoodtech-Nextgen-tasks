# 🚀 Productivity Hub

A modern, feature-rich task management and productivity application built with React, Vite, and Tailwind CSS. This application helps you manage tasks, take notes, and stay focused using the Pomodoro Technique.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📋 Task Management
- **Create, Edit, Delete Tasks** - Full CRUD operations for task management
- **Priority Levels** - Organize tasks by Low, Medium, or High priority
- **Task Completion** - Mark tasks as complete with visual feedback
- **Smart Filtering** - View All, Active, or Completed tasks
- **Task Statistics** - Real-time dashboard showing task metrics
- **Persistent Storage** - All tasks saved to browser's localStorage

### 📝 Notes
- **Rich Note Taking** - Create and organize notes with titles and content
- **Color Coding** - Choose from 5 color themes (Yellow, Blue, Green, Pink, Purple)
- **Search Functionality** - Quickly find notes by searching titles or content
- **Timestamps** - Automatic tracking of creation and update times
- **Grid Layout** - Responsive card-based layout for easy viewing

### ⏱️ Pomodoro Timer
- **25-Minute Focus Sessions** - Classic Pomodoro technique implementation
- **Visual Progress** - Circular progress indicator with smooth animations
- **Preset Times** - Quick access to 25min work, 5min short break, 15min long break
- **Controls** - Start, Pause, Resume, and Reset functionality
- **Browser Notifications** - Get notified when timer completes (with permission)

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Clean Interface** - Modern design with smooth animations and transitions
- **Intuitive Navigation** - Easy-to-use sidebar with active view indicators
- **Dark Mode Ready** - Infrastructure for theme switching (light/dark)
- **Accessibility** - Built with semantic HTML and ARIA attributes

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Styling:** Tailwind CSS 3.3.6
- **Icons:** Lucide React
- **State Management:** React Context API
- **Data Persistence:** Browser localStorage
- **Code Quality:** ESLint

## 📦 Project Structure

```
productivity-hub/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── AddTaskModal.jsx
│   │   │   └── EditTaskModal.jsx
│   │   ├── notes/
│   │   │   ├── NotesList.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── AddNoteModal.jsx
│   │   │   └── EditNoteModal.jsx
│   │   ├── timer/
│   │   │   └── PomodoroTimer.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       ├── TextArea.jsx
│   │       ├── Modal.jsx
│   │       ├── Badge.jsx
│   │       ├── Select.jsx
│   │       └── EmptyState.jsx
│   ├── contexts/
│   │   ├── AppContext.jsx
│   │   ├── TaskContext.jsx
│   │   └── NotesContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTimer.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd productivity-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the application running.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🌐 Deployment to Vercel

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI globally**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - What's your project's name? **productivity-hub** (or your choice)
   - In which directory is your code located? **./** (press Enter)
   - Want to override the settings? **No**

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 3: Deploy via Git Integration

1. **Connect GitHub repository**
   - Push your code to GitHub
   - Connect your Vercel account to GitHub
   - Import the repository

2. **Automatic Deployments**
   - Every push to `main` branch will trigger a new deployment
   - Pull requests will get preview deployments
   - No manual deployment needed!

## 🌐 Deployment to Netlify

### Method 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Method 2: Netlify Dashboard

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Your site will be live instantly!

### Method 3: Git-based Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Netlify**
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
VITE_APP_NAME=Productivity Hub
VITE_APP_VERSION=1.0.0
```

### Browser Notifications

To enable timer completion notifications:
1. Allow notifications when prompted by the browser
2. Or manually enable notifications in browser settings

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Usage Guide

### Managing Tasks

1. **Add a Task**
   - Click "Add Task" button
   - Enter task title (required)
   - Add description (optional)
   - Select priority level
   - Click "Add Task"

2. **Complete a Task**
   - Click the circle icon next to task
   - Task will be marked as complete

3. **Edit a Task**
   - Click the pencil icon
   - Update task details
   - Click "Save Changes"

4. **Filter Tasks**
   - Use "All", "Active", or "Completed" filters
   - Clear completed tasks with "Clear Completed"

### Creating Notes

1. **Create a Note**
   - Click "New Note" button
   - Enter title and content
   - Choose a color theme
   - Click "Create Note"

2. **Search Notes**
   - Use the search bar to filter notes
   - Search works on both title and content

3. **Edit Notes**
   - Click pencil icon on any note
   - Update content and color
   - Changes save automatically

### Using Pomodoro Timer

1. **Start a Session**
   - Click "Start" to begin 25-minute focus session
   - Use preset buttons for different durations

2. **Control Timer**
   - **Pause:** Stop timer temporarily
   - **Resume:** Continue from where you paused
   - **Reset:** Start over from beginning

3. **Follow the Technique**
   - Work for 25 minutes (1 Pomodoro)
   - Take 5-minute break
   - After 4 Pomodoros, take 15-minute break

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      }
    }
  }
}
```

### Adding Features

The app uses Context API for state management. To add new features:

1. Create a new context in `src/contexts/`
2. Create components in appropriate `src/components/` subdirectory
3. Add navigation item in `Sidebar.jsx`
4. Add route case in `App.jsx`

## 🐛 Troubleshooting

### Development Server Issues

**Problem:** Port 3000 is already in use

**Solution:** Kill the process or change port in `vite.config.js`

```javascript
server: {
  port: 3001, // Change to different port
}
```

### Build Errors

**Problem:** Build fails with dependency errors

**Solution:** Delete `node_modules` and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues

**Problem:** Blank page after deployment

**Solution:** Check that base path is correct in `vite.config.js`

```javascript
export default defineConfig({
  base: '/', // or '/your-repo-name/' for GitHub Pages
})
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Muhammad Soman Ashraf**

- Internship Project - Week 8.1
- Frontend Development Capstone

## 🙏 Acknowledgments

- Design inspiration from modern productivity apps
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

This is a capstone project, but suggestions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or feedback about this project, please open an issue in the repository.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
