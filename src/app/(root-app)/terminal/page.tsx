import NavHeader from "@/components/root/NavHeader";
import UserTerminals from "@/components/terminal/UserTerminals";
import { isUserSubscribed } from "@/lib/utils";
import { fetchGeneralUserData } from "@/server/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

type Props = {};

export default async function page({}: Props) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const data: any = await fetchGeneralUserData(
    user?.emailAddresses[0].emailAddress as string
  );

  const IsUserSubbed = isUserSubscribed(data);

  if (!IsUserSubbed) redirect("/pricing");
  return (
    <div className="w-full bg-bg">
      <NavHeader title="Terminal" />

      <UserTerminals profiles={data.profiles} />
    </div>
  );
}
