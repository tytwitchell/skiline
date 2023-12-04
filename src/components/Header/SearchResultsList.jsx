import { useState, useEffect } from "react";
import styles from "./header.module.css";

export default function SearchResultsList({
  searchResults,
  setClickedResult,
  setShowResults,
  showResults,
}) {
  const [resultHtml, setResultHtml] = useState(null);

  useEffect(() => {
    if (searchResults) {
      const resultsList = searchResults.map((result) => {
        return (
          <span
            key={result}
            className={styles.result}
            onClick={(e) => handleClickResult(e)}
          >
            {result}
          </span>
        );
      });
      setResultHtml(resultsList);
      setShowResults(true);
    } else {
      setResultHtml(null);
      setShowResults(false);
    }
  }, [searchResults]);

  function handleClickResult(e) {
    setClickedResult(e.target.textContent);
    setTimeout(() => {
      setShowResults(false);
    }, 500);
  }




  return (
    <>
      {showResults && resultHtml && (
        <div className={styles.resultsList}>
          {resultHtml}
        </div>
      )}
    </>
  );
}
