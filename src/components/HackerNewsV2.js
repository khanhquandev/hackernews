import axios from "axios";
import React, { useEffect, useState } from "react";

const HackerNewsV2 = () => {
  const [hits, setHits] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=${keyWord}`
  );
  const getHits = (keyword) => {
    setLoading(true);
    axios
      .get(url)

      .then(function (response) {
        setHits(response.data.hits);
        setLoading(false);
      })

      .catch(function (error) {
        setLoading(false);
        setErrorMessage(`The error happened ${error}`);
      });
  };

  useEffect(() => {
    getHits(keyWord);
  }, [url]);

  return (
    <div className="bg-white mx-auto mt-5 p-5 rounded-lg shadow-md w-2/4">
      <div className="flex mb-5 gap-x-5 mb-5">
        <input
          type="text"
          className="border border-gray-200 p-5 block w-full rounded-md transition-all focus:border-blue-400"
          placeholder="Typing your keyword..."
          defaultValue={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <button
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${keyWord}`)
          }
          className="bg-blue-500 text-white font-semibold p-5 rounded-md flex-shrink-0"
        >
          Search
        </button>
      </div>
      {loading && (
        <div className="w-8 h-8 rounded-full border-blue-700 border-4 mt-2 animate-spin border-r-transparent mx-auto my-10"></div>
      )}
      {!loading && errorMessage && (
        <p className="text-red-400 my-5">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          hits.length > 0 &&
          hits.map((item, index) => {
            if (!item.title || item.length <= 0) return null;
            return (
              <h3 key={item.title} className="p-3 bg-gray-100 rounded-md">
                {item.title}
              </h3>
            );
          })}
      </div>
    </div>
  );
};

export default HackerNewsV2;
