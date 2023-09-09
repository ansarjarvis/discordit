"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { FC } from "react";
import { ServerWithMemberWithProfile } from "./ServerHeader";
import ToolkitAction from "./ToolkitAction";
import { Plus, Settings } from "lucide-react";
import { useModalStore } from "@/hooks/useModalStore";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channel" | "member";
  channelType?: ChannelType;
  server?: ServerWithMemberWithProfile;
}

const ServerSection: FC<ServerSectionProps> = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  let { onOpen } = useModalStore();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-300">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channel" && (
        <ToolkitAction label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </ToolkitAction>
      )}
      {role === MemberRole.ADMIN && sectionType === "member" && (
        <ToolkitAction label="Manage Members" side="top">
          <button
            onClick={() => onOpen("member", { server })}
            className="text-zinc-500 hover:text-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        </ToolkitAction>
      )}
    </div>
  );
};

export default ServerSection;
