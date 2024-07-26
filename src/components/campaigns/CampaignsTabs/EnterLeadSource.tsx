import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export function EnterLeadSource({ profiles, setProfiles }: any) {
  const [frontendProfile, setFrontendProfile] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = async (e: any) => {
    if (e.key === "Enter") {
      setLoading(true);
      const profileId = (e.target as HTMLInputElement).value;
      console.log(profileId);
      const res: any = await axios.get(
        `https://twitter2.good6.top/api/base/apitools/uerByIdOrNameLookUp?apiKey=NJFa6ypiHNN2XvbeyZeyMo89WkzWmjfT3GI26ULhJeqs6%7C1539340831986966534-8FyvB4o9quD9PLiBJJJlzlZVvK9mdI&screenName=${profileId}`
      );
      console.log(res);
      const userData = await JSON.parse(res?.data.data);
      console.log(userData);

      const profileObj = {
        id: userData[0].id,
        username: userData[0].screen_name,
        name: userData[0].name,
        pfp: userData[0].profile_image_url_https,
        followers_count: userData[0].followers_count,
        description: userData[0].description,
      };

      console.log(profileObj);
      setProfiles([...profiles, profileObj.username]);

      setFrontendProfile([...frontendProfile, profileObj]);
      // setProfiles(data);
      setLoading(false);
      setSuccess(true);

      // Reset the input value
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleDeleteProfile = (id: string) => {
    const updatedProfilesFrontend = frontendProfile.filter(
      (profile: any) => profile.username !== id
    );
    setFrontendProfile(updatedProfilesFrontend);

    const updatedProfiles = profiles.filter((profile: any) => profile !== id);
    setProfiles(updatedProfiles);
  };

  return (
    <div className=" ">
      <Input
        type="text"
        placeholder="Enter Profile"
        className="w-72 bg-[#12132D]"
        onKeyDown={handleInputChange}
      />
      <div className="m-30 mx-auto mb-20 mt-6 w-full rounded-2xl bg-card px-8 py-5">
        {loading && <p>Loading...</p>}
        {success && <p>Profile Added!</p>}
        {frontendProfile.map((profile: any) => (
          <div
            key={profile.id}
            className="flex flex-row justify-between border-b border-gray-700 py-5"
          >
            <div className="ml-12 mr-12 flex w-48 gap-3 text-white">
              <Image
                src={profile.pfp}
                width={30}
                height={30}
                alt="profile"
                className="rounded-full"
              />
              {profile.name}
            </div>

            <div className="text-white">
              {profile.followers_count} Followers
            </div>

            <Button
              onClick={() => handleDeleteProfile(profile.username)}
              className="rounded-full"
              variant="ghost"
            >
              <Image
                src="/assets/trashbin.svg"
                width={25}
                height={25}
                alt="trashbin"
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
