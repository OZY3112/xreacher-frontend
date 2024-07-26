// File: pages/api/profiles/[profileId]/statistics.ts

import { getProfileStatisticsWithinDate } from "@/server/actions/profiles";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { profileId } = req.query;
  const { startDate, endDate } = req.body;

  if (!profileId || !startDate || !endDate) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const statistics = await getProfileStatisticsWithinDate(
      profileId as string,
      startDate,
      endDate
    );

    console.log(statistics);
      return NextResponse.json({
        data: statistics,
      });
  } catch (error) {
  }
}
