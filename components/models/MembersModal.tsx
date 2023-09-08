"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { FC, useState } from "react";
import { ServerWithMemberWithProfile } from "../ServerHeader";
import { ScrollArea } from "../ui/ScrollArea";
import UserAvatar from "../UserAvatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MembersModalProps {}

type roleType = {
  memberId: string;
  role: MemberRole;
};

let roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

const MembersModal: FC<MembersModalProps> = ({}) => {
  let router = useRouter();
  let [isLoadingId, setIsLoadingId] = useState("");
  let { isOpen, onClose, type, data, onOpen } = useModalStore();
  let { server } = data as { server: ServerWithMemberWithProfile };
  let isModalOpen = isOpen && type === "member";

  let { mutate: changeRole } = useMutation({
    mutationFn: async ({ memberId, role }: roleType) => {
      setIsLoadingId(memberId);
      let payload = {
        role,
      };
      let { data } = await axios.patch(
        `/api/member/${memberId}?serverId=${server?.id}`,
        payload
      );
      return data;
    },

    onSuccess: (data) => {
      // router.refresh();
      onOpen("member", { server: data });
    },

    onSettled: () => {
      setIsLoadingId("");
    },
  });

  let { mutate: kickUser } = useMutation({
    mutationFn: async ({ memberId }: { memberId: string }) => {
      setIsLoadingId(memberId);
      let { data } = await axios.delete(
        `/api/member/${memberId}?serverId=${server.id}`
      );
      return data;
    },

    onSuccess: (data) => {
      // router.refresh();
      onOpen("member", { server: data });
    },

    onSettled: () => {
      setIsLoadingId("");
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white text-black  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.member?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.member?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                isLoadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="h-4 w-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  changeRole({
                                    memberId: member.id,
                                    role: "GUEST",
                                  })
                                }
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  changeRole({
                                    memberId: member.id,
                                    role: "MODERATOR",
                                  })
                                }
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => kickUser({ memberId: member.id })}
                          className="text-rose-500"
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {isLoadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto h-4 w-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
