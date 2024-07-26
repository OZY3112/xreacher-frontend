import AddBlockListForm from "@/components/Forms/AddBlockListForm";
import BlockListTable from "@/components/tables/BlockListTable";
import React from "react";

type Props = { userId : string};

export default function BlockListTab({ userId }: Props) {
  return (
    <>
      <AddBlockListForm userId={userId}/>
      <BlockListTable />
    </>
  );
}
