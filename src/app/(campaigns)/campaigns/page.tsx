import CampaignsPage from "@/components/campaigns/CampaignsPage";
import NavHeader from "@/components/root/NavHeader";
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

  console.log(data);

  // const parsedProfiles = data?.profiles?.map((profile: any) => {
  //   return {
  //     _id: profile._id.toString(),
  //     status: profile.status,
  //     profilePicture: profile.profilePicture,
  //     name: profile.name,
  //   };
  // });
  const parsedOps = data?.operations?.map((op: any) => {
    return {
      _id: op._id.toString(),
      status: op.status,
      title: op.title,
      usersDMed: op.usersDMed?.length,
      usersResponded: op.usersResponded?.length,
      progress: op.progress ?? 0,
    };
  });

  console.log(parsedOps);
  return (
    <div className="w-full bg-bg p-6">
      <CampaignsPage parsedOps={parsedOps} />
    </div>
  );
}
