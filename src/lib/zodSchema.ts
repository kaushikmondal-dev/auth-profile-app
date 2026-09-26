import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .max(64, { error: "Email must not exceed 64 characters" })
    .toLowerCase(),

  password: z
    .string()
    .min(8, { error: "Password must be minium 8 characters long" })
    .max(128, { error: "Password must be minium 128 characters long" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { error: "Name must be at least 3 characters long" })
      .max(32, { error: "Name must not be exceed 64 characters" }),
    email: z
      .email({ error: "Invalid email address" })
      .max(64, { error: "Email must not exceed 64 characters" })
      .toLowerCase(),

    password: z
      .string()
      .min(8, { error: "Password must be minium 8 characters long" })
      .max(128, { error: "Password must be minium 128 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Password didn`t match",
    path: ["confirmPassword"],
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;
