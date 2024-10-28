import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// Define protected routes
const isProtectedRoutes = createRouteMatcher(['/dashboard(.*)','/api/payment', '/payment(.*)']);


export default clerkMiddleware(async (auth, req: NextRequest) => {
    if (isProtectedRoutes(req)) {
       const session = await auth();
       if (!session.userId) {
         return session.redirectToSignIn();
       }
    }
})

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };
