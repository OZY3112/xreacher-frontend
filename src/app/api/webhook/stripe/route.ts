import { stripe } from "@/lib/stripe";
import User from "@/server/models/user.model";
import { connectToDB } from "@/server/mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  await connectToDB();

  const body = await request.text();
  const signature = headers().get("stripe-signature") ?? "";

  // let event: Stripe.Event;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    // console.log(event);
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      {
        res: `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      },
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  // console.log(session);
  if (!session?.metadata?.userId) {
    return NextResponse.json(null, {
      status: 200,
    });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log(subscription);

    console.log(`
    ${session.customer_email}

    plan: ${subscription.items.data[0].price.id},
    endDate: "${subscription.current_period_end * 1000}",
    startDate: "${subscription.current_period_start * 1000}"`);

    const user = await User.findOneAndUpdate(
      { email: session.customer_email },
      {
        paymentInfo: {
          stripeCustomerId: subscription.customer as string,
          plan: subscription.items.data[0].price.id as string,
          endDate: new Date(subscription.current_period_end * 1000),
          subbed: true,
        },
      }
    );

    console.log(user);
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log(subscription);
    await User.findOneAndUpdate(
      { email: session.customer_email },
      {
        paymentInfo: {
          plan: subscription.items.data[0].price.id,
          endDate: new Date(subscription.current_period_end * 1000),
          subbed: true,
        },
      }
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log(subscription);
    await User.findOneAndUpdate(
      { email: session.customer_email },
      {
        paymentInfo: {
          plan: subscription.items.data[0].price.id,
          endDate: new Date(subscription.current_period_end * 1000),
          subbed: true,
        },
      }
    );
  }

  return NextResponse.json(null, { status: 200 });
}
