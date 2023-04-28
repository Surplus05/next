import { connectDB } from "@/utils/database";
import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Daily = WithId<Document> & {
  lastExercise: number;
  continuous: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      let session = await getServerSession(req, res, authOptions);

      if (!session) return res.status(404).json("Not Found");

      let db = (await connectDB).db("next");
      let result = await db
        .collection("daily")
        .findOne({ user: session.user?.email });

      let newUserData = {
        user: session.user?.email,
        lastExercise: 0,
        continuous: 0,
      };

      if (result == null) {
        await db.collection("daily").insertOne(newUserData);
        return res.status(200).json(newUserData);
      }
      return res.status(200).json(result);
    } catch {
      return res.status(404).json("Not Found");
    }
  }

  if (req.method === "POST") {
    try {
      let session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(404).json("Not Found");

      let db = (await connectDB).db("next");
      let result = (await db
        .collection("daily")
        .findOne({ user: session.user?.email })) as Daily;

      if (result == null) {
        throw new Error();
      }

      let currentTime = Date.now();

      let newData = {
        lastExercise: currentTime,
        continuous: result.continuous + 1,
      };

      if (currentTime - result.lastExercise > 129600000) {
        newData.continuous = 1;
      }
      await db
        .collection("daily")
        .updateOne({ user: session.user?.email }, { $set: newData });
      return res.status(200).json({ user: session.user?.email, ...newData });
    } catch {
      return res.status(404).json("Not Found");
    }
  }

  return res.status(200).json("Not Found");
}
