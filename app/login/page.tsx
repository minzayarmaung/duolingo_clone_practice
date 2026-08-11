'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthorized = document.cookie.split(';').some(cookie => cookie.trim().startsWith('funlingi_auth='));
    if (isAuthorized) {
      router.replace('/');
    }
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/validate-passcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });

    setLoading(false);

    if (response.ok) {
      document.cookie = 'funlingi_auth=1; path=/; max-age=86400; sameSite=Lax';
      router.replace('/');
      return;
    }

    setError('Incorrect passcode. Please try again.');
  }

  return (
    <main className="page login-page">
      <section className="login-box">
        <span className="eyebrow">SECURE ENTRY</span>
        <h1>Enter Passcode</h1>
        <p>Enter the passcode to unlock the site for 24 hours.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Passcode
            <input
              type="password"
              value={passcode}
              onChange={event => setPasscode(event.target.value)}
              autoFocus
              required
              inputMode="numeric"
              pattern="\d*"
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </section>
    </main>
  );
}
