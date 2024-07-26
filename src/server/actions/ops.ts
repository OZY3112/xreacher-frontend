"use server";

import axios from "axios";
import Op from "../models/operation";
import Profile from "../models/profile.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchOps(userId: string) {
  try {
    connectToDB();

    const ops = await User.findOne({
      _id: userId,
    })
      .select("_id operations")
      .populate({
        path: "operations",
        model: Op,
        select: "_id status usersDMed usersResponded title",
      });

    return ops.operations.reverse();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function terminateScrape(opId: string) {
  try {
    await connectToDB();

    const op = await Op.findOneAndUpdate(
      { _id: opId },
      {
        status: "TERMINATED",
      }
    );

    console.log(op);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function IsOpRunning(userId: string) {
  try {
    connectToDB();

    const user: any = await User.findOne({ _id: userId })
      .select("_id operations")
      .populate({
        path: "operations",
        model: Op,
        select: "_id status",
        populate: {
          path: "user",
          model: User,
          select: "_id",
        },
      });
    console.log(user);
    const operations = user?.operations;

    console.log(operations);

    for (const op of operations) {
      if (op.status === "PENDING") {
        return true;
      }
    }

    return false;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function fetchLatestActiveOp(profileId: string) {
  try {
    connectToDB();

    const Ops: any = await Profile.findOne({ _id: profileId }).select(
      "operations"
    );

    const resentOp = Ops.operations.pop();
    const op = await Op.findOne({ _id: resentOp }).select(
      "status title progress"
    );

    return op;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

type StartCampaignStart = {
  userId: string;
  title: string;
  settings: {
    profilesToBeUsed: string[];
    dmsPerDay: number;
    skipPreviouslyContacted: boolean;
    crossAccountPrevent: boolean;
    scrapeProfiles: string[];
  };
  options: {
    bioExclude: string[];
    bioInclude: string[];
    locationInclude: string[];
    locationExclude: string[];
    followers: [number, number];
    following: [number, number];
    verified: boolean;
  };
  scripts: string[];
};
export async function UploadCampaignAndStart(params: StartCampaignStart) {
  try {
    await connectToDB();

    const { userId, title, settings, options, scripts } = params;

    console.log(params);

    const newOP = await Op.create({
      user: userId,
      title,
      status: "PENDING",
      usersDMed: [],
      usersResponded: [],
      settings,
      options,
      scripts,
    });

    console.log(newOP);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { operations: newOP._id } }
      // { new: true }
    );

    // console.log(user);
    console.log(newOP._id);

    await axios.get("https://xreacher.net/api/scrape", {
      params: {
        opId: newOP._id,
      },
    });

    return { res: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function UploadCampaignAndStartOpenSea(params: StartCampaignStart) {
  try {
    await connectToDB();

    const { userId, title, settings, options, scripts } = params;

    console.log(params);

    const newOP = await Op.create({
      user: userId,
      title,
      status: "PENDING",
      usersDMed: [],
      usersResponded: [],
      settings,
      options,
      scripts,
    });

    console.log(newOP);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { operations: newOP._id } }
      // { new: true }
    );

    // console.log(user);
    console.log(newOP._id);

    await axios.get("https://xreacher.net/api/scrape/opensea", {
      params: {
        opId: newOP._id,
      },
    });

    return { res: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
