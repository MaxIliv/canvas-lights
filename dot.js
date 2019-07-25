function Dot(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * size / 2;
    this.factor = 1;
    this.velocity = {
        x: Math.random() > 0.5 ? 5 : -5,
        y: Math.random() > 0.5 ? 5 : -5
    };
    this.escapeMode = false;
    this.grow = false;
};

Dot.prototype.draw = function () {
    this.update();
    ctx.save();
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.fill || '#555';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

Dot.prototype.escape = function () {
    if (this.x + this.r > c.width) {
        this.velocity.x = -(this.velocity.x);
    }

    if (this.x - this.r < 0) {
        this.velocity.x = -(this.velocity.x);
    }

    if (this.r + this.y > c.height) {
        this.velocity.y = -(this.velocity.y);
    }

    if (this.y - this.r < 0) {
        this.velocity.y = -(this.velocity.y);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Dot.prototype.update = function () {
    if (this.escapeMode) {
        this.escape();
    }

    if (this.grow) {
        this.changeRadius();
    }
};

Dot.prototype.changeRadius = function () {
    this.r += this.factor;

    if (this.r > size / 2) {
        this.factor = -1;
    }

    if (this.r < size / 10) {
        this.factor = 1;
    }
}

Dot.prototype.colorize = function () {
    if (this.fill) {
        return;
    }

    this.fill = this.getRandomColor();
}

Dot.prototype.unColorize = function () {
    this.fill = 'white';
}

Dot.prototype.getRandomColor = function () {
    return this.colors[Math.floor(Math.random() * this.colors.length - 1)];
}

Dot.prototype.colors = ['#fea49f',
'#fbaf08', '#091f36', '#c7af6b', '#e4decd',
'#c2dde6', '#bccbde', '#8bf0ba', '#0e0fed',
'#ffdc6a', '#e62739', '#ed8a63', '#845007',
'#d4d4dc', '#393f4d', '#C9D6EA', '#DC6BAD',
'#B3C0A4', '#E9E3E6', '#815355'];