"use client";

import { ManageUserSubscriptionButton } from "@/components/stripe/manageUserSubscriptionButton";
import Image from "next/image";
import { Button } from "../ui/button";
import React from "react";
import { upgradeSubscription } from "@/server/actions/stripe";
import { Loader2 } from "lucide-react";

export default function Premium({
  customerId,
  premium,
  user,
  subscriptionPlan,
  email,
  buttonState,
}: any) {
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await upgradeSubscription(
        email,
        subscriptionPlan,
        customerId
      );
    });
  };

  return (
    <div
      className="price-card-bg border-1 my-auto h-[550px] w-80 w-80 min-w-[350px]  rounded-[24px]
     border border-[#3A4B8E] max-lg:m-auto max-lg:mt-20 lg:rounded-r-[24px]"
    >
      <div className="mx-auto -mt-12 flex h-24 w-24 content-center items-center rounded-full bg-[#223272] ">
        <Image
          src={premium.icon}
          width={50}
          height={50}
          alt="premium"
          className="m-auto object-cover object-fill "
        />
      </div>
      <div className="mx-auto mt-10 w-fit rounded-3xl border border-2 border-white p-2 px-6 font-bold">
        Core
      </div>
      <div className="mx-auto mt-8 text-center text-6xl font-extrabold">
        {premium.price}
      </div>
      <h3 className="mt-5 text-center text-2xl font-semibold">
        {premium.title}
      </h3>
      <div className="mx-auto mt-5 flex flex-col justify-center">
        <ul className="mx-auto space-y-4">
          {premium.features.map((feature: any, key: any) => (
            <li className=" flex space-x-2" key={key}>
              <Image
                src="/assets/checkmark.svg"
                width={30}
                height={30}
                alt="premium"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <form onSubmit={handleSubmit}>
          <Button
            className="mx-auto mb-7 mt-6 flex rounded-3xl bg-[#890695FA] p-4 px-8 text-sm"
            disabled={buttonState.disabled}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {buttonState.label}
          </Button>
        </form>
      )}
    </div>
  );
}
