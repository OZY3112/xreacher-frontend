"use server";

import Profile from "../models/profile.model";
import { connectToDB } from "../mongoose";

export async function getProfileStatisticsWithinDate(
  profileId: string,
  endDate: string
) {
  try {
    await connectToDB();

    const profileStatistics: any = await Profile.findById(profileId)
      .select("_id statistics")
      .lean();

    if (profileStatistics && profileStatistics?.statistics) {
      // Filter statistics after endDate and sort them by createdAt
      const filteredStatistics = profileStatistics.statistics
        .filter((stat: any) => new Date(stat.createdAt) > new Date(endDate))
        .sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      // Return the filtered and sorted statistics
      return { ...profileStatistics, statistics: filteredStatistics };
    }

    return profileStatistics;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
