var height = 500;
var width = 500;
var size = 50;
var dots = [];

var c = document.getElementById('canvas');
var ctx = c.getContext("2d");

function setup () {
    c.width = width;
    c.height = height;
    createDots();
    subscribeCanvasevents();
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
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
        for (let j = 0; j < width; j+=size) {
            var x = i + (size / 2);
            var y = j + (size / 2);
            dots.push(new Dot(x, y));
        }
    }
}

function subscribeCanvasevents () {
    c.addEventListener('mousemove', checkHit);
}

function checkHit (e) {
    var x = e.clientX;
    var y = e.clientY;

    dots.forEach(d => {
        var dx = d.x - x;
        var dy = d.y - y;


        var dist = Math.sqrt(dx * dx + dy * dy);
        if (
            dist <= d.r
        ) {
            d.colorize();
        }
    });
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

setup();
draw();