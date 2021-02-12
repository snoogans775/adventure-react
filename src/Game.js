import React, {useState} from 'react'
import { render } from 'react-dom'
import styled from 'styled-components';

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

function Scene({grid, walls, ...props}) {

  const alert = (id) => {
    console.log(id)
  }

  return (
    <>
    {
    grid.map( (tile, index) => {
      return(
        <Tile 
        x={tile.x}
        y={tile.y}
        isWall={walls.includes(index)}
        key={index} 
        onClick={() => alert(tile)}
        scale={props.scale}/>
      )
    })
    }
    </>
  )
}

function Game({config}) {

  const [scale, setScale] = useState(config.scale)

  const totalTiles =  Math.pow(config.size, 2)

  const grid = new Array(totalTiles).fill({x:0, y:0}, 0, totalTiles)

  const gridWithValues = grid.map( (item, index) => {
    return (
      {
        x: index%config.size, 
        y: Math.floor(index/config.size)
      }
    )
  })

  const Container = styled.div`
    display: flex;
    min-width: 20em;
    min-height: 80em;
    border: 1px palevioletred solid;
  `;

  const Sticky = styled.div`
    position: sticky;
    top: 20px;
    min-width: 5em;
    max-height: 10em;
    background: ${props => props.primary ? "papayawhip" : "palevioletred"};
  `;

  return (
    <>
      <Scene grid={gridWithValues} scale={scale} walls={config.initWalls}/>
      <Container>
        <Sticky primary/>  
      </Container>
    </>
  )
}

export default Game