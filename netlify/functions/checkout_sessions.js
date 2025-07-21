const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'ENO-YEK Black Box Pre-Order',
              description: 'First drop, exclusive pre-order pricing',
            },
            unit_amount: 9900,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
