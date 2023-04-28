import NextAuth, { SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import * as dotenv from "dotenv";
dotenv.config();

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "cafcec4d2b06e00ed125",
      clientSecret: `${process.env.REACT_APP_GITHUB_CLIENTSECRET}`,
    }),
  ],
  secret: `${process.env.REACT_APP_GITHUB_SECRET}`,

  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 60, // 30분, 1800초
  },
};
export default NextAuth(authOptions);
