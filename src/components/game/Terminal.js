import React, {useState, useEffect, useContext} from 'react';
import {GameStateContext} from './GameStateContext';

export default function Terminal({getTileData, clickedTile, getTileState, tileMessageIndices, updateMessageIndexForTile, ...props}) {
    const [messages, setMessages] = useState([]);

    function getTileMessage(tile) {
        const sceneTile = getTileData({x: tile.x, y: tile.y});
        const tileState = getTileState({x: tile.x, y: tile.y});

        if (tileState && sceneTile && sceneTile.state && sceneTile.state[tileState.active]) {
            const responses = sceneTile.state[tileState.active].responses;
            if (responses && responses.length > 0) {
                const tileKey = `${tile.x},${tile.y}`;
                const currentIndex = tileMessageIndices[tileKey] || 0;

                const message = responses[currentIndex];

                let nextIndex = currentIndex;
                if (currentIndex < responses.length - 1) {
                    nextIndex = currentIndex + 1;
                } else {
                    nextIndex = responses.length - 1; // Stay at the last index
                }
                updateMessageIndexForTile(tileKey, nextIndex);

                return message;
            }
        }
        // Fallback if no responses or state
        return sceneTile ? sceneTile.type : "Unknown area";
    }

    useEffect( () => {
        if(clickedTile) {
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