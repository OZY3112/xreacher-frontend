import User from "@/server/models/user.model";
import { connectToDB } from "@/server/mongoose";
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import Profile from "@/server/models/profile.model";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("request body", req.url?.toString());

  const url = new URL(req.url?.toString() as string);
  const userId = url.pathname.split("/")[3];

  await connectToDB();

  console.log("it started");

  const updates = await Profile.findOne({
    _id: userId,
  }).select("live_updates");

  if (updates.live_updates.length > 200) {
    updates.live_updates = updates.live_updates.slice(0, 100);
    await updates.save();
  }

  console.log(updates);

  return Response.json({ live_updates: updates.live_updates });
}
