class Dino {
    constructor(playerControlled) {
        this.originalwidth = 30;
        this.originalheight = 50;
        this.width = this.originalwidth;
        this.height = this.originalheight;

        this.pos = createVector(width / 4, this.calcGroundPosition());
        this.vel = createVector();

        this.playerControlled = playerControlled;
    
        this.isAlive = true;

        //this.brain = brain;
    }

    calcGroundPosition(){
        return (height - height / 4 - this.height / 2);
    }

    update(closestCactus){
        this.vel.y += -0.6;
        this.pos.y -=this.vel.y;

        let groundPos = this.calcGroundPosition();

        if(!this.playerControlled){
            // this.think(closestCactus);
        }

        if(this.pos.y >= groundPos){
            this.pos.y = groundPos;
            this.vel.y = 0;
        }

        if(this.hitCactus(closestCactus)){
            this.isAlive = false;
        }
    }

    think(cactus){

        let distance = cactus.pos.x - cactusWidth / 2 - this.pos.x + this.width / 2;
        
        let actions = this.brain.predict([distance, cactus.count]);

        let choice = actions.indexOf(Math.max(...actions));

        // if(choice == 0){
        //     this.unDuck();
        //     this.jump();
        // }else{
        //     this.duck();
        // }else{

        //}
        
    }
    
    
    jump(){
        if(this.pos.y == this.calcGroundPosition() && this.height > this.originalwidth){
            this.vel.y = 12; 
        }
    }


    duck(){
        if(this.pos.y == this.calcGroundPosition()){
            this.height = this.originalwidth;
            this.width = this.originalheight
        }
    }

    unDuck(){
        this.height = this.originalheight;
        this.width = this.originalwidth;
    }

    show(){
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        if(this.playerControlled){
            fill(0, 0, 0, 100);
        }else{
            fill(66, 245, 126);        
        }
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
       
        
    }
    

    hitCactus(cactus) {
        let cactusWidth = ((cactus.width + cactus.spacing) * cactus.count) - cactus.spacing; // Calculate Full Width of Cactus

        if (this.pos.x + this.width / 2 > cactus.pos.x - cactus.width / 2 && this.pos.x - this.width / 2 < cactus.pos.x + cactusWidth) { // Check X
            if (this.pos.y + this.height / 2 > cactus.pos.y - cactus.height / 2) {
                return true;
            }
        }
        return false;
    }

}