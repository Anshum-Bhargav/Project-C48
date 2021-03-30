const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ball,ballImg;
var obstacle,obstacleImg,obstacleGroup;
var helpRect;
var helpRectGrp;

var score;
var life;

function preload()
{
	ballImg=loadImage("ball.png");
	obstacleImg=loadImage("obstacle.png");
}

function setup() {
	createCanvas(800,windowHeight-20);

	ball=createSprite(400,0);
	ball.addImage(ballImg);
	ball.scale=0.1;

	engine = Engine.create();
	world = engine.world;

	helpRectGrp = new Group();
	obstacleGroup = new Group();

	score = 0;
	life = 3;

	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);

  if(keyDown("right")){
	  ball.x = ball.x+10;
  }
  if(keyDown("left")){
	ball.x = ball.x-10;
  }
  ball.velocityY = 5;

  if(ball.x>800){
	ball.x = 0;
  }
  if(ball.x<0){
	ball.x = 810;
  }
  
  spawnHelpingRects();

  ball.collide(helpRectGrp);

  if(frameCount%30===0){
	score = score+1;
  }
  
  spawnObstacles();

  if(obstacleGroup.collide(ball)){
	life = life-1;
	obstacleGroup.destroyEach();
  }

  drawSprites();
  stroke("red");
  textSize(10);
  fill("white");
  text("SCORE: "+score,10,30);
  text("LIVES: "+life,700,30);
}

function spawnHelpingRects(){
	if(frameCount%40===0){
		helpRect = createSprite(0,windowHeight-15,200,10);
		helpRect.x=random(100,700);

		helpRect.velocityY= -10;

		helpRectGrp.add(helpRect);
	}
} 

function spawnObstacles(){
	if(frameCount%100===0){
		obstacle = createSprite(0,windowHeight,200,10);
		obstacle.x=random(100,700);
		obstacle.addImage(obstacleImg);
		obstacle.scale=0.30

		obstacle.velocityY = -8;

		obstacleGroup.add(obstacle);
	}
}



