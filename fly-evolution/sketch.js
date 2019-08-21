const LIFE_SPAN = 700; // How long do flies live
const POP_SIZE = 500; // How many flies do we want
const REWARD_MULT = 200; // What is the reward for finding food
const PUNISH_DIV = 3; // What is the punishment for hitting something
const MUTATION_RATE = 0.1; // What is the rate at which flies mutate

let count = 0;
let generation = 0;
let averageFit = 0;
let sucsessRate = 0;

function setup() {
    console.log('Hello');

    createCanvas(640, 480);
   
    population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULT, PUNISH_DIV);
    
    wall = new Wall(width/2, height - height/3, 300, 30);
}

function draw() {
    background(3, 161, 252);
    
    
    fill(255)
    textSize(20);
    text("Generation:" + generation, 50, 50);
    text("Average Fitness:" + averageFit, 50, 100);
    text("Sucsess Rate:" + sucsessRate + "%", 50, 150);
    
    population.run(count);
    count++;

    if (count == LIFE_SPAN) {
        population.evaluate();
        
        averageFit = population.findAverageFitness();

        let newflies = population.generateNewPopulation(MUTATION_RATE);
        sucsessRate = population. sucsessRate;

        population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULT, PUNISH_DIV, newflies);
        
        count = 0;
        generation++;
    }  
}