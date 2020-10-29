//the player has partisipated in a hurdle race . The jungle has been selected as the track. Jump over the obstacles to complete the run .Good luck! 
var gameState=Play;
var Play,End;
var runner,runner_image;
var background_track,background_image;
var ground,score;
var obstacle,hurdle,tyre,obstacleGroup;


function preload(){
runner_image=loadImage("runner.png");
background_image=loadImage("jungle.jpg");
hurdle=loadImage("stone.png");
tyre=loadImage("tyre.jfif");


  
}

function setup() {
  createCanvas(800,400);

  runner=createSprite(75,320);
  runner.addImage("player",runner_image);
  runner.scale=0.35;
  
  ground=createSprite(400,395,800,5);
  groundvelocityX=-3;
  ground.visible=false;
  
  
  background_track=createSprite(400,200);
  background_track.addImage("jungle",background_image);
  background_track.velocityX=-1;
  
  obstacleGroup=new Group();
}

function draw() {
  background(225);
  runner.collide(ground);
 fill("white");
  text("score"+score,200,100);
  
  
  if(gameState===Play){
    
     
  if(keyDown("space")){
    runner.velocityY=-6;
  }
  runner.velocityY+=0.2;
    
      score=Math.round(frameCount/30);
  background_track.depth=runner.depth;
  runner.depth+=1;
    
  
    if(runner.isTouching(obstacleGroup)){
    gameState=End;
    }
  }
  
  else if (gameState===End){
  score=0;
    fill("white");
    text("Game Over",150,200);
    text("press r to restart",150,210);
    background_track.velocityX=0;
    obstacleGroup.velocityX=0;
    if(gameState===End&&keyWentDown("r")){
      gameState=Play;
    }
  }
  console.log(gameState);
  if(background_track.x<300){
    background_track.x=background_track.width/2;
  }
  
  if(ground.x<0){
    ground.x=400;
  }
 
  

  ground.depth=background_track.depth
  ground.depth+=1;
  
  
  
displayObstacle();
drawSprites();
}
function displayObstacle(){
 if(frameCount%400===0){
   obstacle=createSprite(810,340);
   obstacle.velocityX=-1;
   obstacle.depth+=background_track.depth;
 
  
   var rand=Math.round(random(1,2));
   switch(rand){
     case 1 :obstacle.addImage(hurdle);
             obstacle.scale=0.2;       
       break;
       case 2 :obstacle.addImage(tyre);
               obstacle.scale=0.3;     
       break;       
         default: break;
   }
  obstacleGroup.add(obstacle);
 }
  
}