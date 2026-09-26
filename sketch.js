const r = require("raylib");

const windowWidth = 600;
const windowHeight = 500;

const recWidth = 30;

const particleX = 30;
const particleWidth = 30;

const particle1x = 450;
const particle1Width = 30;


let scannerX = 0;
let speedOfRec1 = -1;

let scanner1x = windowWidth / 2;
let speedOfRec2 = -3;

let scannerHorizontal_y = 0;
const scannerHorizontalHeight = 50;
let color2 = r.WHITE;

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
    speedOfRec1 = recDirection(scannerX, recWidth, windowWidth / 2, 0, speedOfRec1);
    scannerX = decideDirection(scannerX, speedOfRec1);
    color = repetitionCalls(scannerX, recWidth, color, particleX, particleWidth, particle1x, particle1Width);

    speedOfRec2 = recDirection(scanner1x, recWidth, windowWidth, windowWidth / 2, speedOfRec2);
    scanner1x = decideDirection(scanner1x, speedOfRec2);
    color1 = repetitionCalls(scanner1x, recWidth, color1, particleX, particleWidth, particle1x, particle1Width);
}


function decideDirection(scannerx, direction) {
    return scannerx += direction;
}


function recDirection(scannerx, recWidth, endPoint, startingPoint, movement) {
    if ((scannerx + recWidth) === endPoint || scannerx === startingPoint) {
        return movement *= -1;
    }
    return movement;
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
    r.DrawRectangle(0, particleHorizontalX, windowWidth, particleHorizontalheight, r.BLUE)

    r.DrawRectangle(scannerX, 0, recWidth, windowHeight, color);
    r.DrawRectangle(scanner1x, 0, recWidth, windowHeight, color1);
    r.DrawRectangle(0, scannerHorizontal_y, windowWidth, scannerHorizontalHeight, r.WHITE);

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