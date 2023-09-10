import ChatHeader from "@/components/chat/ChatHeader";
import { findOrCreateConversation } from "@/lib/conversation";
import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
    memberId: string;
  };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  let { slug: serverId, memberId } = params;
  let profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  if (!serverId || !memberId) {
    return redirect("/");
  }

  let curruntMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!curruntMember) {
    return redirect("/");
  }

  let conversation = await findOrCreateConversation(curruntMember.id, memberId);

  if (!conversation) {
    return redirect(`/servers/${serverId}`);
  }

  let { memberOne, memberTwo } = conversation;

  let otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={otherMember.profile.name}
        serverId={serverId}
        imageUrl={otherMember.profile.imageUrl}
        type="conversation"
      />
    </div>
  );
};

export default page;
