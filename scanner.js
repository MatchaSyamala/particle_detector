function moveScanner(scannerX, direction) {
    return (scannerX += direction);
}

function updateScannerDirection(
    scannerX,
    scannerWidth,
    endPoint,
    startingPoint,
    move,
) {
    return scannerX + scannerWidth === endPoint || scannerX === startingPoint
        ? move * -1
        : move;
}
module.exports = {
    moveScanner,
    updateScannerDirection,
};
