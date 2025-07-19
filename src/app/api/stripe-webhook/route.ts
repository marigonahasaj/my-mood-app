import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

import { paid_users } from '../../../utils/payment';

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;
      
      if (email) {
        paid_users.add(email);
        console.log(`✅ Payment confirmed for: ${email}`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }
}

 