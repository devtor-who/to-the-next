import { auth } from "@/auth";
import { isConnectingToAdmin, rewriteToAdmin } from "./middleware/rewrites";
import { AUTH_FREE_PATHS } from "./middleware/utils";
import { redirectToLogin } from "./middleware/redirects";

export const middleware = auth((req, ctx) => {
  const { pathname } = req.nextUrl;

  if (AUTH_FREE_PATHS.some((freePath) => freePath === pathname)) {
    return;
  }

  if (isConnectingToAdmin(req)) {
    if (!req.auth) return redirectToLogin(req);
    return rewriteToAdmin(req);
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
