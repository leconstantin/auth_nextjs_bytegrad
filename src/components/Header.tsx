import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default async function Header() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  return (
    <header className="absolute flex items-center top-0 left-0 border-b border-black/20 w-full h-[50px] text-[14px] text-center px-4">
      <div className="flex items-center gap-x-4"></div>
      {isLoggedIn && <LogoutLink className="ml-auto">Logout</LogoutLink>}
    </header>
  );
}
