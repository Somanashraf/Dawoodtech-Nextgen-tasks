# ⚡ Quick Start Guide

Get your Productivity Hub up and running in 5 minutes!

## 🚀 Installation (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open browser at `http://localhost:3000` ✅

## 📦 What You Get

### Three Main Features:

1. **📋 Tasks** - Manage your to-do list
   - Create tasks with priorities
   - Mark complete/incomplete
   - Filter by status
   
2. **📝 Notes** - Capture your ideas
   - Colorful sticky notes
   - Search functionality
   - Quick edit/delete
   
3. **⏱️ Timer** - Stay focused
   - 25-minute Pomodoro sessions
   - Built-in breaks
   - Visual progress

## 🎯 First Steps

1. **Add Your First Task**
   - Click "Add Task" button
   - Enter "Learn React Contexts"
   - Set priority to "High"
   - Click "Add Task"

2. **Create a Note**
   - Click "Notes" in sidebar
   - Click "New Note"
   - Write "Project ideas for next week"
   - Choose a color
   - Click "Create Note"

3. **Try the Timer**
   - Click "Timer" in sidebar
   - Click "Start" for 25-min session
   - Click "Pause" to pause
   - Click "Reset" to restart

## 📱 Mobile Testing

The app is fully responsive! Test on mobile:

```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from phone on same network
http://YOUR_IP:3000
```

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

Build output goes to `dist/` folder.

## 🌐 Deploy in 3 Steps

### Vercel Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

Your app is now live! 🎉

### Or Use GitHub + Vercel Dashboard

1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Click Deploy

Done! Your URL: `https://your-app.vercel.app`

## 🔧 Common Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Test production build
npm run lint     # Check code quality
```

## 💡 Tips

1. **Data Storage**: All data saved in browser localStorage
2. **Clear Data**: Open browser DevTools → Application → Local Storage → Clear
3. **Notifications**: Allow browser notifications for timer alerts
4. **Mobile Menu**: Tap hamburger icon (☰) to open sidebar on mobile

## 📚 Learn More

- Full documentation: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- Project structure: Check `src/` folder

## 🆘 Need Help?

**Issue**: Port 3000 already in use
**Fix**: Kill the process or change port in `vite.config.js`

**Issue**: Blank page
**Fix**: Check browser console for errors

**Issue**: Build fails
**Fix**: Delete `node_modules` and run `npm install` again

---

## 🎓 What You've Built

A production-ready React application with:
- ✅ Modern React with Hooks
- ✅ Context API for state management
- ✅ Tailwind CSS for styling
- ✅ localStorage for persistence
- ✅ Responsive mobile design
- ✅ Smooth animations
- ✅ Modular component architecture

**Ready to deploy and show off!** 🚀

---

**Quick Links:**
- 📖 [Full README](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 📄 [License](LICENSE)

**Time to deploy:** Less than 5 minutes with Vercel! ⚡
