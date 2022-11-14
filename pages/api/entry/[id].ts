import mongoose from 'mongoose';
import { Entry as IEntry } from '../../../interfaces';
import { db } from '../../../database';
import { Entry } from '../../../models';
import { NextApiRequest, NextApiResponse } from 'next';
type Data =
  | {
      msg: string;
    }
  | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'No es un id válido' });
  }
  switch (req.method) {
    case 'GET':
      return getEntryByID(req, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ msg: 'Método no definido' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const entryToUpdate = await Entry.findById(req.query.id);
  if (!entryToUpdate) {
    db.disconnect();
    return res.status(400).json({ msg: 'No se encuentra la entrada con ese id' });
  }

  const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

  try {
    const entryUpdated = await Entry.findByIdAndUpdate(
      req.query.id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    return res.status(200).json(entryUpdated!);
  } catch {
    await db.disconnect();
    return res.status(400).json({ msg: 'Error al actualizar' });
  }
};
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

const getEntryByID = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const entry = await Entry.findById(req.query.id);
  db.disconnect();
  if (!entry) {
    return res.status(400).json({ msg: 'No se encuentra la entrada con ese id' });
  }
  return res.status(200).json(entry);
};
