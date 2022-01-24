import { Request, Response } from 'express'
import { Scene } from'@prisma/client'
import { SceneService } from'./scene.service'

class SceneController {
    constructor(
        private readonly sceneService: SceneService
    ) {}

    async createScene(req: Request, res: Response, next: Function): Promise<Scene> {
        return this.sceneService.createScene(req.body)
    }

    async createScenes(req: Request, res: Response, next: Function): Promise<Scene[]> {
        return this.sceneService.createScenes(req.body)
    }
    async getSceneById(req: Request, res: Response, next: Function): Promise<Scene | null> {
        return this.sceneService.scene({id: Number(req.params.id)})
    }
}

export { SceneController }