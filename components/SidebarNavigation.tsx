import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import NavigationAction from "./NavigationAction";
import { ScrollArea } from "./ui/ScrollArea";
import { Separator } from "./ui/Separator";
import NavigationItem from "./NavigationItem";
import ThemeToggle from "./ThemeToggle";
import { UserButton } from "@clerk/nextjs";

interface SidebarNavigationProps {}

const SidebarNavigation: FC<SidebarNavigationProps> = async ({}) => {
  let profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  let servers = await db.server.findMany({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
