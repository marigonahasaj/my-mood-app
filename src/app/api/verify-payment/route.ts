import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { paid_users } from '../../../utils/payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json(
      { error: "Missing session_id parameter" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const payment_status = session.payment_status;
    const email = session.customer_email;

    if (payment_status === "paid" && email) {
      paid_users.add(email);
      return NextResponse.json({ status: "paid", email: email });
    }

    return NextResponse.json({ status: payment_status, email: email });

  } catch (error) {
    console.error("❌ Failed to verify session:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
} 