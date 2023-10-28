"use client";

import { FC, createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

interface socketProviderProps {
  children: React.ReactNode;
}

type SocketContextType = {
  socket: any | null;
  isConnected: Boolean;
};

let SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export let useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider: FC<socketProviderProps> = ({
  children,
}: socketProviderProps) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
