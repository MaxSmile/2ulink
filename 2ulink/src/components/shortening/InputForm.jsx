// src/components/shortening/UrlForm.jsx

import React, { useState } from 'react'
import { API_BASE_URL, API_WRITE_SHRTN_DATA } from '../../data/constants'


const API_URL = API_BASE_URL + API_WRITE_SHRTN_DATA;

export default function InputForm({ onResult }) {
  const [url, setUrl] = useState('');
  const [skipValidation, setSkipValidation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (url === '') {
      onResult({ success: false, error: 'Please enter a URL, empty string is not allowed' });
    } else if (!skipValidation && !isValidURL(url)) {
      onResult({ success: false, error: 'Please enter a valid URL (including http[s] or ftp protocol prefix)' });
    } else {
      try {
        console.log("fetch POST", API_URL);
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            originalURL: url,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          onResult({ success: true, mappingID: data.mappingID });
        } else {
          const errorData = await response.json();
          onResult({ success: false, error: errorData.error });
        }
      } catch (error) {
        onResult({ success: false, error: error.message });
      }
    }
  };

  const isValidURL = (url) => {
    const urlPattern = new RegExp(
      /\b(https?|ftp):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/,
      'i'
    );
    return !!urlPattern.test(url);
  };

  return (
    <div className="bg-turn-right-arrow ">
      <p className="text-base lg:text-lg font-light ml-8 mt-3">
        Put your long URL in the box below
      </p>
      <div className="lg:pl-16  mt-16 lg:mt-0">
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border-2 border-dark rounded w-full mt-0 lg:w-3/4 md:ml-2"
          />

          <div className="w-full flex justify-center items-center space-x-2">
            <button type="submit" className="button-teal mt-4">
              Shorten URL
            </button>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={skipValidation}
                onChange={(e) => setSkipValidation(e.target.checked)}
              />
              <label className="text-sm text-gray-500">Do not validate URL</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
