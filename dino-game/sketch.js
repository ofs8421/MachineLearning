let ground;

let dinos = [];
let cacti = [];

let spawnCactusFrame;

let score = 0;
let highScore = 0;

function setup() {
    createCanvas(640, 480);
    tf.setBackend('cpu')
    ground = new Ground();
    spawnCactusFrame = 40;
    cacti.push(new Cactus());

    firstGeneration();
}

function draw() {
    background(255);

    score += 1;

    if (score > highScore){
        highScore = score
    }

    push();
    fill(0);
    textSize(20);
    textAlign(RIGHT);
    text(score, width, 55)
    text("HighScore: " + highScore, width, 30);
    pop();

    ground.show();

    if (frameCount == spawnCactusFrame){
        cacti.push(new Cactus());
        spawnCactusFrame += int(random(40, 60));
    }

    for(let i = 0; i < cacti.length; i++){
        if (cacti[i].pos.x < -cacti[i].width){
            cacti.shift();
        }
        cacti[i].update();
        cacti[i].show();
    }
    
    let allDead = true;

    for(let i = 0; i < dinos.length; i++){
        if (dinos[i].playerControlled){
            if (keyIsDown(DOWN_ARROW)){
                dinos[i].duck();
            }else{
                dinos[i].unDuck();
            }
            if(keyIsDown(UP_ARROW)){
                dinos[i].jump();
            }
        }
        
        if (dinos[i].isAlive) {
            allDead = false;
            dinos[i].update(getClosestCactus(dinos[i]));
            dinos[i].show();
        }
    }

    if(allDead){
        nextGeneration();
    }

}

function getClosestCactus(dino){

    let closestIndex = 0;

    while(cacti[closestIndex].pos.x + cacti[closestIndex].fullWidth/2 < dino.pos.x - dino.width/2){
        closestIndex++;
    }
    return cacti[closestIndex];
}

function firstGeneration(){
    dinos = [];
    dinos.push(new Dino(true, new NeuralNetwork(2, 4, 3)))
}

function nextGeneration(){
    dinos = [];
    dinos.push(new Dino(true, new NeuralNetwork(2, 4, 3)))

    spawnCactusFrame = frameCount + 40;
    cacti = [];
    cacti.push(new Cactus());

    score = 0;

}


