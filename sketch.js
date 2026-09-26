const r = require("raylib");

const windowWidth = 600;
const windowHeight = 500;

const recWidth = 30;

const particlex = 250;
const particleWidth = 100;

const particle1x = 450;
const particle1Width = 20;

let scannerX = 0;
let recDirection = -1;

let color = r.WHITE;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "particle detector");
    r.SetTargetFPS(70);
}

function update() {
    if ((scannerX + recWidth) === windowWidth || scannerX === 0) {
        recDirection = recDirection * -1;
    }
    scannerX += recDirection;


    detector(scannerX, recWidth, particlex, particleWidth);
    if (color != r.RED) {
        detector(scannerX, recWidth, particle1x, particle1Width);
    }
}

function detector(scannerX, recWidth, particlex, particleWidth) {
    if (scannerX + recWidth >= particlex && scannerX <= particlex + particleWidth) {
        color = r.RED;
    }
    else {
        color = r.WHITE;
    }
}

function drawRectangle(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    drawRectangle(particle1x, 0, particle1Width, windowHeight, r.BLUE);
    drawRectangle(particlex, 0, particleWidth, windowHeight, r.BLUE);
    drawRectangle(scannerX, 0, recWidth, windowHeight, color);
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