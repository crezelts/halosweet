import connectDB from "@/utils/connectMongoDB";
import cudd from "@/models/cudd";

/** 
 * 
 *  @param {import("next").NextApiRequest} req
 *  @param {import("next").NextApiResponse} res 
*/

export default function handler(req, res) {
     console.log("Connecting DB");
     connectDB();
     console.log("DB connected");

     res.status(200).json({ email: String, password: String })
}