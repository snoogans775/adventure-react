module.exports = (size) => {
  const sizeSquared =  Math.pow(config.sceneSize, 2)
  let sceneTemplate = new Array(sizeSquared).fill({x: 0, y:0}, 0, sizeSquared)
  return sceneTemplate.map( (tile, index) => {
      return ({
        x: index%config.viewportSize, 
        y: Math.floor(index/config.viewportSize),
        type: getTileType({x: avatarX, y: avatarY})
      })
    })
}