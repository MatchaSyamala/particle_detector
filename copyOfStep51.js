const r = require("raylib");

const windowWidth = 600;
const windowHeight = 500;

const recWidth = 30;

const particleX = 80;
const particleWidth = 100;

const particle1x = 40;
const particle1Width = 20;

let scannerX = 0;
let recDirection = -1;

let scanner1x = windowWidth / 2;
let recDirection1 = -3;
let color = r.WHITE;
let color1 = r.WHITE;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "particle detector");
    r.SetTargetFPS(70);
}

function update() {
    scannerX = direction(scannerX, recWidth, 0);
    color = repetitionCalls(scannerX, recWidth, color);
    if ((scanner1x + recWidth) === windowWidth || scanner1x === windowWidth / 2) {
        recDirection1 *= -1;
    }
    scanner1x += recDirection1;
    color1 = repetitionCalls(scanner1x, recWidth, color1);


}

function direction(scannerx, recWidth, startingPoint) {
    if ((scannerx + recWidth) === windowWidth / 2 || scannerx === startingPoint) {
        recDirection = recDirection * -1;
    }
    return scannerX += recDirection;
}

function repetitionCalls(scannerX, recWidth, color) {

    color = detector(scannerX, recWidth, particleX, particleWidth);

    if (color != r.RED) {
        color = detector(scannerX, recWidth, particle1x, particle1Width);
        return color;
    }
    return color;

}

function detector(scannerX, recWidth, particlex, particleWidth) {
    if (scannerX + recWidth >= particlex && scannerX <= particlex + particleWidth) {
        return r.RED;
    }
    else {
        return r.WHITE;

    }
}

function drawRectangle(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    drawRectangle(particle1x, 0, particle1Width, windowHeight, r.BLUE);
    drawRectangle(particleX, 0, particleWidth, windowHeight, r.BLUE);
    drawRectangle(scannerX, 0, recWidth, windowHeight, color);
    drawRectangle(scanner1x, 0, recWidth, windowHeight, color1)
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