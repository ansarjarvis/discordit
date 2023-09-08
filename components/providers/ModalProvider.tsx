"use client";

import { FC, useEffect, useState } from "react";
import ServerModal from "../models/ServerModal";
import InviteModal from "../models/InviteModal";
import EditServerModal from "../models/EditServerModal";
import MembersModal from "../models/MembersModal";
import CreateChannelModal from "../models/CreateChannelModal";
import LeaveServerModal from "../models/LeaveServerModal";
import DeleteServerModal from "../models/DeleteServerModal";

const ModalProvider: FC = ({}) => {
  let [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};

export default ModalProvider;
