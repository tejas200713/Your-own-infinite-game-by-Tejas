
var space,spaceImg;
var spaceShip,spaceShipImg,missile,missileImg;
var asteroid,asteroidImg,fuel,fuelSource;
var missileGroup,obstacleGroup,fuelGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameoverImg;
var score = 0,highScore = 0;
var fuelLevel1,fuelLevel2,fuelLevel3;

function preload(){
 
  spaceImg = loadImage("space.png");
  spaceShipImg = loadImage("spaceship.png");
  missileImg = loadImage("missile.png");
  asteroidImg = loadImage("asteroid1.png");
  fuelSource = loadImage("fuelstation.png");
  gameoverImg = loadImage("gameover.png");
  
}

function setup() {
 
  createCanvas(windowWidth,windowHeight);
 
  
  space = createSprite(width/2,100,10,10);
  space.addImage(spaceImg);
  space.scale = 2;
  space.velocityY = 5;
  
 
  spaceShip = createSprite(width/2,height-35,1,1);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale = 0.8;
  
  
  gameOver = createSprite(width/2,height/2-45,1,1);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.08;
  

  missileGroup = new Group();
  obstacleGroup = new Group();
  fuelGroup = new Group();
  
  fuelLevel1 = createSprite(60,25,120,20);
  fuelLevel1.shapeColor = "white";
  
  fuelLevel2 = createSprite(57,25,120,15);
  fuelLevel2.velocityX = -0.05;
  
  fuelLevel3 = createSprite(57,25,120,15);
  fuelLevel3.shapeColor = "black";
  
}

function draw() {
  
  background("black");
  
  if (gameState === PLAY){
    
      obstacle();
      fuelStation();
      
      spaceShip.visible = true;
      space.visible = true;
      missileGroup.visible = true;
      fuelGroup.visible = true;
      obstacleGroup.visible = true;
      gameOver.visible  = false;
      
      space.velocityY = (5 + 1 * score/40);  
       
      if (space.y > 450){
          space.y = 100;

      }

     
      if (keyDown(RIGHT_ARROW)){
          spaceShip.x = spaceShip.x+15;

      }

     
      if (keyDown(LEFT_ARROW)){
          spaceShip.x = spaceShip.x-15;

      }
      
     
      if (keyDown("space") || touches.length > 0){
          miniRocket();
          touches = [];

          }
      
     
      if (missileGroup.isTouching(obstacleGroup)){
          missileGroup.destroyEach();
          obstacleGroup.destroyEach();
          score = score+5;

      }
      
      
      if (fuelGroup.isTouching(spaceShip)){
          fuelGroup.destroyEach();
          fuelLevel2.x = 57;
      }
    
      if (obstacleGroup.isTouching(spaceShip) || fuelLevel2.x+60 < 0){
          obstacleGroup.destroyEach();
          missileGroup.destroyEach();
          gameState = END;
          
      }   
  }       
  else if (gameState === END){
          space.visible = false;
          spaceShip.visible = false;
          missileGroup.visible = false;
          fuelGroup.visible = false;    
          obstacleGroup.visible = false;
          gameOver.visible = true;
          fuelLevel2.velocityX = 0;
    
          stroke("black");
          fill("red");
          textSize(25);
          text("High Score = "+highScore,width/2-85,gameOver.y+50);
      
         
          stroke("black");
          fill("darkBlue");
          textSize(20);
          text("Click R to Restart",width/2-75,gameOver.y+90);
    
        
          if (highScore < score){
              highScore = score;
          }
     
          if (keyDown("r")){
              gameState = PLAY;
              reset();
          }
    
  }
  
 
  drawSprites();
  

  stroke("black");
  fill("yellow");
  textSize(15);
  text("Score = "+ score,width-100,30);
 
  stroke("black");
  fill("white");
  textSize(16);
  text("Fuel",40,30);
}

//creates miniRocket function
function miniRocket (){
  
  missile = createSprite(spaceShip.x,spaceShip.y-50,10,10);
  missile.addImage(missileImg);
  missile.velocityY = -5;
  missile.scale = 0.019;
  missile.lifetime = -(height/missile.velocityY);
  missileGroup.add(missile);
}


function obstacle (){
  
  if (frameCount%130 === 0){ 
      asteroid = createSprite(Math.round(random(150,width-150)),1,1,1);
      asteroid.addImage(asteroidImg);
      asteroid.scale = 0.04;
      asteroid.velocityY = 6;
      asteroid.lifetime = height/asteroid.velocityY;     
      obstacleGroup.add(asteroid);  
      fuelLevel1.depth = asteroid.depth;
      fuelLevel1.depth = fuelLevel1.depth + 1;
      fuelLevel2.depth = asteroid.depth;
      fuelLevel2.depth = fuelLevel2.depth + 1;
      fuelLevel3.depth = asteroid.depth;
      fuelLevel3.depth = fuelLevel3.depth + 1;
      fuelLevel2.depth = fuelLevel3.depth;
      fuelLevel2.depth = fuelLevel2.depth + 1;
  }   
}


function fuelStation (){
  
  if (frameCount%1900 === 0){ 
      fuel = createSprite(Math.round(random(150,width-150)),1,1,1);
      fuel.addImage(fuelSource);
      fuel.scale = 0.07;
      fuel.velocityY = 7;
      fuel.lifetime = height/fuel.velocityY;
      fuelGroup.add(fuel);
  }
  
}


function reset() {
  spaceShip.x = width/2;
  space.velocityY = 5;
  score = 0;
  fuelLevel2.x = 57;
  fuelLevel2.velocityX = -0.05;
  
}
