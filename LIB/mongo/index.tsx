import mongoose from "mongoose";

const connectMongooDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ??
        "mongodb+srv://Bumthap:Bumthap123@cluster0.7i7nwco.mongodb.net/"
    );
    console.log("Connected to Mongo");
  } catch (e) {
    console.log(e);
  }
};

export default connectMongooDB;
