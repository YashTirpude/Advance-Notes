import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNotesStore from "./Store";
import { AiOutlinePlus } from "react-icons/ai";
import Sidebar from "./components/Sidebar";

const App = () => {
  // Use a default object to prevent destructuring error
  const {
    editorContent = "",
    noteColor = "#ffffff",
    currentNoteIndex = null,
    setEditorContent,
    setNoteColor,
    addOrUpdateNote,
  } = useNotesStore();

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-2/3 p-8">
        <ReactQuill
          placeholder="Write your note here..."
          className="h-96  mb-[4rem]"
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
        />

        <div className="flex ml-[1rem] items-center mt-4 space-x-4 ">
          <div
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-300"
            style={{ backgroundColor: noteColor }}
          >
            <input
              type="color"
              value={noteColor}
              onChange={(e) => setNoteColor(e.target.value)}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <p>Choose a note color</p>
        </div>

        <button
          onClick={addOrUpdateNote}
          className="bg-blue-500 ml-[1rem] text-white py-2 px-4 mt-4 rounded-lg shadow-lg hover:bg-blue-600 flex items-center "
        >
          <AiOutlinePlus className="mr-2" />
          {currentNoteIndex !== null ? "Update Note" : "Save note"}
        </button>
      </div>
    </div>
  );
};

export default App;
