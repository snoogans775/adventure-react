import React, { useEffect, useState } from 'react';
import UiContainer from './components/UiContainer';
import Terminal from './components/terminal';
import tiletypes from './data/tiletypes';
import velocityMap from './data/velocityMap';

function Tile({ onClick, ...props }) {

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

function Scene({ viewport, updatePosition, scale }) {
  return (
    <div className="scene">
      {
        viewport.map((tile, index) => {
          return (
            <Tile
              x={tile.x}
              y={tile.y}
              type={tile.type}
              key={index}
              onClick={() => updatePosition(tile)}
              scale={scale}
            />
          )
        })
      }
    </div>
  )
}

function Game({ config }) {

  const [sceneData, setSceneData] = useState(config.scene.sceneData)
  const [viewportTemplate, setViewportTemplate] = useState([])
  const [position, setPosition] = useState({ x: 1, y: 1 })
  const [clickedTile, setClickedTile] = useState({ x: 1, y: 1 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })

  useEffect( () => {
    // map the size of the current viewport to an array
    const viewportTiles = Math.pow(config.viewportSize, 2)
    setViewportTemplate( new Array(viewportTiles).fill({ x: 0, y: 0 }, 0, viewportTiles) )
  }, [sceneData])

  const getTileType = (position) => {
    const tileData = sceneData.find(tile => {
      return (tile.x == position.x && tile.y == position.y)
    })
    return tileData.type
  }

  let viewport = viewportTemplate.map((tile, index) => {
    let xValue = index % config.viewportSize
    let yValue = Math.floor(index / config.viewportSize)

    // FIXME: this only works for 3x3 grids
    let viewportCenter = {
      x: xValue + position.x - 1,  
      y: yValue + position.y - 1
    }

    return ({
      x: xValue,
      y: yValue,
      type: getTileType({ x: viewportCenter.x, y: viewportCenter.y })
    })
  })

  const updatePosition = (uiTile) => {
    //Calculate next position in scene based on clicked ui tile
    let velocity = getVelocity(uiTile)
    let nextPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y
    }
    setClickedTile(nextPosition)
    // Update avatar position
    if (tiletypes[uiTile.type].solid == true) return;
    setPosition(nextPosition)
  }

  const getVelocity = (position) => {
    return {
      x: velocityMap.x[position.x],
      y: velocityMap.y[position.y]
    }
  }

  const onClickTile = (sceneTile) => {
    
  }

  return (
    <UiContainer>
      <Scene
        viewport={viewport}
        scale={config.scale}
        updatePosition={updatePosition}
      />
      <Terminal
        clickedTile={clickedTile}
        getTileType={getTileType}
      />
    </UiContainer>
  )
}

export default Game