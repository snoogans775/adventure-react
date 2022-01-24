// Begin tile controller construction via DI
import { TileService } from './tile/tile.service'
import { TileController } from './tile/tile.controller'
const tileService = new TileService(prismaClient)
const tileController = new TileController(tileService)
router.get('/tile/:id', tileController.getTileById)
router.post('/tile', tileController.createTile)
router.post('/tiles', tileController.createTiles)

