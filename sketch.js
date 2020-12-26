
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  var survivalTime
// creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
// creating moving ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //create Obstacle and banana Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  score = 0;
}


function draw() {
background(255);
  
if(ground.x<0){
  ground.x = ground.width/2; 
}  
  
//jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
        }
    //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  // spawn the bananas
  spawnFood();
  // spawn the obstacle
  spawnObstacle();
drawSprites(); 
stroke("white");
textSize(20);
fill("white");
text("Score:",+ score,500,50);
  
 if(obstacleGroup.isTouching(monkey)) {
   ground.velocityX = 0;
   monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  
   
 }
stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time:",+ survivalTime,100,50);  
}

function spawnFood () {
  //write code here to spawn the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
   banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
    banana.scale = 0.05  ;
    banana.velocityX = -5;
  
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle () {
  //write code here to spawn the obstacle on the ground
  if (frameCount % 300 === 0) {
   var obstacle = createSprite(800,320,10,40);
   
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.15 ;
   obstacle.velocityX = -6;
  
     //assign lifetime to the variable
   obstacle.lifetime = 210;
    
    obstacleGroup.add(obstacle);
  }
}








