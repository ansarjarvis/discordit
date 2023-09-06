"use client";

import { FC, useEffect, useState } from "react";
import ServerModal from "../models/ServerModal";

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
    </>
  );
};

export default ModalProvider;
