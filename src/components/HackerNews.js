import axios from "axios";
import React, { useEffect, useState } from "react";
import lodash from "lodash";

const HackerNews = () => {
  const [hits, setHits] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const getHits = (keyword) => {
    setLoading(true);
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${keyword}`)
      .then(function (response) {
        // handle success
        setHits(response.data.hits);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        setErrorMessage(`The error happened ${error}`);
      });
  };
  const handleUpdateKeyWord = lodash.debounce((e) => {
    setKeyWord(e.target.value);
  }, 500);
  useEffect(() => {
    getHits(keyWord);
  }, [keyWord]);

  return (
    <div className="bg-white mx-auto mt-5 p-5 rounded-lg shadow-md w-2/4">
      <input
        type="text"
        className="border border-gray-200 p-5 block w-full rounded-md mb-5 transition-all focus:border-blue-400"
        placeholder="Typing your keyword..."
        defaultValue={keyWord}
        onChange={handleUpdateKeyWord}
      />
      {loading && (
        <div className="w-8 h-8 rounded-full border-blue-700 border-4 mt-2 animate-spin border-r-transparent mx-auto my-10"></div>
      )}
      {!loading && errorMessage && (
        <p className="text-red-400 my-5">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          hits.length > 0 &&
          hits.map((item, index) => (
            <h3 key={item.title} className="p-3 bg-gray-100 rounded-md">
              {item.title}
            </h3>
          ))}
      </div>
    </div>
  );
};

export default HackerNews;
