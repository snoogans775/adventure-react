import React, {useState, useEffect} from 'react';

export default function Terminal({onClickTile, sceneTile, ...props}) {
    const [messages, setMessages] = useState([])

    useEffect( () => {
        setMessages([onClickTile(sceneTile), ...messages])
    }, [clickedTile])

    function formattedMessages() {
        const slicedMessages = messages.length > 3
        ? messages.slice(messages.length - 3, messages.length)
        : messages

        return messages.map( (msg, idx) => {
            return <li key={idx}>{msg}</li>
        })
    }

    return (
        <div className="terminal">
            <ol>
                {formattedMessages()}
            </ol>
        </div>
    )
}