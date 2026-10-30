import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import InterestFormSection, {
  COMMITTEE_ROLES,
  SIZE_RANGES,
  RECIPIENT_EMAIL,
  DEFAULT_WEB3FORMS_ACCESS_KEY,
  buildGoogleMapsUrl,
  buildMailtoFallbackUrl,
} from './InterestFormSection';

describe('InterestFormSection Component', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
  });

  it('renders the section heading, recipient email link, and all 5 form fields', () => {
    render(<InterestFormSection calendarLink="https://calendar.app.google/test" />);

    expect(
      screen.getByRole('heading', { name: /Register Your Interest in 30 Seconds/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Building Address/i)).toBeInTheDocument();

    // Check all 4 size ranges
    SIZE_RANGES.forEach((range) => {
      expect(screen.getByRole('radio', { name: new RegExp(range.label, 'i') })).toBeInTheDocument();
    });

    // Check all 7 committee roles
    COMMITTEE_ROLES.forEach((role) => {
      expect(screen.getByRole('radio', { name: role })).toBeInTheDocument();
    });
  });

  it('displays a live Google Maps verification link when an optional building address is entered', () => {
    render(<InterestFormSection />);

    expect(screen.queryByRole('link', { name: /Verify on Google Maps/i })).not.toBeInTheDocument();

    const addressInput = screen.getByLabelText(/Building Address/i);
    fireEvent.change(addressInput, { target: { value: '42 Macquarie St, Sydney NSW 2000' } });

    const mapsLink = screen.getByRole('link', { name: /Verify on Google Maps/i });
    expect(mapsLink).toBeInTheDocument();
    expect(mapsLink).toHaveAttribute(
      'href',
      'https://www.google.com/maps/search/?api=1&query=42%20Macquarie%20St%2C%20Sydney%20NSW%202000'
    );
  });

  it('validates required fields in order before submitting', () => {
    render(<InterestFormSection />);

    const submitBtn = screen.getByRole('button', { name: /Register My Interest/i });

    // 1. Missing name
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(/Please enter your name\./i);

    // 2. Missing/invalid email
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Alex Taylor' } });
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(/Please enter a valid email address\./i);

    // 3. Missing size range
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(
      /Please select your scheme \/ committee size range\./i
    );

    // 4. Missing role
    fireEvent.click(screen.getByRole('radio', { name: /9–24 lots/i }));
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(
      /Please select your role in the committee or building\./i
    );

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits payload to Web3Forms using DEFAULT_WEB3FORMS_ACCESS_KEY by default and shows confirmation state', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    } as Response);

    render(<InterestFormSection calendarLink="https://calendar.app.google/test" />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Sarah Jenkins' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'sarah@example.com' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /9–24 lots/i }));
    fireEvent.click(screen.getByRole('radio', { name: 'Treasurer' }));
    fireEvent.change(screen.getByLabelText(/Building Address/i), {
      target: { value: '100 George St, Sydney NSW 2000' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register My Interest/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Thanks, Sarah Jenkins! We've Got Your Details\./i })
      ).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(options?.method).toBe('POST');

    const body = JSON.parse(options?.body as string);
    expect(body).toEqual({
      access_key: DEFAULT_WEB3FORMS_ACCESS_KEY,
      subject: 'New CommonKey Interest: Sarah Jenkins (Treasurer • 9–24 lots)',
      from_name: 'CommonKey Landing Page',
      replyto: 'sarah@example.com',
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      committee_size_range: '9–24 lots',
      role: 'Treasurer',
      building_address: '100 George St, Sydney NSW 2000',
      google_maps_link:
        'https://www.google.com/maps/search/?api=1&query=100%20George%20St%2C%20Sydney%20NSW%202000',
    });

    // Can reset form to submit another enquiry
    fireEvent.click(screen.getByRole('button', { name: /Submit Another Enquiry/i }));
    expect(screen.getByLabelText(/Your Name/i)).toHaveValue('');
  });

  it('falls back to FormSubmit.co when VITE_WEB3FORMS_ACCESS_KEY is empty', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: 'true' }),
    } as Response);

    render(<InterestFormSection />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'David Chen' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'david@strata.com.au' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /25–50 lots/i }));
    fireEvent.click(screen.getByRole('radio', { name: 'Chair' }));

    fireEvent.click(screen.getByRole('button', { name: /Register My Interest/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Thanks, David Chen! We've Got Your Details\./i })
      ).toBeInTheDocument();
    });

    const [url, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toBe(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`);
    const body = JSON.parse(options?.body as string);
    expect(body).toEqual({
      _subject: 'New CommonKey Interest: David Chen (Chair • 25–50 lots)',
      _replyto: 'david@strata.com.au',
      _template: 'table',
      _captcha: 'false',
      Name: 'David Chen',
      Email: 'david@strata.com.au',
      Scheme_Size_Range: '25–50 lots',
      Role: 'Chair',
      Building_Address: 'Not provided',
      Google_Maps_Link: 'Not provided',
    });
  });

  it('displays a pre-filled mailto:info@commonkeyapp.com fallback link if network submission fails', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network blocked'));

    render(<InterestFormSection />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Emma Wilson' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'emma@example.com' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /1–8 lots/i }));
    fireEvent.click(screen.getByRole('radio', { name: 'Secretary' }));

    fireEvent.click(screen.getByRole('button', { name: /Register My Interest/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /Send Pre-Filled Email to info@commonkeyapp\.com/i })
      ).toBeInTheDocument();
    });

    const fallbackLink = screen.getByRole('link', {
      name: /Send Pre-Filled Email to info@commonkeyapp\.com/i,
    });
    expect(fallbackLink.getAttribute('href')).toContain(`mailto:${RECIPIENT_EMAIL}?subject=`);
    expect(fallbackLink.getAttribute('href')).toContain('Emma%20Wilson');
  });

  it('helper utilities construct accurate Google Maps and mailto URLs', () => {
    expect(buildGoogleMapsUrl('   ')).toBe('');
    expect(buildGoogleMapsUrl('10 Bond St Sydney')).toBe(
      'https://www.google.com/maps/search/?api=1&query=10%20Bond%20St%20Sydney'
    );

    const mailto = buildMailtoFallbackUrl({
      name: 'Sam',
      email: 'sam@test.com',
      sizeRange: '50+ lots',
      role: 'Owner',
      address: '10 Bond St Sydney',
    });
    expect(mailto).toContain(`mailto:${RECIPIENT_EMAIL}`);
    expect(decodeURIComponent(mailto)).toContain(
      'https://www.google.com/maps/search/?api=1&query=10%20Bond%20St%20Sydney'
    );
  });
});
