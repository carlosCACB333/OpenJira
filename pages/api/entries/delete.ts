import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry as IEntry } from '../../../interfaces';
import { Entry } from '../../../models';

type Data = { msg: string } | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'No es un id válido' });
  }

  switch (req.method) {
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ msg: 'Método no definido' });
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  try {
    const entryDeleted = await Entry.findByIdAndDelete(req.query.id);
    await db.disconnect();
    if (!entryDeleted) {
      return res.status(400).json({ msg: 'Error al eliminar' });
    }
    return res.status(200).json(entryDeleted);
  } catch (error) {
    console.log(error);
    db.disconnect();
    return res.status(400).json({ msg: 'Error al eliminar' });
  }
};
