
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchHandler();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const searchHandler = async () => {
    try {
      let res = await fetch(
        `http://localhost:9000/api/search?query=${searchTerm}`
      );
      res = await res.json();
      setResults(res.courses || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative -mt-10 px-4">
      <div className="max-w-xl sm:max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) {
              navigate(`/courseDescription/${results[0]._id}`);
            }
          }}
          placeholder="Search courses..."
          className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none"
        />
        {searchTerm && (
          <div className="mt-2 bg-white rounded-lg shadow-md max-h-60 overflow-y-auto">
            {results.length > 0 ? (
              results.map((result) => (
                <NavLink
                  key={result._id}
                  to={`/courseDescription/${result._id}`}
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  {result.name}
                </NavLink>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

