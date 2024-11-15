// src/pages/RedirectionPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import RedirectionView from '../components/RedirectionView';
import Logo from '../components/Logo';

export default function RedirectionPage() {
  // Capture the slug from the URL
  const { slug } = useParams();

  return (
    <>
      <header className={`fixed text-dark left-0 top-0 w-full z-30 duration-400 py-2`}>

        <div className="container">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Logo />

              <span className="sm:hidden">
                Page for slug: {slug}
              </span>
            </div>
            <h1>2ul.top - free url shortener</h1>
          </div>
        </div>
      </header>
      
      <RedirectionView code={slug} />
    </>
  );
};