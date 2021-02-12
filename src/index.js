import React from 'react';
import { render } from 'react-dom'
import 'style/Game.css'

import Game from './Game'

const config = {
    size: 3,
    scale: 100
};

render(<Game config={config} />, document.getElementById('root'), () => console.log('loaded'))