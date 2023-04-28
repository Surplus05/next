import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    let session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(404).json("Not Found");
    let db = (await connectDB).db("next");
    let result = await db
      .collection("routine")
      .find({ user: session.user?.email })
      .toArray();
    return res.status(200).json(result);
  }

  if (req.method === "POST") {
    let session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(404).json("Not Found");

    let db = (await connectDB).db("next");
    await db.collection("routine").insertOne({
      _id: new ObjectId(),
      user: session.user?.email,
      ...JSON.parse(req.body),
    });
    return res.status(200).json("success");
  }
}
