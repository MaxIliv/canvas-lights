function Dot(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * size / 2;
    this.factor = 0.05;
};

Dot.prototype.draw = function () {
    this.update();
    ctx.save();
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

Dot.prototype.update = function () {
    this.r += this.factor;

    if (this.r > size / 2) {
        this.factor = -0.1;
    }

    if (this.r < size / 10) {
        this.factor = 0.1;
    }
}

Dot.prototype.colorize = function () {
    if (this.fill) {
        return;
    }

    this.fill = this.getRandomColor();
}

Dot.prototype.unColorize = function () {
    this.fill = 'black';
}

Dot.prototype.getRandomColor = function () {
    return this.colors[Math.floor(Math.random() * this.colors.length - 1)];
}

Dot.prototype.colors = ['#fea49f',
'#fbaf08', '#091f36', '#c7af6b', '#e4decd',
'#c2dde6', '#bccbde', '#8bf0ba', '#0e0fed',
'#ffdc6a', '#e62739', '#ed8a63', '#845007',
'#d4d4dc', '#393f4d'];