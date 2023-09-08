"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { FC } from "react";
import { Button } from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteServerModalProps {}

const DeleteServerModal: FC<DeleteServerModalProps> = ({}) => {
  let router = useRouter();
  let { isOpen, onClose, type, data } = useModalStore();
  let { server } = data;
  let isModalOpen = isOpen && type === "deleteServer";

  let { mutate: deleteServer } = useMutation({
    mutationFn: async () => {
      let { data } = await axios.delete(`/api/servers/${server?.id}`);
      return data;
    },

    onSuccess: () => {
      onClose();
      router.refresh();
      router.push("/");
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button onClick={() => onClose()} variant="ghost">
              Cancel
            </Button>
            <Button onClick={() => deleteServer()} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
