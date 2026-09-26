const r = require("raylib");

const windowWidth = 700;
const windowHeight = 500;

const recWidth = 30;

const particleX = 130;
const particleWidth = 30;

const particle1x = 450;
const particle1Width = 30;

const particleHorizontalX = 150;
const particleHorizontalheight = 50;

let scannerX = 0;
let speedOfRec1 = 2;

let scanner1x = windowWidth / 2;
let speedOfRec2 = 4;

const scannerHorizontalHeight = 50;
let scannerHorizontal_y = 0;
let speedOfHorizontal = 1;


let scanner1color = r.WHITE;
let scanner2color = r.WHITE;
let scanner3color = r.WHITE;


function running() {
    return !r.WindowShouldClose();
}


function setup() {
    r.InitWindow(windowWidth, windowHeight, "particle detector");
    r.SetTargetFPS(70);
}


function update() {
    scannerX = decideDirection(scannerX, speedOfRec1);
    speedOfRec1 = recDirection(scannerX, recWidth, windowWidth / 2, 0, speedOfRec1);
    scanner1color = repetitionCalls(scannerX, recWidth, scanner1color, particleX, particleWidth, particle1x, particle1Width);

    scanner1x = decideDirection(scanner1x, speedOfRec2);
    speedOfRec2 = recDirection(scanner1x, recWidth, windowWidth, windowWidth / 2, speedOfRec2);
    scanner2color = repetitionCalls(scanner1x, recWidth, scanner2color, particleX, particleWidth, particle1x, particle1Width);

    scannerHorizontal_y = decideDirection(scannerHorizontal_y, speedOfHorizontal);
    speedOfHorizontal = recDirection(scannerHorizontal_y, scannerHorizontalHeight, windowHeight, 0, speedOfHorizontal);
    scanner3color = repetitionCalls(scannerHorizontal_y, scannerHorizontalHeight, scanner3color, particleHorizontalX, particleHorizontalheight);


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

    r.DrawRectangle(scannerX, 0, recWidth, windowHeight, scanner1color);
    r.DrawRectangle(scanner1x, 0, recWidth, windowHeight, scanner2color);
    r.DrawRectangle(0, scannerHorizontal_y, windowWidth, scannerHorizontalHeight, scanner3color);

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