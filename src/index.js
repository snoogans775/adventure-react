import React from 'react';
import { render } from 'react-dom'
import 'style/Main.css'

import Game from './components/game/Game'
import SceneEditor from './components/editor/SceneEditor'

import scene from './data/scenes/roomWithPerson.json'


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