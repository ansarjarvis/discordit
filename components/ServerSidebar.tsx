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
import ServerChannel from "./ServerChannel";
import ServerHeader from "./ServerHeader";
import ServerSearch from "./ServerSearch";
import ServerSection from "./ServerSection";
import { ScrollArea } from "./ui/ScrollArea";
import { Separator } from "./ui/Separator";
import ServerMember from "./ServerMember";

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
  if (!server) {
    return redirect("/");
  }

  let role = server?.member.find(
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
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Text Channels"
              sectionType="channel"
              channelType={ChannelType.TEXT}
              role={role}
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  // @ts-ignore
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Audio Channels"
              sectionType="channel"
              channelType={ChannelType.AUDIO}
              role={role}
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  // @ts-ignore
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Video Channels"
              sectionType="channel"
              channelType={ChannelType.VIDEO}
              role={role}
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  // @ts-ignore
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              label="Members"
              sectionType="member"
              role={role}
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
