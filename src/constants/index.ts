export const navLinks = ["Features", "Pricing"];

export const cardData = [
  {
    icon: "/assets/time.svg",
    title: "Save Time",
    description:
      " Let Xreacher scrape 100 000s of leads for you with a few clicks",
  },
  {
    icon: "/assets/namepersonalizationiscon.svg",
    title: "Name Personalization",
    description:
      " Each DM you send with Xreacher is personalized to the prospect you are reaching out by filling up his first name",
  },
  {
    icon: "/assets/searching.svg",
    title: "Next-Level Lead Scraping",
    description:
      " Filter out your prospects by bio, blue checkmark, country, follower count",
  },
  {
    icon: "/assets/analytics.svg",
    title: "Comprehensive Analytics",
    description:
      " Track the response rates of each campaign in the dashboard so you can optimize your outreach",
  },
  {
    icon: "/assets/senddm.svg",
    title: "Send up to 500 DMs/day",
    description:
      " Send up to 500 DMs/day to your targeted prospects on autpoilot",
  },
];

export const priceCards = {
  premium: {
    icon: "/assets/diamond.svg",
    price: "$179", // Updated price for Premium plan
    title: "Premium",
    features: [
      "Send 500 DMs/day per account",
      "Connect up to 5 accounts",
      "Access to analytics",
      "Premium support",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
  },
  professional: {
    icon: "/assets/pro.svg",
    price: "$97", // Updated price for Professional plan
    title: "Standard",
    features: [
      "Send 250 DMs/day per account",
      "Connect up to 3 accounts",
      "Access to analytics",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID ?? "",
  },
  basic: {
    icon: "/assets/basic.svg",
    price: "$67", // Updated price for Basic plan
    title: "Basic",
    features: [
      "Send up to 100 DMs/day",
      "Connect 1 account",
      "Access to analytics",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID ?? "",
  },
};

export const fAQs = [
  {
    n: "01",
    q: "What is the X limitation for sending DMs?",
    a: "On X (twitter) you can send up to 500 Dms/day so we are within the limit",
  },
  {
    n: "02",
    q: "Can I get suspended/banned?",
    a: "No, we operate within the rules of X(twitter) so you can't get suspended",
  },
  {
    n: "03",
    q: "What is in the Analytics?",
    a: "You can check there what response rate you got on your campaigns and test out different openers/filters to get best results",
  },
  {
    n: "04",
    q: "How long does it take to set-up the outreach campaign?",
    a: "You can start your campaigns within 2 minutes and start sending DMs right away",
  },
  {
    n: "05",
    q: "What should I DM my prospects to get best results?",
    a: "You can checkout this free course on how to make your own DM script to get most clients: https://youtube.com/playlist?list=PLoA9hWuBvQYCEoQKsqrQRpTudhurU1Xta&si=0l0zaenidXtBptjZ",
  },
];

export const appNavLinks = [
  {
    icon: "/root/analytics.svg",
    path: "/analytics",
    name: "Analytics",
  },
  {
    icon: "/root/campaigns.svg",
    path: "/campaigns",
    name: "Campaigns",
  },
  {
    icon: "/root/profile.svg",
    path: "/profile",
    name: "Profile",
  },
  {
    icon: "/root/terminal.svg",
    path: "/terminal",
    name: "Terminal",
  },
];

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "Premium",
    name: "Premium",
    description:
      "Send 500 DMs/day per account, Connect up to 50 accounts, Access to analytics, Premium support",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
    price: 90,
  },
  {
    id: "Professional",
    name: "Pro",
    description:
      "Send 250 DMs/day per account, Connect up to 3 accounts, Access to analytics",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID ?? "",
    price: 50,
  },
  {
    id: "Basic",
    name: "Basic",
    description:
      "Send 100 DMs/day, per account Connect 1 account, Access to analytics",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID ?? "",
    price: 30,
  },
];
