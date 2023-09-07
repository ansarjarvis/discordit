import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModelType = "createServer" | "invite";

type ModalData = {
  server?: Server;
};

interface ModalStore {
  type: ModelType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModelType, data?: ModalData) => void;
  onClose: () => void;
}

let useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) =>
    set({
      isOpen: true,
      type,
      data,
    }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
    }),
}));

export { useModalStore };
