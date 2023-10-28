"use client";

import { FC } from "react";
import { useSocket } from "./providers/SocketProvider";
import { Badge } from "@/components/ui/Badge";

interface SocketIndicatorProps {}

let SocketIndicator: FC<SocketIndicatorProps> = ({}) => {
  let { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Fallback : Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Live : Real-time updates
    </Badge>
  );
};

export default SocketIndicator;
