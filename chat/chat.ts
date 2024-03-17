import { createServer } from "http";
import { Server } from "socket.io";
import { getUserById } from "@/data/user";

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
