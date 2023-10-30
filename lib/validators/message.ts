import { z } from "zod";

export let messageSchemaValidator = z.object({
  content: z.string().min(1),
});

export type messageCreationRequest = z.infer<typeof messageSchemaValidator>;
