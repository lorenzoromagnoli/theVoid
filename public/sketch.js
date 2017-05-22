var points = 0;
var spinner;
var x;

var wW, vH;

var canvas;

var levels;
var currentLevel = 0;
var insidetheLevel = false;
var levelCount;

var images = [];

var user_ID;

function preload() {
    user_ID = getParameterByName('user'); //
    console.log(user_ID);

    levels = loadJSON("levels.json", prelodImages);
}


function prelodImages(levels) {
    levelCount = Object.keys(levels).length;
    console.log(levelCount);
    for (i = 0; i < levelCount; i++) {
        if (levels[i].asset != "none") {
            images[i] = loadImage("./assets/" + levels[i].asset, function(image) {
                console.log("image loaded", image);
                //         images[i]=image;
            });
        }
    }
    console.log(images);
}


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    spinner = createSprite(windowWidth / 2, windowHeight / 2, 100, 100);
    spinner.addAnimation("spinning", "assets/spinner.png");

    x = createSprite(windowWidth - 50, 50, 50, 50);
    x.addAnimation("static", "assets/x.png");

}


function draw() {
    background(255);
    drawSpinnerAndPoints();
    updatePoints();
    level();
}

function windowResized() {
    location.reload();
}

function drawSpinnerAndPoints() {
    spinner.rotation += 1;
    drawSprites();

    fill(0);
    textSize(36);
    textFont("Roboto Mono");
    textAlign(CENTER);

    push();
    translate(windowWidth / 2, (windowHeight / 2) + 15);
    text(points, 0, 0);
    pop()

    push();
    translate(windowWidth / 2, (windowHeight / 2) + 50);
    text(user_ID, 0, 0);
    pop();
}

function updatePoints() {
    points++;
}

function level() {
    if (currentLevel < levelCount) {
        if (points > levels[currentLevel].from && points < levels[currentLevel].from + levels[currentLevel].duration) {
            if (!insidetheLevel) {
                insidetheLevel = true;
            }
            drawMessages(levels[currentLevel].message, levels[currentLevel].position)
            if (levels[currentLevel].asset != "none") {
                drawAsset(currentLevel, levels[currentLevel].assetPosition.x, levels[currentLevel].assetPosition.y);
            }
        } else if (points > levels[currentLevel].from + levels[currentLevel].duration && insidetheLevel) {
            insidetheLevel = false;
            currentLevel++;
        } else {}

    } else {
        //if we don't have anymore static message to display
    }
}


function drawMessages(message, position) {
    if (position == "TOP") {
        push();
        translate(windowWidth / 2, (windowHeight / 2) - 150);
        text(message, 0, 0);
        pop()
    } else if (position == "BOTTOM") {
        push();
        translate(windowWidth / 2, (windowHeight / 2) + 150);
        text(message, 0, 0);
        pop()
    }
}

function drawAsset(index, x, y) {
    image(images[index], x, y);
}

function youLoose() {

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

@Override
public void onBackPressed() {
    new AlertDialog.Builder(this)
        .setTitle("Really Exit?")
        .setMessage("Are you sure you want to exit?")
        .setNegativeButton(android.R.string.no, null)
        .setPositiveButton(android.R.string.yes, new OnClickListener() {

            public void onClick(DialogInterface arg0, int arg1) {
                WelcomeActivity.super.onBackPressed();
            }
        }).create().show();
}
