import NewCampaignPage from "@/components/campaigns/NewCampaignPage";
import { isUserSubscribed } from "@/lib/utils";
import { fetchNewCampaignData } from "@/server/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {};

export default async function page({}: Props) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const data: any = await fetchNewCampaignData(
    user?.emailAddresses[0].emailAddress as string
  );

  const IsUserSubbed = isUserSubscribed(data);
  if (!IsUserSubbed) redirect("/pricing");

  const parsedProfiles = data?.profiles?.map((profile: any) => {
    return {
      _id: profile._id.toString(),
      status: profile.status,
      profilePicture: profile.profilePicture,
      name: profile.name,
    };
  });

  console.log(data);
  return (
    <NewCampaignPage
      userProfiles={parsedProfiles}
      userId={data._id.toString()}
    />
  );
}
