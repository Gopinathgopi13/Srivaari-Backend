import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one symbol");

export const registerSchema = z.object({
  first_name: z.string().min(3, "First name must be minimum 3 characters"),
  last_name: z.string().min(1, "Last name must be minimum 1 characters"),
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),

  password: passwordSchema,
  userName: z.string(),
  // .min(5, "Username must be minimum 5 characters")
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
  //   "Username must contain both letters and numbers"
  // ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
  password: passwordSchema,
});

export const verifyUser = z.object({
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
  otp: z.number(),
});

export const forgotPassword = z.object({
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
});

export const resetPassword = z.object({
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
  password: passwordSchema,
  otp: z.number(),
});
