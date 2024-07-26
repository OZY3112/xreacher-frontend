import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnterAccountTab from "./EnterAccountTab";
import SubscriptionTab from "./SubscriptionTab";
import BlockListTab from "./BlockListTab";

type Props = {
  email: string;
  userId: string;
  stripeCustomerId: string;
  profiles: [
    { _id: string; status: string; name: string; profilePicture: string },
  ];
};

export default function Index({ email, userId, stripeCustomerId, profiles }: Props) {
  return (
    <Tabs defaultValue="accounts" className="mx-auto mt-12 w-full">
      {/* tab links */}
      <TabsList>
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="subscription">Subscription</TabsTrigger>
        <TabsTrigger value="blocklist">Blocklist</TabsTrigger>
      </TabsList>
      <TabsContent value="accounts">
        {/* Enter Account form and list */}
        <EnterAccountTab email={email} userId={userId} profiles={profiles} />
      </TabsContent>
      <TabsContent value="subscription">
        {/* Blocklist */}
        <SubscriptionTab stripeCustomerId={stripeCustomerId} />
      </TabsContent>
      <TabsContent value="blocklist">
        {/* Blocklist  */}
        <BlockListTab userId={userId}/>
      </TabsContent>
    </Tabs>
  );
}
