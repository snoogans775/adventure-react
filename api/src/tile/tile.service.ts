import { Prisma, Tile } from '@prisma/client'
class TileService {
    constructor(private prisma) {}
    async tile(TileWhereUniqueInput: Prisma.TileWhereUniqueInput): Promise<Tile | null> {
        return this.prisma.tile.findUnique({
            where: TileWhereUniqueInput
        })
    }
    async createTile(tileData: Prisma.TileCreateInput): Promise<Tile> {
        return this.prisma.tile.create({
            data: tileData
        })

    }

    async createTiles(tileData: Prisma.TileCreateInput[]): Promise<Tile[]> {
        return this.prisma.tile.createMany({
            data: tileData
        })

    }
}

export { TileService }