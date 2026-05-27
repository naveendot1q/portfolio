import { useState, FormEvent } from 'react';
import { Link, useLocation } from 'wouter';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      setLocation('/blog');
    } catch { setError('Network error. Try again.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0d1117' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,26,.07) 0%, transparent 70%)', top: '20%', left: '30%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,.05) 0%, transparent 70%)', bottom: '20%', right: '25%', filter: 'blur(60px)' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="font-display font-bold text-3xl" style={{ color: '#FF6B1A', letterSpacing: '-0.02em' }}>
              NM<span style={{ color: '#00D4FF' }}>.</span>DEV
            </span>
          </Link>
          <p className="mt-2 text-sm" style={{ color: '#8b949e' }}>Admin access — blog management</p>
        </div>

        <div className="card p-8" style={{ background: '#161b22' }}>
          <h2 className="font-display font-bold text-xl mb-6 text-center" style={{ color: '#e6edf3' }}>Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="your@email.com" required autoComplete="email" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" placeholder="••••••••" required autoComplete="current-password" />
            </div>

            {error && (
              <div className="text-sm p-3 rounded-lg" style={{ background: 'rgba(248,81,73,.1)', color: '#f85149', border: '1px solid rgba(248,81,73,.3)' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-xs mt-6" style={{ color: '#8b949e' }}>
            Admin credentials set via environment variables.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/blog" className="text-sm hover:underline" style={{ color: '#8b949e' }}>← Back to Blog</Link>
        </div>
      </div>
    </div>
  );
}
