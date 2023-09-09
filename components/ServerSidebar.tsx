import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
import {
  Hash,
  Mic,
  ShieldAlert,
  ShieldCheck,
  User2,
  Video,
} from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";
import ServerHeader from "./ServerHeader";
import ServerSearch from "./ServerSearch";
import { ScrollArea } from "./ui/ScrollArea";

interface ServerSidebarProps {
  serverId: string;
}

let channelIcons = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2 text-green-500" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2 text-green-500" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2 text-green-500" />,
};

let roleIcons = {
  [MemberRole.GUEST]: <User2 className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

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
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIcons[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIcons[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIcons[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIcons[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
