import React, {useEffect, useState} from 'react'
import tiletypes from './data/tiletypes'

function Tile({onClick, ...props}) {

  const color = tiletypes[props.type].color

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

function Scene({viewportGrid, updatePosition, position, ...props}) {

  return (
    <div className="scene">
    {
    viewportGrid.map( (tile, index) => {
      return(
        <Tile 
        x={tile.x}
        y={tile.y}
        type={tile.type}
        key={index} 
        onClick={() => updatePosition(tile)}
        scale={props.scale}
        />
      )
    })
    }
    </div>
  )
}

function Game({config}) {
  
  const [sceneData, setSceneData] = useState(config.initScene)
  const [position, setPosition] = useState({x: 1, y: 1})
  const [velocity, setVelocity] = useState({x: 0, y: 0})

  useEffect(() => {
    console.log(`position: ${position.x}, ${position.y}`);
  })

  const velocityMap = {
    x: {
      '0': -1,
      '1': 0,
      '2': 1
    },
    y: {
      '0': -1,
      '1': 0,
      '2': 1
    }
  }

  const getTileType = (position) => {
    const tileData = sceneData.find(tile => {
      return (tile.x == position.x && tile.y == position.y)
    })
    return tileData.type
  }

  // map the size of the current viewport to an array
  const viewportTiles =  Math.pow(config.viewportSize, 2)
  let viewportTemplate = new Array(viewportTiles).fill({x: 0, y:0}, 0, viewportTiles)

  let viewportGrid = viewportTemplate.map( (tile, index) => {
    let xValue = index%config.viewportSize
    let yValue = Math.floor(index/config.viewportSize)

    let avatarX = xValue + position.x
    let avatarY = yValue + position.y
    
    return (
      {
        x: xValue, 
        y: yValue,
        type: getTileType({x: avatarX, y: avatarY})
      }
    )
  })

  const updatePosition = (clickedPosition) => {
    let velocity = getVelocity( clickedPosition )
    setPosition({
      x: position.x + velocity.x,
      y: position.y + velocity.y
    })
  }

  const getVelocity = (position) => {
    return {
      x: velocityMap.x[position.x],
      y: velocityMap.y[position.y]
    }
  }

  return (
    <>
    <Scene 
      viewportGrid={viewportGrid}
      scale={config.scale} 
      updatePosition={updatePosition}
    />
    </>
  )
}

export default Game