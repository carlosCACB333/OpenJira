import mongoose from "mongoose";

/* 
0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
*/
const mongoConnection = {
  isConected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConected === 1) {
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConected = mongoose.connections[0].readyState;

    if (mongoConnection.isConected == 1) {
      return;
    }

    mongoConnection.isConected = 3;
    await mongoose.disconnect();
    mongoConnection.isConected = 0;
  }

  mongoConnection.isConected = 2;
  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConected = 1;
  console.log("conectado a mongo...");
};

export const disconnect = async () => {
  if (mongoConnection.isConected === 0) return;
  mongoConnection.isConected = 3;
  await mongoose.disconnect();
  mongoConnection.isConected = 0;
  console.log("desconectado de mongo");
};
