import { User } from "../models/user.model.js";

export const authCallBack = async (req, res, next) => {
    try {
      const {id, firstName, lastName, imageUrl} = req.body;
      console.log("Received Data:", { id, firstName, lastName, imageUrl }); // ✅ Log incoming request
      const user = await User.findOne({clerkId: id});
  
      if(!user){
          await User.create({
              clerkId: id,
              name: `${firstName} ${lastName}`,
              image: imageUrl,
            });
            console.log("✅ New user created:", id);
      }else {
        console.log("⚠️ User already exists:", id);
      }
  
      res.status(200).json({succsess: true});
    } catch (error) {
      console.log("Error in auth callback route",error);
      next(error);
    }
  }