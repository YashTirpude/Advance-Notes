import { FiSearch } from "react-icons/fi";
import useNotesStore from "../Store";
import { AiFillDelete } from "react-icons/ai";

const Sidebar = () => {
  // In your component
  const { deleteNote } = useNotesStore();

  const { notes, search, selectNote, setSearch } = useNotesStore();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-1/3  p-4 shadow-lg ">
      <div className="flex items-center mb-4">
        <FiSearch className="text-xl mr-2" />
        <input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="placeholder-cyan-500 w-auto rounded-lg p-2"
        />
      </div>

      <div>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div
              key={index}
              onClick={() => selectNote(index)}
              className={`flex  justify-between items-center p-4 mb-2 rounded-lg shadow-md cursor-pointer border hover:text-black hover:bg-cyan-400  transition duration-300
          `}
            >
              <div
                className="w-4 h-4 rounded-full mr-2 "
                style={{
                  backgroundColor: note.color,
                  border: "1px solid black",
                }}
              />
              <div
                className="truncate mx-2"
                dangerouslySetInnerHTML={{ __html: note.text }}
              />

              <button onClick={() => deleteNote(index)}>
                <AiFillDelete />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No Notes Found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
