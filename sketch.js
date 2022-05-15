var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, windowHeight);
  tower = createSprite(300, height/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghostImg", ghostImg);
  ghost.scale = 0.3

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(0);
  
  if(gameState == "play"){
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x- 4
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 4
    }

    if(keyDown("SPACE")){
      ghost.velocityY = -8
    }

    spawnObstacles()

    ghost.velocityY = ghost.velocityY +0.8

    if(climbersGroup.isTouching(ghost))
    {ghost.velocityY = 0;
   } 
   
   if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 1000){
    ghost.destroy();
    gameState = "end"
    }

    if(tower.y > 500){
      tower.y = height/2
    }

  }

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }



    drawSprites()
}


function spawnObstacles(){
  if(frameCount%300 == 0){
    door = createSprite(300,-50)
    door.addImage("doorImg", doorImg)
    door.velocityY = 1
    door.x = Math.round(random(120 ,500))


    climber = createSprite(300, 10)
    climber.addImage("climberImg", climberImg)
    climber.velocityY = 1
    climber.x = door.x


    invisibleBlock = createSprite(300, -110)
    invisibleBlock.velocityY = 1 
    invisibleBlock.height = 2
    invisibleBlock.widht = climber.widht
    invisibleBlock.x = door.x


    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    ghost.depth = door.depth 
    ghost.depth = ghost.depth +1

    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800
  }

}