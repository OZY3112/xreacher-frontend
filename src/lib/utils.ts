import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "https://xreacher.com/"}${path}`;
}
export function calculatePercentage(num1: number = 40, num2: number = 1) {
  // Check if num1 is larger than num2

  // Subtract num2 from num1
  let result = num1 - num2;

  // Calculate the percentage
  let percentage = (result / num1) * 100;

  // Return the result
  return percentage;
}

export async function getUserDmsIds(auth_token: string, ct0: string) {
  const options = { method: "POST", headers: { accept: "*/*" } };
  let cursor = -1;
  let dms = [];
  let run = false;
  // Fetches All of the DMs of the user
  while (run === false) {
    const data = await axios.get(
      `https://twitter2.good6.top/api/base/apitools/getDMSInitIdV2?apiKey=NJFa6ypiHNN2XvbeyZeyMo89WkzWmjfT3GI26ULhJeqs6%7C1539340831986966534-8FyvB4o9quD9PLiBJJJlzlZVvK9mdI&auth_token=${auth_token}&ct0=${ct0}&cursor=${cursor}`,
      options
    );
    // TODO: error trouble shoot

    const parsedDMs = await JSON.parse(data.data.data);
    console.log(parsedDMs);

    if (
      cursor ==
      parsedDMs.inbox_initial_state.inbox_timelines.trusted.min_entry_id
    )
      run = true;
    cursor = parsedDMs.inbox_initial_state.inbox_timelines.trusted.min_entry_id;

    const dmsData = parsedDMs.inbox_initial_state.entries;

    dms.push(...dmsData);

    if (
      cursor ==
      parsedDMs.inbox_initial_state.inbox_timelines.trusted.min_entry_id
    ) {
      break;
    }
    cursor = parsedDMs.inbox_initial_state.inbox_timelines.trusted.min_entry_id;
  }

  let dmsIds: any[] = [];
  dms.map((dm) => {
    if (dm?.message?.id) dmsIds.push(dm?.message?.id);
  });

  return dmsIds;
}

export async function getFollowersIds(username: string) {
  let cursor = -1;
  let idList: any[] = [];
  while (cursor != 0) {
    const options = {
      method: "GET",
      url: `https://twitter2.good6.top/api/base/apitools/followersList`,
      params: {
        apiKey:
          "NJFa6ypiHNN2XvbeyZeyMo89WkzWmjfT3GI26ULhJeqs6|1539340831986966534-8FyvB4o9quD9PLiBJJJlzlZVvK9mdI",
        cursor: cursor,
        screenName: username,
      },
      headers: { accept: "*/*" },
    };

    const userData = await axios.request(options);
    const parsedData = await JSON.parse(userData.data.data);
    if (!parsedData) return;
    parsedData.users?.map(({ id_str }: any) => {
      idList.push(id_str);
    });
    cursor = parsedData.next_cursor_str;
  }
  return idList;
}
export const isUserSubscribed = (userData: any) => {
  // Replace 'any' with the correct type if you have a type defined for the data structure
  const plans = [
    process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID,
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
  ];

  const isPlanValid = plans.includes(userData.paymentInfo.plan);
  const endDate = new Date(userData.paymentInfo.endDate);
  const isEndDateValid = endDate > new Date();

  return isPlanValid && isEndDateValid;
};
export function extractUserFromXComUrl(urlString: string): string | null {
  const url = new URL(urlString);
  // Check if the hostname is exactly 'x.com'
  if (url.hostname === "x.com") {
    // Get the pathname, split it by '/' and return the second segment
    const pathSegments = url.pathname.split("/");
    // Assuming the user segment is always after the first '/'
    return pathSegments.length > 1 ? pathSegments[1] : null;
  }
  return null;
}

export function formatDate({ isoDateString }: { isoDateString: string }) {
  // Parse the ISO 8601 date string into a Date object
  let date = new Date(isoDateString);

  // Extract the hours and format to 12-hour clock
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Extract the rest of the date components
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1; // Months are 0-indexed

  // Format the date string
  let formattedDate = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm} ${month}/${day}`;

  return formattedDate;
}
