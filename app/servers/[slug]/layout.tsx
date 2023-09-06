import ServerSidebar from "@/components/ServerSidebar";
import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const ServerIdLayout: FC<ServerIdLayoutProps> = async ({
  children,
  params,
}: ServerIdLayoutProps) => {
  let profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  let server = await db.server.findUnique({
    where: {
      id: params.slug,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.slug} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
