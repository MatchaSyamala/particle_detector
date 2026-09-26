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

function draw() {
    r.BeginDrawing();
    r.DrawRectangle(x, 0, recWidth, windowHeight, r.WHITE);
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