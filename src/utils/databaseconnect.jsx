import mongoose from "mongoose";

export const Databaseconnect = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      dbName: "NextTodo",
    })
    .then((data) =>
      console.log(`Mongodb connected successfully ${data.connection.host}`)
    )
    .catch((error) => console.log(error));

  // console.log(process.env.DB_URL);
};
