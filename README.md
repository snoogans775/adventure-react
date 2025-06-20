# Adventure-react
A rudimentary adventure game engine in React.

## What is an adventure game?
The primary aim of this code is to create a bare-bones, highly minimalistic interpretation of an adventure game. The game Advenure for the Atari 2600 would be a good analogue.

## Directory Structure and Files
Game.js        - Logic for game
index.html     - Mountable html file for React
index.js       - React DOM mounting file  
SceneEditor.js - Build tile-based maps
- /src
- - /data
- - - All data models to be used by the game including tile definitions are kept here.
- - /style
- - - Necessary CSS to render the game in browser.
- -

## Backend API

The `api` directory contains a Node.js/Express backend API built with TypeScript and Prisma. This API was likely intended for features such as:

*   Saving and loading game progress.
*   Managing more complex game scenes or dynamic content.
*   Potential multiplayer features.

**Note:** The current version of the game deployed to GitHub Pages runs entirely on the client-side and does **not** use this backend API. The game loads its data from local JSON files.

The API code is provided for those who might want to:

*   Extend the game with backend features.
*   Host the game and API on a different platform that supports Node.js backends.
*   Explore the original full-stack vision for the project.

To run the API locally, you would typically navigate to the `api` directory, install dependencies (e.g., `yarn install`), and run the server (e.g., `yarn start`). It uses a SQLite database, which will be created in `api/prisma/database/`.