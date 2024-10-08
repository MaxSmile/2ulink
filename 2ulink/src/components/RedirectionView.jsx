"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_BASE_URL, API_READ_SHRTN_DATA, REDIRECT_DELAY_TIME } from '../data/constants';

const API_URL = API_BASE_URL + API_READ_SHRTN_DATA;
const DELAY_SEC = REDIRECT_DELAY_TIME / 1000;

function ErrorView({ error }) {
  if (!error) return null
  return <div className="text-red-500">An error occurred: {error.message}</div>;
}

function LoadingView({ code }) {
  if (!code) return <div className="text-gray-500">Loading...</div>;
  return <div className="text-gray-500">Loading {code}...</div>;
}

function Redirecting({ data, countdown, showManualRedirect }) {
  if (!data) return <ErrorView error={{ message: "No data" }} />;
  const originalUrl = data.originalURL;
  if (!originalUrl) return <ErrorView error={{ message: "No URL" }} />;

  return (
    <>
      {countdown >= 0 && <p className="text-gray-500">Redirecting in {countdown} seconds...</p>}
      <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <div className="ads-placeholder mt-4">
        {/* Your ad content here */}
      </div>
      {showManualRedirect && (
        <p className="mt-4">
          If you are not redirected, please go to&nbsp;<a
            href={originalUrl}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >this link</a>.
        </p>
      )}
    </>
  );
}



export default function RedirectionView({ code }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`${API_URL}${code}`, fetcher);
  const [countdown, setCountdown] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [showManualRedirect, setShowManualRedirect] = useState(false);


  // Set loading state
  useEffect(() => {

    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      window.location.href = data.originalURL;
      setShowManualRedirect(true);
    } else {
      if (data !== undefined) {
        console.log("if (data !== undefined)", data, isLoading);
        setIsLoading(false);
        setCountdown(DELAY_SEC);
      }
    }
  }, [data, countdown]);

  return (
    <div className="flex flex-col items-center min-h-[50vh] min-w-[50vw] border-dashed border-2 rounded-md justify-center bg-white">
      <ErrorView error={error} />

      {isLoading ? (
        <LoadingView code={code} />
      ) : (
        <Redirecting
          countdown={countdown}
          showManualRedirect={showManualRedirect}
          data={data}
        />
      )}

    </div>
  );
}
