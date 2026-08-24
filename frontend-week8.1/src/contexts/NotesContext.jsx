import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useLocalStorage('notes', []);

  const addNote = (note) => {
    const newNote = {
      id: Date.now().toString(),
      title: note.title,
      content: note.content,
      color: note.color || 'yellow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const searchNotes = (query) => {
    if (!query) return notes;
    const lowercaseQuery = query.toLowerCase();
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    searchNotes,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};
