"use client";

import { FC } from "react";
import ToolkitAction from "./ToolkitAction";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem: FC<NavigationItemProps> = ({
  id,
  name,
  imageUrl,
}: NavigationItemProps) => {
  let params = useParams();
  let router = useRouter();
  return (
    <ToolkitAction side="right" align="center" label={name}>
      <button
        onClick={() => {
          router.push(`/servers/${id}`);
        }}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.slug !== id && "group-hover:h-[20px]",
            params?.slug === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.slug === id && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ToolkitAction>
  );
};

export default NavigationItem;
