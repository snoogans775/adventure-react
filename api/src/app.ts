import { Request, Response } from 'express'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
const router = Router()

// Universal routes
router.get('/', (req: Request, res: Response): Response => {
   return res.status(200).send('Welcome to the React Adventure API.') 
})

// Begin scene controller construction via DI
import { SceneService } from './scene/scene.service'
import { SceneController } from './scene/scene.controller'
const sceneService = new SceneService(prismaClient)
const sceneController = new SceneController(sceneService)
router.get('/scene/:id', sceneController.getSceneById)
router.post('/scene', sceneController.createScene)
router.post('/scenes', sceneController.createScenes)
router.post('/scene/query', sceneController.query)

// Begin tile controller construction via DI
import { TileService } from './tile/tile.service'
import { TileController } from './tile/tile.controller'
const tileService = new TileService(prismaClient)
const tileController = new TileController(tileService)
router.get('/tile/:id', tileController.getTileById)
router.post('/tile', tileController.createTile)
router.post('/tiles', tileController.createTiles)

export { router }