'use client';
export async function redirectToCheckout() {
  try {
    const res = await fetch('/.netlify/functions/checkout_sessions', {
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
