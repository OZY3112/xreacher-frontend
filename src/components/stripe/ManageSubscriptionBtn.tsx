"use client";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = { stripeCustomerId: string };

export default function ManageSubscriptionBtn({ stripeCustomerId }: Props) {
  const router = useRouter();

  async function managePayment() {
    const billingUrl = absoluteUrl("/pricing");
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    });

    router.push(stripeSession.url);
  }
  return (
    <Button
      className="!bg-[#6C48F7]"
      variant="destructive"
      onClick={managePayment}
    >
      Manage payment
    </Button>
  );
}
