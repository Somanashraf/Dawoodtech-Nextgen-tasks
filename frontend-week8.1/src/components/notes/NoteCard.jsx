import { useState } from 'react';
import { useNotes } from '../../contexts/NotesContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EditNoteModal from './EditNoteModal';
import { Pencil, Trash2, Clock } from 'lucide-react';

const NoteCard = ({ note }) => {
  const { deleteNote } = useNotes();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const colorClasses = {
    yellow: 'bg-yellow-50 border-yellow-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    pink: 'bg-pink-50 border-pink-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  return (
    <>
      <Card 
        hover
        padding="small"
        className={`${colorClasses[note.color] || colorClasses.yellow} min-h-[200px] flex flex-col animate-in`}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
            {note.title}
          </h3>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 bg-white/50 hover:bg-white"
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              className="p-1.5 bg-white/50 hover:bg-red-100"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-6">
            {note.content}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
          <Clock size={12} />
          <span>{formatDate(note.updatedAt)}</span>
        </div>
      </Card>

      {/* Edit Modal */}
      <EditNoteModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        note={note}
      />
    </>
  );
};

export default NoteCard;
