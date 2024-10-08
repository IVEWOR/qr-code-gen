import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/context/SessionProvider";
import Navbar from "@/components/Navbar";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html className="" lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
