import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { FC } from "react";
import EditServerForm from "../EditServerForm";

interface EditServerModalProps {}

const EditServerModal: FC<EditServerModalProps> = ({}) => {
  let { isOpen, onClose, type } = useModalStore();
  let isModalOpen = isOpen && type === "editServer";
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
        <EditServerForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
