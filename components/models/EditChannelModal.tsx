"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { FC } from "react";
import EditChannelForm from "../EditChannelForm";

const EditChannelModal: FC = ({}) => {
  let { isOpen, onClose, type } = useModalStore();
  let isModalOpen = isOpen && type === "editChannel";
  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <EditChannelForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
