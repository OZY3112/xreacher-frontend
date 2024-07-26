import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import LeadsContent from "./CampaignsTabs/LeadsContent";
import ScriptsContent from "./CampaignsTabs/ScriptsContent";
import ScrapeOptions from "./ScrapeOptions";

export default function CampaignTabs({
  userProfiles,
  // scripts
  setScripts,
  scripts,
  // bio
  setBioExclude,
  setBioInclude,
  bioExclude,
  bioInclude,
  // location
  locationExclude,
  setLocationExclude,
  locationInclude,
  setLocationInclude,

  // following
  following,
  setFollowing,

  // followers
  followers,
  setFollowers,

  //verified
  Verified,
  setVerified,

  // scrape profiles
  profiles,
  setProfiles,

  // profiles to be used
  profilesToBeUsed,
  setProfilesToBeUsed,

  // settings
  dmsPerDay,
  setDmsPerDay,
  skipPreviouslyContacted,
  setSkipPreviouslyContacted,
  crossAccountPrevent,
  setCrossAccountPrevent,

  startCampaign,
}: any) {
  return (
    <div className="mx-auto w-11/12 ">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="leads" className="mx-auto mt-12 w-full">
          {/* tab links */}
          <TabsList className="flex justify-between">
            <div>
              <TabsTrigger value="leads">Leads</TabsTrigger>
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
          <TabsContent value="leads">
            <LeadsContent
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
              setVerified={setVerified}
              profiles={profiles}
              setProfiles={setProfiles}
            />
          </TabsContent>
          <TabsContent value="message">
            <ScriptsContent setScripts={setScripts} scripts={scripts} />
          </TabsContent>
          <TabsContent value="options">
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
  );
}
