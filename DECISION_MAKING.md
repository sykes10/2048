# Decision Making

## Introduction

This document is for me to explain why I took the decision I made in the codebase.

## Game Logic

I decided to split the game logic into 3 different files:

- [`src/lib/2048Game.ts`](src/lib/2048Game.ts) - This file contains the board operations logic. Is meant to be as pure as possible. to avoid side effects. This file can be used by any other project that wants to use the 2048 game logic and it would be up to the dev to decide how to render the board and handle the game logic. This approach helps to keep the codebase clean and easy to test.
This approach also helps to easily add new features to the game without having to worry about the rendering logic.
- [`src/composables/use2048Game.ts`](src/composables/use2048Game.ts) - This file is in charge of handling the game logic. It uses the [`src/lib/2048.ts`](src/lib/2048.ts) and [`src/store/2048GameState.ts`](src/store/2048GameState.ts) file to perform the board operations and update the gameState. This file is meant to be used by the Vue components to handle the game logic.
- [`src/store/2048GameState.ts`](src/store/2048GameState.ts) - This file is in charge of handling the game state. It uses the [`src/lib/2048Game.ts`](src/lib/2048Game.ts) file to perform the board operations. This file is meant to be used by the Vue components to read the gameState.

### Score Calculation

I decided to decouple the score calculation from the board operations. This way I can easily change the score calculation logic without having to change the board operations logic and allows me to easily resume the game at any given state without having to keep track of the score. Another way I consider is to update the board logic to return the new board and the score that movement generated. This way I can keep the score calculation logic in the board operations logic. I decided to go with the first approach because I think it's easier to test and it's easier to understand.

## Testing

I decided to only test the [`src/lib/2048Game.ts`](src/lib/2048Game.ts) file because is the file with the most important part of the app. I with more time I would like to add e2e tests to test scenarios like chossing grid, game over and win just to make sure that is working as expected.

## External Libraries

- @vueuse/core - I used this library to handle the keyboard events. I think it's a great library that helps to keep the codebase clean and easy to read. It's also three shakeable so it doesn't add any extra weight to the bundle.
- tailwindcss - I used this library to help me with the styling. I think it's a great library that helps to keep the codebase clean and easy to read. It's also three shakeable so it doesn't add any extra weight to the bundle.


## Work I consider enought to be done for the test

- [x] Create a new Vue 3 project
- [x] Add TailwindCSS
- [x] Add the board logic
- [x] Add the game state
- [x] Add the game logic
- [x] Create the components to render the board

## Bonus work I decided to do because I was having fun

- [x] Refine the design
- [x] Add the ability to choose the grid size
- [x] Add the ability to configure the initial tiles and the tiles that are added on each movement by the dev.
- [x] Add the buttons pressed effects.
- [x] Add the ability to resume the game at any given state. This is done by saving the game state in the local storage.
- [x] Max score with localStorage
- [x] Responsive design

## Bonus work I will do if I have more time

- [ ] Add e2e tests
- [ ] Add more game modes.
- [ ] Add the ability to choose the theme.
- [ ] Add music and sound effects.
- [ ] Add animations.
