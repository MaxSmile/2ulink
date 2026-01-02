# 2ulink
URL shortener frontend built with React and Vite.

![Build Status](https://img.shields.io/github/actions/workflow/status/MaxSmile/2ulink/firebase-hosting-merge.yml)

## Features

- **URL Shortening**: Generate short URLs with custom slugs.
- **Customizable Redirection Pages**: Add custom HTML, ads, or analytics to redirection pages.
- **QR Code Generation**: Create and download QR codes for shortened links.

## How It Works

- **Shorten flow**: `InputForm` validates input (optionally skips validation), then POSTs to the API endpoint and returns a `mappingID` on success.
- **Result flow**: `OutputForm` shows the short URL, enables copy/share, and optionally displays a QR code.
- **Redirect flow**: `RedirectionView` fetches the original URL via SWR and counts down before redirecting, with error handling and a manual fallback link.

## Runtime Configuration

Browser-side config uses Vite env variables:

- `VITE_BASE_URL`
- `VITE_API_BASE_URL`
- `VITE_CLIENT_URL`
- `VITE_API_WRITE_SHRTN_DATA`
- `VITE_API_READ_SHRTN_DATA`
- `VITE_REDIRECT_DELAY_TIME`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any runtime errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It bundles React in production mode and optimizes the build for performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Serves the production build locally for verification.

### `npm test`

Runs unit tests with Vitest and React Testing Library.

## TODO

1. Clean code from not used files
2. Add more tests
