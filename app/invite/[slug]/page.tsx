import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  let { slug: invitecode } = params;
  let profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!invitecode) {
    return redirect("/");
  }

  /* checking user already exists on the server or not */

  let existingServer = await db.server.findFirst({
    where: {
      inviteCode: invitecode,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  /* update the user on the server */

  let server = await db.server.update({
    where: {
      inviteCode: invitecode,
    },
    data: {
      member: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default page;
