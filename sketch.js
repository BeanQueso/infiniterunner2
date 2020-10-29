var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var xOff = 500;
var health = 100;
var healthX = 400;
var superPowers = 58;
var superPowerX = 230;
var indicationX = 20;



var gameOver, gameOverImg, restart, restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,10,20);


  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300, 95);
  gameOver.addImage("gameover", gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(300, 120);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;

  restart.visible = false;
  gameOver.visible = false;
  

}

function draw() {
  background(12,100,255);
  image(groundImage,0, 180, 150000, 10);
  if(gameState === PLAY){
       if(frameCount%10===0){
        score++;
       }
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
  if(frameCount%5===0){
  if(keyDown("s")&&superPowers>0){
    power();
  }
}
  trex.velocityY = trex.velocityY + 0.8
 
    spawnClouds();
  spawnObstacles();


    
  camera.position.x = trex.x+250;
  if(obstaclesGroup.isTouching(trex)){
    health = health - 2;
  }
    
    if(health===0){
       gameState = END;
       }
       trex.velocityX = 4;
     
       
       xOff+=4;
       healthX+=4;
       superPowerX+=4;
       indicationX+=4;
      
       invisibleGround.width = 100000000;
     }else if(gameState === END){
      ground.velocityX = 0;       
       obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    trex.velocityX = 0;

    
    //change the trex animation
    //trex.addAnimation("trex_collided");
    trex.velocityX = 0;
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
       restart.visible = true;
       gameOver.visible = true;
       gameOver.x = trex.x+90;
       restart.x = trex.x+90;

       trex.changeImage("collided", trex_collided);
              }

  if(mousePressedOver(restart)){
     reset();
     }
  fill(0);
  text("Score: "+ score, xOff,50);
  text("Health Value: "+health, healthX, 50);
  text("Super Power Amount: "+superPowers,superPowerX, 50);
  text("Hold key 'S' to activate omega powers", indicationX, 50);
  
  
  
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600+random(0,2000),120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;

    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(750+random(50,10000),165,10,40);
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = obstacle.x;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  health = 100;
  superPowers = 58;

  
  
}

function power(){
  superPowers--;
  trex.y = 50;
  trex.velocityY = 0;
}
