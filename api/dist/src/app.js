"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var client_1 = require("@prisma/client");
var prismaClient = new client_1.PrismaClient();
var router = express_1.Router();
exports.router = router;
// Universal routes
router.get('/', function (req, res) {
    return res.status(200).send('Welcome to the React Adventure API.');
});
// Begin scene controller construction via DI
var scene_service_1 = require("./scene/scene.service");
var scene_controller_1 = require("./scene/scene.controller");
var sceneService = new scene_service_1.SceneService(prismaClient);
var sceneController = new scene_controller_1.SceneController(sceneService);
router.get('/scene/:id', sceneController.getSceneById);
router.post('/scene', sceneController.createScene);
router.post('/scenes', sceneController.createScenes);
// Begin tile controller construction via DI
var tile_service_1 = require("./tile/tile.service");
var tile_controller_1 = require("./tile/tile.controller");
var tileService = new tile_service_1.TileService(prismaClient);
var tileController = new tile_controller_1.TileController(tileService);
router.get('/tile/:id', tileController.getTileById);
router.post('/tile', tileController.createTile);
router.post('/tiles', tileController.createTiles);
//# sourceMappingURL=app.js.map