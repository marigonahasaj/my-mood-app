import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customer_email = body.email;

    if (!customer_email) {
      return NextResponse.json(
        { error: "Missing customer email" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customer_email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 499, // $4.99
            product_data: {
              name: "Mood Profile Save + Coffee Tip",
              description: "Support the coder and skip setup next time ☕",
            },
          },
          quantity: 1,
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("❌ Stripe session creation failed:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
} 