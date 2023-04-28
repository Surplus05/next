import { ObjectId } from "mongodb";
import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    let id = req.query.id;
    if (!id) return res.status(404).json("Not Found");
    let db = (await connectDB).db("next");
    let result = await db
      .collection("routine")
      .findOne({ _id: new ObjectId(id) });

    if (!result) return res.status(404).json("Not Found");

    return res
      .status(200)
      .json({ routineName: result.routineName, exercises: result.exercises });
  }

  if (req.method === "POST") {
    let db = (await connectDB).db("next");
    let routine = JSON.parse(req.body);
    console.log(routine.exercises);
    await db.collection("routine").updateOne(
      {
        _id: new ObjectId(routine.id),
      },
      {
        $set: {
          routineName: routine.routineName,
          exercises: routine.exercises,
        },
      }
    );
    return res.status(200).json("success");
  }

  if (req.method === "DELETE") {
    try {
      let db = (await connectDB).db("next");
      let result = await db
        .collection("routine")
        .deleteOne({ _id: new ObjectId(req.headers.id as string) });
      res.status(200).json(result);
    } catch {
      res.status(404).json("Not Found");
    }
  }
}
