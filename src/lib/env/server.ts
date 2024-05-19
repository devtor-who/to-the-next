"use server";

import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.coerce.string().readonly(),
  AUTH_SECRET: z.coerce.string().readonly(),

  DOMAIN_FOR_ADMIN: z.coerce.string().optional(),
});

export default envSchema.parse(process.env);
