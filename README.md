[![Build Status](https://travis-ci.org/Hyan18/the-css.svg?branch=master)](https://travis-ci.org/Hyan18/the-css)
[![Maintainability](https://api.codeclimate.com/v1/badges/a82bed84d0c95cae9565/maintainability)](https://codeclimate.com/github/Hyan18/the-css/maintainability)

# The-CSS

Check out the deployed app [here](https://the-css.herokuapp.com/)

Cellular Automata - single player game, evolution dependant on initial state. Using Conway's game of life you can solve puzzles on a single page web app.

## Getting Started

For local development:

```
$ git clone git@github.com:Hyan18/the-css.git
$ yarn install
$ yarn --cwd client install
$ yarn dev
```

## Running the tests

To run the jest/enzyme tests for React, the jest/supertest tests for Express and the coverage:

```
$ yarn run test
$ yarn run coverage-server
$ yarn run coverage-client
```

### Code style

To run the linter

```
$ yarn run lint
```

## User stories

```
As a user
So that I know what is going on
I want to see a grid of cells

As a user
So I know the state of the cell
I want the cells to have different colours

As a user
So I can decide when the game begins
I want to be able to press a play button

As a user
So I can decide when the game ends
I want to be able to press a stop button

As a user
So I can decide when the game iterates
I want to be able to press a step button

As a user
So I can observe the simulation
I want it to follow Conway's Game of Life

As a user
So I can set the initial state
I want to be able to click on a cell to set it's state
```

## Built With

* [MongoDB](https://mongodb.com) - The database
* [Express](https://expressjs.com/) - The backend server
* [React](https://reactjs.org/) - The frontend framework
* [Node](https://nodejs.org/) - The backend environment

## Authors

* **[Dawid Szpener](https://github.com/DawidSzpener)**


* **[Harrison Yan](https://github.com/Hyan18)**


* **[Harry Mumford](https://github.com/HarryMumford)**


* **[Jamie Wong](https://github.com/Jamie95187)**


* **[Alastair Gilles](https://github.com/ffgi-es)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Cheers Conway for inspiring us to build this beautiful project.
* etc

<p align="center">
  <img width="460" height="300" src="https://i.imgur.com/145qmP7.png">
</p>
