import { motion } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import useNotesStore from "../Store";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteNote } = useNotesStore();
  const { notes, search, selectNote, setSearch } = useNotesStore();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
      >
        {isOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
      </button>

      <div
        className={`
          fixed sm:relative top-0 left-0 h-full min-h-screen w-64 
          bg-white dark:bg-gray-800 
          transform transition-transform duration-300 ease-in-out 
          sm:translate-x-0 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full p-4 pt-16 sm:pt-4 h-full flex flex-col">
          <div className="flex items-center mb-4">
            <FiSearch className="text-xl text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search Notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="placeholder-cyan-500 w-full rounded-lg p-2 border-2 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-300 focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex-1 space-y-2 ">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                  key={index}
                  onClick={() => {
                    selectNote(index);

                    if (window.innerWidth < 640) {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex justify-between items-center p-4 rounded-lg shadow-md cursor-pointer  hover:text-black dark:hover:text-white hover:bg-cyan-400 dark:hover:bg-cyan-600 `}
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: note.color,
                      border: "1px solid black",
                    }}
                  />

                  <div
                    className="truncate mx-2 text-gray-800 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: note.text }}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(index);
                    }}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition duration-300"
                  >
                    <AiFillDelete />
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">No Notes Found</p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 sm:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
