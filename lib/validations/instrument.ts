import { z } from "zod";

export const instrumentSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  brand: z
    .string()
    .min(2, { message: "A marca deve ter pelo menos 2 caracteres." }),
  price: z.coerce
    .number()
    .min(0, { message: "O preço deve ser um valor positivo." }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: "A quantidade deve ser de pelo menos 1." }),
  color_hex: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, {
      message: "Por favor, insira uma cor hexadecimal válida (ex: #FFFFFF).",
    })
    .optional()
    .or(z.literal("")),
  is_used: z.boolean().default(false),
  description: z
    .string()
    .max(1000, { message: "A descrição não pode exceder 1000 caracteres." })
    .optional(),
  category_id: z
    .string()
    .uuid({ message: "Por favor, selecione uma categoria válida." }),
});

export type TInstrumentSchema = z.infer<typeof instrumentSchema>;
