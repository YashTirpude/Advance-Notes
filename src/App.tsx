import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNotesStore from "./Store";
import { AiOutlinePlus } from "react-icons/ai";
import Sidebar from "./components/Sidebar";

const App = () => {
  const {
    editorContent,
    noteColor,
    currentNoteIndex,
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
          className="h-96 bg-white mb-[2rem]"
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
        />

        <div className="flex ml-[1rem] items-center mt-4 space-x-4 ">
          <input
            type="color"
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            className="w-10 h-10 p-1 border rounded-full"
          />
          <p>Choose a note color</p>
        </div>

        <button
          onClick={addOrUpdateNote}
          className="bg-blue-500 ml-[1rem] text-white py-2 px-4 mt-4 rounded-lg shadow-lg hover:bg-blue-600 flex items-center "
        >
          <AiOutlinePlus className="mr-2" />
          {currentNoteIndex !== null ? "update Note" : "Save note"}
        </button>
      </div>
    </div>
  );
};

export default App;
