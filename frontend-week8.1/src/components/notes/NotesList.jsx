import { useState } from 'react';
import { useNotes } from '../../contexts/NotesContext';
import NoteCard from './NoteCard';
import AddNoteModal from './AddNoteModal';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { StickyNote, Plus, Search } from 'lucide-react';

const NotesList = () => {
  const { notes, searchNotes } = useNotes();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const displayedNotes = searchQuery ? searchNotes(searchQuery) : notes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-500 mt-1">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} size="md">
          <Plus size={20} />
          New Note
        </Button>
      </div>

      {/* Search Bar */}
      {notes.length > 0 && (
        <div className="relative">
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Notes Grid */}
      {displayedNotes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title={searchQuery ? 'No notes found' : 'No notes yet'}
          description={
            searchQuery
              ? 'Try searching with different keywords'
              : 'Start capturing your thoughts and ideas'
          }
          action={
            !searchQuery && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus size={20} />
                Create Your First Note
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default NotesList;
