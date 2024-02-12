import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email er obligatorisk",
  }),
  password: z.string().min(1, {
    message: "Passord er obligatorisk",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email er obligatorisk",
  }),
  name: z.string().min(1, {
    message: "Navn er obligatorisk",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 bokstaver",
  }),
});
