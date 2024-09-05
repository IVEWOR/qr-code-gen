"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="navbar border-b border-gray-700">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link href="">Home</Link>
        </li>
        <li>
          <Link href="">Home</Link>
        </li>
        <li>
          <Link href="">Home</Link>
        </li>
      </ul>
      {session ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 rounded-full">
                <Image
                  alt={session?.user?.name}
                  src={session?.user?.image}
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <span onClick={() => signOut()}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-primary h-10 min-h-10"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
