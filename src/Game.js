import React, { useEffect, useState } from 'react';
import GameContainer from './components/GameContainer';
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

  const [sceneData, setSceneData] = useState(config.scene.sceneData);
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const [gameState, setGameState] = useState([]);
  const [clickedTile, setClickedTile] = useState({ x: 1, y: 1 });

  useEffect(() => {
    //map all of the tiles to obects in the gameState
    setGameState(sceneData.map(sceneTile => {
      return {
        x: sceneTile.x,
        y: sceneTile.y,
        state: sceneTile.state ? sceneTile.state.default : {}
      }
    }));
  }, [sceneData])

  const getTile = (position) => {
    const tileData = sceneData.find(tile => {
      return (tile.x == position.x && tile.y == position.y);
    })
    return tileData;
  }

  //FIXME: Extract this to function
  function getViewportTiles(position) {
    // map the size of the current viewport to an array
    const viewportTiles = Math.pow(config.viewportSize, 2);
    const viewportTemplate = new Array(viewportTiles).fill({ x: 0, y: 0 }, 0, viewportTiles);
    const viewport = viewportTemplate.map((tile, index) => {
      let xValue = index % config.viewportSize;
      let yValue = Math.floor(index / config.viewportSize);

      // FIXME: this only works for 3x3 grids
      let viewportCenter = {
        x: xValue + position.x - 1,
        y: yValue + position.y - 1
      }

      return ({
        x: xValue,
        y: yValue,
        type: getTile({ x: viewportCenter.x, y: viewportCenter.y }).type
      })
    })
    return viewport;
  }

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

  return (
    <GameContainer>
      <Scene
        viewport={getViewportTiles(position)}
        scale={config.scale}
        updatePosition={updatePosition}
      />
      <Terminal
        clickedTile={clickedTile}
        getTile={getTile}
        gameState={gameState}
      />
    </GameContainer>
  )
}

export default Game