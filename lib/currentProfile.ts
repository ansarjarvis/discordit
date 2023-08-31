import { auth } from "@clerk/nextjs";
import { db } from "./db";

let currentProfile = async () => {
  let { userId } = auth();
  if (!userId) {
    return null;
  }

  let profile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  return profile;
};

export default currentProfile;
