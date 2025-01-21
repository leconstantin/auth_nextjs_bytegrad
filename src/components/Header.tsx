"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
export default function Header() {
  const { isAuthenticated, getUser } = useKindeBrowserClient();

  const user = getUser();
  return (
    <header className="absolute flex items-center top-0 left-0 border-b border-black/20 w-full h-[50px] text-[14px] text-center px-4">
      <div className="flex items-center gap-x-4">
        {user ? (
          <>
            <Image
              className="rounded-full ml-auto"
              src={user.picture!}
              alt="User Avatar"
              width={35}
              height={35}
            />
            {user.email}
          </>
        ) : (
          "Not logged in"
        )}
      </div>
      {isAuthenticated && <LogoutLink className="ml-auto">Logout</LogoutLink>}
    </header>
  );
}
