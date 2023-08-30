import { auth } from "@clerk/nextjs";

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

let authHandler = async () => {
  let { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return {
    userId: userId,
  };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => authHandler())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
