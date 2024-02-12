"use server"


import { db } from '../lib/db'
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from '../data/user'
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";

import bcrypt from 'bcryptjs';

export const register = async (values: any) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Ugyldig data"};
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) return {error: "Email allerede i bruk!"}

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Feil brukernavn eller passord!" };
            default:
              return { error: "Noe gikk feil" };
          }
        }
        throw error;
      }

    return { success: "Bruker lagt!"}
}