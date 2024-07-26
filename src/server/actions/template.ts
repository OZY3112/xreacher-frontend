"use server";
import Template from "../models/template";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function createdTemplate(
  title: string,
  options: [name: string, state: [string], triggered: boolean],
  userId: string
) {
  try {
    connectToDB();

    const template = await Template.create({
      title,
      options,
    });

    const user = await User.findByIdAndUpdate(userId, {
      $push: {
        templates: template._id,
      },
    });

    console.log(user);
    console.log(template);
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
}
