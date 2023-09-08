"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { FC } from "react";
import CreateChannelForm from "../CreateChannelForm";

const CreateChannelModal: FC = ({}) => {
  let { isOpen, onClose, type } = useModalStore();
  let isModalOpen = isOpen && type === "createChannel";
  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <CreateChannelForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
