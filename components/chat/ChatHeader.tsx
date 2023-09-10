import { Hash, Menu } from "lucide-react";
import { FC } from "react";
import ToggleMenu from "../ToggleMenu";
import UserAvatar from "../UserAvatar";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 h-12 flex items-center border-neutral-300 dark:border-neutral-800 border-b-2">
      <ToggleMenu serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar classname="h-8 w-8 md:h-8 md:w-8 mr-2" src={imageUrl} />
      )}
      <p className="font-semibold text-sm text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
