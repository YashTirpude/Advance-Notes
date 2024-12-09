import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNotesStore from "./Store";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";

const App = () => {
  const {
    editorContent = "",
    noteColor = "#ffffff",
    currentNoteIndex = null,
    setEditorContent,
    setNoteColor,
    addOrUpdateNote,
  } = useNotesStore();

  return (
    <div className="min-h-screen  bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex  ">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1  p-4 md:p-8 lg:p-12 pt-20  flex flex-col"
      >
        <div className="flex-1 w-full max-w-5xl mx-auto bg-white dark:bg-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1  p-4 md:p-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
            <ReactQuill
              placeholder="Write your note here..."
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              className="h-[85%] w-[full] "
            />
          </div>

          <div className="p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <div
                  className="w-12 md:w-14 h-12 md:h-14 rounded-full border-4 border-white dark:border-gray-600 shadow-lg cursor-pointer"
                  style={{ backgroundColor: noteColor }}
                >
                  <input
                    type="color"
                    value={noteColor}
                    onChange={(e) => setNoteColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </motion.div>
              <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
                Choose Note Color
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addOrUpdateNote}
              className="
                flex items-center 
                bg-gradient-to-r from-cyan-500 to-blue-500 
                text-white 
                py-2 px-4 md:py-3 md:px-6
                rounded-lg 
                shadow-lg 
                text-sm md:text-base
                hover:from-cyan-600 hover:to-blue-600 
                transition-all 
                duration-300 
                transform 
                focus:outline-none 
                focus:ring-2 
                focus:ring-cyan-400 
                dark:from-cyan-700 
                dark:to-blue-700
              "
            >
              <AiOutlinePlus className="mr-2 text-base md:text-xl" />
              {currentNoteIndex !== null ? "Update Note" : "Save Note"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
