import React from 'react';
import { render } from 'react-dom'
import 'style/Game.css'

import Game from './Game'
import SceneEditor from './SceneEditor'

import scene from './data/scenes/scene1.json'


const editorConfig = {
    sceneSize: 9,
    viewportSize: 9,
    initScene: scene,
    scale: 60
};

const gameConfig = {
    sceneSize: 9,
    viewportSize: 3,
    scene: scene,
    scale: 60
};

render(<Game config={gameConfig} />, document.getElementById('root'), () => console.log('Engine Starting...'))