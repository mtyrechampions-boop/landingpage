'use client';

import React, { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { parsePostcode } from '../../lib/postcode';

const VARIANTS = {
  dark: {
    input:
      'bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#FB7E10] focus:bg-white/15',
    inputError: 'border-red-500',
    error: 'text-red-400',
    button:
      'bg-gradient-to-r from-[#FB7E10] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25 border border-orange-400/30',
  },
  light: {
    input: 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#FB7E10] focus:bg-white',
    inputError: 'border-red-400',
    error: 'text-red-500',
    button: 'bg-[#FB7E10] hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20',
  },
};

/**
 * Postcode check used by the hero and the "How close is your technician" section.
 * Validates the postcode, remembers it for the next steps and moves to /availability, which does
 * the actual coverage check. It never leaves this site.
 */
const PostcodeAvailabilityForm = ({
  variant = 'light',
  source = 'postcode-form',
  buttonLabel = 'Check availability',
  stacked = false,
  compact = false,
}) => {
  const router = useRouter();
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const styles = VARIANTS[variant] ?? VARIANTS.light;

  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Coming back with the browser's back button can restore this page from cache mid-submit.
  useEffect(() => {
    const onShow = (event) => {
      if (event.persisted) setSubmitting(false);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    if (!value.trim()) {
      setError('Enter your UK postcode, for example GU11 3HY or GU11.');
      return;
    }
    const parsed = parsePostcode(value);
    if (!parsed) {
      setError("That doesn't look like a valid UK postcode. Try something like GU11 3HY or GU11.");
      return;
    }

    setSubmitting(true);
    try {
      sessionStorage.setItem('mtc:postcode', parsed.normalized);
    } catch {
      // Private browsing can block storage. The postcode still travels in the URL.
    }
    router.push(`/availability?postcode=${encodeURIComponent(parsed.normalized)}`);
    // If navigation stalls, give the button back rather than leaving it stuck.
    window.setTimeout(() => setSubmitting(false), 10000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor={inputId} className="sr-only">
        Your UK postcode
      </label>
      <div className={`flex gap-3 ${stacked ? 'flex-col' : 'flex-col sm:flex-row'}`}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-[#FB7E10]" aria-hidden="true" />
          </div>
          <input
            id={inputId}
            type="text"
            name="postcode"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError('');
            }}
            placeholder="Enter postcode (e.g. GU11 3HY)"
            autoComplete="postal-code"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={10}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            disabled={submitting}
            className={`w-full pl-12 pr-4 ${compact ? 'h-12 py-0' : 'py-4'} border-2 ${compact ? 'rounded-xl' : 'rounded-2xl'} font-bold text-base focus:outline-none transition-all disabled:opacity-70 ${styles.input} ${error ? styles.inputError : ''
              }`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          data-conversion="availability-check"
          data-source={source}
          className={`${styles.button} ${compact ? 'h-12 px-6 rounded-xl' : 'py-4 px-8 rounded-2xl'} font-black text-sm uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait disabled:active:scale-100`}
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>Checking…</span>
            </>
          ) : (
            <>
              <span>{buttonLabel}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <p id={errorId} role="alert" className={`mt-2 text-xs sm:text-sm font-bold text-left pl-1 ${styles.error} ${error ? '' : 'sr-only'}`}>
        {error}
      </p>
    </form>
  );
};

export default PostcodeAvailabilityForm;
