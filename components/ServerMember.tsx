"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck, User2 } from "lucide-react";
import { useParams } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import ToolkitAction from "./ToolkitAction";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server | null;
}

let roleIcon = {
  [MemberRole.GUEST]: <User2 className="h-4 w-4 ml-auto text-indigo-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-auto text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-auto text-rose-500" />,
};

const ServerMember: FC<ServerMemberProps> = ({
  member,
  server,
}: ServerMemberProps) => {
  let params = useParams();
  let icon = roleIcon[member.role];
  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        classname="h-8 w-8 md:w-8 md:h-8"
      />
      <ToolkitAction label={member.profile.name} side="top">
        <p
          className={cn(
            "font-semibold  text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.memberId === member.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {/*  Todo - fix member name overflow problem */}
          {member.profile.name.substring(0, 15)}
        </p>
      </ToolkitAction>
      {icon}
    </button>
  );
};

export default ServerMember;
