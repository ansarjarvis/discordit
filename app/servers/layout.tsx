import SidebarNavigation from "@/components/SidebarNavigation";
import React, { FC } from "react";

interface ServerLayoutProps {
  children: React.ReactNode;
}

const ServerLayout: FC<ServerLayoutProps> = ({
  children,
}: ServerLayoutProps) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <SidebarNavigation />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default ServerLayout;
