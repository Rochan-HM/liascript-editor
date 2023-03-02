import { Server } from "@hocuspocus/server";

const server = Server.configure({
  port: 4444,
});

server.listen();
