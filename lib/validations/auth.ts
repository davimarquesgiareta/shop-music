import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  age: z.coerce
    .number()
    .min(18, { message: "You must be at least 18 years old." }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a valid gender.",
  }),
  dateOfBirth: z.coerce.date({ message: "Please enter a valid date." }),
  profileDescription: z
    .string()
    .max(500, { message: "Description must be less than 500 characters." })
    .optional(),
  email: z.string().email({ message: "Please enter a valid email." }), // Corrigido
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
