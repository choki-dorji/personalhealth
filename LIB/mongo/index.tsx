import mongoose from "mongoose";

const connectMongooDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo");
  } catch (e) {
    console.log(e);
  }
};

export default connectMongooDB;
