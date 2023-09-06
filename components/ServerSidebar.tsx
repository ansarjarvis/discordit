import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC } from "react";
import ServerHeader from "./ServerHeader";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: FC<ServerSidebarProps> = async ({
  serverId,
}: ServerSidebarProps) => {
  let profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  let server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }

  let textChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  let audioChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  let videoChannels = server?.channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  let members = server?.member.filter(
    (member) => member.profileId !== profile?.id
  );

  let role = server.member.find(
    (member) => member.profileId === profile?.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
