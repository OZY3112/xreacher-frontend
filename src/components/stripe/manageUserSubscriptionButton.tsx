"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { manageStripeSubscriptionAction } from "@/server/actions/stripe";

interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
}

export function ManageUserSubscriptionButton({
  userId,
  email,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("PARAMSSSSSS", stripePriceId, email, userId);

    startTransition(async () => {
      try {
        const session = await manageStripeSubscriptionAction({
          stripePriceId,
          email,
          userId,
        });
        if (session) {
          window.location.href = session.url ?? "/dashboard/billing";
        }
      } catch (err) {
        console.error((err as Error).message);
        toast({ description: "Something went wrong, please try again later." });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        disabled={isPending}
        className="mx-auto mb-7 mt-6 flex rounded-3xl bg-[#890695FA] p-4 px-8 text-sm"
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Subscribe
      </Button>
    </form>
  );
}
