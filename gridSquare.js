class GridSquare {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.x2 = x;
        this.y2 = y;
        this.brightness = 0;
        this.resolution = s;
        this.size = s / 2;
    }

    setBrightness(brightness) {
        if (brightness > BRIGHTNESS_THRESHOLD) {
            this.brightness = brightness;
            this.x2 = this.x;
            this.y2 = this.y;
        }
    }

    update() {
        this.brightness *= FADE_SPEED;

        if (this.brightness < 0) {
            this.brightness = 0;
        }

        this.x2 += random(-SCATTER_SPEED, SCATTER_SPEED);
        this.y2 += random(-SCATTER_SPEED, SCATTER_SPEED);
    }

    render() {
            noStroke();
            fill(random(this.brightness), random(this.brightness), 128 + sin(frameCount * 0.05) * 255, this.brightness)
            //fill(this.brightness, this.brightness, this.brightness, this.brightness)
            ellipse(this.x2 * this.resolution, this.y2 * this.resolution, this.size * (this.brightness / 128));
    }

}