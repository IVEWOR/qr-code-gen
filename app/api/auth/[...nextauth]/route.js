import connectDB from "@/db/db.connect";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Add the hasAccess field to the session object
            if (token?.hasAccess !== undefined) {
                session.user.hasAccess = token.hasAccess;
            }

            if (token?.userId !== undefined) {
                session.user.userId = token.userId;
            }

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB();
                const user = await User.findOne({ email: profile.email });
                if (!user) {
                    await User.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                    });
                }
                // Return true to indicate successful sign in
                return true;
            } catch (error) {
                console.error("SignIn error:", error);
                return false;
            }
        },
        async jwt({ token, user, account }) {
            if (user) {
                // When a user signs in, add user data to the token
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
                try {
                    // Fetch user from the database to get fields
                    const userFromDb = await User.findOne({ email: user.email });
                    if (userFromDb) {
                        token.hasAccess = userFromDb.hasAccess;
                        token.userId = userFromDb._id;
                    }
                } catch (error) {
                    console.error("JWT callback error:", error);
                }
            }
            return token;
        }
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
