import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [resData, setResData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [cache, setCache] = useState({});
  const getRecipes = async () => {
    if (cache[inputVal]) {
      setResData(cache[inputVal]);
    }
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${inputVal}`
    );
    const data = await response.json();
    setResData(data?.recipes);
    setCache((prev) => ({ ...prev, [inputVal]: data }));
  };
  useEffect(() => {
    const getData = setTimeout(() => {
      getRecipes();
    }, 300);
    return () => clearTimeout(getData);
  }, [inputVal]);
  return (
    <div className="App">
      <h2>Autocomplete feature</h2>
      <div className="container">
        <input
          className="input-field"
          type="text"
          value={inputVal}
          onFocus={() => setShowDialog(true)}
          onBlur={() => setShowDialog(false)}
          onChange={(e) => setInputVal(e?.target?.value)}
        />

        {showDialog && (
          <div className="results-container">
            {resData &&
              resData?.map((res) => {
                return (
                  <span className="results" key={res?.id}>
                    {res?.name}
                  </span>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
