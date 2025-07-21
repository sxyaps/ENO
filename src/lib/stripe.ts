'use client';
export async function redirectToCheckout() {
  try {
    // Use Netlify function in production, Next.js API locally
    const isNetlify = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const endpoint = isNetlify
      ? '/.netlify/functions/checkout_sessions'
      : '/api/checkout_sessions';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Unable to start checkout. Please try again.');
    }
  } catch (err) {
    alert('Checkout error.');
  }
}
