"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import React, { Suspense, useState } from "react";
import KeywordFilters from "./KeywordFilters";
import ScriptsContent from "../CampaignsTabs/ScriptsContent";
import ScrapeOptions from "../ScrapeOptions";
import { MantineProvider, Overlay, Stepper } from "@mantine/core";
import NameCampaign from "../NameCampaign";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UploadCampaignAndStartOpenSea } from "@/server/actions/ops";

type Props = {
  userId: string;
  userProfiles: [
    {
      _id: string;
      status: string;
      profilePicture: string;
      name: string;
    },
  ];
};

export default function OpenSeaPage({ userId, userProfiles }: Props) {
  // router
  const router = useRouter();

  // toast
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // States
  const [title, setTitle] = useState<string>("");
  const [scripts, setScripts] = useState<string[]>([]);
  const [bioExclude, setBioExclude] = useState<string[]>([]);
  const [bioInclude, setBioInclude] = useState<string[]>([]);
  const [locationInclude, setLocationInclude] = useState<string[]>([]);
  const [locationExclude, setLocationExclude] = useState<string[]>([]);
  const [followers, setFollowers] = useState<[number, number]>([0, 0]);
  const [following, setFollowing] = useState<[number, number]>([0, 0]);
  const [Verified, setVerified] = useState<string>("any");
  const [profiles, setProfiles] = useState<string[]>([]);

  // Settings
  const [profilesToBeUsed, setProfilesToBeUsed] = useState<string[]>([]);
  const [dmsPerDay, setDmsPerDay] = useState<string>("250");
  const [skipPreviouslyContacted, setSkipPreviouslyContacted] = useState(true);
  const [crossAccountPrevent, setCrossAccountPrevent] = useState(false);

  // Steps
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const optionsObject = {
    userId,
    title,
    settings: {
      profilesToBeUsed,
      dmsPerDay: parseInt(dmsPerDay),
      skipPreviouslyContacted,
      crossAccountPrevent,
      scrapeProfiles: profiles,
    },
    options: {
      bioExclude,
      bioInclude,
      locationInclude,
      locationExclude,
      followers,
      following,
      verified: Verified === "verified" ? true : false,
    },
    scripts,
  };

  async function startCampaign() {
    setLoading(true);
    console.log("start campaign");

    console.log(optionsObject);

    if (optionsObject.scripts.length === 0) {
      toast({
        variant: "destructive",
        title: "Please add your sales scripts",
      });
      setLoading(false);
      return;
    }
    if (optionsObject.settings.scrapeProfiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select profiles to scrape",
      });
      setLoading(false);
      return;
    }
    if (optionsObject.settings.profilesToBeUsed.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select profiles to use in your scrape",
      });
      setLoading(false);
      return;
    }

    const { res } = await UploadCampaignAndStartOpenSea(optionsObject);
    setLoading(false);

    if (res)
      toast({
        title: "Success! your campaign has started!",
      });
    return router.push("/campaigns");
  }

  return (
    <MantineProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Stepper
          className="-mt-4"
          active={active}
          onStepClick={setActive}
          styles={{
            steps: {
              display: "none",
              marginTop: 0,
              paddingTop: 0,
            },
          }}
        >
          <Stepper.Step>
            <NameCampaign
              nextStep={nextStep}
              setTitle={setTitle}
              title={title}
            />
          </Stepper.Step>
          <Stepper.Step>
            {loading && (
              <Overlay color="#000" backgroundOpacity={0.015} blur={10} />
            )}
            <div className="mx-auto w-11/12 ">
              <div className="flex items-center justify-between">
                <Tabs defaultValue="filter" className="mx-auto mt-12 w-full">
                  {/* tab links */}
                  <TabsList className="flex justify-between">
                    <div>
                      <TabsTrigger value="filter">Filter</TabsTrigger>
                      <TabsTrigger value="message">Message</TabsTrigger>
                      <TabsTrigger value="options">Options</TabsTrigger>
                    </div>
                    <Button
                      className=" !bg-[#6C48F7]"
                      variant="destructive"
                      onClick={startCampaign}
                    >
                      Run Campaign
                    </Button>
                  </TabsList>
                  <TabsContent value="filter" className="mt-12  w-full ">
                    <KeywordFilters // bio
                      setBioExclude={setBioExclude}
                      setBioInclude={setBioInclude}
                      bioExclude={bioExclude}
                      bioInclude={bioInclude}
                      // location
                      locationExclude={locationExclude}
                      setLocationExclude={setLocationExclude}
                      locationInclude={locationInclude}
                      setLocationInclude={setLocationInclude}
                      // following
                      following={following}
                      setFollowing={setFollowing}
                      // followers
                      followers={followers}
                      setFollowers={setFollowers}
                      // verfied
                      Verified={Verified}
                      setVerified={setVerified}
                    />
                  </TabsContent>
                  <TabsContent value="message" className="mt-12  w-full ">
                    <ScriptsContent setScripts={setScripts} scripts={scripts} />
                  </TabsContent>
                  <TabsContent value="options" className="mt-12  w-full ">
                    <ScrapeOptions
                      userProfiles={userProfiles}
                      profilesToBeUsed={profilesToBeUsed}
                      setProfilesToBeUsed={setProfilesToBeUsed}
                      dmsPerDay={dmsPerDay}
                      setDmsPerDay={setDmsPerDay}
                      skipPreviouslyContacted={skipPreviouslyContacted}
                      setSkipPreviouslyContacted={setSkipPreviouslyContacted}
                      crossAccountPrevent={crossAccountPrevent}
                      setCrossAccountPrevent={setCrossAccountPrevent}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Stepper.Step>
        </Stepper>
      </Suspense>
    </MantineProvider>
  );
}
