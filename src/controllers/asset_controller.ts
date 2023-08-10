import { Request, Response } from 'express';
import Asset, { IAsset, AssetStatus } from '../models/asset';
import Unit from '../models/unit';
import path from 'path';
import fs from 'fs';
import { imageDestination } from '../middlewares/multer';


export async function createAsset(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required.' });
        }

        const { name, description, model, owner, status, healthLevel, unitId, user } = req.body;

        if (!name || !description || !model || !owner) {
            return res.status(400).json({ error: 'Missing values in request body.' });
        }
        if (!status) {
            return res.status(400).json({ error: 'Status is required.' });
        } else if (!(status in AssetStatus)) {
            return res.status(400).json({ error: 'Invalid status.' });
        }
        if (!healthLevel) {
            return res.status(400).json({ error: 'Health level is required.' });
        }
        const health = parseInt(healthLevel)
        if (!(0 <= health && health <= 100)) {
            return res.status(400).json({ error: 'Health should be in range [0, 100]%.' });
        }
        if (!unitId) {
            return res.status(400).json({ error: 'Unit id is required.' });
        }

        const unit = await Unit.findById(unitId);
        if (!unit) {
            return res.status(404).json({ error: 'Unit not found.' });
        }
        if (!unit.companyId.equals(user.company.id)) {
            return res.status(403).json({ error: 'Unit is not part of user\'s company.' });
        }

        const asset: IAsset = new Asset({
            name,
            description,
            model,
            owner,
            status,
            healthLevel: health,
            imageName: req.file.filename,
            unitId: unitId,
        });


        await asset.save();
        res.status(201).json(asset);
    } catch (err) {
        res.status(500).json({ error: 'Could not create the asset.' });
    }
}

export async function getAssetImage(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { user } = req.body;

        const asset = await Asset.findById(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found.' });
        }
        const unit = await Unit.findById(asset.unitId);
        if (!unit) {
            return res.status(404).json({ error: 'Unit not found.' });
        }
        if (!unit.companyId.equals(user.company.id)) {
            return res.status(403).json({ error: 'Asset is not part of user\'s company.' });
        }

        const imagePath = path.join(imageDestination, asset.imageName);
        
        if (fs.existsSync(imagePath)) {
            res.contentType('image/jpg');
            fs.createReadStream(imagePath).pipe(res);
        } else {
            res.status(404).json({ error: 'Image not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve assets.' });
    }
}

export async function getAssets(_req: Request, res: Response) {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve assets.' });
    }
}

