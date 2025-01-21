import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default function Middleware(req: NextRequest) {
  return withAuth(req);
}
export const config = {
  matcher: ["/dashboard"],
};
