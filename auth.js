import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from './lib/db'
import authConfig from "./auth.config"
import { getUserById } from "./data/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
    callbacks: {
      async session({token, session}){
        if (token.sub && session.user) {
          session.user.id = token.sub
        }

        if (token.name && session.user) {
          session.user.name = token.name
        }
        
        return session;
      },
      async jwt({token}) {
        if (!token.sub) {
          return token;
        }
        const existingUser = await getUserById(token.sub)

        if (!existingUser) return token;

        token.name = existingUser.name;

        return token;
      },
    },
    session: { strategy: "jwt"},
    adapter: PrismaAdapter(db),
    cookies: {
      pkceCodeVerifier: {
        name: "next-auth.pkce.code_verifier",
        options: {
          httpOnly: true,
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
    },
    ...authConfig,
})