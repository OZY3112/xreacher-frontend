"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

interface ManageStripeSubscriptionActionProps {
  stripePriceId: string;
  email: string;
  userId: string;
}

export const manageStripeSubscriptionAction = async ({
  stripePriceId,
  email,
  userId,
}: ManageStripeSubscriptionActionProps) => {
  const billingUrl = absoluteUrl("/pricing");

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
    },
  });

  return { url: stripeSession.url };
};

export async function getUserPaymentInfo(email: string) {
  try {
    connectToDB();

    return await User.findOne({ email: email }).select("paymentInfo");
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function upgradeSubscription(
  email: string,
  newPriceId: string,
  customerId: string
) {
  await connectToDB();

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    });

    const sub = subscriptions.data[0];

    const subscriptionItem = await stripe.subscriptionItems.update(sub.id, {
      price: newPriceId,
    });

    if (subscriptionItem) {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          paymentInfo: {
            plan: newPriceId,
          },
        }
      );

      console.log(updatedUser);
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
