import AnalyticsChart from "@/components/charts/AnalyticsChart";
import DashboardTabs from "@/components/root/DashboardTabs";
import NavHeader from "@/components/root/NavHeader";
import React from "react";
import { isUserSubscribed } from "@/lib/utils";
import { fetchGeneralUserData } from "@/server/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfileStatisticsWithinDate } from "@/server/actions/profiles";

type Props = {
  params: {
    id: string;
    sorting: string;
  };
};

export default async function page({ params }: Props) {
  const { id, sorting } = params;
  console.log(id, sorting);
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const data: any = await fetchGeneralUserData(
    user?.emailAddresses[0].emailAddress as string
  );

  const IsUserSubbed = isUserSubscribed(data);

  if (!IsUserSubbed) redirect("/pricing");

  const parsedProfiles = data?.profiles.map((profile: any) => {
    return {
      _id: profile._id.toString(),
      status: profile.status,
      profilePicture: profile.profilePicture,
      name: profile.name,
    };
  });
  const parsedOps = data?.operations?.map((op: any) => {
    return {
      _id: op._id.toString(),
      status: op.status,
      title: op.title,
      usersDMed: op.usersDMed?.length,
      usersResponded: op.usersResponded?.length,
    };
  });

  const currentDate = new Date();
  let sortingDate;

  switch (sorting) {
    case "weekly":
      sortingDate = currentDate.setDate(currentDate.getDate() - 7).toString();
      break;
    case "monthly":
      sortingDate = currentDate.setMonth(currentDate.getMonth() - 1).toString();
      break;
    case "3months":
      sortingDate = currentDate.setMonth(currentDate.getMonth() - 3).toString();
      break;
    case "6months":
      sortingDate = currentDate.setMonth(currentDate.getMonth() - 6).toString();
      break;
    case "allTime":
      sortingDate = currentDate
        .setMonth(currentDate.getMonth() - 12)
        .toString();
      break;
    default:
      sortingDate = currentDate.setDate(currentDate.getDate() - 7).toString();
      break;
  }

  const stats = await getProfileStatisticsWithinDate(id, sortingDate);

  console.log(stats, 
    "stats"
  );

  return (
    <div className="bg-bg">
      <NavHeader title="Analytics" />

      {/* Analytics */}
      <main className="mx-auto flex w-[95%] flex-col justify-center ">
        {/* Analytics Chart for statistics */}
        <AnalyticsChart profileId={id} stats={stats.statistics} />

        {/* Campaigns and Accounts tabs */}
        <DashboardTabs profiles={parsedProfiles} ops={parsedOps} />
      </main>
    </div>
  );
}
