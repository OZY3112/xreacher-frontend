import { authMiddleware } from "@clerk/nextjs";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  debug: true,
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  publicRoutes: ["/api/webhook/stripe", "/"],
  ignoredRoutes: ["/api/webhook/stripe", "/"],
};
