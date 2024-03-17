import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import { Server } from "socket.io";
import { readFileSync } from "fs";

import { getUserById } from "@/data/user";

function createServer() {
  if (process.env.NODE_ENV === 'production') {
    const options = {
      key: readFileSync("/etc/letsencrypt/live/dugnadnett.no/privkey.pem"),
      cert: readFileSync("/etc/letsencrypt/live/dugnadnett.no/cert.pem"),
      ca: [readFileSync('/etc/letsencrypt/live/dugnadnett.no/chain.pem')]
    };
    return createHttpsServer(options);
  } else {
    return createHttpServer();
  }
}

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newMessage", async ({ message, ownerId, dugnadId }) => {
    const user = await getUserById(ownerId);
    const username = user?.name || 'Ukjent bruker';

    io.emit("receiveMessage", {
      message,
      ownerId,
      username,
      dugnadId,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
