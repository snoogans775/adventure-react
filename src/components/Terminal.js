import React, {useState, useEffect} from 'react';

export default function Terminal({getTileType, clickedTile, ...props}) {
    const [messages, setMessages] = useState([]);

    useEffect( () => {
        if(clickedTile !== undefined) {
            console.log( getTileType(clickedTile) );
            let nextMessage = getTileType(clickedTile);
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