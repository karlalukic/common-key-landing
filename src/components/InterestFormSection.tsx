import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  MapPin,
  User,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export const COMMITTEE_ROLES = [
  'Chair',
  'Treasurer',
  'Secretary',
  'Committee Member',
  'Owner',
  'Strata Manager',
  'Building Manager',
] as const;

export type CommitteeRole = (typeof COMMITTEE_ROLES)[number];

export const SIZE_RANGES = [
  { value: '1–8 lots', label: '1–8 lots', sublabel: 'Boutique / Duplex' },
  { value: '9–24 lots', label: '9–24 lots', sublabel: 'Mid-size Scheme' },
  { value: '25–50 lots', label: '25–50 lots', sublabel: 'Large Building' },
  { value: '50+ lots', label: '50+ lots', sublabel: 'High-rise / Precinct' },
] as const;

export type SizeRangeValue = (typeof SIZE_RANGES)[number]['value'];

export const RECIPIENT_EMAIL = 'info@commonkeyapp.com';
export const DEFAULT_WEB3FORMS_ACCESS_KEY = '1edef00d-048d-4c62-87d2-5bf06da57bb3';

export function buildGoogleMapsUrl(address: string): string {
  const trimmed = address.trim();
  if (!trimmed) return '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
}

export function buildMailtoFallbackUrl(data: {
  name: string;
  email: string;
  sizeRange: string;
  role: string;
  address: string;
}): string {
  const mapsUrl = buildGoogleMapsUrl(data.address);
  const subject = `CommonKey Interest: ${data.name} (${data.role} - ${data.sizeRange})`;
  const bodyLines = [
    `Hi CommonKey Team,`,
    ``,
    `I'm interested in learning more about CommonKey for our strata scheme.`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Role: ${data.role}`,
    `Scheme Size Range: ${data.sizeRange}`,
    `Building Address: ${data.address.trim() || 'Not provided'}`,
    ...(mapsUrl ? [`Google Maps: ${mapsUrl}`] : []),
  ];
  return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join('\n')
  )}`;
}

interface InterestFormSectionProps {
  calendarLink?: string;
}

export default function InterestFormSection({ calendarLink }: InterestFormSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sizeRange, setSizeRange] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [address, setAddress] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  // Optional Google Maps Places Autocomplete enhancement when VITE_GOOGLE_MAPS_API_KEY is configured
  useEffect(() => {
    const apiKey = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || typeof window === 'undefined' || !addressInputRef.current) return;

    const initAutocomplete = () => {
      const googleObj = (window as unknown as {
        google?: {
          maps?: {
            places?: {
              Autocomplete: new (
                inputField: HTMLInputElement,
                opts?: Record<string, unknown>
              ) => {
                addListener: (event: string, handler: () => void) => void;
                getPlace: () => { formatted_address?: string; name?: string };
              };
            };
          };
        };
      }).google;

      if (googleObj?.maps?.places?.Autocomplete && addressInputRef.current) {
        const autocomplete = new googleObj.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'au' },
          fields: ['formatted_address', 'name'],
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          const formatted = place?.formatted_address || place?.name || '';
          if (formatted) {
            setAddress(formatted);
          }
        });
      }
    };

    const existingScript = document.querySelector('script[data-google-maps-places="true"]');
    if (existingScript) {
      initAutocomplete();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps-places', 'true');
    script.onload = initAutocomplete;
    document.head.appendChild(script);
  }, []);

  const mapsPreviewUrl = buildGoogleMapsUrl(address);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Anti-spam honeypot check
    if (honeypot) {
      setStatus('success');
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!sizeRange) {
      setValidationError('Please select your scheme / committee size range.');
      return;
    }
    if (!role) {
      setValidationError('Please select your role in the committee or building.');
      return;
    }

    setStatus('submitting');

    const envWeb3FormsKey = import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY;
    const web3FormsKey =
      envWeb3FormsKey !== undefined ? envWeb3FormsKey : DEFAULT_WEB3FORMS_ACCESS_KEY;
    const googleMapsLink = buildGoogleMapsUrl(trimmedAddress);
    const subjectLine = `New CommonKey Interest: ${trimmedName} (${role} • ${sizeRange})`;

    try {
      let response: Response;

      if (web3FormsKey) {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: subjectLine,
            from_name: 'CommonKey Landing Page',
            replyto: trimmedEmail,
            name: trimmedName,
            email: trimmedEmail,
            committee_size_range: sizeRange,
            role,
            building_address: trimmedAddress || 'Not provided',
            google_maps_link: googleMapsLink || 'Not provided',
          }),
        });
      } else {
        response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: subjectLine,
            _replyto: trimmedEmail,
            _template: 'table',
            _captcha: 'false',
            Name: trimmedName,
            Email: trimmedEmail,
            Scheme_Size_Range: sizeRange,
            Role: role,
            Building_Address: trimmedAddress || 'Not provided',
            Google_Maps_Link: googleMapsLink || 'Not provided',
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`Submission returned HTTP ${response.status}`);
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSizeRange('');
    setRole('');
    setAddress('');
    setValidationError(null);
    setStatus('idle');
  };

  return (
    <section
      id="register-interest"
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 border-b border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            Register Your Interest in 30 Seconds
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Interested in CommonKey for your building, or want an information pack to share at your next committee meeting without booking a live demo? Drop your details below and our team will send you everything you need.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-slate-900/5 p-6 sm:p-10">
          {status === 'success' ? (
            <div
              className="py-8 px-4 text-center max-w-lg mx-auto space-y-6"
              role="status"
              aria-live="polite"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                  Thanks, {name.trim()}! We&apos;ve Got Your Details.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Your building details ({sizeRange} &bull; {role}) have been sent to{' '}
                  <span className="font-semibold text-slate-900">{RECIPIENT_EMAIL}</span>. We&apos;ll
                  follow up at <span className="font-semibold text-slate-900">{email.trim()}</span>{' '}
                  shortly.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {calendarLink && (
                  <a
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm"
                  >
                    <span>Changed your mind? Book a Walkthrough</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="ck-botcheck">Do not fill this out if you are human</label>
                <input
                  id="ck-botcheck"
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Row 1: Name & Email */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="interest-name"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="interest-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Sarah Jenkins"
                      className="w-full pl-10 pr-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="interest-email"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="interest-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., sarah@example.com"
                      className="w-full pl-10 pr-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Scheme / Committee Size Range */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span
                    id="size-range-label"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Committee / Building Size Range <span className="text-red-500">*</span>
                  </span>
                </div>
                <div
                  role="radiogroup"
                  aria-labelledby="size-range-label"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {SIZE_RANGES.map((item) => {
                    const isSelected = sizeRange === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSizeRange(item.value)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/90'
                        }`}
                      >
                        <div className="font-bold text-sm">{item.label}</div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSelected ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {item.sublabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Role in the Committee / Building */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span
                    id="committee-role-label"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Your Role in the Committee / Building <span className="text-red-500">*</span>
                  </span>
                </div>
                <div
                  role="radiogroup"
                  aria-labelledby="committee-role-label"
                  className="flex flex-wrap gap-2.5"
                >
                  {COMMITTEE_ROLES.map((roleOption) => {
                    const isSelected = role === roleOption;
                    return (
                      <button
                        key={roleOption}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setRole(roleOption)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                        }`}
                      >
                        {roleOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Optional Building Address (Google Maps linkable) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="interest-address"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Building Address{' '}
                    <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                  </label>
                  {mapsPreviewUrl && (
                    <a
                      href={mapsPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Verify on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    ref={addressInputRef}
                    id="interest-address"
                    type="text"
                    autoComplete="street-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g., 42 Macquarie St, Sydney NSW 2000 (or Google Maps address)"
                    className="w-full pl-10 pr-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  Adding your street address or suburb helps us tailor state-specific strata compliance info for your scheme.
                </p>
              </div>

              {/* Validation Error Notice */}
              {validationError && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Network Error + Direct Mailto Fallback */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-sm space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">
                        We couldn&apos;t reach the form server directly (your browser or network may be blocking third-party form requests).
                      </p>
                      <p className="text-xs text-amber-800 mt-1">
                        Click below to send your pre-filled details directly to{' '}
                        <span className="font-semibold">{RECIPIENT_EMAIL}</span> via your email app:
                      </p>
                    </div>
                  </div>
                  <div>
                    <a
                      href={buildMailtoFallbackUrl({
                        name,
                        email,
                        sizeRange,
                        role,
                        address,
                      })}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Pre-Filled Email to {RECIPIENT_EMAIL}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-base shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Register My Interest</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
