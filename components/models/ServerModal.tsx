"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import ServerForm from "../ServerForm";
import { useModalStore } from "@/hooks/useModalStore";

const ServerModal: FC = ({}) => {
  let { isOpen, onClose, type } = useModalStore();
  let isModalOpen = isOpen && type === "createServer";
  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize Your Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image . You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <ServerForm />
      </DialogContent>
    </Dialog>
  );
};

export default ServerModal;
