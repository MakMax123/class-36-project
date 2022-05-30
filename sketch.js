var balloon,balloonImage,balloon_animation;
var database;
var height;

var city,cityImage;

function preload(){
   
   balloonImage=loadImage("Images/HotAirBallon01.png");
   balloon_animation=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  cityImage = loadImage("Images/cityImage.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  console.log(database)
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.addAnimation("movingBalloon",balloon_animation);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  
}

// function to display UI
function draw() {
  background(cityImage);
  image(cityImage,0,0, width , height);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    //add the animation of balloon [use balloonImage2]
    balloon.changeAnimation("movingBalloon",balloon_animation);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    //add the animation of balloon [use balloonImage2]
    balloon.changeAnimation("movingBalloon",balloon_animation);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
 //add the animation of balloon [use balloonImage2]
    balloon.changeAnimation("movingBalloon",balloon_animation);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
  //add the animation of balloon [use balloonImage2]
    balloon.changeAnimation("movingBalloon",balloon_animation);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}


function updateHeight(x,y){
  database.ref('/balloon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}




function readHeight(data){
  //assign the value of data to height
  height = data.val()
  //assign the x and y value of height to the respective x and y position of balloon
  balloon.x = height.x;
  balloon.y = height.y;
 }

function showError(){
  console.log("Error in writing to the database");
}
