import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('swr', () => ({
  default: vi.fn(),
}));

vi.mock('../data/constants', () => ({
  API_BASE_URL: 'https://api.2ul.top',
  API_READ_SHRTN_DATA: '/urls/',
  REDIRECT_DELAY_TIME: 0,
}));

import useSWR from 'swr';
import RedirectionView, { CountdownComponent } from './RedirectionView';

describe('CountdownComponent', () => {
  it('calls the callback when the countdown reaches zero', async () => {
    const callback = vi.fn();

    render(
      <CountdownComponent
        callback={callback}
        originalUrl="https://example.com"
        initialSeconds={0}
      />
    );

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it('shows an error message when provided', () => {
    const callback = vi.fn();

    render(
      <CountdownComponent
        callback={callback}
        originalUrl="https://example.com"
        errorMessage="Invalid redirect URL"
        initialSeconds={0}
      />
    );

    expect(
      screen.getByText(/an error occurred: invalid redirect url/i)
    ).toBeInTheDocument();
  });
});

describe('RedirectionView', () => {
  const originalLocation = window.location;

  const setMockLocation = () => {
    let hrefValue = 'http://localhost/';
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        get href() {
          return hrefValue;
        },
        set href(next) {
          hrefValue = next;
        },
      },
    });
  };

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    vi.clearAllMocks();
  });

  it('shows the loading state before data is available', () => {
    useSWR.mockReturnValue({ data: undefined });

    render(<RedirectionView code="abc123" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(useSWR).toHaveBeenCalledWith(
      'https://api.2ul.top/urls/abc123',
      expect.any(Function)
    );
  });

  it('renders the redirect link and ads frame when data is loaded', async () => {
    useSWR.mockReturnValue({
      data: { originalURL: 'https://example.com' },
    });
    setMockLocation();

    render(<RedirectionView code="abc123" />);

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /redirect manually to/i })
      ).toHaveAttribute('href', 'https://example.com');
    });

    expect(screen.getByTitle(/advertisement/i)).toHaveAttribute(
      'src',
      'https://i.2ul.top/ads?a=abc123'
    );
  });

  it('writes the redirect URL to window.location.href', async () => {
    useSWR.mockReturnValue({
      data: { originalURL: 'https://example.com/redirect' },
    });
    setMockLocation();

    render(<RedirectionView code="abc123" />);

    await waitFor(() => {
      expect(window.location.href).toBe('https://example.com/redirect');
    });
  });

  it('renders an error message when the API returns an error', async () => {
    useSWR.mockReturnValue({
      data: { error: 'Not found' },
    });
    setMockLocation();

    render(<RedirectionView code="missing" />);

    await waitFor(() => {
      expect(
        screen.getByText(/an error occurred: not found/i)
      ).toBeInTheDocument();
    });
  });

  it('shows an invalid redirect error when no URL is provided', async () => {
    useSWR.mockReturnValue({
      data: {},
    });
    setMockLocation();

    render(<RedirectionView code="empty" />);

    await waitFor(() => {
      expect(
        screen.getByText(/an error occurred: invalid redirect url/i)
      ).toBeInTheDocument();
    });
  });
});
