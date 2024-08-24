import connectDB from "@/db/db.connect";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session }) {
            return session
        },
        async signIn({ profile }) {
            console.log(profile);
            try {
                await connectDB();
                const userExist = await User.findOne({ email: profile.email });
                if (!userExist) {
                    const user = await User.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }

        }
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }