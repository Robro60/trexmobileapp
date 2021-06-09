var trex, trex_run,ground,gi,ground2,cloud ;
var cloudi,cactus,c1,c2,c3,c4,c5,c6;
var play=0 , end=1 , gs=play;
var cloudg,cactusg,trexend;
var go,goi,re,rei,score=0,hs=0;
var jumpSound , checkPointSound, dieSound;

function preload(){
 trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  gi = loadImage("ground2.png");
  cloudi = loadImage("cloud.png");
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  
  trexend=loadAnimation("trex_collided.png");
  goi=loadImage("gameOver.png");
  rei=loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3") 
}

function setup(){
 createCanvas(windowWidth,windowHeight);
  
 trex = createSprite(50,height-50,10,10);
  trex.addAnimation("run",trex_run);
  trex.scale = 0.5;
  trex.addAnimation("end",trexend);
  
  ground = createSprite(width/2,height-40,width,5);
  ground.addImage(gi);
  
  ground2 = createSprite(width/2,height-35,width,5);
  ground2.visible = false;
  
  cloudg=new Group();
  cactusg=new Group();
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,95,trex.height);
  
  go=createSprite(width/2,height/2,5,5);
  go.addImage(goi);
  go.scale=0.9;
  
  re=createSprite(width/2,height/2,5,5);
  re.addImage(rei);
  re.scale=0.4;
}


function draw(){
  background(0);
  
  if(score > hs){
    hs=score;
  }
  textSize(25)
  text("Score :"+score,480,20)
  text("HS :"+hs,380,20)
  
  if(score > 0 && score % 100===0){
      checkPointSound.play();
    }
  
  if(gs===play){
    
    trex.changeAnimation("run",trex_run);
    score=score+Math.round(getFrameRate()/61)
    
    re.visible=false;
    go.visible=false;
    
    ground.velocityX=-(3+(score/100));
    
   if(ground.x < 0){
    ground.x = ground.width / 2;
  }
    if((keyDown("space")|| touches.length>0) && trex.y > height-70){
    trex.velocityY = -11;
      jumpSound.play();
      touches=[];
  }
  trex.velocityY = trex.velocityY + 0.4;
trex.collide(ground2)
  
 spawnCactus();
  spawnClouds();  
    
    if(trex.isTouching(cactusg)){
      gs=end;
      dieSound.play();
    }
  
   }
  
  if(gs===end){
    ground.velocityX=0;
    trex.velocityY=0;
    cloudg.setVelocityXEach(0);
    cactusg.setVelocityXEach(0);
    cloudg.setLifetimeEach(-1);
    cactusg.setLifetimeEach(-1);
    trex.changeAnimation("end",trexend);
    re.visible=true;
    go.visible=true;
    
    if(mousePressedOver(re) || touches.length>0){
      reset();
      touches=[];
    }
    
  }
  
  drawSprites();
} 

function reset(){
  gs=play;
  cloudg.destroyEach();
  cactusg.destroyEach();
  score=0;
}

function spawnClouds(){
  
  if(frameCount % 80 === 0){
    cloud = createSprite(width,random(8,50),10,10);
    cloud.addImage(cloudi);
    cloud.velocityX = -3;
    cloud.scale = 0.5;
    
    cloud.lifetime = width/2;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloudg.add(cloud);
  }
}

function spawnCactus(){
  
  if(frameCount % 100 === 0){
    cactus = createSprite(width,height-50,10,10);
    cactus.velocityX = -(3+(score/100));
    cactus.lifetime = width/2;
    cactus.scale = 0.5;
    cactusg.add(cactus);
    
    var a = Math.round(random(1,6));
    switch(a){
        
        case 1 : cactus.addImage(c1);
        break;
        case 2 : cactus.addImage(c2);
        break;
        case 3 : cactus.addImage(c3);
        break;
        case 4 : cactus.addImage(c4);
        break;
        case 5 : cactus.addImage(c5);
        break;
        case 6 : cactus.addImage(c6);
        break;
        default : break;
    }
  }
}


