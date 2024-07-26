import { stripe } from "./stripe";
import { storeSubscriptionPlans } from "@/constants";
import { getUserData } from "@/server/actions/user";
import { redirect } from "next/navigation";
import User from "@/server/models/user.model";

export async function getUserSubscriptionPlan(email: string) {
  if (!email) {
    throw new Error("User not found.");
  }

  let user: any;
  user = await getUserData(email as string);
  if (!user) {
    user = await User.create({
      email,
    });
  }

  const plans = [
    process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
  ];

  const isSubscribed =
    user?.paymentInfo.plan &&
    plans.includes(user?.paymentInfo.plan) &&
    user?.paymentInfo.endDate &&
    new Date(user?.paymentInfo.endDate).getTime() + 86_400_000 > Date.now();

  // if (isSubscribed) return redirect("/user-info");
  
  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        (plan) => plan.stripePriceId === user.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd:
      new Date(user?.paymentInfo.endDate).getTime() + 86_400_000,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}

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

  if (isSubscribed) return;
  else return redirect("/pricing");
}
