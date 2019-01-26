var cameraInput;
var grid = [];

var PIXEL_RESOLUTION = 24;
var PIXEL_DENSITY = 0.5;
var BRIGHTNESS_THRESHOLD = 225;
var FADE_SPEED = 0.95;
var SCATTER_SPEED = 1;

function setup() {
    background(15);
    createCanvas(windowWidth, windowHeight);

    grid = new Array();
    cameraInput = new Camera(PIXEL_DENSITY, PIXEL_RESOLUTION);
}

function draw() {
    background(0);
    cameraInput.read();
    for (var y = 0; y < cameraInput.height; y += 1) {
        for (var x = 2; x < cameraInput.width - 1; x += 1) {
            var i = (cameraInput.width - x + 1 + (y * cameraInput.width)) * 4;

            if (grid[i] == null) {
                grid[i] = new GridSquare(x, y, PIXEL_RESOLUTION);
            }

            var r = cameraInput.pixels[i + 0];
            var g = cameraInput.pixels[i + 1];
            var b = cameraInput.pixels[i + 2];
            let bright = (r + g + b) / 3

            grid[i].setBrightness(bright);
        }
    }

    grid.forEach(x => x.update())
    grid.forEach(x => x.render())
}

function mouseClicked() {
    BRIGHTNESS_THRESHOLD = map(mouseX, 0, width, 0, 254);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cameraInput.resize(windowWidth, windowHeight);
    grid = new Array();
  }

