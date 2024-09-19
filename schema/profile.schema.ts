import { z } from "zod";

export const GETRequestProfileSchema = z.object({
  walletAddress: z.string(),
});

export const POSTRequestProfileSchema = z.object({
  walletAddress: z.string(),
});

export const ProfileSchema = z.object({
  user: z.object({
    walletAddress: z.string(),
    points: z.number().gte(0),
  }),
});

export type IGETRequestProfile = z.infer<typeof GETRequestProfileSchema>;
export type IPOSTRequestProfile = z.infer<typeof POSTRequestProfileSchema>;
export type IProfile = z.infer<typeof ProfileSchema>;
