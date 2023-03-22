import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "public_repo"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) return { ...token, accessToken: account.access_token };

      return token;
    },
    async session({ session, token }) {
      return { ...session, accessToken: token.accessToken };
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
