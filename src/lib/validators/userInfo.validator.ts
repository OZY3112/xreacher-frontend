import * as z from "zod";

export const userInfoValidator = z.object({
  auth_token: z.string(),
  ct0: z.string(),
  profileUrl: z.string().url(),
});
