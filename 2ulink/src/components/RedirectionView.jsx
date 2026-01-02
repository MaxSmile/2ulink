// components/RedirectionView.jsx
"use client";

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_BASE_URL, API_READ_SHRTN_DATA, REDIRECT_DELAY_TIME } from '../data/constants';

const API_URL = API_BASE_URL + API_READ_SHRTN_DATA;
const DELAY_SEC = REDIRECT_DELAY_TIME / 1000;

function ErrorView({ error }) {
  if (!error) return null;
  return <div className="text-red-500">An error occurred: {error.message}</div>;
}

function LoadingView({ code }) {
  if (!code) return <div className="text-gray-500 m-8 text-lg">Loading...</div>;
  return (
    <div role="status" aria-live="polite">
      <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin mb-4" aria-hidden="true"></div>
      <p className="text-gray-500">Loading {code}...</p>
    </div>
  );
}

function RedirectingAdsFrame({ code }) {
  return (
    <div className="ads-placeholder mt-4 border w-full h-[90vh] flex justify-center items-center">
      <iframe
        src={`https://i.2ul.top/ads?a=${code}`}
        title="Advertisement"
        className="w-full h-full border-none"
        style={{ maxWidth: '100%', height: '90%' }}
      />
    </div>
  );
}

export const CountdownComponent = ({
  callback,
  originalUrl,
  errorMessage,
  initialSeconds = DELAY_SEC,
}) => {
  const [countdown, setCountdown] = useState(initialSeconds);

  useEffect(() => {
    if (countdown <= 0) {
      callback();
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [callback, countdown]);

  if (countdown <= 0) {
    return (
      <>
        {errorMessage ? (
          <ErrorView error={{ message: errorMessage }} />
        ) : (
          <span>
            If you are not redirected, please go to&nbsp;
            <a
              href={originalUrl}
              className="text-blue-500 underline"
              aria-label={`Redirect manually to ${originalUrl}`}
            >
              this link
            </a>.
          </span>
        )}
      </>
    );
  }

  return <span>Redirecting in {countdown} seconds</span>;
};

export default function RedirectionView({ code }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(code ? `${API_URL}${code}` : null, fetcher);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [destinationUrl, setDestinationUrl] = useState(() => window.location.href);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setDestinationUrl(data.originalURL || window.location.href);
    }
    if (data?.error) {
      setErrorMessage(data.error);
    } else {
      setErrorMessage('');
    }
  }, [code, data]);


  const handleRedirect = () => {
    if (data?.originalURL && !errorMessage) {
      window.location.href = destinationUrl;
    } else {
      if (!errorMessage) {
        setErrorMessage('Invalid redirect URL');
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[50vh] min-w-[50vw] border-dashed border-2 justify-center bg-white">
      {isLoading ? (
        <LoadingView code={code} />
      ) : (
        <>
          <div className="mx-auto text-xl bg-gray-100 p-4">
            <CountdownComponent
              callback={handleRedirect}
              originalUrl={destinationUrl}
              errorMessage={errorMessage}
            />
          </div>
          <RedirectingAdsFrame
            code={code}
          />
        </>
      )}
    </div>
  );
}
