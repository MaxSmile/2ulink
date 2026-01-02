import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import OutputForm from './OutputForm';

vi.mock('./InputForm', () => ({
  default: ({ onResult }) => (
    <div>
      <button type="button" onClick={() => onResult({ success: true, mappingID: 'abc123' })}>
        Trigger Success
      </button>
      <button
        type="button"
        onClick={() => onResult({ success: false, error: 'Bad request' })}
      >
        Trigger Error
      </button>
    </div>
  ),
}));

describe('OutputForm', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      share: vi.fn().mockResolvedValue(undefined),
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the shortened URL on success', async () => {
    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));

    expect(screen.getByText('https://2ul.top/')).toBeInTheDocument();
    expect(screen.getByText('abc123')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('shows an error message when shortening fails', async () => {
    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger error/i }));

    expect(screen.getByText(/error: bad request/i)).toBeInTheDocument();
  });

  it('copies the shortened URL to the clipboard', async () => {
    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://2ul.top/abc123'
    );
  });

  it('shares the shortened URL', async () => {
    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));
    await userEvent.click(screen.getByRole('button', { name: /share/i }));

    await waitFor(() => {
      expect(navigator.share).toHaveBeenCalledWith({
        url: 'https://2ul.top/abc123',
      });
    });
  });

  it('resets the share button when sharing fails', async () => {
    navigator.share.mockRejectedValueOnce(new Error('Share failed'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));
    await userEvent.click(screen.getByRole('button', { name: /share/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^share$/i })).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('resets the copy button when copy fails', async () => {
    navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Copy failed'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^copy$/i })).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('toggles the QR code details', async () => {
    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));
    await userEvent.click(
      screen.getByRole('button', { name: /generate a qr code/i })
    );

    expect(
      screen.getByText(/the qr code contains the shortened url/i)
    ).toBeInTheDocument();
  });

  it('returns to the input form when starting another', async () => {
    render(<OutputForm />);

    await userEvent.click(screen.getByRole('button', { name: /trigger success/i }));
    await userEvent.click(screen.getByRole('button', { name: /make another/i }));

    expect(
      screen.getByRole('button', { name: /trigger success/i })
    ).toBeInTheDocument();
  });
});
