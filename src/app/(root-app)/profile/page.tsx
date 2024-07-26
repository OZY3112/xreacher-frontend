import AccountsTabs from "@/components/root/AccountsTabs";
import NavHeader from "@/components/root/NavHeader";
import React from "react";
import { isUserSubscribed } from "@/lib/utils";
import { fetchGeneralUserData } from "@/server/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {};

export default async function page({}: Props) {
  const user = await currentUser();
 
  if (!user) redirect("/sign-in");

  const data: any = await fetchGeneralUserData(
    user?.emailAddresses[0].emailAddress as string
  );


  const IsUserSubbed = isUserSubscribed(data);
  console.log(user, data, IsUserSubbed);

  if (!IsUserSubbed) redirect("/pricing");

  return (
    <div className="w-full bg-bg">
      <NavHeader title="Accounts" />

      {/* Profile */}
      <main className="mx-auto flex w-[95%] flex-col justify-center ">
        {/* video */}
        {/* Tabs */}

        <AccountsTabs
          stripeCustomerId={data?.plan?.stripeCustomerId}
          email={user?.emailAddresses[0].emailAddress as string}
          userId={data._id.toString()}
          profiles={data.profiles}
        />
      </main>
    </div>
  );
}
