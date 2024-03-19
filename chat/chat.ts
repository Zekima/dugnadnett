import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import "dotenv/config";
import { Server } from "socket.io";
import { readFileSync } from "fs";

import { getUserById } from "@/data/user";

function createServer() {
  if (process.env.USE_HTTPS === "TRUE") {
    const options = {
      key: readFileSync("/etc/letsencrypt/live/dugnadnett.no/privkey.pem"),
      cert: readFileSync("/etc/letsencrypt/live/dugnadnett.no/cert.pem"),
      ca: [readFileSync("/etc/letsencrypt/live/dugnadnett.no/chain.pem")],
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
  socket.on("joinRoom", ({ dugnadId }) => {
    socket.join(`dugnad_${dugnadId}`);
  });

  socket.on("newMessage", async ({ message, ownerId, dugnadId }) => {
    const user = await getUserById(ownerId);
    const username = user?.name || "Ukjent bruker";

    io.to(`dugnad_${dugnadId}`).emit("receiveMessage", {
      message,
      ownerId,
      username,
      dugnadId,
    });
  });
});

httpServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
