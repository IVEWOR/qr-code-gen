import { NextResponse } from 'next/server';
import { plans } from "@/components/Pricing";
import connectDB from "@/db/db.connect";
import User from "@/models/user";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SEC_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK;

export async function POST(req) {
    await connectDB();
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    let data;
    let eventType;
    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case "checkout.session.completed": {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                const session = await stripe.checkout.session.retrieve(
                    data.object.id,
                    {
                        expand: ["line_items"]
                    }
                );
                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const priceId = session?.line_items?.data[0]?.price.id;
                const plan = plans.monthly.find(p => p.priceId === priceId);

                if (!plan) break;

                let user;

                if (customer.email) {
                    user = await User.findOne({ email: customer.email });

                    if (!user) {
                        user = await User.create({
                            email: customer.email,
                            name: customer.name,
                            customerId
                        });

                        await user.save();
                    }
                } else {
                    console.error('No user found');
                    throw new Error('No user found');
                }
                user.priceId = priceId;
                user.hasAccess = true;
                await user.save();

                break;
            }
        }
    }
}
