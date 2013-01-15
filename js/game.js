

var canvas, ctx;

$(document).ready(function() {

    createCanvas();

    var bgImageLoader = loadImage("images/background.png");

    var marioImageLoader = loadImage("images/mario.png");

    var monsterImageLoader = loadImage("images/monster.png");

    var mario = {
        speed: 256
    };

    var monster = {};

    var fail = false;

    var keysDown = {};

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    var drawGameOver = function () {
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "40px Helvetica";
        ctx.textAlign = "middle";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", canvas.width/2-100, canvas.height/2);
    };

    var reset = function() {
        mario.x = 50;
        mario.y = 345;
        monster.x = mario.x + canvas.width/2;
        monster.y = 350;
    }

    var update = function (modifier) {
        if (fail) {
            return;
        }

        if (38 in keysDown) { // Key up

        }
        if (40 in keysDown) { // Key down

        }
        if (37 in keysDown) { // Key left
            if (mario.x > 0) {
                mario.x -= mario.speed * modifier;
            }
        }
        if (39 in keysDown) { // Key right
            if (mario.x < canvas.width) {
                mario.x += mario.speed * modifier;
            }
        }

        // Check collision
        if (
            mario.x <= (monster.x + 32)
                && monster.x <= (mario.x + 32)
                && mario.y <= (monster.y + 32)
                && monster.y <= (mario.y + 32)
            ) {
            fail = true;
        }
    };

    var render = function () {
        if (bgImageLoader.ready) {
            ctx.drawImage(bgImageLoader.image, 0, 0);
        }

        if (marioImageLoader.ready) {
            ctx.drawImage(marioImageLoader.image, mario.x, mario.y);
        }

        if (monsterImageLoader.ready) {
            ctx.drawImage(monsterImageLoader.image, monster.x, monster.y);
        }

        if (fail) {
            drawGameOver();
        }
    };

    var main = function () {
        var now = Date.now();
        var delta = now - then;
        update(delta / 1000);
        render();
        then = now;
    };

    reset();
    var then = Date.now();
    setInterval(main, 1);
});


function createCanvas() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 416;
    document.body.appendChild(canvas);
}

function ImageLoader(image) {
    this.image = image;
    this.ready = false;
}

function loadImage(imageUrl) {
    var image = new Image();
    var imageLoader = new ImageLoader(image);
    image.onload = function () {
        imageLoader.ready = true;
    };
    image.src = imageUrl;
    return imageLoader;
}

