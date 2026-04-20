import { Request, Response } from 'express';
import { ScentTypeService } from '../../application/services/ScentTypeService';
import { MongooseScentTypeRepository } from '../../infrastructure/repositories/MongooseScentTypeRepository';
import logger from '../../config/logger';

const scentTypeRepository = new MongooseScentTypeRepository();
const scentTypeService = new ScentTypeService(scentTypeRepository);

export const getAllScentTypes = async (req: Request, res: Response) => {
  try {
    const scentTypes = await scentTypeService.getAllScentTypes();
    res.json(scentTypes);
  } catch (error: any) {
    logger.error(`Failed to fetch scent types: ${error.message}`);
    res.status(500).json({ message: 'Error fetching scent types', error: error.message });
  }
};

export const getScentTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const scentType = await scentTypeService.getScentTypeById(id as string);
    if (!scentType) {
      return res.status(404).json({ message: 'Scent Type not found' });
    }
    res.json(scentType);
  } catch (error: any) {
    logger.error(`Failed to fetch scent type ID ${id}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching scent type', error: error.message });
  }
};

export const addScentType = async (req: Request, res: Response) => {
  try {
    const scentType = await scentTypeService.addScentType(req.body);
    logger.info(`New scent type added: ${scentType.name}`);
    res.status(201).json(scentType);
  } catch (error: any) {
    logger.error(`Failed to add scent type: ${error.message}`);
    res.status(500).json({ message: 'Error adding scent type', error: error.message });
  }
};

export const updateScentType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const scentType = await scentTypeService.updateScentType(id as string, req.body);
    if (!scentType) {
      return res.status(404).json({ message: 'Scent Type not found' });
    }
    logger.info(`Scent type updated: ${scentType.name}`);
    res.json(scentType);
  } catch (error: any) {
    logger.error(`Failed to update scent type ID ${id}: ${error.message}`);
    res.status(500).json({ message: 'Error updating scent type', error: error.message });
  }
};

export const deleteScentType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await scentTypeService.removeScentType(id as string);
    if (deleted) {
      logger.info(`Scent type deleted: ID ${id}`);
      res.json({ message: 'Scent type deleted' });
    } else {
      res.status(404).json({ message: 'Scent Type not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to delete scent type ID ${id}: ${error.message}`);
    res.status(500).json({ message: 'Error deleting scent type', error: error.message });
  }
};
