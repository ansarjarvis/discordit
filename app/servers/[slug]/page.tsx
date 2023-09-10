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
  let { slug } = params;
  let profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  let server = await db.server.findUnique({
    where: {
      id: slug,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channel: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  let initialChannel = server?.channel[0];
  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/servers/${slug}/channels/${initialChannel?.id}`);
};

export default page;
