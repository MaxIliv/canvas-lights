var size = Math.random() * 120 + 30;
var height = Math.floor(window.innerHeight / size) * size;
var width = Math.floor(window.innerWidth / size) * size;
var dots = [];

var c = document.getElementById('canvas');
var ctx = c.getContext("2d");

function setup () {
    c.width = width;
    c.height = height;
    createDots();
    subscribeCanvasEvents();
}

function draw() {
    background();
    // drawGrid();
    drawDots();
    window.requestAnimationFrame(draw);
}

function randomColor () {
    dots.forEach(d => d.unColorize());
    dots[Math.floor(Math.random() * dots.length)].colorize();
}

function createDots () {
    for (let i = 0; i < width; i+=size) {
        for (let j = 0; j < height; j+=size) {
            var x = i + (size / 2);
            var y = j + (size / 2);
            dots.push(new Dot(x, y));
        }
    }
}

function subscribeCanvasEvents () {
    c.addEventListener('mousemove', tryColorize);
    c.addEventListener('click', removeDot);
}

function checkHit (e, d) {
    var x = e.clientX;
    var y = e.clientY;

    return dist(d.x, d.y, x, y) <= d.r;
}

function tryColorize(e) {
    for (var i = 0; i < dots.length; i++) {
        if (checkHit(e, dots[i])) {
            dots[i].colorize();
            dots[i].escapeMode = true;
            dots[i].grow = true;
            break;
        }
    }
}

function dist (x, y, x1, y1) {
    var dx = x - x1;
    var dy = y - y1;

    return Math.sqrt(dx * dx + dy * dy);
}

function removeDot (e) {
    for (var i = 0; i < dots.length; i++) {
        if (checkHit(e, dots[i])) {
            dots.splice(i, 1);
            break;
        }
    }
} 
function drawGrid() {
    ctx.beginPath();

    for (var i = 0; i < width / size + 1; i++) {        
        var s = i * size;
    
        ctx.moveTo(s, 0);
        ctx.lineTo(s, height);
    
        ctx.moveTo(0, s);
        ctx.lineTo(width, s);
    }

    ctx.stroke();
}

function drawDots () {
    dots.forEach(d => d.draw());
}

function background (color) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.fillStyle = color || '#333';
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.restore();
}

setup();
draw();