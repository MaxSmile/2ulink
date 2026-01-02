import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import InputForm from './InputForm';

const submitForm = async () => {
  const submitButton = screen.getByRole('button', { name: /shorten url/i });
  await userEvent.click(submitButton);
};

describe('InputForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an error for empty input', async () => {
    const onResult = vi.fn();

    render(<InputForm onResult={onResult} />);
    await submitForm();

    expect(onResult).toHaveBeenCalledWith({
      success: false,
      error: 'Please enter a URL, empty string is not allowed',
    });
  });

  it('returns an error for invalid URLs', async () => {
    const onResult = vi.fn();
    const fetchMock = vi.fn();

    vi.stubGlobal('fetch', fetchMock);

    render(<InputForm onResult={onResult} />);
    await userEvent.type(
      screen.getByPlaceholderText(/enter your long url here/i),
      'example.com'
    );
    await submitForm();

    expect(onResult).toHaveBeenCalledWith({
      success: false,
      error: 'Please enter a valid URL (including http[s] or ftp protocol prefix)',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits trimmed URLs when validation is skipped', async () => {
    const onResult = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ mappingID: 'abc123' }),
    });
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.stubGlobal('fetch', fetchMock);
    render(<InputForm onResult={onResult} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter your long url here/i),
      '  https://example.com/test  '
    );
    await userEvent.click(screen.getByRole('checkbox'));
    await submitForm();

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith({
        success: true,
        mappingID: 'abc123',
      });
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ originalURL: 'https://example.com/test' }),
      })
    );
    consoleSpy.mockRestore();
  });

  it('returns an API error message when the server responds with an error', async () => {
    const onResult = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid URL' }),
    });
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.stubGlobal('fetch', fetchMock);
    render(<InputForm onResult={onResult} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter your long url here/i),
      'https://example.com'
    );
    await submitForm();

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid URL',
      });
    });
    consoleSpy.mockRestore();
  });

  it('returns a network error when the request fails', async () => {
    const onResult = vi.fn();
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network down'));
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.stubGlobal('fetch', fetchMock);
    render(<InputForm onResult={onResult} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter your long url here/i),
      'https://example.com'
    );
    await submitForm();

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith({
        success: false,
        error: 'Network down',
      });
    });
    consoleSpy.mockRestore();
  });

  it('submits on Enter for a valid URL', async () => {
    const onResult = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ mappingID: 'enter123' }),
    });
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.stubGlobal('fetch', fetchMock);
    render(<InputForm onResult={onResult} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter your long url here/i),
      'https://example.com{enter}'
    );

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith({
        success: true,
        mappingID: 'enter123',
      });
    });

    consoleSpy.mockRestore();
  });
});
