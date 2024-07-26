"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Profile from "../models/profile.model";
import Op from "../models/operation";
import Template from "../models/template";
import {
  getUserDmsIds,
  getFollowersIds,
  extractUserFromXComUrl,
} from "@/lib/utils";
import axios from "axios";

export async function enterUser({
  auth_token,
  ct0,
  profileUrl,
  userEmail,
  userId,
}: {
  auth_token: string;
  ct0: string;
  profileUrl: string;
  userEmail: string;
  userId: string;
}) {
  try {
    connectToDB();
    const user_url = new URL(profileUrl);
    const parts = user_url.pathname.split("/");
    const username = parts[1];

    const user = await User.findById(userId).select(
      "_id profiles email paymentInfo"
    );

    let maxProfilesConnected;

    switch (user.paymentInfo.plan) {
      case process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID:
        maxProfilesConnected = 1;
        break;
      case process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID:
        maxProfilesConnected = 3;
        break;
      case process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID:
        maxProfilesConnected = 5;
        break;
      default:
        return;
    }
    if (user.email == "dhampl94@gmail.com") maxProfilesConnected = 100;
    if (user.profiles.length > maxProfilesConnected)
      return console.log("max dms reached");

    console.log(username);
    console.log(maxProfilesConnected);

    // const DMedIds: any = await getUserDmsIds(auth_token, ct0);
    // const followerIds: any = await getFollowersIds(username);
    // const rawUniqueIds = Array.from(new Set([...DMedIds, ...followerIds]));
    // const uniqueIds = rawUniqueIds.map((id) => {
    //   return {
    //     id: id,
    //   };
    // });
    // console.log(uniqueIds, "these are the DMs");
    const profile = await Profile.create({
      user: userId,
      url: profileUrl,
      name: username,
      // usersDMed: uniqueIds,
      usersDMed: [],
      templates: [],
      status: "AVAILABLE",
      authTokens: {
        auth_token: auth_token,
        ct0: ct0,
      },
    });

    console.log(profile);

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          profiles: profile._id,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function getUser(email: string) {
  try {
    await connectToDB();

    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.create({ email: email });
    }
    return user;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function getUserData(email: string) {
  try {
    connectToDB();
    const res = await User.findOne({ email: email })
      .select("_id paymentInfo getUserData")
      .populate({
        path: "profiles",
        model: Profile,
        select: "_id status name ",
      });
    return res;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function getTemplateUserData(email: string) {
  try {
    connectToDB();
    const res = await User.findOne({ email: email })
      .select("_id paymentInfo templates")
      .populate({
        path: "templates",
        model: Template,
      });
    console.log(res);
    return res;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function getUserDataOPPage(email: string) {
  try {
    connectToDB();
    const res = await User.findOne({ email: email })
      .select("_id paymentInfo operations")
      .populate({
        path: "operations",
        model: Op,
        select: "_id name usersResponded usersDMed title status",
      });
    return res;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getUserProfiles(userId: string) {
  try {
    await connectToDB();

    const user = await User.findOne({
      _id: userId,
    })
      .select("_id profiles")
      .populate({
        path: "profiles",
        model: Profile,
        select: "_id status name ",
      });

    const profiles = await user.profiles;

    return profiles;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getUserProfileStatistics(profileId: string) {
  try {
    await connectToDB();

    const user = await Profile.findOne({
      _id: profileId,
    }).select("_id status name statistics");

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getAllProfiles(profileId: string) {
  try {
    await connectToDB();

    const user = await User.findOne({
      _id: profileId,
    })
      .select("_id profiles")
      .populate({
        path: "profiles",
        model: Profile,
        select: "_id status name ",
      });

    const profiles = await user.profiles;
    // const profiles = await user.profiles;

    return profiles;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteProfile(id: string) {
  try {
    await connectToDB();

    //remove Id from account

    const userData = await Profile.findById(id).select("_id user").populate({
      model: User,
      path: "user",
      select: "_id profiles",
    });

    console.log(userData.user);
    const newProfilesArray = userData.user.profiles.filter(
      (profile: any) => profile._id.toString() !== id
    );

    console.log("new array", newProfilesArray);

    // update user profiles
    await User.findOneAndUpdate(
      { _id: userData.user.id },
      {
        profiles: newProfilesArray,
      }
    );

    // delete the profile
    await Profile.findByIdAndDelete(id);

    return { success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getProfilePageData(profileId: string) {
  try {
    await connectToDB();

    const data = await Profile.findById(profileId)
      .select("_id user operations name statistics")
      .populate({
        path: "user",
        model: User,
        select: "_id name profiles",
        populate: {
          path: "profiles",
          model: Profile,
          select: "_id name statistics ",
        },
      })
      .populate({
        path: "operations",
        model: Op,
        select: "_id status title usersDMed usersResponded",
      });
    console.log(data.user);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// New functions

export async function fetchGeneralUserData(email: string) {
  try {
    await connectToDB();

    const user = await User.findOne({ email: email })
      .select("_id paymentInfo profiles operations")
      .populate({
        path: "operations",
        model: Op,
        select: "_id status title usersDMed usersResponded progress",
      })
      .populate({
        path: "profiles",
        model: Profile,
        select: "_id name status profilePicture",
      })
      .lean();

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function fetchNewCampaignData(email: string) {
  try {
    await connectToDB();

    const user = await User.findOne({ email: email })
      .select("_id paymentInfo profiles")

      .populate({
        path: "profiles",
        model: Profile,
        select: "_id name status profilePicture",
      })
      .lean();

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function submitAccount(
  url: string,
  auth_token: string,
  ct0: string,
  email: string,
  userId: string
) {
  try {
    await connectToDB();

    const username = extractUserFromXComUrl(url);

    console.log(username);

    const profileDataRes = await axios.get(
      `https://twitter.good6.top/api/base/apitools/userByScreenNameV2?apiKey=NJFa6ypiHNN2XvbeyZeyMo89WkzWmjfT3GI26ULhJeqs6%7C1539340831986966534-8FyvB4o9quD9PLiBJJJlzlZVvK9mdI&screenName=${username}`
    );

    console.log(profileDataRes);
    const unparsedData = profileDataRes.data.data;

    const data = JSON.parse(unparsedData).data.user.result;

    console.log(data);

    if (data?.is_blue_verified !== true) {
      console.log("Account not verified");
      return {
        variant: "destructive",
        title: "Unverified account",
        description: "Make sure you're inserting a verified account",
      };
    }

    const newProfile = await Profile.create({
      user: userId,
      name: data.legacy.name,
      profilePicture: data.legacy.profile_image_url_https,
      url: url,
      email: email,
      authTokens: {
        auth_token: auth_token,
        ct0: ct0,
      },

      status: "AVAILABLE",

      usersDMed: [],
      live_updates: [],
      statistics: [],
      operations: [],
    });

    console.log(newProfile);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          profiles: newProfile._id,
        },
      },
      // {
      //   upsert: true,
      // }
    );

    console.log(user.profiles);

    console.log("Account verified");
    return {
      title: "verified account",
      description: "Account connected successfully",
    };
  } catch (error: any) {
    return {
      variant: "destructive",
      title: "Error!",
      description: "An error has occurred",
    };
  }
}

export async function addUserToBlockList(
  username: string | null,
  userId: string
) {
  try {
    await connectToDB();

    if (username === null) return console.log("no username provided.");

    const profileDataRes = await axios.get(
      `https://twitter.good6.top/api/base/apitools/userByScreenNameV2?apiKey=NJFa6ypiHNN2XvbeyZeyMo89WkzWmjfT3GI26ULhJeqs6%7C1539340831986966534-8FyvB4o9quD9PLiBJJJlzlZVvK9mdI&screenName=${username}`
    );

    const unparsedData = profileDataRes.data.data;

    const data = JSON.parse(unparsedData).data.user.result;

    console.log(data.rest_id);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          blockList: { id: data.rest_id as string },
        },
      }
    );

    console.log(user);
  } catch (error: any) {
    return {
      variant: "destructive",
      title: "Error!",
      description: "An error has occurred",
    };
  }
}
