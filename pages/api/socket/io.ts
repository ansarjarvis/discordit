import { NextApiResponseServerIo } from "@/types";
import { Server as NetSever } from "http";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export let config = {
  api: {
    bodyParser: false,
  },
};

let ioHandler = (req: NextApiResponse, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    let path = "/api/socket/io";
    let httpServer: NetSever = res.socket.server as any;
    let io = new ServerIO(httpServer, {
      path: path,
      /* @ts-ignore */
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
