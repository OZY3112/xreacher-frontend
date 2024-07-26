import ManageSubscriptionBtn from "@/components/stripe/ManageSubscriptionBtn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import Basic from "@/components/upgrade/Basic";
import Pro from "@/components/upgrade/Pro";
import Premium from "@/components/upgrade/Premium";
import { currentUser } from "@clerk/nextjs/server";
import { priceCards } from "@/constants";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { getUserPaymentInfo } from "@/server/actions/stripe";

type Props = {
  stripeCustomerId: string;
};
function getButtonStateAndLabel(userPlan: string, cardPlan: string) {
  if (userPlan === cardPlan) {
    return { disabled: true, label: "Current Plan" };
  } else if (
    userPlan === "Premium" ||
    (userPlan === "Professional" && cardPlan === "Basic")
  ) {
    return { disabled: false, label: "Upgrade" };
  } else {
    return { disabled: false, label: "Downgrade" };
  }
}

export default async function SubscriptionTab({ stripeCustomerId }: Props) {
  const { basic, premium, professional } = priceCards;

  const currUser = await currentUser();
  if (!currUser) return redirect("/sign-in");

  const subscriptionPlan = await getUserSubscriptionPlan(
    currUser?.emailAddresses[0].emailAddress
  );

  const user = await getUserPaymentInfo(
    currUser?.emailAddresses[0].emailAddress as string
  );

  const basicButtonState = getButtonStateAndLabel(
    user.paymentInfo.plan,
    process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID as string
  );
  const proButtonState = getButtonStateAndLabel(
    user.paymentInfo.plan,
    process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID as string
  );
  const premiumButtonState = getButtonStateAndLabel(
    user.paymentInfo.plan,
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID as string
  );

  return (
    <>
      {/* Current plan card */}
      <div className="m-30 mx-auto mt-12 w-11/12  w-full rounded-3xl bg-card">
        <div className="mb-4 p-4 text-white">
          <h2 className="text-sm uppercase tracking-widest ">Current Plan</h2>
          <Separator className="my-4 !bg-slate-800" />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">Basic - $7/month</span>
            <div className="flex gap-2">
              <ManageSubscriptionBtn stripeCustomerId={stripeCustomerId} />
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto justify-center py-28 text-white lg:flex">
        <Basic
          buttonState={basicButtonState}
          basic={basic}
          user={user}
          customerId={subscriptionPlan?.stripeCustomerId}
          subscriptionPlan={subscriptionPlan}
          email={currUser?.emailAddresses[0].emailAddress}
        />
        <Pro
          buttonState={proButtonState}
          professional={professional}
          user={user}
          customerId={subscriptionPlan?.stripeCustomerId}
          subscriptionPlan={subscriptionPlan}
          email={currUser?.emailAddresses[0].emailAddress}
        />
        <Premium
          buttonState={premiumButtonState}
          premium={premium}
          user={user}
          customerId={subscriptionPlan?.stripeCustomerId}
          subscriptionPlan={process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID}
          email={currUser?.emailAddresses[0].emailAddress}
        />
      </div>
    </>
  );
}
