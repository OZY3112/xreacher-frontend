import EnterAccountForm from "@/components/Forms/EnterAccountForm";
import AccountTable from "@/components/tables/AccountTable";
import React from "react";

type Props = {
  email: string;
  userId: string;
  profiles: [
    { _id: string; status: string; name: string; profilePicture: string },
  ];
};

export default function EnterAccountTab({ email, userId, profiles }: Props) {
  return (
    <>
      <EnterAccountForm email={email} userId={userId} />
      <AccountTable profiles={profiles} />
    </>
  );
}
