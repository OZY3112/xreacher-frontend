import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignsTab from "./CampaignsTab";
import AccountsTabs from "./AccountsTabs";

type Props = {
  profiles: [
    { _id: string; status: string; name: string; profilePicture: string },
  ];

  ops: [
    {
      _id: string;
      status: string;
      title: string;
      usersDMed: number;
      usersResponded: number;
    },
  ];
};

export default function DashboardTabs({ profiles, ops }: Props) {
  return (
    <>
      {/* dashboard tabs */}
      <Tabs defaultValue="campaigns" className="mx-auto mt-12 w-full">
        {/* tab links */}
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
        </TabsList>
        <TabsContent
          value="campaigns"
          className="m-30 mx-auto mt-12  w-full rounded-3xl bg-card"
        >
          {/* Campaigns Tab  */}
          <CampaignsTab ops={ops} />
        </TabsContent>
        <TabsContent
          value="accounts"
          className="m-30 mx-auto mt-12  w-full rounded-3xl bg-card"
        >
          {/* Accounts Tab  */}
          <AccountsTabs profiles={profiles} />
        </TabsContent>
      </Tabs>
    </>
  );
}
