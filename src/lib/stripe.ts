import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51PMykzGmHNYzz5mJjOvICOc824zaexOuES2FcDxCIROmff0TY53l04qKgGNl5xy9q4RgxpNiA4nyoh732HTanBCM00p3JLbAcT",
  {
    apiVersion: "2022-11-15",
    typescript: true,
  }
);
