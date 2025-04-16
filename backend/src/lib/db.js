import mongoose from 'mongoose';

export const connectDB = async () => {
    console.log("Attempting to connect to MongoDB..."); // Debug log
    console.log("MongoDB URL:", process.env.MONGODB_URL);
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connected to mongodb ${conn.connection.host}`);
    }catch(error){
       console.log("Failed to connect to mongodb",error);
       process.exit(1);
    }
    
  };