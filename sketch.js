var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDog = createButton("Feed the Dog")
  feedDog.position(700,95)
  feedDog.mousePressed(fedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  
  
 
  if(lastFed>=12){
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{
    if(lastFed<=12){
    }else if(lastFed==0){
    text("Last Fed : 12 PM",350,30)
  }

}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function fedDog(){
  dog.addImage(happyDog);

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <=0){
  foodObj.updateFoodStock(food_stock_val *0)
}else{
  foodObj.updateFoodStock(food_stock_val -1)
}
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

