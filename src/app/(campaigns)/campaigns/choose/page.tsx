import ChooseCampaignTypePage from "@/components/campaigns/ChooseCampaignTypePage";

type Props = {};

export default async function page({}: Props) {
  // const user = await currentUser();

  // if (!user) redirect("/sign-in");

  // const data: any = await fetchNewCampaignData(
  //   user?.emailAddresses[0].emailAddress as string
  // );

  // const IsUserSubbed = isUserSubscribed(data);
  // if (!IsUserSubbed) redirect("/pricing");

  // const parsedProfiles = data?.profiles?.map((profile: any) => {
  //   return {
  //     _id: profile._id.toString(),
  //     status: profile.status,
  //     profilePicture: profile.profilePicture,
  //     name: profile.name,
  //   };
  // });

  return <ChooseCampaignTypePage />;
}
