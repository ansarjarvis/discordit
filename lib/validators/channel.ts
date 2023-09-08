import { ChannelType } from "@prisma/client";
import z from "zod";

export let channelSchemaValidator = z.object({
  name: z
    .string()
    .min(1, "channel name is required")
    .refine((name) => name != "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export type channelCreationRequest = z.infer<typeof channelSchemaValidator>;
