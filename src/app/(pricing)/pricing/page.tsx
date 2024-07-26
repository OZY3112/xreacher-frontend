import { getUserSubscriptionPlan } from "@/lib/subscription";
import { getUserPaymentInfo } from "@/server/actions/stripe";
import { redirect } from "next/navigation";
import React from "react";
import { priceCards } from "@/constants";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Basic from "@/components/cards/Basic";
import Pro from "@/components/cards/Pro";
import Premium from "@/components/cards/Premium";

type Props = {};
type paymentInfoType = {
  plan: string;
  startDate: string;
  endDate: any;
};
export async function checkPaymentPlanPerms(paymentInfo: paymentInfoType) {
  const plans = [
    process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
  ];

  const isSubscribed =
    paymentInfo.plan &&
    plans.includes(paymentInfo.plan) &&
    paymentInfo.endDate &&
    new Date(paymentInfo.endDate).getTime() + 86_400_000 > Date.now();

  // if (isSubscribed) return redirect("/user-info");
}
export default async function page({}: Props) {
  const { basic, premium, professional } = priceCards;

  const currUser = await currentUser();
  if (!currUser) return redirect("/sign-in");

  const subscriptionPlan = await getUserSubscriptionPlan(
    currUser?.emailAddresses[0].emailAddress
  );

  const user = await getUserPaymentInfo(
    currUser?.emailAddresses[0].emailAddress as string
  );

  // checkPaymentPlanPerms(user.paymentInfo);

  return (
    <div>
      <div className=" mx-auto justify-center py-28 text-white bg-bg lg:flex">
        <Basic
          basic={basic}
          user={user}
          subscriptionPlan={subscriptionPlan}
          email={currUser?.emailAddresses[0].emailAddress}
        />
        <Pro
          professional={professional}
          user={user}
          subscriptionPlan={subscriptionPlan}
          email={currUser?.emailAddresses[0].emailAddress}
        />
        <Premium
          premium={premium}
          user={user}
          subscriptionPlan={subscriptionPlan}
          email={currUser?.emailAddresses[0].emailAddress}
        />
      </div>

      <div className="pb-12">
        <Link
          href="/"
          className=" mx-auto flex w-fit justify-center rounded-full border px-4 py-2 text-white"
        >
          Return To Home
        </Link>
      </div>
    </div>
  );
}
