import React, {useState, useEffect, useContext} from 'react';
import {GameStateContext} from './GameStateContext';

export default function Terminal({getTileData, clickedTile, getTileState, ...props}) {
    const [messages, setMessages] = useState([]);

    function getTileMessage(tile) {
        // console.log('searching for tile data...');
        const sceneTile = getTileData({x: tile.x, y: tile.y});
        // console.log(sceneTile);
        // console.log('checking for state...');
        const tileState = getTileState({x: tile.x, y: tile.y});
        console.log(tileState);
        if(tileState != undefined) {
            const responses = sceneTile.state[tileState.active].responses;
            return responses[Math.floor(Math.random() * responses.length)];
        } else {
            return sceneTile.type;
        }
    }

    useEffect( () => {
        if(clickedTile !== undefined) {
            let nextMessage = getTileMessage(clickedTile);
            setMessages([nextMessage, ...messages]);
        }
    }, [clickedTile])

    function formattedMessages() {
        const slicedMessages = messages.length > 3
        ? messages.slice(0, 3)
        : messages;

        return slicedMessages.map( (msg, idx) => {
            return <li key={idx}>{msg}</li>
        });
    }

    return (
        <div className="terminal">
            <ol>
                {formattedMessages()}
            </ol>
        </div>
    );
}