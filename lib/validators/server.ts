import { z } from "zod";

export let serverSchemaValidator = z.object({
  name: z.string().min(1, { message: "Server name is required" }),
  imageUrl: z.string().min(1, { message: "image is required" }),
});

export type serverCreationRequest = z.infer<typeof serverSchemaValidator>;
