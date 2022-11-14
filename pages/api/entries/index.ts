import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry } from "../../../models";
import { Entry as IEntry } from "../../../interfaces/entry";

type Data = { msg: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return addEntry(req, res);
    default:
      return res.status(400).json({ msg: "Método no definido" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  return res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description } = req.body;
  const entry = new Entry({
    description,
  });

  try {
    await db.connect();
    const newEntry = await entry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (e) {
    await db.disconnect();
    console.log(e);

    return res.status(400).json({ msg: "Error al insertar" });
  }
};
