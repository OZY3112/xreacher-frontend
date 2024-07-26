"use client";

import React, { useState } from "react";
import CampaignsNavHeader from "./CampaignsNavHeader";
import CampaignsPageTable from "../tables/CampaignsPageTable";

type Props = { parsedOps: any };

export default function CampaignsPage({ parsedOps }: Props) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("newest");
  return (
    <>
      <CampaignsNavHeader
        title="Campaigns"
        setStatusFilter={setStatusFilter}
        setOrderFilter={setOrderFilter}
      />

      {/* Campaigns */}
      <main className="mx-auto flex w-full flex-col justify-center ">
        <div className="mx-auto mt-12 w-full rounded-3xl bg-card ">
          <CampaignsPageTable
            parsedOps={parsedOps}
            orderFilter={orderFilter}
            statusFilter={statusFilter}
          />
        </div>
      </main>
    </>
  );
}
