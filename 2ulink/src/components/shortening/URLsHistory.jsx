// src/components/shortening/URLsHistory.jsx
import React, { useState, useEffect } from 'react';

const URLsHistory = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  // Fetch recently shortened URLs from localStorage on component mount
  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('recentShortenedUrls')) || [];
    setShortenedUrls(storedUrls);
  }, []);

  return (
    <div>
      <h3>Recently Shortened URLs</h3>
      {shortenedUrls.length === 0 ? (
        <p>No URLs shortened yet.</p>
      ) : (
        <ul>
          {shortenedUrls.map((shortUrl, index) => (
            <li key={index}>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default URLsHistory;
