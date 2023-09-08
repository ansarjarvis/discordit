"use client";

import { FC, useEffect, useState } from "react";
import ServerModal from "../models/ServerModal";
import InviteModal from "../models/InviteModal";
import EditServerModal from "../models/EditServerModal";
import MembersModal from "../models/MembersModal";

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
    </>
  );
};

export default ModalProvider;
