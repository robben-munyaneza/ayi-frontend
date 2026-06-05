import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../lib/db";
import User from "../../../../models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("NEXTAUTH AUTHORIZE: Attempting login for", credentials.email);
          
          console.log("NEXTAUTH AUTHORIZE: Connecting to DB...");
          await dbConnect();
          console.log("NEXTAUTH AUTHORIZE: DB Connected Successfully.");
          
          const user = await User.findOne({ email: credentials.email }).select("+password");
          
          if (!user) {
            console.log("NEXTAUTH AUTHORIZE: User not found in database.");
            throw new Error("Invalid credentials");
          }
          
          console.log("NEXTAUTH AUTHORIZE: User found. Checking password...");
          const isMatch = await user.matchPassword(credentials.password);
          
          if (!isMatch) {
            console.log("NEXTAUTH AUTHORIZE: Password mismatch.");
            throw new Error("Invalid credentials");
          }
          
          console.log("NEXTAUTH AUTHORIZE: Login successful!");
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("NEXTAUTH AUTHORIZE ERROR:", error.message);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
