import { Badge } from "../ui/badge";
import DeleteProfileBtn from "../buttons/DeleteProfileBtn";
import Image from "next/image";

type Props = {
  profiles: [
    {
      _id: string;
      status: string;
      name: string;
      profilePicture: string;
    },
  ];
};

export default function AccountTable({ profiles }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-800"; // Adjust the green shade as needed
      case "PENDING":
        return "bg-blue-800"; // Adjust the blue shade as needed
      case "ERRORED":
        return "bg-red-800"; // Adjust the red shade as needed
      default:
        return "bg-gray-500"; // Fallback color
    }
  };
  return (
    <div className="m-30 mx-auto mb-20 mt-12 w-11/12 w-full rounded-3xl bg-card px-8 py-5">
      {profiles.map((profile) => (
        <div className="flex flex-row border-b border-gray-700 py-5">
          <div className="ml-12 mr-12 w-48 text-white flex gap-3">
            <Image src={profile.profilePicture} width={25} height={25} alt="profile"  className="rounded-full"/>{profile.name}</div>
          <div className="">
            <Badge className={` text-white ${getStatusColor(profile.status)}`}>
              {profile.status}
            </Badge>
          </div>

          <DeleteProfileBtn id={profile._id} />
        </div>
      ))}
    </div>
  );
}
