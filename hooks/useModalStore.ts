import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModelType =
  | "createServer"
  | "invite"
  | "editServer"
  | "editChannel"
  | "member"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel";

type ModalData = {
  server?: Server;
  channelType?: ChannelType;
  channel?: Channel;
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
