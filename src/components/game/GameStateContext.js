import React, { useState, useEffect, createContext } from 'react';

const GameStateContext = createContext([{}, () => {}]);

function GameStateProvider({sceneData, ...props}) {
    const [state, setState] = useState({});
    useEffect(() => {
        //map all of the tiles to obects in the GameState
        setState(sceneData.map(sceneTile => {
            return {
                x: sceneTile.x,
                y: sceneTile.y,
                id: sceneTile.id ? sceneTile.id : null,
                state: sceneTile.state ? {"default": sceneTile.state.default} : {}
            }
        }));
    }, []);

    return (
        <GameStateContext.Provider value={[state, setState]}>
            {props.children}
        </GameStateContext.Provider>
    );
}
export {GameStateContext, GameStateProvider};