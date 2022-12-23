const WIDTH = 480;
const HEIGHT = 480;

const BACKGROUND_COLOR = "black";
const SEGMENT_COLOR = "white";
const SKY_COLOR = "black";
const GROUND_COLOR = "brown";

var scene = document.getElementById("scene");
scene.width = WIDTH;
scene.height = HEIGHT;

var sceneCtx = scene.getContext("2d");

var view = document.getElementById("view");
view.width = WIDTH;
view.height = HEIGHT;

var viewCtx = view.getContext("2d");

var camera = new Camera(WIDTH /2, HEIGHT / 2, WIDTH);

Intersection.SCREEN_WIDTH = WIDTH;
Intersection.SCREEN_HEIGHT = HEIGHT;

var colors = ["blue", "cyan", "green", "yellow", "orange", "red", "gray"];

function color() {
    return colors[parseInt(random(0, colors.length-1))]
}

var obstacles = [];

var a;
var b;

window.addEventListener("mousedown", (e)=>{
    a = new Point(e.clientX, e.clientY)
});

window.addEventListener("mouseup", (e)=>{
    b = new Point(e.clientX, e.clientY)
    obstacles.push(new Obstacle(a, b, color()));
});


registerInput('z', () => {
    if(!camera.collisions(obstacles)){
        camera.forward();
    }
});
registerInput('s', () => { 
    if(!camera.collisions(obstacles)){
        camera.backward();
    } 
});
registerInput('q', () => camera.rotate(-3));
registerInput('d', () => camera.rotate(3));

function drawObstacles() {
    obstacles.forEach(obstacle => obstacle.draw(sceneCtx));
}

function update() {
    sceneCtx.fillStyle = BACKGROUND_COLOR;
    sceneCtx.fillRect(0, 0, WIDTH, HEIGHT);

    viewCtx.fillStyle = SKY_COLOR;
    viewCtx.fillRect(0, 0, WIDTH, HEIGHT/2);
    viewCtx.fillStyle = GROUND_COLOR;
    viewCtx.fillRect(0, HEIGHT/2, WIDTH, HEIGHT);

    drawObstacles();
    updateInputs();
    
    camera.project(obstacles);
    camera.drawCamera(sceneCtx);
    camera.drawCameraView(viewCtx);

    window.requestAnimationFrame(update);
}

update()