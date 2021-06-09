var trex, trex_running;
var edges;
var ground, movingGround;
var ground2;
var cloud, movingCloud;
var cloud2, movingCloud2;
var o1, o2, o3, o4, o5, o6;
var obstacle;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleGroup;
var cloudGroup;
var trexCollide;
var gameOver, gameOverText;
var restartButton, button;
var jumpSound;
var collideSound;
var checkPointSound;
 var name = "Syon";
//var highScore = 0
localStorage['HighScore']=0
function preload() {
  trex_running = loadAnimation(
    "costume1.svg",
    "costume2 (1).svg",
    "costume3.svg",
    "costume4.svg",
    "costume5.svg",
    "costume6.svg"
  );
  trexCollide = loadAnimation("costume2 (1).svg");
  movingGround = loadImage("ground2.png");
  movingCloud = loadImage("cloud1.png");
  movingCloud2 = loadImage("cloud2.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  gameOver = loadImage("gameover.svg");
  restartButton = loadImage("restart.svg");
  collideSound = loadSound("collided.wav");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.wav");
}
function setup() {
  createCanvas(600, 200);
 
 
  //create a trex sprite
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stillMotion", trexCollide);
  trex.scale = 0.5;
  //trex.debug = true;
  trex.setCollider("rectangle", 0, 0, 30, 130);
  //create ground sprite
  ground = createSprite(300, 190, 600, 10);
  ground.addImage("fullGround", movingGround);
  ground2 = createSprite(300, 200, 600, 10);
  ground2.visible = false;
  gameOverText = createSprite(300, 100);
  gameOverText.addImage("gameOver", gameOver);
  gameOverText.visible = false;
  button = createSprite(300, 150);
  button.addImage("restart", restartButton);
  button.visible = false;
  var anynumber = Math.round(random(20, 100));
  console.log(anynumber);

  obstacleGroup = createGroup();
  cloudGroup = createGroup();
}

function draw() {
  background("white");
  

  edges = createEdgeSprites();
  trex.collide(ground2);
  if (gameState === PLAY) {
    if (keyDown("space") && trex.y > 162) {
      trex.velocityY = -10;
      jumpSound.play();
    }

    trex.velocityY = trex.velocityY + 0.5;
    //increase the speed of ground
    ground.velocityX = -(4 + (3 * score) / 100);

    if (score % 100 === 0 && score > 0) {
      checkPointSound.play();
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    score = score + Math.round(getFrameRate() / 60);

    spawnCactus();
    spawnClouds();

    if (trex.isTouching(obstacleGroup)) {
      gameState = END;
      collideSound.play();
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    cloudGroup.setVelocityEach(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.changeAnimation("stillMotion", trexCollide);
    trex.velocityY = 0;
    gameOverText.visible = true;
    button.visible = true;
    
    if(mousePressedOver(button)){
      button.visible = false
      gameOverText.visible = false
      reset();
    }
  }

   
  drawSprites();
  text("Score = " + score, 510, 40);
  text("High Score = " + localStorage['HighScore'],410,40)
  text(mouseX + "," + mouseY, mouseX, mouseY);
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 80, 40, 10);
    cloud.y = Math.round(random(10, 100));
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        cloud.addImage("movingCloud", movingCloud);
        break;
      case 2:
        cloud.addImage("movingCloud2", movingCloud2);
        break;
      default:
        break;
    }

    cloud.scale = 0.2;
    cloud.velocityX = -(4 + (3 * score) / 100);
    cloud.lifetime = 240;
    cloudGroup.add(cloud);
  }
}

function spawnCactus() {
  if (frameCount % 70 === 0) {
    obstacle = createSprite(600, 180);

    obstacle.velocityX = -(4 + (3 * score) / 100);

    var randObstacle = Math.round(random(1, 6));
    switch (randObstacle) {
      case 1:
        obstacle.addImage("o1", o1);
        break;
      case 2:
        obstacle.addImage("o2", o2);
        break;
      case 3:
        obstacle.addImage("o3", o3);
        break;
      case 4:
        obstacle.addImage("o4", o4);
        break;
      case 5:
        obstacle.addImage("o5", o5);
        break;
      case 6:
        obstacle.addImage("o6", o6);
        break;
    }
    obstacle.scale = 0.4;
    obstacle.lifetime = 240;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
   //score to 0
  gameState = PLAY
  
  
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  
  trex.changeAnimation("running", trex_running);
    if(score >  localStorage['HighScore'] ){
     localStorage['HighScore']= score
  }
  score = 0
  //obstacles and clouds has to go back
  
  //gameState has to be play
  
  
}
