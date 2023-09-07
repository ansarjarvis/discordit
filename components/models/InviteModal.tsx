"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface InviteModalProps {}

const InviteModal: FC<InviteModalProps> = ({}) => {
  let { isOpen, onClose, type, data, onOpen } = useModalStore();
  let origin = useOrigin();
  let [isCopied, setIsCopied] = useState(false);

  let { server } = data;
  let isModalOpen = isOpen && type === "invite";
  let inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  let urlCopyHandler = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  let { mutate: generateNewLink, isLoading } = useMutation({
    mutationFn: async () => {
      let { data } = await axios.patch(`/api/servers/${server?.id}/invitecode`);
      return data;
    },
    onSuccess: (data) => {
      onOpen("invite", { server: data });
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends to {server?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              readOnly
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} onClick={urlCopyHandler} size="icon">
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={() => generateNewLink()}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4 "
          >
            Generate a new link
            <RefreshCw className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
