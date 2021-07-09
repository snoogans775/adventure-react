import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

export default function GameContainer({children, ...props}) {

    return (
        <div className="game-container">
            {children}
        </div>
    )
}