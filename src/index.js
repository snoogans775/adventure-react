import React from 'react';
import { render } from 'react-dom'
import 'style/Game.css'

import Game from './Game'
import SceneEditor from './SceneEditor'

import scene from './data/scene1.js'


const config = {
    viewportSize: 3,
    initScene: scene,
    scale: 60
};

render(<Game config={config} />, document.getElementById('root'), () => console.log('loaded'))