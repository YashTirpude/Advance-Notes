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
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
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
