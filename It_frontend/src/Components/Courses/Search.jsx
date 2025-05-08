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
      console.log(res.courses);
      setResults(res.courses);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex relative bottom-4">
      <div className="flex items-center flex-wrap p-5 w-[40%] m-auto bg-white rounded-xl shadow-xl h-20">
        <div className="w-full flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) {
                navigate(`/courseDescription/${results[0]._id}`); //results[0] means array element
              }
            }}
            placeholder="Search Courses"
            className="outline-none border border-gray-300 w-[70%] h-10 rounded-lg p-2"
          />
        </div>
        <div className="w-full mt-2 bg-white shadow-lg rounded-lg text-[#212529]">
          {results.length > 0 && searchTerm && (
            <div>
              {results.map((result) => {
                return (
                  <div key={result._id} className="flex ">
                    <div className=" w-full h-10 flex items-center pl-4">
                      <NavLink to={`/courseDescription/${result._id}`}>
                        <h1 className="cursor-pointer">{result.name}</h1>
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="w-full mt-2 bg-white shadow-lg rounded-lg text-[#212529]">
            {results.length === 0 && searchTerm && (
              <div className="p-2 ">No results found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
