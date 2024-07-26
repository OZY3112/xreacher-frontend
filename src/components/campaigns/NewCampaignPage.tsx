"use client";

import NameCampaign from "@/components/campaigns/NameCampaign";

import React, { Suspense } from "react";
import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  MantineProvider,
  Overlay,
} from "@mantine/core";
import CampaignTabs from "@/components/campaigns/LeadSources";
import { UploadCampaignAndStart } from "@/server/actions/ops";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

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

export default function NewCampaignPage({ userProfiles, userId }: Props) {
  // router
  const router = useRouter();

  // toast
  const { toast } = useToast();

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
  const [loading, setLoading] = useState(false);

  // Settings
  const [profilesToBeUsed, setProfilesToBeUsed] = useState<string[]>([]);
  const [dmsPerDay, setDmsPerDay] = useState<string>("250");
  const [skipPreviouslyContacted, setSkipPreviouslyContacted] = useState(true);
  const [crossAccountPrevent, setCrossAccountPrevent] = useState(false);

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

  // Steps
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  async function startCampaign() {
    console.log("start campaign");

    console.log(optionsObject);

    if (optionsObject.scripts.length === 0) {
      toast({
        variant: "destructive",
        title: "Please add your sales scripts",
      });
      return;
    }
    if (optionsObject.settings.scrapeProfiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select profiles to scrape",
      });
      return;
    }
    if (optionsObject.settings.profilesToBeUsed.length === 0) {
      toast({
        variant: "destructive",
        title: "Please select profiles to use in your scrape",
      });
      return;
    }

    setLoading(true);
    const { res } = await UploadCampaignAndStart(optionsObject);
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
            <CampaignTabs
              startCampaign={startCampaign}
              userProfiles={userProfiles}
              setScripts={setScripts}
              scripts={scripts}
              setBioExclude={setBioExclude}
              setBioInclude={setBioInclude}
              bioExclude={bioExclude}
              bioInclude={bioInclude}
              locationExclude={locationExclude}
              setLocationExclude={setLocationExclude}
              locationInclude={locationInclude}
              setLocationInclude={setLocationInclude}
              following={following}
              setFollowing={setFollowing}
              followers={followers}
              setFollowers={setFollowers}
              Verified={Verified}
              setVerified={setVerified}
              profiles={profiles}
              setProfiles={setProfiles}
              profilesToBeUsed={profilesToBeUsed}
              setProfilesToBeUsed={setProfilesToBeUsed}
              dmsPerDay={dmsPerDay}
              setDmsPerDay={setDmsPerDay}
              skipPreviouslyContacted={skipPreviouslyContacted}
              setSkipPreviouslyContacted={setSkipPreviouslyContacted}
              crossAccountPrevent={crossAccountPrevent}
              setCrossAccountPrevent={setCrossAccountPrevent}
            />
          </Stepper.Step>
        </Stepper>
      </Suspense>
    </MantineProvider>
  );
}
