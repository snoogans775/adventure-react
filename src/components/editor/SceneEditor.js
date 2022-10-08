import React, { useEffect, useState } from 'react';
import UiContainer from './UiContainer';
import tileTypes from '../../data/tiletypes';
import sceneTemplate from '../../utils/sceneTemplate';

function ExportButton(scene) {
  console.log(scene);
  return (
    <button className="export-btn">Export To Console</button>
  )
}

function TypeSelector({ selector, updateSelector, ...props }) {

  const allTileTypes = Object.keys(tileTypes)

  const handleClick = e => updateSelector(e.target.name)

  return (
    <div className='type-selector'>
      {allTileTypes.map((type, index) => {
        return (
          <button
            className='type-selector-item'
            key={index}
            name={type}
            onClick={handleClick}
          >
            {type}
          </button>
        )
      })}
    </div>
  )
}

function Tile({ onClick, ...props }) {

  const color = tileTypes[props.type].color

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

function Scene({ sceneGrid, updateTile, ...props }) {

  return (
    <div className="scene">
      {
        sceneGrid.map((tile, index) => {
          return (
            <Tile
              x={tile.x}
              y={tile.y}
              type={tile.type}
              key={index}
              onClick={() => updateTile(tile, index)}
              scale={props.scale}
            />
          )
        })
      }
    </div>
  )
}

function Game({ config }) {

  let loadedScene = config.initScene ? config.initScene.sceneData : sceneTemplate()
  let loadedScale = config.scale ? config.scale : 1;
  const [sceneData, setSceneData] = useState(loadedScene)
  const [scale, setScale] = useState(loadedScale)
  const [selector, setSelector] = useState('air')

  const updateTile = (tile, index) => {
    let newScene = [...sceneData]
    let newTile = { ...tile, type: selector }
    newScene[index] = newTile
    setSceneData(newScene)
  }

  const updateSelector = (name) => {
    setSelector(name)
  }

  return (
    <>
      <Scene
        sceneGrid={sceneData}
        scale={scale}
        updateTile={updateTile}
      />
      <UiContainer>
        <TypeSelector selector={selector} updateSelector={updateSelector} />
        <ExportButton scene={sceneData} />
      </UiContainer>
    </>
  )
}

export default Game