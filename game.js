import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED } from './snake.js'

import { update as updateFood, draw as drawFood, } from './food.js'

import { outsideGrid } from './grid.js'


const gameBoard = document.querySelector('#game-board')

let lastRenderTime = 0
let gameOver = false

requestAnimationFrame(main)

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost!')) {
            location = '/'
        }
        return
    }

    requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)

}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

