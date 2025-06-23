import React, { useEffect, useState } from 'react';
import GameContainer from './GameContainer';
import Terminal from './Terminal';
import tiletypes from '../../data/tiletypes';
import vMapRaw from '../../data/velocityMap.js';
const velocityMap = vMapRaw.default || vMapRaw;
import { initState } from '../../utils/initState';

function Tile({ x, y, onClick, type, scale}) {

  const color = tiletypes[type].color

  const style = {
    top: y * scale,
    left: x * scale,
    width: scale + 'px',
    height: scale + 'px',
    backgroundColor: color
  }

  return (
    <div className='tile' style={style} onClick={onClick}>

    </div>
  )
}

function Scene({ viewport, onClick, scale }) {
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
              onClick={() => onClick(tile)}
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
  const [state, setState] = useState(initState(config.scene.sceneData));
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const [clickedTile, setClickedTile] = useState(null);
  const [tileMessageIndices, setTileMessageIndices] = useState({});

  const updateMessageIndexForTile = (tileKey, newIndex) => {
      setTileMessageIndices(prevIndices => ({
          ...prevIndices,
          [tileKey]: newIndex
      }));
  };

  function getTileData(position) {
    const tileData = sceneData.find(tile => {
      return (tile.x == position.x && tile.y == position.y);
    })
    return tileData;
  }

  function getTileState(position) {
    const tile = state.find(tile => {
      return (tile.x == position.x && tile.y == position.y);
    });
    return tile;
  }

  function getVelocity(position) {
    return {
      x: velocityMap.x[String(position.x)],
      y: velocityMap.y[String(position.y)]
    }
  }

  function getViewportTiles(position) {
    // map the size of the current viewport to an array
    const viewportTiles = Math.pow(config.viewportSize, 2);
    const viewportTemplate = new Array(viewportTiles).fill({ x: 0, y: 0 }, 0, viewportTiles);
    const viewport = viewportTemplate.map((tile, index) => {
      let xValue = index % config.viewportSize;
      let yValue = Math.floor(index / config.viewportSize);
      let viewportCenter = {
        x: xValue + position.x - 1,
        y: yValue + position.y - 1
      }

      return ({
        x: xValue,
        y: yValue,
        type: getTileData({ x: viewportCenter.x, y: viewportCenter.y }).type
      })
    })
    return viewport;
  }

  function onClick(uiTile) {
    //Calculate scene position of clicked tile
    let velocity = getVelocity(uiTile)
    let clickedPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y
    }
    updatePosition(clickedPosition);
    interact(clickedPosition);
  }

  function updatePosition(clickedPosition) {
    setClickedTile(clickedPosition);
    // Update player position
    const tileData = getTileData(clickedPosition);
    const tileIsSolid = tiletypes[tileData.type].solid == true;
    !tileIsSolid ? setPosition(clickedPosition) : null;
  }

  function interact(clickedTile) {
    //FIXME: Needs a better method to update state objects
    //Should state.interact be a boolean for simplicity?
    const tileState = getTileState(clickedTile);
    if(tileState == undefined) return;
    if(clickedTile.x == position.x && clickedTile.y == position.y) {
      //The interactable tile triggers an update for all tiles in state
      const newState = state.map( tile => {
        if(tile.active == 'default') {
          return {...tile, active: 'interact'}
        }
      })
      setState(newState);
    }
  }

  return (
      <GameContainer>
        <Scene
          viewport={getViewportTiles(position)}
          scale={config.scale}
          onClick={onClick}
        />
        <Terminal
          clickedTile={clickedTile}
          getTileData={getTileData}
          getTileState={getTileState}
          tileMessageIndices={tileMessageIndices}
          updateMessageIndexForTile={updateMessageIndexForTile}
        />
      </GameContainer>
  )
}

export default Game
