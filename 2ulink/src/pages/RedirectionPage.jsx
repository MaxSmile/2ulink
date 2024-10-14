// src/pages/RedirectionPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import RedirectionView from '../components/RedirectionView';

export default function RedirectionPage () {
  // Capture the slug from the URL
  const { slug } = useParams();

  // You can now use the slug to fetch data or display relevant content
  return (
    <div>
      <RedirectionView code={slug} />
    </div>
  );
};