export function initState(sceneData) {
    return sceneData
    .filter( tile => tile.state !== undefined )
    .map( tile => {
        return {
            x: tile.x,
            y: tile.y,
            type: tile.type,
            active: 'default',
            state: tile.state
        }
    });
}