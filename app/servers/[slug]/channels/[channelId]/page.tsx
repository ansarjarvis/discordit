import ChatHeader from "@/components/chat/ChatHeader";
import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
    channelId: string;
  };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  let { slug: serverId, channelId } = params;

  let profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  let channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  let member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={channel.name} serverId={serverId} type="channel" />
    </div>
  );
};

export default page;
