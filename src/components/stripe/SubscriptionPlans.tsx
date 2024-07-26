import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { storeSubscriptionPlans } from "@/constants";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { redirect } from "next/navigation";
import SignIn from "../auth/SignIn";
import { ManageUserSubscriptionButton } from "./manageUserSubscriptionButton";
import { getUserPaymentInfo } from "@/server/actions/stripe";

export default async function SubscriptionPlans() {
  const session = await getAuthSession();
  if (!session) return redirect("/");

  const subscriptionPlan = await getUserSubscriptionPlan();

  const user = await getUserPaymentInfo(session?.user?.email as string);
  const isSubbed =
    user.paymentInfo.plan ==
    (process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID as string);
  // console.log(process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID);
  // console.log(isSubbed);
  // console.log(user.paymentInfo.plan);

  return (
    <div className="min-h-[calc(100vh-57px)] px-4 py-8 text-white md:px-16 lg:px-24">
      <Card className="mb-2 p-6">
        <p className="text-lg font-semibold leading-none">
          {subscriptionPlan.name}
        </p>
        <p className="text-muted-foreground text-sm">
          {!subscriptionPlan.isSubscribed
            ? "You are not subscribed to any plan."
            : subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          {subscriptionPlan?.stripeCurrentPeriodEnd
            ? new Date(
                subscriptionPlan.stripeCurrentPeriodEnd
              ).toLocaleDateString()
            : null}
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {storeSubscriptionPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-end">
              {user ? (
                <ManageUserSubscriptionButton
                  userId={JSON.stringify(user._id)}
                  email={session?.user?.email || ""}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                  isSubscribed={isSubbed}
                  isCurrentPlan={subscriptionPlan?.name === plan.name}
                />
              ) : (
                <SignIn />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
