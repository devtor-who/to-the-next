import { NextResponse, type NextRequest } from "next/server";
import serverEnv from "@/lib/env/server";

const getRealUrl = (req: NextRequest) => {
  const { protocol, pathname, search } = req.nextUrl;
  return `${protocol}//${req.headers.get("host")}${pathname}${search}`;
};

export const isConnectingToAdmin = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  return (
    (serverEnv.DOMAIN_FOR_ADMIN &&
      getRealUrl(req).startsWith(serverEnv.DOMAIN_FOR_ADMIN)) ||
    pathname.startsWith("/admin")
  );
};

export const rewriteToAdmin = (req: NextRequest) => {
  const { origin } = req.nextUrl;

  // admin용 domain이 설정되지 않은 경우 아무런 처리를 하지 않음
  if (!serverEnv.DOMAIN_FOR_ADMIN) return;

  const pathnameAndQueryString = getRealUrl(req).replace(
    serverEnv.DOMAIN_FOR_ADMIN,
    ""
  );

  if (
    pathnameAndQueryString.startsWith("http") ||
    pathnameAndQueryString.startsWith("https")
  ) {
    return NextResponse.rewrite(new URL("/not-found", origin));
  }

  return NextResponse.rewrite(
    new URL(`/admin${pathnameAndQueryString}`, origin)
  );
};
