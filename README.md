This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI API Key - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key-here

# Stripe Keys - Get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Next.js Base URL - For production, change to your domain
NEXT_PUBLIC_BASE_URL=http://localhost:3000


```

### Environment Variable Setup:

1. **For Local Development**: Create `.env.local` file
2. **For Vercel**: Add these variables in your Vercel dashboard
3. **For Production**: Update `NEXT_PUBLIC_BASE_URL` to your domain

### Getting API Keys:

- **OpenAI**: Visit https://platform.openai.com/api-keys
- **Stripe**: Visit https://dashboard.stripe.com/apikeys
- **Stripe Webhook**: Create webhook in Stripe dashboard pointing to `/api/stripe-webhook`

## API Routes

The backend functionality has been converted from FastAPI to Next.js API routes:

- `/api/generate-response` - Generates AI responses based on mood data
- `/api/create-checkout-session` - Creates Stripe checkout sessions
- `/api/stripe-webhook` - Handles Stripe webhook events
- `/api/has-paid` - Checks if a user has paid
- `/api/verify-payment` - Verifies payment status

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
