const r = require("raylib");
const s = require("./scanner.js");
const s1 = require("./s1.js");
const s2 = require("./s2.js");
const s3 = require("./s3.js");

const windowWidth = 700;
const windowHeight = 500;

const particle1_x = 130;
const particle1_width = 30;

const particle2_x = 40;
const particle2_width = 30;

const particle3_x = 150;
const particle3_height = 50;

const scanner_width = 30;

const startingPoint = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(windowWidth, windowHeight, "particle detector");
    r.SetTargetFPS(70);
    s2.x = r.GetScreenWidth() / 2;
}

function update() {
    moveScanner1();
    moveScanner2();
    moveScanner3();
}

function moveScanner3() {
    s3.y = s.moveScanner(s3.y, s3.velocity);
    s3.velocity = s.updateScannerDirection(
        s3.y,
        s3.height,
        windowHeight,
        startingPoint,
        s3.velocity,
    );
    s3.color = choose_Color(s3.y, s3.height, particle3_x, particle3_height);
}

function moveScanner2() {
    s2.x = s.moveScanner(s2.x, s2.velocity);
    s2.velocity = s.updateScannerDirection(
        s2.x,
        scanner_width,
        windowWidth,
        windowWidth / 2,
        s2.velocity,
    );
    s2.color = choose_Color(
        s2.x,
        scanner_width,
        particle1_x,
        particle1_width,
        particle2_x,
        particle2_width,
    );
}

function moveScanner1() {
    s1.x = s.moveScanner(s1.x, s1.velocity);
    s1.velocity = s.updateScannerDirection(
        s1.x,
        scanner_width,
        windowWidth / 2,
        startingPoint,
        s1.velocity,
    );
    s1.color = choose_Color(
        s1.x,
        scanner_width,
        particle1_x,
        particle1_width,
        particle2_x,
        particle2_width,
    );
}

function choose_Color(
    scannerX,
    scannerWidth,
    particleX,
    particleWidth,
    particle1x,
    particle1Width,
) {
    return areParticlesOverlapping(
        scannerX,
        scannerWidth,
        particleX,
        particleWidth,
        particle1x,
        particle1Width,
    )
        ? r.RED
        : r.WHITE;
}

function areParticlesOverlapping(
    scannerX,
    scannerWidth,
    particleX,
    particleWidth,
    particle1x,
    particle1Width,
) {
    return (
        isParticleOverlap(scannerX, scannerWidth, particleX, particleWidth) ||
        isParticleOverlap(scannerX, scannerWidth, particle1x, particle1Width)
    );
}

function isParticleOverlap(scannerX, scannerWidth, particlex, particleWidth) {
    return (
        scannerX + scannerWidth >= particlex &&
        scannerX <= particlex + particleWidth
    );
}

function drawParticle(x, y, width, height) {
    r.DrawRectangle(x, y, width, height, r.BLUE);
}
function drawScanner(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}
function draw() {
    r.BeginDrawing();

    drawParticle(particle1_x, 0, particle1_width, windowHeight);
    drawParticle(particle2_x, 0, particle2_width, windowHeight);
    drawParticle(0, particle3_x, windowWidth, particle3_height);

    drawScanner(s2.x, 0, scanner_width, windowHeight, s2.color);
    drawScanner(s1.x, 0, scanner_width, windowHeight, s1.color);
    drawScanner(0, s3.y, windowWidth, s3.height, s3.color);

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
