import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Note {
  text: string;
  color: string;
}

interface NotesState {
  notes: Note[];
  search: string;
  editorContent: string;
  noteColor: string;
  currentNoteIndex: number | null;
  setNotes: (updatedNotes: Note[]) => void;
  setSearch: (searchValue: string) => void;
  setEditorContent: (content: string) => void;
  setNoteColor: (color: string) => void;
  setCurrentNoteIndex: (index: number | null) => void;
  addOrUpdateNote: () => void;
  selectNote: (index: number) => void;
  deleteNote: (index: number) => void;
}

const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      search: "",
      editorContent: "",
      noteColor: "#ffffff",
      currentNoteIndex: null,

      setNotes: (updatedNotes) => set({ notes: updatedNotes }),
      setSearch: (searchValue) => set({ search: searchValue }),
      setEditorContent: (content) => set({ editorContent: content }),
      setNoteColor: (color) => set({ noteColor: color }),
      setCurrentNoteIndex: (index) => set({ currentNoteIndex: index }),

      addOrUpdateNote: () => {
        const { editorContent, noteColor, currentNoteIndex, notes } = get();

        if (editorContent.trim()) {
          if (currentNoteIndex !== null) {
            const updatedNotes = [...notes];
            updatedNotes[currentNoteIndex] = {
              text: editorContent,
              color: noteColor,
            };
            set({
              notes: updatedNotes,
              editorContent: "",
              currentNoteIndex: null,
              noteColor: "#ffffff",
            });
          } else {
            set({
              notes: [...notes, { text: editorContent, color: noteColor }],
              editorContent: "",
              noteColor: "#ffffff",
              currentNoteIndex: null,
            });
          }
        }
      },

      selectNote: (index) => {
        const { notes } = get();
        set({
          currentNoteIndex: index,
          editorContent: notes[index].text,
          noteColor: notes[index].color,
        });
      },

      deleteNote: (index) => {
        const { notes } = get();
        const updatedNotes = notes.filter((_, i) => i !== index);
        set({
          notes: updatedNotes,
          currentNoteIndex: null,
          editorContent: "",
          noteColor: "#ffffff",
        });
      },
    }),
    {
      name: "notes-storage",

      partialize: (state) => ({
        notes: state.notes,
      }),
    }
  )
);

export default useNotesStore;
