import React, {useEffect, useState} from 'react'

function Tile({onClick, isWall, ...props}) {

  const color = isWall ? 'gray': 'purple'
  const style = {
    top: props.y * props.scale,
    left: props.x * props.scale,
    width: props.scale + 'px',
    height: props.scale + 'px',
    backgroundColor: color
  }

  return (
    <div className='tile' style={style} onClick={onClick}>

    </div>
  )
}

function Scene({grid, walls, updateWalls, ...props}) {

  const checkWalls = (tile) => {
    return walls.filter( wall =>  wall.x == tile.x && wall.y == tile.y ).length > 0
  }

  return (
    <div className="scene">
    {
    grid.map( (tile, index) => {
      return(
        <Tile 
        x={tile.x}
        y={tile.y}
        isWall={checkWalls(tile)}
        key={index} 
        onClick={() => updateWalls(tile)}
        scale={props.scale}/>
      )
    })
    }
    </div>
  )
}

function Game({config}) {

  const [scale, setScale] = useState(config.scale)
  const [walls, setWalls] = useState([])

  const totalTiles =  Math.pow(config.size, 2)
  const grid = new Array(totalTiles).fill({x:0, y:0}, 0, totalTiles)

  const updateWalls = (tile) => {
    console.log(tile)
    setWalls(prevWalls => [...prevWalls, {
      x: tile.x, y: tile.y
    }]
    )
  }

  const gridWithValues = grid.map( (item, index) => {
    return (
      {
        x: index%config.size, 
        y: Math.floor(index/config.size)
      }
    )
  })

  const gridWithTileTypes = gridWithValues.map( tile => {
    let isWall = walls.filter( wall => {
      return (wall.x == tile.x && wall.y == tile.y)
    }) 
    return ({
      x: tile.x,
      y: tile.y,
      type: isWall.length > 0 ? 'wall' : 'air'
    })
  })

  console.log(gridWithTileTypes)

  return (
    <>
    <Scene 
      grid={gridWithValues} 
      scale={scale} 
      walls={walls} 
      updateWalls={updateWalls}
    />
    {/* <button onClick={moveRight}>Move right</button> */}
    </>
  )
}

export default Game