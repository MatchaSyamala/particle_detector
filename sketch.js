const r = require("raylib");
const windowWidth = 600;
const windowHeight = 500;

const recWidth = 30;

let x = 0;
let recDirection = -1;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "particle detector");
    r.SetTargetFPS(70);
}

function update() {
    if ((x + recWidth) === windowWidth || x === 0) {
        recDirection = recDirection * -1;
    }
    x += recDirection;
}

function drawRectangle(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    drawRectangle(250, 0, 70, windowHeight, r.BLUE);
    drawRectangle(x, 0, recWidth, windowHeight, r.WHITE);
    r.ClearBackground(r.BLACK);
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};