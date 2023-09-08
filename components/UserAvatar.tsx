import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  classname?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ src, classname }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", classname)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
