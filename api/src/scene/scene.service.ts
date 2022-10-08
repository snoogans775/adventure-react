import { Prisma, Scene } from '@prisma/client'
class SceneService {
    constructor(private prisma: any) {
        this.prisma = prisma
    }
    async scene(SceneWhereUniqueInput: Prisma.SceneWhereUniqueInput): Promise<Scene | null> {
        return this.prisma.scene.findUnique({
            where: SceneWhereUniqueInput
        })
    }
    async createScene(sceneData: Prisma.SceneCreateInput): Promise<Scene> {
        return this.prisma.scene.create({
            data: sceneData
        })
    }

    async createScenes(sceneData: Prisma.SceneCreateInput[]): Promise<Scene[]> {
        return this.prisma.scene.create({
            data: sceneData
        })
    }

    async query(query: Object): Promise<Scene> {
        return this.prisma.scene.findOne(query)
    }
}

export { SceneService }