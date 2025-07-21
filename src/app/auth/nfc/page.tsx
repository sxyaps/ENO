'use client';

export default function NfcRedirect() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-lg">Authenticating NFC tag...</div>
        <p className="mt-4 text-white/60 text-sm">This is a static page. In production, this would redirect to the authentication system.</p>
        <div className="mt-8">
          <a href="/auth" className="border border-white/30 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors">
            Go to Authentication Page
          </a>
        </div>
      </div>
    </div>
  );
}
