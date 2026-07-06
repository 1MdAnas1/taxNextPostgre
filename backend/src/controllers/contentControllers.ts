import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllContent = async (req: Request, res: Response) => {
  try {
    const contents = await prisma.content.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContentByKey = async (req: Request, res: Response) => {
  try {
    const { key } = req.params as { key: string };
    const content = await prisma.content.findUnique({
      where: { sectionKey: key },
    });
    if (!content) return res.status(404).json({ message: 'Not found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { key } = req.params as { key: string };
    const { value } = req.body;

    const updated = await prisma.content.upsert({
      where: { sectionKey: key },
      update: { value },
      create: { sectionKey: key, value },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { key } = req.params as { key: string };
    await prisma.content.delete({ where: { sectionKey: key } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};