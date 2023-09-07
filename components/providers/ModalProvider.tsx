"use client";

import { FC, useEffect, useState } from "react";
import ServerModal from "../models/ServerModal";
import InviteModal from "../models/InviteModal";

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
      <InviteModal />
      <ServerModal />
    </>
  );
};

export default ModalProvider;
