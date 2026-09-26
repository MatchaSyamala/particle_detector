const r = require("raylib");

const windowWidth = 600;
const windowHeight = 500;

const recWidth = 30;

const particleX = 350;
const particleWidth = 30;

const particle1x = 450;
const particle1Width = 30;

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
    scannerX = direction(scannerX, recWidth, windowWidth / 2, 0);
    color = repetitionCalls(scannerX, recWidth, color, particleX, particleWidth, particle1x, particle1Width);
    if ((scanner1x + recWidth) === windowWidth || scanner1x === windowWidth / 2) {
        recDirection1 *= -1;
    }
    scanner1x += recDirection1;
    color1 = repetitionCalls(scanner1x, recWidth, color1, particleX, particleWidth, particle1x, particle1Width);


}

function direction(scannerx, recWidth, endpoint, startingPoint) {
    if ((scannerx + recWidth) === endpoint || scannerx === startingPoint) {
        recDirection = recDirection * -1;
    }
    return scannerX += recDirection;
}

function repetitionCalls(scannerX, recWidth, color, particleX, particleWidth, particle1x, particle1Width) {

    color = detector(scannerX, recWidth, particleX, particleWidth);

    if (color != r.RED) {
        color = detector(scannerX, recWidth, particle1x, particle1Width);
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


function draw() {
    r.BeginDrawing();
    r.DrawRectangle(particle1x, 0, particle1Width, windowHeight, r.BLUE);
    r.DrawRectangle(particleX, 0, particleWidth, windowHeight, r.BLUE);
    r.DrawRectangle(scannerX, 0, recWidth, windowHeight, color);
    r.DrawRectangle(scanner1x, 0, recWidth, windowHeight, color1)
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