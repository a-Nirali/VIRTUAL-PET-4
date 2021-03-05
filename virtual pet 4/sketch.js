var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject,bath,bathroom,napy,player,living;

var dogState = "awake";

function preload()
{
  //load images here
  
  happyDog = loadImage("images/Happy.png");

  normalDog = loadImage("images/dog.png");

  sleepyDog = loadImage("images/Bed Room.png");

  bathroom = loadImage("images/Wash Room.png");

  living = loadImage("images/Living Room.png")
}

function setup() {
  createCanvas(350,500);
  
  //foodS = 20;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
  dog = createSprite(180,200,20,20);
  dog.addImage(normalDog);
  dog.scale = 0.25;

  feed = createButton("Feed the dog");
  feed.position(630,500);
  feed.mousePressed(feedDog);

  addfood = createButton("Add Food");
  addfood.position(530,500);
  addfood.mousePressed(addFood);

  bath = createButton("Give Bath")
  bath.position(740,500);
  bath.mousePressed(giveBath);

  napy = createButton("Take a nap")
  napy.position(600,530);
  napy.mousePressed(nap);

  player = createButton("Play")
  player.position(700,530);
  player.mousePressed(play);

  foodObject = new Food();
}


function draw() {  
  background(46, 139, 87);

  //console.log(lastFed);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }*/
  foodObject.display();

  
  drawSprites();
  //add styles here


  //lastFed = foodObject.lastFed;
  fill(255,255,254);
  textSize(15);
  if(foodObject.lastFed >= 12){
    text("Last Feed : " + foodObject.lastFed%12 + " PM", 350,30);
  }else if(foodObject.lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    ("Last Feed :" + foodObject.lastFed + " AM",350,30);
  }

  fill("white");
  text("Note: Press the up arrow to feed the dog milk!",30,60)
  text("Food Remaining: " + foodObject.foodStock,30,100);


  if(foodObject.currentTime > foodObject.lastFed){
    //console.log("YAY");
    if(foodObject.lastFed + 2 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.livingRoom,180,200,200,300);
        console.log("YAY");
    }else if(foodObject.lastFed + 1 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.garden,180,200,200,300);
        console.log("YAY1");
   
    }
}
}

function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(){
  foodObject.updateFoodStock();
}

function giveBath(){
dog.addImage(bathroom);
}

function nap(){
  if(dogState === "awake"){
      dog.addImage(sleepyDog);
  }
}

function play(){
  dog.addImage(living);
}