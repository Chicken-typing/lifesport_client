import Stripe from 'stripe';

export {}; // Thêm dòng này để biến tệp thành một module

const config: Stripe.StripeConfig = { apiVersion: '2023-10-16' };
const key = process.env.STRIPE_SECRET_KEY ?? '';
const stripe = new Stripe(key, config);
