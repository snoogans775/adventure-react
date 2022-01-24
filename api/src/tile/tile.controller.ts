import { Request, Response } from 'express'
import { Tile } from'@prisma/client'
import { TileService } from'./tile.service'

class TileController {
    constructor(
        private readonly tileService: TileService
    ) {
        this.tileService = tileService
    }

    async createTile(req: Request, res: Response, next: Function): Promise<Tile> {
        console.log(this)
        return this.tileService.createTile(req.body)
    }

    async createTiles(req: Request, res: Response, next: Function): Promise<Tile[]> {
        return this.tileService.createTiles(req.body)
    }
    async getTileById(req: Request, res: Response, next: Function): Promise<Tile | null> {
        return this.tileService.tile({id: Number(req.params.id)})
    }
}

export { TileController }