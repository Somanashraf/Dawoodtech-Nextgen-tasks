import { AppProvider, useApp } from './contexts/AppContext';
import { TaskProvider } from './contexts/TaskContext';
import { NotesProvider } from './contexts/NotesContext';
import MainLayout from './components/layout/MainLayout';
import TaskList from './components/tasks/TaskList';
import NotesList from './components/notes/NotesList';
import PomodoroTimer from './components/timer/PomodoroTimer';

function AppContent() {
  const { activeView } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'tasks':
        return <TaskList />;
      case 'notes':
        return <NotesList />;
      case 'timer':
        return <PomodoroTimer />;
      default:
        return <TaskList />;
    }
  };

  return (
    <MainLayout>
      {renderView()}
    </MainLayout>
  );
}

function App() {
  return (
    <AppProvider>
      <TaskProvider>
        <NotesProvider>
          <AppContent />
        </NotesProvider>
      </TaskProvider>
    </AppProvider>
  );
}

export default App;
